import './BasketSide.css';
import {useState} from 'react';
import AddressForm, {AddressFields} from "./AddressForm";
import DeliveryAddress from "./DeliveryAddress.tsx";
import PaymentForm from "./PaymentForm.tsx";


const CheckoutPage = ({items, totalAmount}) => {
    const [companyVAT, setCompanyVAT] = useState('');
    const [addressInfo, setAddressInfo] = useState<AddressFields | null>(null);

    const handleSubmitAddress = (address: AddressFields) => {
        setAddressInfo(address); // Update the address info state
    };

    return (
        <div className={"page-column"}>
            <div className="right-side1">
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