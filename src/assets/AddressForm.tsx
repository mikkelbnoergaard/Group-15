import React, { useState, ChangeEvent, FocusEvent, FormEvent } from "react";

type AddressFields = {
    country: string;
    zip: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    name: string;
    phone: string;
    email: string;
    companyName: string;
    companyVAT: string;
};

type AddressesState = {
    delivery: AddressFields;
    billing: AddressFields;
    billingIsDifferent: boolean;
};

type ErrorsState = {
    [key: string]: string;
};


const AdressForm: React.FC = () => {
    const [addresses, setAddresses] = useState<AddressesState>({
        delivery: {
            country: 'Denmark',
            zip: '',
            city: '',
            addressLine1: '',
            addressLine2: '',
            name: '',
            phone: '',
            email: '',
            companyName: '',
            companyVAT: '',
        },
        billing: {
            country: 'Denmark',
            zip: '',
            city: '',
            addressLine1: '',
            addressLine2: '',
            name: '',
            phone: '',
            email: '',
            companyName: '',
            companyVAT: '',
        },
        billingIsDifferent: false,
    });


    const [errors, setErrors] = useState<ErrorsState>({});

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, addressType: keyof AddressesState) => {
        const { name, value } = event.target;

        // Opdater din adresse state med den nye værdi først
        setAddresses((prevAddresses: AddressesState) => {
            
            const updatedAddress = {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ...prevAddresses[addressType],
                [name]: value,
            };

            return {
                ...prevAddresses,
                [addressType]: updatedAddress,
            };
        });

        // Derefter tjek for fejl og opdater dem om nødvendigt
        let newErrors: ErrorsState = { ...errors };
        if (name === "email" && !validateEmail(value)) {
            newErrors.email = 'Ugyldig e-mailadresse'; // Ensure consistent key usage
        } else if (name === "phone") {
            const phoneError = validatePhone(value);
            if (phoneError) {
                newErrors = { ...newErrors, phone: phoneError };
            } else {
                delete newErrors.phone;
            }
        } else if (name === "companyVAT") {
            const vatError = validateCompanyVAT(value);
            if (vatError) {
                newErrors.companyVAT = vatError;
            } else {
                delete newErrors.companyVAT;
            }
        } else {
            delete newErrors[name]; // This will remove the error if the input becomes valid
        }
        setErrors(newErrors);

        // Specifik logik for postnummer-validering
        if (name === 'zip') {
            validateZipCode(value, addressType);
        }
    };

    const validateZipCode = async (zip: string, addressType: keyof AddressesState) => {
        if (zip.length === 4) {
            try {
                const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`);
                const data = await response.json();
                console.log(data);

                if (data.title !== "The resource was not found") {
                    setAddresses(prevAddresses => ({
                        ...prevAddresses,
                        [addressType]: {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            ...prevAddresses[addressType],
                            city: data.navn,
                            zip: zip
                        },
                    }));
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [`${addressType}.zip`]: ''
                    }));
                } else {
                    // Set error message if zip is not found
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [`${addressType}.zip`]: 'Ugyldigt postnummer'
                    }));
                }
            } catch (error) {
                console.error("Error validating zip code:", error);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [`${addressType}.zip`]: 'Fejl ved validering af postnummer'
                }));
            }
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                [`${addressType}.zip`]: 'Postnummeret skal være 4 cifre'
            }));
        }
    };


    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };
    const validatePhone = (phone: string): string => {
        if (phone.length > 8) {
            return "Telefonnummeret må ikke overstige 8 cifre";
        } else if (phone.length < 8 || isNaN(Number(phone))) {
            return "Telefonnummeret skal være 8 cifre";
        }
        return ""; // Ingen fejl
    };

    const handleZipBlur = async (e: FocusEvent<HTMLInputElement>, addressType: keyof AddressesState) => {
        const zip = e.target.value;
        await validateZipCode(zip, addressType);
    };
    //Placeholder for validateZip and other validation functions

    const validateCompanyVAT = (companyVAT: string): string => {
        if (companyVAT.length !== 8 || isNaN(Number(companyVAT))) {
            return "Momsnummeret skal være 8 cifre";
        }
        return ""; // Ingen fejl
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //Implement your submission logic here, including further validation as necessary
        alert('Form submitted!');
    };
    const toggleBillingAddress = () => {
        setAddresses(prevAddresses => ({
            ...prevAddresses,
            billingIsDifferent: !prevAddresses.billingIsDifferent,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Billing Address</h2>
            <div>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={addresses.billing.country}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
            </div>
            <div>
                <label>
                    Zip Code:
                    <input
                        type="text"
                        name="zip"
                        value={addresses.billing.zip}
                        onChange={(e) => handleInputChange(e, 'billing')}
                        onBlur={(e) => handleZipBlur(e, 'billing')}
                    />
                </label>
            </div>
            {errors['billing.zip'] && <div className="error">{errors['billing.zip']}</div>}
            <div>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={addresses.billing.city}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
            </div>
            <div>
                <label>
                    Address Line 1:
                    <input
                        type="text"
                        name="addressLine1"
                        value={addresses.billing.addressLine1}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
            </div>
            <div>
                <label>
                    Address Line 2:
                    <input
                        type="text"
                        name="addressLine2"
                        value={addresses.billing.addressLine2}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
            </div>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={addresses.billing.name}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
            </div>
            <div>
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={addresses.billing.phone}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
                {errors.phone && <div className="error">{errors.phone}</div>} {/* Fejlbesked her */}
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={addresses.billing.email}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
                {errors.email && <div className="error">{errors.email}</div>} {/* Display the email error message here */}
            </div>
            <div>
                <label>
                    Company Name:
                    <input
                        type="text"
                        name="companyName"
                        value={addresses.billing.companyName}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
            </div>
            <div>
                <label>
                    Company VAT:
                    <input
                        type="text"
                        name="companyVAT"
                        value={addresses.billing.companyVAT}
                        onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
                {errors.companyVAT && <div className="error">{errors.companyVAT}</div>}
            </div>
            <div>
                <label>
                    Shipping Address is the same as Billing Address?
                    <input
                        type="checkbox"
                        checked={!addresses.billingIsDifferent}
                        onChange={toggleBillingAddress}
                    />
                </label>
            </div>
            {addresses.billingIsDifferent && (
                <>
                    <div>
                        <h2>Delivery Address</h2>
                    </div>
                    <div>
                        <label>
                            Country:
                            <input
                                type="text"
                                name="country"
                                value={addresses.delivery.country}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Zip Code:
                            <input
                                type="text"
                                name="zip"
                                value={addresses.delivery.zip}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                                onBlur={(e) => handleZipBlur(e, 'delivery')}
                            />
                        </label>
                    </div>
                    {errors['delivery.zip'] && <div className="error">{errors['delivery.zip']}</div>}
                    <div>
                        <label>
                            City:
                            <input
                                type="text"
                                name="city"
                                value={addresses.delivery.city}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Address Line 1:
                            <input
                                type="text"
                                name="addressLine1"
                                value={addresses.delivery.addressLine1}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Address Line 2:
                            <input
                                type="text"
                                name="addressLine2"
                                value={addresses.delivery.addressLine2}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={addresses.delivery.name}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={addresses.delivery.phone}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={addresses.delivery.email}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Company Name:
                            <input
                                type="text"
                                name="companyName"
                                value={addresses.delivery.companyName}
                                onChange={(e) => handleInputChange(e, 'delivery')}
                            />
                        </label>
                    </div>
                    <div>
                        Company VAT:
                        <input
                            type="text"
                            name="companyVAT"
                            value={addresses.delivery.companyVAT}
                            onChange={(e) => handleInputChange(e, 'delivery')}
                        />
                    </div>
                </>
            )}
            <button type="submit">Submit</button>
        </form>
    );
};
export default AdressForm;