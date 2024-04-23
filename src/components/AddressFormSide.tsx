import './BasketSide.css';
import React, {useState} from 'react';
import AddressForm, {AddressFields} from "./AddressForm";
import Total1 from "./Total1.tsx";
import {useNavigate} from "react-router-dom";
import './buttons.css';

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


const CheckoutPage:React.FC<CustomerProps> = ({items}) => {
    const [, setCompanyVAT] = useState('');
    const [, setAddressInfo] = useState<AddressFields | null>(null);

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
            <div className="right-side1">
                <h2> Basket </h2>
                <Total1 items={items} onUpdateTotal={handleUpdateTotal}/>

                <h2> Customer information </h2>
                <AddressForm
                    onCompanyVATChange={setCompanyVAT}
                    onSubmitAddress={handleSubmitAddress}
                />
                <div className="button-container">
                    <button className={"button-left"} onClick={goToBasketSide}>Gå Tilbage</button>
                    <button className={"button-right"} onClick={goToDeliveryAddressSide}>Gå til leveringssted</button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;