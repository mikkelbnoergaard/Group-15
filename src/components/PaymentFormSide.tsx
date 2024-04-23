import './BasketSide.css';
import React, {useState} from 'react';
import PaymentForm from "./PaymentForm.tsx";
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


const PaymentFormPage:React.FC<CustomerProps> = ({items, totalAmount}) => {
    const [companyVAT] = useState('');

    const handleUpdateTotal = () => {};

    const navigate = useNavigate();

    const goToRecietSide = () => {
        navigate('/DeliveryAddressPage');
    }

    return (
        <div className={"page-column"}>
            <div className="right-side1">
                <h2> Basket </h2>
                <Total1 items={items} onUpdateTotal={handleUpdateTotal}/>
                <h2> Payment</h2>
                <PaymentForm totalAmount={totalAmount} companyVAT={companyVAT}/>
                <button onClick={goToRecietSide}>Se din kvittering</button>
            </div>
        </div>
    );
}

export default PaymentFormPage;