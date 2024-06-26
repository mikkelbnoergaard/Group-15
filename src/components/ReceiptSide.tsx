import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AddressFields} from "./AddressForm";
import {useOrderForm} from "./UseOrderForm";
import {Address} from "./DeliveryAddress";
import {PaymentInformation} from "./PaymentForm.tsx";
import './App.css';
import './Receipt.css';
import './buttons.css';


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
    selectedAddress: Address | null;
    orderForm: ReturnType<typeof useOrderForm>;
    paymentInfo: PaymentInformation | null;
}

const ReceiptPage: React.FC<CustomerProps> = ({items, totalAmount, addressInfo, selectedAddress, orderForm}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState("");


    const goBack = () => {
        navigate('/PaymentFormPage');
    };


    const handleSubmit = async () => {
        setIsLoading(true)
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
                setIsLoading(false)
                console.log("Submission successful");
                setAlert("Form submitted successfully!")
            } else {
                setIsLoading(false)
                console.error('Submission failed');
                setAlert("Form submission failed!")
            }
    };

    return (
        <div className="page-column-BS">
            {isLoading ? (
                <div className="overlay">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <>

                    <div className="header-top">
                        <img src="https://i.imgur.com/J5OAFS3.png"
                             style={{width: '120px', height: 'auto', borderRadius: '20px'}}/>
                    </div>
                    <ol id="progress-bar">
                        <li className="step-done">Basket</li>
                        <li className="step-done">Customer information</li>
                        <li className="step-done">Delivery address</li>
                        <li className="step-done">Payment</li>
                        <li className="step-active">Summary</li>
                    </ol>
                    <h2 style={{textAlign: 'center'}}>Summary </h2>
                    <h3 style={{textAlign: 'center'}}>Items</h3>
                    <ul style={{listStyleType: 'none', paddingLeft: 0, textAlign: 'center'}}>
                        {items.filter(item => item.quantity > 0).map((item, index) => (
                            <li key={index}>
                                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                                {item.giftWrap && <span> - (Gift Wrapped)</span>}
                                {item.recurring && <span> - (Recurring: {item.recurring})</span>}
                            </li>
                        ))}
                    </ul>
                    <h3 style={{textAlign: 'center'}}>Total Amount</h3>
                    <p style={{textAlign: 'center'}}>${totalAmount.toFixed(2)}</p>

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
                    {selectedAddress && (
                        <div>
                            <h3>Delivery Address</h3>
                            <p>{selectedAddress.addressLine1}</p>
                            <p>{selectedAddress.city}, {selectedAddress.country}</p>
                            <p>Continent: {selectedAddress.continent}</p>
                        </div>
                    )}
                    {orderForm.orderComment && (
                        <div>
                            <h3>Order Comment</h3>
                            <p>{orderForm.orderComment}</p>
                        </div>
                    )}
                    <div className="button-container">
                        <button className="button-left" onClick={goBack}>Back</button>
                        <button className="button-right" onClick={handleSubmit}>Submit Order</button>
                    </div>
                    {alert !== "" && (<div className={'alert-modal'}>
                                    <p>{alert}</p>
                                    <button  className="close" onClick={() => setAlert("")}>Close</button>
                    </div>)}

                </>
            )}
        </div>
    );
};

export default ReceiptPage;