import { useState } from "react";

export const useOrderForm = () => {
    const [termsChecked, setTermsChecked] = useState(false);
    const [marketingChecked, setMarketingChecked] = useState(false);
    const [orderComment, setOrderComment] = useState('');

    const handleCheckboxChange = () => {
        setTermsChecked(!termsChecked);
    };

    const handleMarketingCheckboxChange = () => {
        setMarketingChecked(!marketingChecked);
    };

    const handleOrderCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOrderComment(e.target.value);
    };

    return {
        termsChecked,
        marketingChecked,
        orderComment,
        handleCheckboxChange,
        handleMarketingCheckboxChange,
        handleOrderCommentChange
    };
};