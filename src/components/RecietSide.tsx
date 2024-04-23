import './BasketSide.css';
import {useNavigate} from "react-router-dom";

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
}


const RecietPage:React.FC<CustomerProps> = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/DeliveryAddressPage');
    }

    return (
        <div className={"page-column"}>
            <div className={"header-top"}>
                <img src={"https://i.imgur.com/J5OAFS3.png"}
                     style={{width: '120px', height: 'auto', borderRadius: '20px',}}/>
            </div>
            <div className="right-side1">
                <h2> Orale du klarede den :) </h2>
                <div className="button-container">
                    <button className={"button-left"} onClick={goBack}>Se din kvittering</button>
                </div>
            </div>
        </div>
    );
}

export default RecietPage;