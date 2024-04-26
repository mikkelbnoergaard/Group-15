import './BasketSide.css';

import AddressForm, {AddressFields} from "./AddressForm";
import Total1 from "./Total1.tsx";
import {useNavigate} from "react-router-dom";
import './buttons.css';
import './AddressFormSide.css';
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
    setCompanyVAT: (vat: string) => void;
    setAddressInfo: React.Dispatch<React.SetStateAction<AddressFields | null>>;
}


const CheckoutPage:React.FC<CustomerProps> = ({items,setCompanyVAT, setAddressInfo} ) => {


    const handleSubmitAddress = (address: AddressFields) => {
        setAddressInfo(address); // Update the address info state
    };
    const handleUpdateTotal = () => {};

    const navigate = useNavigate();

    const goToDeliveryAddressSide = () => {
        navigate('/DeliveryAddressPage');
    }
    const goToBasketSide = () => {
        navigate('/');
    }

    return (
        <div className={"page-column"}>
            <div className={"header-top"}>
                <img src={"https://i.imgur.com/J5OAFS3.png"}
                     style={{width: '120px', height: 'auto', borderRadius: '20px',}}/>
            </div>
            <ol id="progress-bar">
                <li className="step-done">Basket</li>
                <li className="step-active">Customer information</li>
                <li className="step-todo">Delivery address</li>
                <li className="step-todo">Payment</li>
                <li className="step-todo">Summary</li>
            </ol>
            <div className={"Address-Form-Row"}>
                <div className="right-side1">
                    <AddressForm
                        onCompanyVATChange={setCompanyVAT}
                        onSubmitAddress={handleSubmitAddress}
                    />
                </div>
                <Total1 items={items} onUpdateTotal={handleUpdateTotal}/>
            </div>
            <div className={"button-container"}>
                <button className={"button-left"} onClick={goToBasketSide}>Back</button>
                <button className={"button-right"} onClick={goToDeliveryAddressSide}>Continue</button>
            </div>
        </div>
    );
}

export default CheckoutPage;