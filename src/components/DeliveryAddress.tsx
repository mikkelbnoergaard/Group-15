import React, { useEffect, useState } from "react";
import addressesData from "../assets/delivery.json";
import {useOrderForm} from "./UseOrderForm.tsx";
import TermsAndConditionsPopup from "./TermsAndConditionsPopup.tsx";

export type Address = {
    country: string;
    city: string;
    continent: string;
    addressLine1: string;
    image: string;
};

interface DeliveryAddressProps {

    orderForm: ReturnType<typeof useOrderForm>; // You must import useOrderForm appropriately
    onAddressSelected: (address: Address) => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({orderForm, onAddressSelected}) => {
    const [preDefinedAddresses, setPreDefinedAddresses] = useState<Address[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);

    useEffect(() => {
        setPreDefinedAddresses(addressesData);
        // Call the callback with the initial address if available
        if (addressesData.length > 0) {
            onAddressSelected(addressesData[0]);
        }
    }, [onAddressSelected]);

    const handleButtonClick =  (index: number) => {
        onAddressSelected(preDefinedAddresses[index]);
        setSelectedAddressIndex(index);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <label className="address-label">Select Delivery Address:</label>
            <div className={"select-delivery-address"}>
                <div className="box-container">
                    {preDefinedAddresses.map((address, index) => (
                        <button key={index} className={`box1 ${index === selectedAddressIndex ? 'selected' : ''}`} onClick={() => handleButtonClick(index)}>
                            <div>
                                <img className="box-image" src={address.image}
                                     alt={`${address.city}, ${address.country}`}/>
                            </div>
                            <div>
                                {address.city}, {address.country}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="form-row">
                    <label htmlFor="order-comment">Order Comment:</label>
                    <textarea
                        id="order-comment"
                        value={orderForm.orderComment}
                        onChange={orderForm.handleOrderCommentChange}
                        placeholder="Any special instructions?"
                    />
                </div>
                <div className="form-checkbox">
                    <label>
                        <input type="checkbox" checked={orderForm.termsChecked}
                               onChange={orderForm.handleCheckboxChange}/>
                        <span>I accept the terms & conditions</span>
                    </label>
                </div>
                <div className="form-checkbox">
                    <label>
                        <input type="checkbox" checked={orderForm.marketingChecked}
                               onChange={orderForm.handleMarketingCheckboxChange}/>
                        <span>I agree to receive marketing emails</span>
                    </label>
                </div>
                <button type="button" onClick={() => setShowPopup(true)}>View Terms and Conditions</button>
                {showPopup && <TermsAndConditionsPopup onClose={closePopup}/>}
            </div>
        </div>
    );
};

export default DeliveryAddress;