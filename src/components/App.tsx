import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Basket from './BasketSide';
import CheckoutPage from "./AddressFormSide.tsx";
import DeliveryAddressPage from "./DeliveryAddressSide.tsx";
import PaymentFormPage from "./PaymentFormSide.tsx";
import ReceiptPage from "./ReceiptSide.tsx";
import { useOrderForm } from './UseOrderForm'; // Import the hook here
import { AddressFields } from "./AddressForm.tsx";
import { Address } from "./DeliveryAddress";
import {PaymentInformation} from "./PaymentForm.tsx"
type Item = {
    name: string;
    price: number;
    quantity: number;
    ImageURL: string;
    giftWrap?: boolean;
    recurring?: string;
    id: string;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string | null;
};

const App = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [CompanyVAT, setCompanyVAT] = useState<string>('');
    const [AddressInfo, setAddressInfo] = useState<AddressFields | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const orderForm = useOrderForm();  // Use the hook here and pass down where necessary
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInformation | null>(null);


    useEffect(() => {
        fetch('https://raw.githubusercontent.com/mikkelbnoergaard/Group-15/main/src/assets/product.json')
            .then(response => response.json())
            .then(data => setItems(data.map((item: Item) => ({
                ...item,
                quantity: 0,
                recurring: '',
                id: item.id || "default_id",
                currency: 'USD',
                rebateQuantity: item.rebateQuantity || 0,
                rebatePercent: item.rebatePercent || 0,
                upsellProductId: item.upsellProductId || null,
            }))))
            .catch(error => console.error(error));
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path={"/"} element={<Basket setTotalAmount={setTotalAmount} items={items} setItems={setItems} />} />
                    <Route path={"/AddressFormPage"} element={<CheckoutPage totalAmount={totalAmount} items={items} setCompanyVAT={setCompanyVAT} setAddressInfo={setAddressInfo}/>} />
                    <Route path={"/DeliveryAddressPage"} element={<DeliveryAddressPage orderForm={orderForm} totalAmount={totalAmount} items={items} onAddressSelected={setSelectedAddress}/>} />
                    <Route path={"/PaymentFormPage"} element={<PaymentFormPage totalAmount={totalAmount} items={items} CompanyVAT={CompanyVAT} onSavePaymentMethod={setPaymentInfo}/>} />
                    <Route path={"/RecieptPage"} element={<ReceiptPage totalAmount={totalAmount} items={items} orderForm={orderForm} addressInfo={AddressInfo} selectedAddress={selectedAddress} paymentInfo={paymentInfo} />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;