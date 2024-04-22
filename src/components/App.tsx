import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Basket from './BasketSide';
import CheckoutPage from "./CustomerInformationSide";
import productData from '../assets/product.json';

const itemList = productData;

const App = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [items, setItems] = useState(itemList.map(item => ({
        ...item,
        name: item.name,
        price: item.price,
        quantity: 0,
        ImageURL: item.ImageURL,
        recurring: '',
        giftWrap: item.giftWrap
    })));

    return(
        <Router>
            <div>
                <Routes>
                    <Route path={"/"} element={<Basket totalAmount={totalAmount} setTotalAmount={setTotalAmount} items={items} setItems={setItems} />} />
                    <Route path={"/Checkout"} element={<CheckoutPage totalAmount={totalAmount} setTotalAmount={setTotalAmount} items={items} setItems={setItems} />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;