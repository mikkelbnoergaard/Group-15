import React, { useEffect, useState } from "react";
import addressesData from "../assets/delivery.json";
import {sendOrderData} from "../remote/handleOrder.tsx";
import {AddressFields} from "./AddressForm.tsx";
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

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({items, addressInfo}) => {
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
        setPreDefinedAddresses(addressesData);
        // Call the callback with the initial address if available
        if (addressesData.length > 0) {
            onAddressSelected(addressesData[0]);
        }
    }, [onAddressSelected]);

    const handleSelectDeliveryAddress = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newIndex = parseInt(event.target.value, 10);
        setSelectedAddressIndex(newIndex);
        // Call the callback with the newly selected address
        onAddressSelected(preDefinedAddresses[newIndex]);
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
                <div className="box-container">
                    {preDefinedAddresses.slice(0, 4).map((address, index) => (
                        <button key={index} className="box1" onClick={() => handleButtonClick(index)}>
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