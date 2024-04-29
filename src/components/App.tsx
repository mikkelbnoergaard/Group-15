import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Basket from './BasketSide';
import CheckoutPage from "./AddressFormSide.tsx";
import DeliveryAddressPage from "./DeliveryAddressSide.tsx";
import PaymentFormPage from "./PaymentFormSide.tsx";
import ReceiptPage from "./ReceiptSide.tsx";
import {useOrderForm} from './UseOrderForm';
import {AddressFields} from "./AddressForm.tsx";
import {Address} from "./DeliveryAddress";
import {PaymentInformation} from "./PaymentForm.tsx"
import {useFetchProduct} from "../Hooks/UseFetchProduct.ts";

type Item = {
    name: string;
    price: number;
    quantity: number;
    ImageURL: string;
    giftWrap?: boolean;
    recurring?: string;
    id: string;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string | null;
};

const App = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [CompanyVAT, setCompanyVAT] = useState<string>('');
    const [AddressInfo, setAddressInfo] = useState<AddressFields | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const orderForm = useOrderForm();
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInformation | null>(null);

    const {products, loading, error} = useFetchProduct();

    useEffect(() => {
        if (loading || error) {
            return;
        }
        if (products.length > 0) {
            setItems(prevItems => {
                if (prevItems.length === 0) {
                    return products.map((product: Item) => ({
                        ...product,
                        quantity: 0,
                        recurring: '',
                        id: product.id || "default_id",
                        currency: 'USD',
                        rebateQuantity: product.rebateQuantity || 0,
                        rebatePercent: product.rebatePercent || 0,
                        upsellProductId: product.upsellProductId || null,
                    }));
                }
                return prevItems;
            });
        }
    }, [loading, error, products]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path={"/"}
                           element={<Basket
                               setTotalAmount={setTotalAmount}
                               items={items}
                               setItems={setItems}/>}/>

                    <Route path={"/AddressFormPage"}
                           element={<CheckoutPage
                               totalAmount={totalAmount}
                               items={items}
                               setCompanyVAT={setCompanyVAT}
                               setAddressInfo={setAddressInfo}
                               addressInfo={AddressInfo}/>}/>

                    <Route path={"/DeliveryAddressPage"}
                           element={<DeliveryAddressPage
                               totalAmount={totalAmount}
                               onAddressSelected={setSelectedAddress}/>}/>

                    <Route path={"/PaymentFormPage"}
                           element={<PaymentFormPage
                               totalAmount={totalAmount}
                               items={items}
                               CompanyVAT={CompanyVAT}
                               onSavePaymentMethod={setPaymentInfo}
                               orderForm={orderForm}/>}/>

                    <Route path={"/ReceiptPage"}
                           element={<ReceiptPage
                               totalAmount={totalAmount}
                               items={items}
                               orderForm={orderForm}
                               addressInfo={AddressInfo}
                               selectedAddress={selectedAddress}
                               paymentInfo={paymentInfo}/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;