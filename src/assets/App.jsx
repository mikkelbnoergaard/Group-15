//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import AddressForm from './AddressForm';

/*
const products = {
    "vitamin-c-500-250": { name: "Vitamin C 500mg", price: 12.99 },
    "kids-songbook": { name: "Kids Songbook", price: 7.99 },
    "sugar-cane-1kg": { name: "Sugar Cane 1kg", price: 4.99 },
    "goat": { name: "Goat", price: 199.99 },
};
*/

import productData from './product.json';
const itemList = productData;
console.log(productData);

const BasketItem = ({ item, onChangeQuantity, onRemoveItem, onToggleGiftWrap,onChangeRecurring }) => {
    const calculateItemDiscount = () => {
        if (item.quantity > 3) {
            // Assuming a 5% discount for the sake of example
            return (0.05 * item.price * item.quantity).toFixed(2);
        }
        return '0.00';
    };
    const itemDiscount = calculateItemDiscount();

    return (
        <div className="basket-item">
            <div>Name: {item.name}</div>
            <div>Price: ${item.price.toFixed(2)}</div>
            <div>Quantity:
                <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => onChangeQuantity(item.name, parseInt(e.target.value))}
                />
            </div>
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
                Total: ${ (item.price * item.quantity).toFixed(2) }
                { itemDiscount !== '0.00' && <div>Discount: -${ itemDiscount }</div> }
            </div>
            <button onClick={() => onRemoveItem(item.name)}>Remove Item</button>
        </div>
    );
};
const Basket = () => {
    const [items, setItems] = useState(itemList.map(item => ({
        ...item,
        name: item.name,
        price: item.price,
        recurring: ''
    })));

    const onChangeQuantity = (name, newQuantity) => {
        if (isNaN(newQuantity)) { newQuantity = 0;}
            setItems(prevItems => prevItems.map(item =>
                item.name === name ? {...item, quantity: newQuantity} : item
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
    const calculateDiscounts = (items) => {
        let discount = 0;
        let subtotal = 0;

        items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            // Assuming a rebate is applied per item for larger quantities
            if (item.quantity > 3) {
                discount += item.price * 0.05 * item.quantity; // Example: 5% rebate per item
            }
        });
        // 10% discount for orders over 300 DKK
        if (subtotal > 300) {
            discount += subtotal * 0.10;
        }

        return discount;
    };

    const getTotalAmount = () => {
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discount = calculateDiscounts(items);
        return {
            subtotal: subtotal.toFixed(2),
            discount: discount.toFixed(2),
            total: (subtotal - discount).toFixed(2)
        };
    };

    const { subtotal, discount, total } = getTotalAmount();

    return (
        <div>
            <div>Basket Subtotal: ${subtotal}</div>
            <div>Discounts: -${discount}</div>
            <div>Basket Total: ${total}</div>
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
            <AddressForm />
        </div>

    );
};







export default Basket;

