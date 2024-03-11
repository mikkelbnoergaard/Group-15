import React from "react";

interface Item {
    price: number;
    quantity: number;
}

interface Total1Props {
    items: Item[];
}

const Total1: React.FC<Total1Props> = ({ items }) => {
    const calculateDiscounts = (items: Item[]): number => {
        let discount = 0;
        let subtotal = 0;

        items.forEach((item) => {
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
        const subtotal = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        const discount = calculateDiscounts(items);
        return {
            subtotal: subtotal.toFixed(2),
            discount: discount.toFixed(2),
            total: (subtotal - discount).toFixed(2),
        };
    };
    const { subtotal, discount, total } = getTotalAmount();

    const amountNeededForDiscount = 300 - parseFloat(subtotal);
    const discountMessage =
        amountNeededForDiscount > 0
            ? `Add $${amountNeededForDiscount.toFixed(2)} more to your basket for a 10% discount!`
            : null;

    return (
        <form>
            <div>
                <div>Basket Subtotal: ${subtotal}</div>
                <div>Discounts: -${discount}</div>
                <div>Basket Total: ${total}</div>
                {discountMessage && (
                    <div style={{ color: "green", marginTop: "10px" }}>
                        {discountMessage}
                    </div>
                )}
            </div>
        </form>
    );
};

export default Total1;