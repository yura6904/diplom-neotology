import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFormOrder, deleteProdFromOrder } from '../../store/cartSlice';
import Cart from './Cart';

function CartContainer() {
    const cartData = useSelector(state => state.cartData)
    const [sumPrice, setSumPrice] = useState(0)
    const [order, setOrder] = useState({})
    const [userTelephone, setUserTelephone] = useState()
    const [userAddress, setUserAddress] = useState()
    const [userAgreement, setUserAgreement] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        cartData.cart.map((p, id) => {
            setSumPrice(sumPrice + p.sumPrice)
        })
    }, [])

    const formNewOrderHandler = () => {
        let newOrder = []
        newOrder.push({
            ids: [cartData.cart.map((c, id) => c.id)],
            sumPrice: sumPrice
        })
        let fullOrder = {
            products: newOrder,
            userInfo: {
                telephone: userTelephone,
                address: userAddress,
                agreement: userAgreement
            }
        }
        dispatch(asyncFormOrder(newOrder))
    }
    const deleteHandler = (id) => {
        dispatch(deleteProdFromOrder(id))
    }
    const onChangeTelephoneInput = (evt) => {
        setUserTelephone(evt.target.value)
    }
    const onChangeAdressInput = (evt) => {
        setUserAddress(evt.target.value)
    }
    const onChangeAgreementInput = (evt) => {
        setUserAgreement(evt.target.value === "on" ? true : false)
    }

    return (
        <Cart cartData={cartData} sumPrice={sumPrice} order={order}
        formNewOrderHandler={formNewOrderHandler} deleteHandler={deleteHandler}
        onChangeTelephoneInput={onChangeTelephoneInput} onChangeAdressInput={onChangeAdressInput}
        onChangeAgreementInput={onChangeAgreementInput} userAgreement={userAgreement} />
    );
}

export default CartContainer;




