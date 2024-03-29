//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import productData from './product.json';
import AddressForm from "./AddressForm.tsx";
import DeliveryAddress from "./DeliveryAddress.tsx";
import Total1 from "./Total1.tsx";
const itemList = productData;
console.log(productData);

interface ProductItem {
    name: string;
    price: number;
    quantity: number;
    ImageURL: string;
    giftWrap?: boolean;
    recurring?: string;
}
interface BasketItemProps {
    item: ProductItem;
    onChangeQuantity: (name: string, quantity: number) => void;
    onRemoveItem: (name: string) => void;
    onToggleGiftWrap: (name: string) => void;
    onChangeRecurring: (name: string, schedule: string) => void;
}



const BasketItem: React.FC<BasketItemProps> = ({ item, onChangeQuantity, onRemoveItem, onToggleGiftWrap, onChangeRecurring }) => {

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
                     style={{ width: '200px', height: 'auto', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}/>
            <div className="product-details">
                <div><b>{item.name}</b>

                </div>
            <div>Price: {item.price}
            </div>
            <div>Quantity:
                <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => onChangeQuantity(item.name, parseInt(e.target.value))}
                    style={{width:"24px"}}
                />
            </div>
                {discountMessage && <div style={{ color: 'red', marginTop: '10px' }}>{discountMessage}</div>}
            <div>
                <label>
                    Gift Wrap:
                    <input
                        type="checkbox"
                        checked={item.giftWrap}
                        onChange={() => onToggleGiftWrap(item.name)}
                    />
                </label>
            </div>
            <label>
                Recurring Order:
                <select
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
                 <b>${ (item.price * item.quantity).toFixed(2) } </b>
                     { itemDiscount !== '0.00' && <div>Discount: -${ itemDiscount }</div> }
            </div>
                <div>
                </div>
            </div>
             <div className="details-right">
                 <div className="delete-button">
                     <button onClick={() => onRemoveItem(item.name)}>
                         <img src={"src/Images/Trashcan.jpg.webp"}
                         style={{ width: '30px', height: 'auto', borderRadius: '20px', }}/>
                     </button>
                 </div>
             </div>
            </div>
        </div>
    );
};

const Basket = () => {
    const [items, setItems] = useState(itemList.map(item => ({
        ...item,
        name: item.name,
        price: item.price,
        quantity: 0,
        ImageURL: item.ImageURL,
        recurring: '',
        giftWrap: item.giftWrap
    })));

    const onChangeQuantity = (name: string, newQuantity: number) => {
        if (isNaN(newQuantity)) { newQuantity = 0;}
            setItems(prevItems => prevItems.map(item =>
                item.name === name ? {...item, quantity: newQuantity} : item
            ));
    };

    const onRemoveItem = (name: string) => {
        setItems(prevItems => prevItems.filter(item => item.name !== name));
    };

    const onToggleGiftWrap = (name: string) => {
        setItems(prevItems => prevItems.map(item =>
            item.name === name ? { ...item, giftWrap: !item.giftWrap } : item
        ));
    };
    const onChangeRecurring = (name: string, schedule: string) => {
        setItems(prevItems => prevItems.map(item =>
            item.name === name ? { ...item, recurring: schedule } : item
        ));
    };
    const handleCheckout = () => {
        console.log('Checkout button clicked');
    };


    return (
        <div className="basket-layout">
            <div className={"basket-items"}>
                <h2>Your Basket</h2>
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
                {/* Insert the AddressForm here */}
            </div>
            <div className="right-side2">
                <div className="right-side1">
                    <Total1 items={items}/>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
                <div className="right-side1">
                <AddressForm />
                </div>
                <DeliveryAddress/>
            </div>
        </div>
    );
};

export default Basket;

