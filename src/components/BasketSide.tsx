//import logo from './logo.svg';
import './BasketSide.css';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { fetchProductData } from './fetchProductData';
import Total1 from "./Total1.tsx";
import {useNavigate} from 'react-router-dom';
import './ProgressBar.scss'

interface ProductItem {
    name: string;
    price: number;
    quantity: number;
    ImageURL: string;
    giftWrap?: boolean;
    recurring?: string; // Notice the optional `recurring`
    id: string;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string | null;
}

interface BasketItemProps {
    item: ProductItem;
    onChangeQuantity: (name: string, quantity: number) => void;
    onRemoveItem: (name: string) => void;
    onToggleGiftWrap: (name: string) => void;
    onChangeRecurring: (name: string, schedule: string) => void;
}



const BasketItem: React.FC<BasketItemProps> = ({
                                                   item,
                                                   onChangeQuantity,
                                                   onRemoveItem,
                                                   onToggleGiftWrap,
                                                   onChangeRecurring
                                               }) => {

    const calculateItemDiscount = () => {
        if (item.quantity > 3) {
            return (0.05 * item.price * item.quantity).toFixed(2);
        }
        return '0.00';
    };
    const itemDiscount = calculateItemDiscount();

    const discountMessage = item.quantity === 3 ? "You only need one more to get a 5% discount!" : null;

    return (
        <div className="basket-items">
            <div className="basket-Elements">
                <img src={item.ImageURL}
                     alt={item.name}
                     style={{width: '200px', height: 'auto'}}/>
                <div className="product-details">
                    <div><b>{item.name}</b>

                    </div>
                    <div>Price: ${item.price}
                    </div>
                    <div>Quantity:
                        <input
                            className="quantity-input"
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => onChangeQuantity(item.name, parseInt(e.target.value))}
                            style={{width: "24px"}}
                        />
                    </div>
                    {discountMessage && <div style={{color: 'red', marginTop: '10px'}}>{discountMessage}</div>}
                    <div>
                        <label>
                            Gift Wrap:
                            <input
                                className={"spacing-giftwrap"}
                                type="checkbox"
                                checked={item.giftWrap}
                                onChange={() => onToggleGiftWrap(item.name)}
                                style={{width: "24px"}}
                            />
                        </label>
                    </div>
                    <label>
                        Recurring Order:
                        <select
                            className="quantity-input"
                            value={item.recurring || ''}
                            onChange={(e) => onChangeRecurring(item.name, e.target.value)}
                        >
                            <option value="">No</option>
                            <option value="1 month">1 Month</option>
                            <option value="6 months">6 Months</option>
                            <option value="1 year">1 Year</option>
                        </select>
                    </label>
                    <div>
                        <b>${(item.price * item.quantity).toFixed(2)} </b>
                        {itemDiscount !== '0.00' && <div>Discount: -${itemDiscount}</div>}
                    </div>
                    <div>
                    </div>
                </div>
                <div className="details-right">
                    <div className="delete-button">
                        <button onClick={() => onRemoveItem(item.name)}>
                            <img src={"https://i.imgur.com/3ZyQkuC.png"}
                                 style={{width: '30px', height: 'auto', borderRadius: '20px',}}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


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

type BasketProps = {
    items: Item[];
    setItems: Dispatch<SetStateAction<Item[]>>;
    setTotalAmount: Dispatch<SetStateAction<number>>;
};


const Basket: React.FC<BasketProps> = ({ items, setItems, setTotalAmount }) => {
    const [, setProductData] = useState([]);

    useEffect(() => {
        const getProductData = async () => {
            const data = await fetchProductData();
            setProductData(data);
        }
        getProductData().then(() => console.log("Product data fetched"));
    }, []);

    const navigate = useNavigate();

    const goToAddressFormSide = () => {
        navigate('/AddressFormPage');
    }
    const onChangeQuantity = (name: string, newQuantity: number) => {
        if (isNaN(newQuantity)) {
            newQuantity = 0;
        }
        setItems(prevItems => prevItems.map(item =>
            item.name === name ? {...item, quantity: newQuantity} : item
        ));
    };

    const handleUpdateTotal = (newTotal: React.SetStateAction<number>) => {
        setTotalAmount(newTotal);
    };

    const onRemoveItem = (name: string) => {
        setItems(prevItems => prevItems.filter(item => item.name !== name));
    };

    const onToggleGiftWrap = (name: string) => {
        setItems(prevItems => prevItems.map(item =>
            item.name === name ? {...item, giftWrap: !item.giftWrap} : item
        ));
    };
    const onChangeRecurring = (name: string, schedule: string) => {
        setItems(prevItems => prevItems.map(item =>
            item.name === name ? {...item, recurring: schedule} : item
        ));
    };

    return (
        <div className={"page-column"}>
            <div className={"header-top"}>
                <img src={"https://i.imgur.com/J5OAFS3.png"}
                     style={{width: '120px', height: 'auto', borderRadius: '20px',}}/>
            </div>
            <ol id="progress-bar">
                <li className="step-active">Basket</li>
                <li className="step-todo">Customer information</li>
                <li className="step-todo">Delivery address</li>
                <li className="step-todo">Payment</li>
                <li className="step-todo">Summary</li>
            </ol>
            <div className="basket-layout">
                <div className={"basket-items2"}>
                    {items.map((item, index) => (
                        <BasketItem
                            key={index}
                            item={item}
                            onChangeQuantity={onChangeQuantity}
                            onRemoveItem={onRemoveItem}
                            onToggleGiftWrap={onToggleGiftWrap}
                            onChangeRecurring={onChangeRecurring}
                        />
                    ))}
                </div>
                <div className="right-side2">
                    <div className="right-side1 special-class">
                        <Total1 items={items} onUpdateTotal={handleUpdateTotal}/>
                        <button onClick={goToAddressFormSide}>Go to checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basket;

