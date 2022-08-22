import { useSelector } from 'react-redux';
import Cart from './Cart';

function CartContainer() {
    const cartData = useSelector(state => state.cartData)

    return (
        <Cart cartData={cartData}/>
    );
}

export default CartContainer;




