import './BasketSide.css';

import AddressForm, {AddressFields} from "./AddressForm";
import {useNavigate} from "react-router-dom";
import './buttons.css';
import './AddressFormSide.css';
import React from "react";


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
    setCompanyVAT: (vat: string) => void;
    setAddressInfo: React.Dispatch<React.SetStateAction<AddressFields | null>>;
    addressInfo: AddressFields | null;
}


const CheckoutPage: React.FC<CustomerProps> = ({setCompanyVAT, setAddressInfo, addressInfo}) => {


    const handleSubmitAddress = (address: AddressFields) => {
        setAddressInfo(address);
    };

    const navigate = useNavigate();

    const goToDeliveryAddressSide = () => {
        if (addressInfo?.zip == null) {
            alert("Missing zip")
            return
        }
        if (addressInfo?.city == null) {
            alert("Missing City")
            return
        }
        if (addressInfo?.addressLine1 == null) {
            alert("Missing address")
            return
        }
        if (addressInfo?.name == null) {
            alert("Missing Name")
            return
        }
        if (addressInfo?.phone == null) {
            alert("Missing Phone")
            return
        }
        if (addressInfo?.email == null) {
            alert("Missing Email")
            return
        } else {
            navigate('/DeliveryAddressPage');
        }
    }
    const goToBasketSide = () => {
        navigate('/');
    }

    return (
        <div className={"page-background"}>
            <div className={"page-column"}>
                <div className={"header-top"}>
                    <img src={"https://i.imgur.com/J5OAFS3.png"}
                         style={{width: '120px', height: 'auto', borderRadius: '20px',}}/>
                </div>
                <ol id="progress-bar">
                    <li className="step-done">Basket</li>
                    <li className="step-active">Customer information</li>
                    <li className="step-todo">Delivery address</li>
                    <li className="step-todo">Payment</li>
                    <li className="step-todo">Summary</li>
                </ol>
                <div className="AddressFormColumn">
                    <AddressForm
                        onCompanyVATChange={setCompanyVAT}
                        onSubmitAddress={handleSubmitAddress}
                    />
                </div>
                <div className={"button-container"}>
                    <button className={"button-left"} onClick={goToBasketSide}>Back</button>
                    <button className={"button-right"} onClick={goToDeliveryAddressSide}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;