import React, {useState, ChangeEvent, FocusEvent} from "react";
import './AddressFormSide.css';

export type AddressFields = {
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

type ErrorsState = {
    [key: string]: string;
};

interface AddressFormProps {
    onCompanyVATChange: (vat: string) => void;
    onSubmitAddress: (address: AddressFields) => void;
}


const AddressForm: React.FC<AddressFormProps> = ({onCompanyVATChange, onSubmitAddress}) => {
    const [address, setAddress] = useState<AddressFields>({
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
    });


    const [cityLocked, setCityLocked] = useState<boolean>(false);
    const [errors, setErrors] = useState<ErrorsState>({});

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if (name === 'companyVAT') {
            onCompanyVATChange(value);
        }
        if (name === 'zip' && value !== '' && !/^\d+$/.test(value)) {
            return;
        }
        if (name === 'companyVAT' && value !== '' && !/^\d+$/.test(value)) {
            return;
        }
        if (name === 'phone' && value !== '' && !/^\d+$/.test(value)) {
            return;
        }
        setAddress((prevAddress: AddressFields) => {
            const updatedAddress = {
                ...prevAddress,
                [name]: value,
            };
            onSubmitAddress(updatedAddress);
            return updatedAddress;
        });

        let newErrors: ErrorsState = {...errors};
        if (name === "email" && !validateEmail(value)) {
            newErrors.email = 'Invalid email';
        } else if (name === "phone") {
            const phoneError = validatePhone(value);
            if (phoneError) {
                newErrors = {...newErrors, phone: phoneError};
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
            delete newErrors[name];
        }
        setErrors(newErrors);
        if (name === 'zip') {
            validateZipCode(value);
        }
    };

    const validateZipCode = async (zip: string) => {
        if (zip.length === 4) {
            try {
                const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`);
                const data = await response.json();
                console.log(data);

                if (data.title !== "The resource was not found") {
                    setAddress(prevAddress => ({
                        ...prevAddress,
                        city: data.navn,
                        zip
                    }));
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        zip: ''
                    }));
                    setCityLocked(true);
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        zip: 'Ugyldigt postnummer'
                    }));
                    setCityLocked(false);
                }
            } catch (error) {
                console.error("Error validating zip code:", error);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    zip: 'Fejl ved validering af postnummer'
                }));
                setCityLocked(false);
            }
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                zip: 'Postcode must be 4 digits'
            }));
            setCityLocked(false);
        }
    };


    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };
    const validatePhone = (phone: string): string => {
        if (phone.length > 8) {
            return "The phone number must not exceed 8 digits";
        } else if (phone.length < 8 || isNaN(Number(phone))) {
            return "The phone number must be 8 digits";
        }
        return "";
    };

    const handleZipBlur = async (e: FocusEvent<HTMLInputElement>) => {
        const zip = e.target.value;
        await validateZipCode(zip);
    };

    const validateCompanyVAT = (companyVAT: string): string => {
        if (companyVAT.length !== 8 || isNaN(Number(companyVAT))) {
            return "The VAT number must be 8 digits";
        }
        return "";
    };

    return (
        <form className="AddressForm">
            <h2>Billing address</h2>
            <div>
                <label>
                    *Country:
                    <input
                        type="text"
                        name="country"
                        value={address.country}
                        //onChange={(e) => handleInputChange(e, 'billing')}
                    />
                </label>
            </div>
            <div className={"input-wrapper"}>
                <label>
                    *Zip Code:
                    <input
                        type="text"
                        name="zip"
                        value={address.zip}
                        onChange={(e) => handleInputChange(e)}
                        onBlur={(e) => handleZipBlur(e)}
                    />
                    {errors['zip'] && <div className="error-message1">{errors['zip']}</div>}
                </label>
            </div>
            <div>
                <label>
                    *City:
                    <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        readOnly={cityLocked}
                    />
                </label>
            </div>
            <div>
                <label>
                    *Address Line 1:
                    <input
                        type="text"
                        name="addressLine1"
                        value={address.addressLine1}
                        onChange={(e) => handleInputChange(e)}
                    />
                </label>
            </div>
            <div>
                <label>
                    &nbsp;Address Line 2:
                    <input
                        type="text"
                        name="addressLine2"
                        value={address.addressLine2}
                        onChange={(e) => handleInputChange(e)}
                    />
                </label>
            </div>
            <div>
                <label>
                    *Name:
                    <input
                        type="text"
                        name="name"
                        value={address.name}
                        onChange={(e) => handleInputChange(e)}
                    />
                </label>
            </div>
            <div className={"input-wrapper"}>
                <label>
                    *Phone:
                    <input
                        type="text"
                        name="phone"
                        value={address.phone}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {errors.phone && <div className="error-message1">{errors.phone}</div>}
                </label>
            </div>
            <div className={"input-wrapper"}>
                <label>
                    *Email:
                    <input
                        type="email"
                        name="email"
                        value={address.email}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {errors.email &&
                        <div className="error-message1">{errors.email}</div>}
                </label>
            </div>
            <div>
                <label>
                    &nbsp;Company Name:
                    <input
                        type="text"
                        name="companyName"
                        value={address.companyName}
                        onChange={(e) => handleInputChange(e)}
                    />
                </label>
            </div>
            <div className={"input-wrapper"}>
                <label>
                    &nbsp;Company VAT:
                    <input
                        type="text"
                        name="companyVAT"
                        value={address.companyVAT}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {errors.companyVAT && <div className="error-message1">{errors.companyVAT}</div>}
                </label>
            </div>
        </form>
    );

};

export default AddressForm;