import {useEffect, useState} from "react";
import {fetchProductData} from "../components/fetchProductData.tsx";

export function useFetchProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProductData = async () => {
console.log('fetching data')
            const data = await fetchProductData();
            setProducts(data);
        }
        getProductData().then(() => setLoading(false)).catch((error) => setError(error));

    }, []);
    return {products, loading, error};
}