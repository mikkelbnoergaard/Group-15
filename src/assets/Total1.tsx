
import React from "react";

const Total1 = ({ items }) => {

    const calculateDiscounts = (items) => {
        let discount = 0;
        let subtotal = 0;

        items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            if (item.quantity > 3) {
                discount += item.price * 0.05 * item.quantity;
            }
        });
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

    const amountNeededForDiscount = 300 - subtotal;
    const discountMessage = amountNeededForDiscount > 0 ? `Add $${amountNeededForDiscount.toFixed(2)} more to your basket for a 10% discount!` : null;


    return (
        <form>
            <div className="subtotal-container">
                <div className="label">Basket Subtotal:</div>
                <div className="amount">${subtotal}</div>
            </div>
            <div className="discount-container">
                <div className="label">Discounts: </div>
                <div className="amount">-${discount}</div>
            </div>
            <div className="total-container">
                <div className="label"> <b> Basket Total:</b></div>
                <div className="amount"> <b> ${total}</b></div>
            </div>
            {discountMessage && <div style={{ color: 'green', marginTop: '10px' }}>{discountMessage}</div>}
        </form>
    );
}

export default Total1;