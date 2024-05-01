export const fetchProductData = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/mikkelbnoergaard/Group-15/Development_backend/src/assets/product.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}