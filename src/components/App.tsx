import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Basket from './BasketSide';
import CheckoutPage from "./AddressFormSide.tsx";
import productData from '../assets/product.json';
import DeliveryAddressPage from "./DeliveryAddressSide.tsx";
import PaymentFormPage from "./PaymentFormSide.tsx";
import ReceiptPage from "./ReceiptSide.tsx";
import {AddressFields} from "./AddressForm.tsx";


const itemList = productData;
type Item = {
    name: string;
    price: number;
    quantity: number;
    ImageURL: string;
    giftWrap?: boolean;
    recurring?: string; // Should also be optional here if it's optional in ProductItem
    id: string;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string | null;
};
const App = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [CompanyVAT, setCompanyVAT] = useState<string>('');
    const [, setAddressInfo] = useState<AddressFields | null>(null);

    const [items, setItems] = useState<Item[]>(itemList.map(item => ({
        ...item,
        quantity: 0,
        recurring: '', // Provide a default value if undefined
        id: item.id || "default_id", // Provide a default id or generate one
        currency: 'USD',
        rebateQuantity: item.rebateQuantity || 0,
        rebatePercent: item.rebatePercent || 0,
        upsellProductId: item.upsellProductId || null,
    })));

    return(
        <Router>
            <div>
                <Routes>
                    <Route path={"/"} element={<Basket  setTotalAmount={setTotalAmount} items={items} setItems={setItems} />} />
                    <Route path={"/AddressFormPage"} element={<CheckoutPage totalAmount={totalAmount} items={items} setCompanyVAT={setCompanyVAT} setAddressInfo={setAddressInfo}/>} />
                    <Route path={"/DeliveryAddressPage"} element={<DeliveryAddressPage totalAmount={totalAmount} items={items} />} />
                    <Route path={"/PaymentFormPage"} element={<PaymentFormPage totalAmount={totalAmount} items={items} CompanyVAT={CompanyVAT}/>} />
                    <Route path={"/ReceiptPage"} element={<ReceiptPage totalAmount={totalAmount} items={items} />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;