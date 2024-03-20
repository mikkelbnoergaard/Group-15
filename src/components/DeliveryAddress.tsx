import React, { useState, useEffect } from "react";
import addressesData from "../assets/delivery.json"; // Import the JSON file

type Address = {
    country: string;
    zip: string;
    city: string;
    continent: string;
    addressLine1: string;
};

const DeliveryAddress: React.FC = () => {
    const [preDefinedAddresses, setPreDefinedAddresses] = useState<Address[]>([]);

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
            {/* Similar checks for continent and zip code */}
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
            <div>
                <label>
                    Zip Code:
                    {preDefinedAddresses.length > 0 ? (
                        <span>{preDefinedAddresses[selectedAddressIndex].zip}</span>
                    ) : (
                        <span>Loading...</span>
                    )}
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DeliveryAddress;
