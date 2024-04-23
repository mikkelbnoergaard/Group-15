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

    return (
        <div className={"page-column"}>
            <div className="right-side1">
                <h2> Basket </h2>
                <Total1 items={items} onUpdateTotal={handleUpdateTotal}   />
            </div>
            <div className="right-side1">
                <DeliveryAddress items={items} addressInfo={addressInfo}/>
                <button onClick={goToPaymentFormSide}>Gå til payment</button>
            </div>
        </div>
    );
}

export default DeliveryAddressPage;