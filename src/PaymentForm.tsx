import React, { useState, ChangeEvent } from 'react';

type PaymentFormProps = {
    totalAmount: number; // assuming totalAmount is a number
    companyVAT?: string; // assuming companyVAT is an optional string
};

const PaymentForm: React.FC<PaymentFormProps> = ({ totalAmount, companyVAT }) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [giftCardAmount, setGiftCardAmount] = useState<string>('');
    const [giftCardNumber, setGiftCardNumber] = useState<string>('');
    const [mobilePayNumber, setMobilePayNumber] = useState<string>('');

    const handlePaymentMethodChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setPaymentMethod(event.target.value);
    };


    const isInvoiceAvailable = (): boolean => {
        return !!companyVAT && companyVAT.trim() !== '';
    };

    const canUseGiftCardOnly = (): boolean => {
        return parseFloat(giftCardAmount) > totalAmount;
    };

    return (
        <form>
            <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                <option value="mobilePay">MobilePay</option>
                <option value="giftCard">Gift Card</option>
                {isInvoiceAvailable() && <option value="invoice">Invoice</option>}
            </select>

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
                </div>
            )}

        </form>
    );
};

export default PaymentForm;
