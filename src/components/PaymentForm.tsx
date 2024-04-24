import React, { useState, useEffect, useMemo } from 'react';

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
};

const PaymentForm: React.FC<PaymentFormProps> = ({totalAmount, companyVAT,onSavePaymentMethod}) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [giftCardAmount, setGiftCardAmount] = useState<string>('');
    const [giftCardNumber, setGiftCardNumber] = useState<string>('');
    const [mobilePayNumber, setMobilePayNumber] = useState<string>('');
    const [mobilePayNumberError, setMobilePayNumberError] = useState<string>('');
    const [isFullyCoveredByGiftCard, setIsFullyCoveredByGiftCard] = useState<boolean>(false);

    useEffect(() => {
        const giftAmount = parseFloat(giftCardAmount || '0'); // Use '0' as fallback
        setIsFullyCoveredByGiftCard(giftAmount >= totalAmount);
    }, [giftCardAmount, totalAmount]);


    const isInvoiceAvailable = useMemo(() => {
        return !isFullyCoveredByGiftCard && !!companyVAT && companyVAT.trim() !== '' && companyVAT.length === 8;
    }, [isFullyCoveredByGiftCard, companyVAT]);

    const canUseGiftCardOnly = useMemo(() => {
        const giftAmount = parseFloat(giftCardAmount || '0');
        return giftAmount >= totalAmount;
    }, [giftCardAmount, totalAmount]);

    const savePaymentMethod = () => {
        // Initialize paymentInfo with the method property
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
        // Call savePaymentMethod after state update
        setTimeout(() => savePaymentMethod(), 0);
    };

    const handleMobilePayNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 8) {
            setMobilePayNumber(value);
            if (value.length !== 8) {
                setMobilePayNumberError("The mobilepay number must be 8 digits");
            } else {
                setMobilePayNumberError(""); // Ryd fejlen, når betingelsen er opfyldt
            }
        }
        if (value.length === 8) {
            setTimeout(() => savePaymentMethod(), 0);
        }
    };

    const handleNumericChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length < 8) {
            if (/^\d*$/.test(value)) { // Tjekker om værdien kun indeholder tal
                setter(value);
            }
        }
        setter(value); // This sets either giftCardAmount or giftCardNumber based on the caller
        // Call savePaymentMethod after state update
        setTimeout(() => savePaymentMethod(), 0);
    };
    const buttonStyle = (method: string) => ({
        background: 'transparent',
        border: paymentMethod === method ? '2px solid black' : 'none', // Conditional border
        padding: 0
    });


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

            {/* Conditional input rendering */}
            {paymentMethod === 'giftCard' && (
                <div>
                    <input
                        type="text"
                        value={giftCardAmount}
                        onChange={handleNumericChange(setGiftCardAmount)}
                        placeholder="Enter gift card amount"
                    />
                    <input
                        type="text"
                        value={giftCardNumber}
                        onChange={handleNumericChange(setGiftCardNumber)}
                        placeholder="Enter gift card number"
                    />
                </div>
            )}

            {paymentMethod === 'mobilePay' && !canUseGiftCardOnly && (
                <div>
                    <input
                        type="text"
                        value={mobilePayNumber}
                        onChange={handleMobilePayNumberChange}
                        placeholder="Enter MobilePay number"
                    />
                    {mobilePayNumberError && <div style={{color: 'red'}}>{mobilePayNumberError}</div>}
                </div>
            )}

            {paymentMethod === 'invoice' && isInvoiceAvailable && (
                <div>
                </div>
            )}
        </form>
    );
};

export default PaymentForm;