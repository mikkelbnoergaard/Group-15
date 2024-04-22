import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Basket from './BasketSide';
import CheckoutPage from "./CustomerInformationSide";
import productData from '../assets/product.json';


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
                    <Route path={"/Checkout"} element={<CheckoutPage totalAmount={totalAmount} items={items} />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;