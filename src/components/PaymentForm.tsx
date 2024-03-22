import React, { useState } from 'react';

type PaymentFormProps = {
    totalAmount: number;
    companyVAT?: string;
};

const PaymentForm: React.FC<PaymentFormProps> = ({ totalAmount, companyVAT }) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [giftCardAmount, setGiftCardAmount] = useState<string>('');
    const [giftCardNumber, setGiftCardNumber] = useState<string>('');
    const [mobilePayNumber, setMobilePayNumber] = useState<string>('');

    const isInvoiceAvailable = (): boolean => {
        return !!companyVAT && companyVAT.trim() !== '';
    };

    const canUseGiftCardOnly = (): boolean => {
        return parseFloat(giftCardAmount) > totalAmount;
    };

    const handlePaymentMethodClick = (method: string) => {
        setPaymentMethod(method);
        // Reset other payment inputs when changing the payment method
        setGiftCardAmount('');
        setGiftCardNumber('');
        setMobilePayNumber('');
    };

    return (
        <form>
            {/* Payment method buttons */}
            <div>
                <button type="button" onClick={() => handlePaymentMethodClick('mobilePay')}
                        style={{ background: 'transparent', border: 'none', padding: 0 }}>
                    <img src={"src/assets/mobilpay.png"} alt="MobilePay"
                         style={{ width: '75px', height: '75px', objectFit: 'contain' }}/>
                </button>
                <button type="button" onClick={() => handlePaymentMethodClick('giftCard')}
                        style={{ background: 'transparent', border: 'none', padding: 0 }}>
                    <img src={"src/assets/giftcard.jpeg"} alt="Gift Card"
                         style={{ width: '75px', height: '75px', objectFit: 'contain' }}/>
                </button>
                {isInvoiceAvailable() && (
                    <button type="button" onClick={() => handlePaymentMethodClick('invoice')}
                            style={{ background: 'transparent', border: 'none', padding: 0 }}>
                        <img src={"src/assets/invoice.png"} alt="Invoice"
                             style={{ width: '75px', height: '75px', objectFit: 'contain' }}/>
                    </button>
                )}
            </div>

            {/* Conditional input rendering */}
            {paymentMethod === 'giftCard' && (
                <div>
                    <input
                        type="text"
                        value={giftCardAmount}
                        onChange={(e) => setGiftCardAmount(e.target.value)}
                        placeholder="Enter gift card amount"
                    />
                    <input
                        type="text"
                        value={giftCardNumber}
                        onChange={(e) => setGiftCardNumber(e.target.value)}
                        placeholder="Enter gift card number"
                    />
                </div>
            )}

            {paymentMethod === 'mobilePay' && !canUseGiftCardOnly() && (
                <input
                    type="text"
                    value={mobilePayNumber}
                    onChange={(e) => setMobilePayNumber(e.target.value)}
                    placeholder="Enter MobilePay number"
                />
            )}

            {paymentMethod === 'invoice' && isInvoiceAvailable() && (
                <div>
                    {/* Invoice payment inputs go here, if necessary */}
                    {/* You can replicate the structure used for the other methods */}
                </div>
            )}

            {/* Submit button or additional form elements */}
            {/* ... */}
        </form>
    );
};

export default PaymentForm;