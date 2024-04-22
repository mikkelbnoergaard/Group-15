interface Items {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string | null;
    giftWrap?: boolean;
    quantity?: number;
    ImageURL: string;
}

interface User {
    deliveryCountry: string;
    name: string;
    address: {
        zipCode: string;
        city: string;
        addressLine1: string;
    };
    phoneNumber: string;
    emailAddress: string;
    companyName?: string;
    companyVAT?: string;
}

export function sendOrderData(url: string, items: Items[], user: User, orderComment: string, marketingChecked: boolean): void {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const data = {
        items,
        user,
        orderComment,
        marketingChecked
    };

    const options: RequestInit = {
        method: "POST",
        headers,
        mode: "cors",
        body: JSON.stringify(data),
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => console.log(json))
        .catch(error => console.error('There was a problem with the fetch operation: ', error));
}