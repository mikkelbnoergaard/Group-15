import React from 'react';
import { useNavigate } from "react-router-dom";
import { AddressFields } from "./AddressForm";
import { useOrderForm } from "./UseOrderForm";

interface Item {
    name: string;
    price: number;
    quantity: number;
    ImageURL: string;
    giftWrap?: boolean;
    recurring?: string;
}

interface CustomerProps {
    items: Item[];
    totalAmount: number;
    addressInfo: AddressFields | null;
    orderForm: ReturnType<typeof useOrderForm>;
}

const RecietPage: React.FC<CustomerProps> = ({ items, totalAmount, addressInfo, orderForm }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/PaymentFormPage');
    };

    const handleSubmit = async () => {
        if (!orderForm.termsChecked) {
            alert('Please accept the terms & conditions to proceed.');
            return;
        }
        if (addressInfo !== null) {
            const response = await fetch('https://eowyyh7aavsptru.m.pipedream.net', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    addressInfo,
                    orderComment: orderForm.orderComment,
                    marketingChecked: orderForm.marketingChecked
                })
            });

            if (response.ok) {
                console.log("Submission successful");
                alert('Form submitted successfully!');
            } else {
                console.error('Submission failed');
            }
        } else {
            console.error('Address information is missing');
        }
    };

    return (
        <div className="page-column">
            <div className="header-top">
                <img src="https://i.imgur.com/J5OAFS3.png" style={{ width: '120px', height: 'auto', borderRadius: '20px' }} />
            </div>
            <ol id="progress-bar">
                <li className="step-done">Basket</li>
                <li className="step-done">Customer information</li>
                <li className="step-done">Delivery address</li>
                <li className="step-done">Payment</li>
                <li className="step-active">Receipt</li>
            </ol>
            <div className="content">
                <h3 style={{ textAlign: 'center' }}>Receipt</h3>
                <h3 style={{ textAlign: 'center' }}>Items</h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, textAlign: 'center' }}>
                    {items.filter(item => item.quantity > 0).map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                            {item.giftWrap && <span> (Gift Wrapped)</span>}
                        </li>
                    ))}
                </ul>
                <h3 style={{ textAlign: 'center' }}>Total Amount</h3>
                <p style={{ textAlign: 'center' }}>${totalAmount.toFixed(2)}</p>
                {addressInfo && (
                    <div>
                        <h3>Billing Address</h3>
                        <p>{addressInfo.name}</p>
                        <p>{addressInfo.addressLine1}</p>
                        <p>{addressInfo.addressLine2}</p>
                        <p>{addressInfo.zip} {addressInfo.city}</p>
                        <p>{addressInfo.country}</p>
                        <p>Phone: {addressInfo.phone}</p>
                        <p>Email: {addressInfo.email}</p>
                        {addressInfo.companyName && <p>Company: {addressInfo.companyName}</p>}
                        {addressInfo.companyVAT && <p>VAT: {addressInfo.companyVAT}</p>}
                    </div>
                )}
                {orderForm.orderComment && (
                    <div>
                        <h3>Order Comment</h3>
                        <p>{orderForm.orderComment}</p>
                    </div>
                )}
            </div>
            <div className="button-container">
                <button className="button-left" onClick={goBack}>Back</button>
                <button className="button-right" onClick={handleSubmit}>Submit Order</button>
            </div>
        </div>
    );
};

export default RecietPage;