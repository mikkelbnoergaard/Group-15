import React, { useState, useEffect, useMemo } from 'react';
import TermsAndConditionsPopup from "./TermsAndConditionsPopup.tsx";
import {useOrderForm} from "./UseOrderForm.tsx";

export interface PaymentInformation {
    method: string;
    giftCardAmount?: number;
    giftCardNumber?: string;
    mobilePayNumber?: string;
}

type PaymentFormProps = {
    totalAmount: number;
    companyVAT?: string;
    onSavePaymentMethod: (paymentInfo: PaymentInformation) => void;
    orderForm: ReturnType<typeof useOrderForm>;
};

const PaymentForm: React.FC<PaymentFormProps> = ({totalAmount, companyVAT,onSavePaymentMethod,orderForm}) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [giftCardAmount, setGiftCardAmount] = useState<string>('');
    const [giftCardNumber, setGiftCardNumber] = useState<string>('');
    const [mobilePayNumber, setMobilePayNumber] = useState<string>('');
    const [mobilePayNumberError, setMobilePayNumberError] = useState<string>('');
    const [isFullyCoveredByGiftCard, setIsFullyCoveredByGiftCard] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const giftAmount = parseFloat(giftCardAmount || '-1');
        setIsFullyCoveredByGiftCard(giftAmount >= totalAmount);
    }, [giftCardAmount, totalAmount]);

    useEffect(() => {
        if (paymentMethod) {
            savePaymentMethod();
        }
    }, [paymentMethod]);


    const isInvoiceAvailable = useMemo(() => {
        return !isFullyCoveredByGiftCard && !!companyVAT && companyVAT.trim() !== '' && companyVAT.length === 8;
    }, [isFullyCoveredByGiftCard, companyVAT]);

    const canUseGiftCardOnly = useMemo(() => {
        const giftAmount = parseFloat(giftCardAmount || '0');
        return giftAmount >= totalAmount;
    }, [giftCardAmount, totalAmount]);

    const savePaymentMethod = () => {
        const paymentInfo: PaymentInformation = {
            method: paymentMethod,
        };

        if (paymentMethod === 'giftCard') {
            paymentInfo.giftCardAmount = parseFloat(giftCardAmount);
            paymentInfo.giftCardNumber = giftCardNumber;
        } else if (paymentMethod === 'mobilePay' && !isFullyCoveredByGiftCard) {
            paymentInfo.mobilePayNumber = mobilePayNumber;
        }

        onSavePaymentMethod(paymentInfo);
    };

    const handlePaymentMethodClick = (method: string) => {
        setPaymentMethod(method);
    };

    const handleMobilePayNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 8) {
            setMobilePayNumber(value);
            if (value.length !== 8) {
                setMobilePayNumberError("Bobilepay number must be 8 digits");
            } else {
                setMobilePayNumberError("");
            }
        }
        if (value.length === 8) {
            setTimeout(() => savePaymentMethod(), 0);
        }
    };

    const handleNumericChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length < 8) {
            if (/^\d*$/.test(value)) {
                setter(value);
            }
        }
        setter(value);
        setTimeout(() => savePaymentMethod(), 0);
    };
    const buttonStyle = (method: string) => ({
        background: 'transparent',
        border: paymentMethod === method ? '2px solid black' : 'none',
        padding: 0
    });
    const closePopup = () => {
        setShowPopup(false);
    };


    return (
        <form>
            <div>
                {!canUseGiftCardOnly && (
                    <button type="button" onClick={() => handlePaymentMethodClick('mobilePay')}
                            style={buttonStyle('mobilePay')}>
                        <img src={"https://i.imgur.com/xnpVdCD.png"} alt="MobilePay"
                             style={{width: '75px', height: '75px', objectFit: 'contain'}}/>
                    </button>
                )}
                <button type="button" onClick={() => handlePaymentMethodClick('giftCard')}
                        style={buttonStyle('giftCard')}>
                    <img src={"https://i.imgur.com/9Zfikfo.png"} alt="Gift Card"
                         style={{width: '75px', height: '75px', objectFit: 'contain'}}/>
                </button>
                {isInvoiceAvailable && !canUseGiftCardOnly && (
                    <button type="button" onClick={() => handlePaymentMethodClick('invoice')}
                            style={buttonStyle('invoice')}>
                        <img src={"https://i.imgur.com/vKuWIyM.png"} alt="Invoice"
                             style={{width: '75px', height: '75px', objectFit: 'contain'}}/>
                    </button>
                )}
            </div>

            {paymentMethod === 'giftCard' && (
                <div>
                    <input
                        type="text"
                        value={giftCardAmount}
                        onChange={handleNumericChange(setGiftCardAmount)}
                        placeholder="Gift card amount"
                    />
                    <input
                        type="text"
                        value={giftCardNumber}
                        onChange={handleNumericChange(setGiftCardNumber)}
                        placeholder="Gift card number"
                    />
                </div>
            )}

            {paymentMethod === 'mobilePay' && !canUseGiftCardOnly && (
                <div>
                    <input
                        type="text"
                        value={mobilePayNumber}
                        onChange={handleMobilePayNumberChange}
                        placeholder="MobilePay number"
                    />
                    {mobilePayNumberError && <div style={{color: 'red'}}>{mobilePayNumberError}</div>}
                </div>
            )}

            {paymentMethod === 'invoice' && isInvoiceAvailable && (
                <div>
                </div>
            )}
            <div className="form-row">
                <label htmlFor="order-comment">Order Comment:</label>
                <textarea
                    id="order-comment"
                    value={orderForm.orderComment}
                    onChange={orderForm.handleOrderCommentChange}
                    placeholder="Any special instructions?"
                />
            </div>
            <div className="form-checkbox">
                <label>
                    <input type="checkbox"
                           checked={orderForm.termsChecked}
                           onChange={orderForm.handleCheckboxChange}
                    />
                    <span>I accept the terms & conditions</span>
                </label>
            </div>
            <div className="form-checkbox">
                <label>
                    <input type="checkbox"
                           checked={orderForm.marketingChecked}
                           onChange={orderForm.handleMarketingCheckboxChange}
                    />
                    <span>I agree to receive marketing emails</span>
                </label>
            </div>
            <button type="button" onClick={() => setShowPopup(true)}>View Terms and Conditions</button>
            {showPopup && <TermsAndConditionsPopup onClose={closePopup} />}
        </form>
    );
};

export default PaymentForm;