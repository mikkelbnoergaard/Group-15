import React, { useState } from "react";
import TermsAndConditionsPopup from "./TermsAndConditionsPopup";

type Address = {
  country: string;
  zip: string;
  city: string;
  continent: string;
  addressLine1: string;
};

const preDefinedAddresses: Address[] = [
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
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderComment, setOrderComment] = useState('');


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
        setShowPopup(true);
        return;
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
          <div className="form-row">
            <label htmlFor="order-comment">Order Comment:</label>
            <textarea
                id="order-comment"
                value={orderComment}
                onChange={(e) => setOrderComment(e.target.value)}
                placeholder="Any special instructions?"
            />
          </div>
          <div className= "form-checkbox">
            <label>
              <input type="checkbox" checked={termsChecked} onChange={handleCheckboxChange}/>
              I accept the terms & conditions
            </label>
            </div>
            <button type="button" onClick={() => setShowPopup(true)}>View Terms and Conditions</button>
            <div>
          </div>
          {/* Pop-up */}
          {showPopup && <TermsAndConditionsPopup onClose={closePopup}/>}
          {/* Din eksisterende form indhold fortsætter her */}
          <button type="submit">Submit</button>
        </form>
    );
};


export default DeliveryAddress;