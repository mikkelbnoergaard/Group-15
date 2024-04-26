import React, { useEffect, useState } from "react";
import addressesData from "../assets/delivery.json";


export type Address = {
    country: string;
    city: string;
    continent: string;
    addressLine1: string;
    image: string;
};

interface DeliveryAddressProps {
    onAddressSelected: (address: Address) => void;
    onAddressPicked: () => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ onAddressSelected, onAddressPicked}) => {
    const [preDefinedAddresses, setPreDefinedAddresses] = useState<Address[]>([]);

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
        onAddressPicked();
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

            </div>
        </div>
    );
};

export default DeliveryAddress;