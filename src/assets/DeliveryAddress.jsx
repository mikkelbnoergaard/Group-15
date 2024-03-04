import React, { useState } from "react";

const preDefinedAddresses = [
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

const DeliveryAddress = () => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
      const { name, value } = event.target;

      // Implement your validation logic here (optional)
      setErrors({
        ...errors,
        [name]: "", // Clear errors on input change
      });
    };

    const handleSelectDeliveryAddress = (event) => {
      const selectedIndex = parseInt(event.target.value);
      setSelectedAddressIndex(selectedIndex);
    };

    const handleZipBlur = async (e) => {
      // Implement your zip code validation logic here (optional)
      // Update the error state if necessary
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // Implement your form submission logic here, including using the selected address
      const selectedAddress = preDefinedAddresses[selectedAddressIndex];
      console.log("Selected address:", selectedAddress); // Example usage
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
        {errors["zip"] && <div className="error">{errors["zip"]}</div>}

        {/* Display selected address information */}
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

        {/* ... other address fields based on your needs */}
        <button type="submit">Submit</button>
      </form>
    );
  };


export default DeliveryAddress;