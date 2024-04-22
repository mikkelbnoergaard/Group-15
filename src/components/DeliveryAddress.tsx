import React, {useEffect, useState} from "react";
import addressesData from "../assets/delivery.json";
import {sendOrderData} from "../remote/requestbin.tsx";
import {AddressFields} from "./AddressForm.tsx";
import {useOrderForm} from "./useOrderForm";

type Address = {
    country: string;
    city: string;
    continent: string;
    addressLine1: string;
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

    const handleCheckout = () => {
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
        const selectedAddress = preDefinedAddresses[selectedAddressIndex];
        console.log("Selected address:", selectedAddress);
        alert('Form submitted');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Delivery Address</h2>
            <div>
                <label>Select Delivery Address:</label>
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
            </div>
            {isLoading ? (
                <div className="overlay">
                    <div className="loading-spinner"></div>
                </div>
            ) : isSubmitted ? (
                <p>Formularen er blevet indsendt!</p>
            ) : (
                <button className="submitButton" onClick={handleCheckout}>
                    <span className="text">Submit</span>
                </button>
            )}
        </form>
    );
};

export default DeliveryAddress;