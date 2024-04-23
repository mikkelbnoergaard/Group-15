import './BasketSide.css';
import React, {useState} from 'react';
import {AddressFields} from "./AddressForm";
import DeliveryAddress from "./DeliveryAddress.tsx";
import Total1 from "./Total1.tsx";
import {useNavigate} from "react-router-dom";

interface Item {
    name: string;
    price: number;
    quantity: number;
    ImageURL: string;
    giftWrap?: boolean;
    recurring?: string;
}
interface CustomerProps {
    items: Item[];
    totalAmount: number;
}


const DeliveryAddressPage:React.FC<CustomerProps> = ({items}) => {
    const [addressInfo] = useState<AddressFields | null>(null);

    const handleUpdateTotal = () => {};

    const navigate = useNavigate();

    const goToPaymentFormSide = () => {
        navigate('/PaymentFormPage');
    }
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
                <li className="step-done">Step 1</li>
                <li className="step-done">Step 2</li>
                <li className="step-active">Step 3</li>
                <li className="step-todo">Step 4</li>
                <li className="step-todo">Step 5</li>
            </ol>
            <div className="right-side1">
                <h2> Basket </h2>
                <Total1 items={items} onUpdateTotal={handleUpdateTotal}/>
            </div>
            <div className="right-side1">
                <DeliveryAddress items={items} addressInfo={addressInfo}/>
                <div className="button-container">
                    <button className={"button-left"} onClick={goToAddressFormSide}>Gå tilbage</button>
                    <button className={"button-right"} onClick={goToPaymentFormSide}>Gå til payment</button>
                </div>
            </div>
        </div>
    );
}

export default DeliveryAddressPage;