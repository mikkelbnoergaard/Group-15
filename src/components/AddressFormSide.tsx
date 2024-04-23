import './BasketSide.css';
import React, {useState} from 'react';
import AddressForm, {AddressFields} from "./AddressForm";
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

    return (
        <div className={"page-column"}>
            <div className="right-side1">
                <h2> Basket </h2>
                <Total1 items={items} onUpdateTotal={handleUpdateTotal}/>

                <h2> Customer information </h2>
                <AddressForm
                    onCompanyVATChange={setCompanyVAT}
                    onSubmitAddress={handleSubmitAddress}
                />
                <button onClick={goToDeliveryAddressSide}>Gå til leveringssted</button>
            </div>
        </div>
    );
}

export default CheckoutPage;