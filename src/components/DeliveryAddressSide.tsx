//import './BasketSide.css';


import DeliveryAddress from "./DeliveryAddress.tsx";
import {useNavigate} from "react-router-dom";
import { Address } from "./DeliveryAddress";
import './DeliveryAddress.css';
import {useState} from "react";


interface CustomerProps {

    totalAmount: number;
    onAddressSelected: (address: Address) => void;
}


const DeliveryAddressPage: React.FC<CustomerProps> = ({ onAddressSelected}) => {
    const [hasSelectedAddress, setHasSelectedAddress] = useState(false);
    const navigate = useNavigate();
    const handleAddressSelection = () => {

        setHasSelectedAddress(true);
    };

    const goToPaymentFormSide = () => {
        if (!hasSelectedAddress) {
            alert('Please select a delivery address before continuing.');
        } else {
            navigate('/PaymentFormPage');
        }
    };

    const goToAddressFormSide = () => {
        navigate('/AddressFormPage');
    }

    return (
        <div className={"page-column"}>
            <div className={"header-top"}>
                <img src={"https://i.imgur.com/J5OAFS3.png"}
                     style={{width: '120px', height: 'auto', borderRadius: '20px',}}/>
            </div>
            <ol id="progress-bar">
                <li className="step-done">Basket</li>
                <li className="step-done">Customer information</li>
                <li className="step-active">Delivery address</li>
                <li className="step-todo">Payment</li>
                <li className="step-todo">Summary</li>
            </ol>
            <div className="flex-container">
                <div className="right-side2">
                    <DeliveryAddress  onAddressSelected={onAddressSelected} onAddressPicked={handleAddressSelection}/>
                </div>
            </div>
            <div className="button-container">
                <button className={"button-left"} onClick={goToAddressFormSide}>Back</button>
                <button className={"button-right"} onClick={goToPaymentFormSide}>Continue</button>
            </div>
        </div>
    );
}

export default DeliveryAddressPage;