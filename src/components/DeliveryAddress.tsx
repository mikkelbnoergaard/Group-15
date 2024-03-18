import React, { useState } from "react";

type Address = {
  country: string;
  city: string;
  continent: string;
  addressLine1: string;
};

const preDefinedAddresses: Address[] = [
  {
    country: "Mali",
    city: "Timbuctoo",
    continent: "Africa",
    addressLine1: "Ahmed Baba Institute"
  },
  {
    country: "Togo",
    city: "Tchebebe",
    continent: "Africa",
    addressLine1: "Epp Tchebebe Sud"
  },
  {
    country: "Germany",
    city: "Würstenhof",
    continent: "Europe",
    addressLine1: "Würststrasse 19"
  },
];

const DeliveryAddress: React.FC = () => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [termsChecked, setTermsChecked] = useState(false);

    const handleSelectDeliveryAddress = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedIndex = parseInt(event.target.value);
      setSelectedAddressIndex(selectedIndex);
    };

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
      if (!termsChecked) {
        alert('Please accept the terms & conditions.');
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
            <div className={"terms-conditions-layout"}>
            <label>
              <input type="checkbox" checked={termsChecked} onChange={handleCheckboxChange}/>
              I accept the terms & conditions
            </label>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
    );
};


export default DeliveryAddress;