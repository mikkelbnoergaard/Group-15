
import React from "react";

const Total1 = ({ items }) => {

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

    const amountNeededForDiscount = 300 - subtotal;
    const discountMessage = amountNeededForDiscount > 0 ? `Add $${amountNeededForDiscount.toFixed(2)} more to your basket for a 10% discount!` : null;


    return (
        <form>
        <div>
            <div>Basket Subtotal: ${subtotal}</div>
            <div>Discounts: -${discount}</div>
            <div>Basket Total: ${total}</div>
            {discountMessage && <div style={{ color: 'green', marginTop: '10px' }}>{discountMessage}</div>}
        </div>
        </form>
    );

}

export default Total1;