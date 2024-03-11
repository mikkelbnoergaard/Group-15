import React, { useState } from "react";

type Address = {
  country: string;
  zip: string;
  city: string;
  continent: string;
  addressLine1: string;
};

const preDefinedAddresses:Address[] = [
  {
    country: "Mali",
    zip: "00000",
    city: "Timbuctoo",
    continent: "Africa",
    addressLine1: "Ahmed Baba Institute"
  },
  {
    country: "Togo",
    zip: "00000",
    city: "Tchebebe",
    continent: "Africa",
    addressLine1: "Epp Tchebebe Sud"
  },
  {
    country: "Germany",
    zip: "01067",
    city: "Würstenhof",
    continent: "Europe",
    addressLine1: "Würststrasse 19"
  },
];

const DeliveryAddress: React.FC = () => {
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
            <span>{preDefinedAddresses[selectedAddressIndex].addressLine1}</span>
          </label>
        </div>
        <div>
          <label>
            Continent:
            <span>{preDefinedAddresses[selectedAddressIndex].continent}</span>
          </label>
        </div>
        <div>
          <label>
            Zip Code:
            <span>{preDefinedAddresses[selectedAddressIndex].zip}</span>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };


export default DeliveryAddress;