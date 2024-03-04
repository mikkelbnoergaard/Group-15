//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const products = {
    "vitamin-c-500-250": { name: "Vitamin C 500mg", price: 12.99 },
    "kids-songbook": { name: "Kids Songbook", price: 7.99 },
    "sugar-cane-1kg": { name: "Sugar Cane 1kg", price: 4.99 },
    "goat": { name: "Goat", price: 199.99 },
};

const itemList = [
    { product: products["vitamin-c-500-250"], quantity: 2, giftWrap: false, ImageURL: "https://www.sensi2live.com/media/catalog/product/cache/5c82f07296e102476ab8c67f96f42fcf/b/i/big_essentials_vitamin-c-500-mg.png"},
    { product: products["kids-songbook"], quantity: 1, giftWrap: true, ImageURL: "https://gigglesandjoy.com/wp-content/uploads/2018/01/books.png"},
    { product: products["sugar-cane-1kg"], quantity: 2, giftWrap: false, ImageURL: "https://www.bhg.com/thmb/dGVkgUEAOrdxCWcM9x79Tbp95kA=/4000x0/filters:no_upscale():strip_icc()/How-to-Plant-and-Grow-Sugar-Cane-965303384-2fdac181359d44c185dfa7988fc181a8.jpg"},
    { product: products["goat"], quantity: 1, giftWrap: false, ImageURL: "https://png.pngtree.com/png-clipart/20230411/original/pngtree-goat-cartoon-white-transparent-png-image_9047560.png"}
];

const BasketItem = ({ item, onChangeQuantity, onRemoveItem, onToggleGiftWrap,onChangeRecurring }) => {

    return (
        <div className="basket-items">
            <div className="basket-Elements">
                <img src={item.ImageURL}                                                                                       
                     alt={item.product.name}                                                                                   
                     style={{ width: '200px', height: 'auto', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}/>
            <div className="product-details">
                <div><b>{item.product.name}</b>

                </div>
            <div>Price: {item.product.price}
            </div>
            <div>Quantity:
                <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    style={{width:"24px"}}
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
            </div>
                <div>
                </div>
                <b>${item.product.price*item.quantity}</b>
            </div>
             <div className="details-right">
                 <div className="delete-button">
                     <button onClick={() => onRemoveItem(item.product.name)}>
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
        name: item.product.name,
        price: item.product.price,
        Image: item.product.Image,
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
            <div>Basket Subtotal: ${subtotal}</div>
            <div>Discounts: -${discount}</div>
            <div>Basket Total: ${total}</div>
        </div>

    );
};

export default Basket;
