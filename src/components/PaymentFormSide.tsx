import './BasketSide.css';
import PaymentForm from "./PaymentForm.tsx";
import Total1 from "./Total1.tsx";
import {useNavigate} from "react-router-dom";

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
}


const PaymentFormPage:React.FC<CustomerProps> = ({items, totalAmount,CompanyVAT}) => {


    const handleUpdateTotal = () => {};

    const navigate = useNavigate();

    const goToReceiptSide = () => {
        navigate('/ReceiptPage');
    }
    const goToDeliveryAddressSide = () => {
        navigate('/DeliveryAddressPage');
    }

    return (
        <div className={"page-column"}>
            <div className={"header-top"}>
                <img src={"https://i.imgur.com/J5OAFS3.png"}
                     style={{width: '120px', height: 'auto', borderRadius: '20px',}}/>
            </div>
            <ol id="progress-bar">
                <li className="step-done">Basket</li>
                <li className="step-done">Customer information</li>
                <li className="step-done">Delivery address</li>
                <li className="step-active">Payment</li>
                <li className="step-todo">Receipt</li>
            </ol>
            <div className="right-side1">
                <h2> Basket </h2>
                <Total1 items={items} onUpdateTotal={handleUpdateTotal}/>
                <h2> Payment</h2>
                <PaymentForm totalAmount={totalAmount} companyVAT={CompanyVAT}/>
            </div>
            <div className="button-container">
                <button className={"button-left"} onClick={goToDeliveryAddressSide}>Back</button>
                <button className={"button-right"} onClick={goToReceiptSide}>Continue</button>
            </div>
        </div>
    );
}

export default PaymentFormPage;