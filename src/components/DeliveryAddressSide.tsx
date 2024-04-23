import './BasketSide.css';
import React, {useState} from 'react';
import AddressForm, {AddressFields} from "./AddressForm";
import DeliveryAddress from "./DeliveryAddress.tsx";
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

const DeliveryAddressPage:React.FC<CustomerProps> = ({items}) => {
    const [, setCompanyVAT] = useState('');

    const [addressInfo, setAddressInfo] = useState<AddressFields | null>(null);

    const handleSubmitAddress = (address: AddressFields) => {
        setAddressInfo(address); // Update the address info state
    }

    const handleUpdateTotal = () => {};

    return(
    <div className="right-side1">
        <DeliveryAddress items={items} addressInfo={addressInfo}/>
        <Total1 items={items} onUpdateTotal={handleUpdateTotal}/>
        <AddressForm
            onCompanyVATChange={setCompanyVAT}
            onSubmitAddress={handleSubmitAddress}
        />
    </div>
    );
}

export default DeliveryAddressPage;