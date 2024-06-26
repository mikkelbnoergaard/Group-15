import './App.css';
import './PaymentForm.css';
import PaymentForm from "./PaymentForm.tsx";
import Total from "./Total.tsx";
import {useNavigate} from "react-router-dom";
import {PaymentInformation} from "./PaymentForm.tsx"
import React, {useState} from "react";
import {useOrderForm} from "./UseOrderForm.tsx";

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
    CompanyVAT: string;
    onSavePaymentMethod: (paymentInfo: PaymentInformation) => void;
}


const PaymentFormPage: React.FC<CustomerProps & { orderForm: ReturnType<typeof useOrderForm> }> = ({
                                                                                                       items,
                                                                                                       totalAmount,
                                                                                                       CompanyVAT,
                                                                                                       onSavePaymentMethod,
                                                                                                       orderForm
                                                                                                   }) => {
    const [paymentMethodSelected, setPaymentMethodSelected] = useState<boolean>(false);


    const handleUpdateTotal = () => {
    };


    const navigate = useNavigate();

    const goToReceiptSide = () => {
        if (paymentMethodSelected) {
            navigate('/ReceiptPage');
        } else {
            alert('Please select a payment method before continuing.');
        }
    };
    const handleSavePaymentMethod = (paymentInfo: PaymentInformation) => {
        onSavePaymentMethod(paymentInfo);
        setPaymentMethodSelected(!!paymentInfo.method);
    };
    const goToDeliveryAddressSide = () => {
        navigate('/DeliveryAddressPage');
    }
    const handlePress = async () => {
        if (!orderForm.termsChecked) {
            alert('Please accept the terms & conditions to proceed.');
            return;
        }
        goToReceiptSide()


    }
    return (
        <div className={"page-column-PFS"}>
            <div className={"header-top"}>
                <img src={"https://i.imgur.com/J5OAFS3.png"}
                     style={{width: '120px', height: 'auto', borderRadius: '20px',}}/>
            </div>
            <ol id="progress-bar">
                <li className="step-done">Basket</li>
                <li className="step-done">Customer information</li>
                <li className="step-done">Delivery address</li>
                <li className="step-active">Payment</li>
                <li className="step-todo">Summary</li>
            </ol>
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
            <div className="Payment-Form">
                <Total
                    items={items}
                    onUpdateTotal={handleUpdateTotal}/>
                <h2> Payment</h2>
                <PaymentForm
                    totalAmount={totalAmount}
                    companyVAT={CompanyVAT}
                    onSavePaymentMethod={handleSavePaymentMethod}
                    orderForm={orderForm}/>
            </div>
            <div className="button-container">
                <button className={"button-left"} onClick={goToDeliveryAddressSide}>Back</button>
                <button className={"button-right"} onClick={handlePress}>Continue</button>
            </div>
        </div>
    );
}

export default PaymentFormPage;