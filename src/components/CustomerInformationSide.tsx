import './BasketSide.css';
import React, {useState} from 'react';
import AddressForm, {AddressFields} from "./AddressForm";
import DeliveryAddress from "./DeliveryAddress.tsx";
import PaymentForm from "./PaymentForm.tsx";
import Total1 from "./Total1.tsx";

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


const CheckoutPage:React.FC<CustomerProps> = ({items, totalAmount}) => {
    const [companyVAT, setCompanyVAT] = useState('');
    const [addressInfo, setAddressInfo] = useState<AddressFields | null>(null);

    const handleSubmitAddress = (address: AddressFields) => {
        setAddressInfo(address); // Update the address info state
    };
    const handleUpdateTotal = () => {};

    return (
        <div className={"page-column"}>
            <div className="right-side1">
                <h2> Basket </h2>
                <Total1 items={items} onUpdateTotal={handleUpdateTotal}   />

                <h2> Customer information </h2>
                <AddressForm
                    onCompanyVATChange={setCompanyVAT}
                    onSubmitAddress={handleSubmitAddress}
                />
                <h2> Payment</h2>
                <PaymentForm totalAmount={totalAmount} companyVAT={companyVAT}/>
            </div>
            <div className="right-side1">
                <DeliveryAddress items={items} addressInfo={addressInfo}/>
            </div>
        </div>
    );
}

export default CheckoutPage;