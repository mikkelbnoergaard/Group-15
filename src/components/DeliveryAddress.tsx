import React, { useEffect, useState } from "react";
import addressesData from "../assets/delivery.json";
import TermsAndConditionsPopup from "./TermsAndConditionsPopup.tsx";
import {useOrderForm} from "./UseOrderForm.tsx";

type Address = {
    country: string;
    city: string;
    continent: string;
    addressLine1: string;
};



interface DeliveryAddressProps {

    orderForm: ReturnType<typeof useOrderForm>; // You must import useOrderForm appropriately
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ orderForm }) => {
    const [preDefinedAddresses, setPreDefinedAddresses] = useState<Address[]>([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Populate pre-defined addresses from a local JSON file or any other source
        setPreDefinedAddresses(addressesData);
    }, []);

    const handleSelectDeliveryAddress = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAddressIndex(parseInt(event.target.value, 10));
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
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
                        value={orderForm.orderComment}
                        onChange={orderForm.handleOrderCommentChange}
                        placeholder="Any special instructions?"
                    />
                </div>
                <div className="form-checkbox">
                    <label>
                        <input type="checkbox" checked={orderForm.termsChecked} onChange={orderForm.handleCheckboxChange}/>
                        <span>I accept the terms & conditions</span>
                    </label>
                </div>
                <div className="form-checkbox">
                    <label>
                        <input type="checkbox" checked={orderForm.marketingChecked} onChange={orderForm.handleMarketingCheckboxChange}/>
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