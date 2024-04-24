import './BasketSide.css';
import {useNavigate} from "react-router-dom";
import React from "react";

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


const ReceiptPage:React.FC<CustomerProps> = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/PaymentFormPage');
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
                <li className="step-done">Delivery address</li>
                <li className="step-done">Payment</li>
                <li className="step-active">Receipt</li>
            </ol>
            <div className="right-side1">
                <h2> Orale du klarede den :) </h2>
            </div>
            <div className="button-container">
                <button className={"button-left"} onClick={goBack}>Back (test)</button>
            </div>
        </div>
    );
}

export default ReceiptPage;