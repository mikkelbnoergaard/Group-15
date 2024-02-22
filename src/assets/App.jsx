//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


// Simulate the products database
const products = {
    "vitamin-c-500-250": { name: "Vitamin C 500mg", price: 12.99 },
    "kids-songbook": { name: "Kids Songbook", price: 7.99 },
    "sugar-cane-1kg": { name: "Sugar Cane 1kg", price: 4.99 },
    "goat": { name: "Goat", price: 199.99 },
};

// Your hardcoded item list
const itemList = [
    { product: products["vitamin-c-500-250"], quantity: 2, giftWrap: false },
    { product: products["kids-songbook"], quantity: 1, giftWrap: true },
    { product: products["sugar-cane-1kg"], quantity: 2, giftWrap: false },
    { product: products["goat"], quantity: 1, giftWrap: false}
];

const BasketItem = ({ item, onChangeQuantity, onRemoveItem, onToggleGiftWrap,onChangeRecurring }) => {
    return (
        <div className="basket-item">
            <div>Name: {item.product.name}</div>
            <div>Price: ${item.product.price.toFixed(2)}</div>
            <div>Quantity:
                <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => onChangeQuantity(item.product.name, parseInt(e.target.value))}
                />
            </div>
            <div>
                <label>
                    Gift Wrap:
                    <input
                        type="checkbox"
                        checked={item.giftWrap}
                        onChange={() => onToggleGiftWrap(item.product.name)}
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
                Totale:${item.product.price*item.quantity}
            </div>
            <button onClick={() => onRemoveItem(item.product.name)}>Remove Item</button>
        </div>
    );
};

const Basket = () => {
    const [items, setItems] = useState(itemList.map(item => ({
        ...item,
        name: item.product.name,
        price: item.product.price,
        recurring: ''
    })));

    const onChangeQuantity = (name, newQuantity) => {
        setItems(prevItems => prevItems.map(item =>
            item.name === name ? { ...item, quantity: newQuantity } : item
        ));
    };

    const onRemoveItem = (name) => {
        setItems(prevItems => prevItems.filter(item => item.name !== name));
    };

    const onToggleGiftWrap = (name) => {
        setItems(prevItems => prevItems.map(item =>
            item.name === name ? { ...item, giftWrap: !item.giftWrap } : item
        ));
    };
    const onChangeRecurring = (name, schedule) => {
        setItems(prevItems => prevItems.map(item =>
            item.name === name ? { ...item, recurring: schedule } : item
        ));
    };

    const getTotalAmount = () => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <h2>Your Basket</h2>
            {items.map((item, index) => (
                <BasketItem
                    key={index} // Changed to index because name might not be unique
                    item={item}
                    onChangeQuantity={onChangeQuantity}
                    onRemoveItem={onRemoveItem}
                    onToggleGiftWrap={onToggleGiftWrap}
                    onChangeRecurring={onChangeRecurring}
                />

            ))}
            <div>Basket total: ${getTotalAmount()}</div>
        </div>
    );
};

export default Basket;

