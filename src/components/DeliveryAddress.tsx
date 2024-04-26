import React, {useEffect, useState} from "react";
import addressesData from "../assets/delivery.json";
import {sendOrderData} from "../remote/handleOrder.tsx";
import {AddressFields} from "./AddressForm.tsx";
import {useOrderForm} from "./UseOrderForm.tsx";
import TermsAndConditionsPopup from "./TermsAndConditionsPopup.tsx";

type Address = {
    country: string;
    city: string;
    continent: string;
    addressLine1: string;
    image: string;
};

interface Item {
    name: string;
    quantity: number;
}

interface DeliveryAddressProps {
    items: Item[];
    addressInfo: AddressFields | null; // New prop to receive address info
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({items, addressInfo}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [preDefinedAddresses, setPreDefinedAddresses] = useState<Address[]>([]);
    const {
        termsChecked,
        marketingChecked,
        orderComment,
        handleCheckboxChange,
        handleMarketingCheckboxChange,
        handleOrderCommentChange
    } = useOrderForm();
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = (index: number) => {
        setSelectedAddressIndex(index);
    };

    useEffect(() => {
        setPreDefinedAddresses(addressesData); // Set addresses using JSON data
    }, []); // Empty dependency array to run only once on component mount

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const handleSelectDeliveryAddress = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = parseInt(event.target.value);
        setSelectedAddressIndex(selectedIndex);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!termsChecked) {
            alert('Please accept the terms & conditions to proceed.');
            return;
        }
        console.log('Checkout button clicked');
        setIsLoading(true);
        setIsSubmitted(false);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 5000);

        if (addressInfo !== null) {
            sendOrderData('https://eowyyh7aavsptru.m.pipedream.net', items, addressInfo, orderComment, marketingChecked);
        } else {
            console.error('Address information is missing');
        }

        const selectedAddress = preDefinedAddresses[selectedAddressIndex];
        console.log("Selected address:", selectedAddress);
        alert('Form submitted');
    };

    const closePopup = () => {
        setShowPopup(false);
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="box-container">
                {preDefinedAddresses.slice(0, 4).map((address, index) => (
                    <button key={index} className="box1" onClick={() => handleButtonClick(index)}>
                        <img className="box-image" src={address.image} alt={`${address.city}, ${address.country}`}/>
                        {address.city}, {address.country}
                    </button>
                ))}
            </div>
            <div>
            <label className="address-label">Select Delivery Address:</label>
                <select onChange={handleSelectDeliveryAddress}>
                    {preDefinedAddresses.map((address, index) => (
                        <option key={index} value={index}>
                            {address.city}, {address.country}
                        </option>
                    ))}
                </select>
            </div>
            <div className={"select-delivery-address"}>
                <div>
                    <label>
                        Address:
                        {preDefinedAddresses.length > 0 ? (
                            <span>{preDefinedAddresses[selectedAddressIndex].addressLine1}</span>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </label>
                </div>
                <div>
                    <label>
                        Continent:
                        {preDefinedAddresses.length > 0 ? (
                            <span>{preDefinedAddresses[selectedAddressIndex].continent}</span>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </label>
                </div>
                <div className="form-row">
                    <label htmlFor="order-comment">Order Comment:</label>
                    <textarea
                        id="order-comment"
                        value={orderComment}
                        onChange={handleOrderCommentChange}
                        placeholder="Any special instructions?"
                    />
                </div>
                <div className="form-checkbox">
                    <label>
                        <input type="checkbox" checked={termsChecked} onChange={handleCheckboxChange}/>
                        <span>I accept the terms & conditions</span>
                    </label>
                </div>

                <div className="form-checkbox">
                    <label>
                        <input type="checkbox" checked={marketingChecked} onChange={handleMarketingCheckboxChange}/>
                        <span>I agree to receive marketing emails</span>
                    </label>
                </div>
                <button type="button" onClick={() => setShowPopup(true)}>View Terms and Conditions</button>
                {showPopup && <TermsAndConditionsPopup onClose={closePopup}/>}
            </div>
            {isLoading ? (
                <div className="overlay">
                    <div className="loading-spinner"></div>
                </div>
            ) : isSubmitted ? (
                <p>Formularen er blevet indsendt!</p>
            ) : (
                <button className="submitButton" type="submit">
                    <span className="text">Submit</span>
                </button>
            )}
        </form>
    );
};

export default DeliveryAddress;