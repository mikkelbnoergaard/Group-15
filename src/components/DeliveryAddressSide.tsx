//import './BasketSide.css';
import React, {useState} from 'react';
import {AddressFields} from "./AddressForm";
import DeliveryAddress from "./DeliveryAddress.tsx";
import {useNavigate} from "react-router-dom";
import { useOrderForm } from './UseOrderForm';
import { Address } from "./DeliveryAddress";
import './DeliveryAddress.css';

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
    onAddressSelected: (address: Address) => void;
}


const DeliveryAddressPage: React.FC<CustomerProps & { orderForm: ReturnType<typeof useOrderForm> }> = ({items, orderForm,onAddressSelected}) => {

    const navigate = useNavigate();
    const handlePress = async () => {
        if (!orderForm.termsChecked) {
            alert('Please accept the terms & conditions to proceed.');
            return;
        }
    goToPaymentFormSide()


    }

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
                <li className="step-done">Basket</li>
                <li className="step-done">Customer information</li>
                <li className="step-active">Delivery address</li>
                <li className="step-todo">Payment</li>
                <li className="step-todo">Summary</li>
            </ol>
            <div className="flex-container">
                <div className="right-side2">
                    <DeliveryAddress orderForm={orderForm} onAddressSelected={onAddressSelected}/>
                </div>
            </div>
            <div className="button-container">
                <button className={"button-left"} onClick={goToAddressFormSide}>Back</button>
                <button className={"button-right"} onClick={handlePress}>Continue</button>
            </div>
        </div>
    );
}

export default DeliveryAddressPage;