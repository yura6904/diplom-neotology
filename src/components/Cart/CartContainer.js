import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFormOrder, deleteProdFromOrder, formOrder } from '../../store/cartSlice';
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
        let price = 0
        cartData.cart.map((p, id) => {
            price += p.sumPrice
        })
        setSumPrice(price)
    }, [])

    const formNewOrderHandler = () => {
        let fullOrder = {
            owner: { 
                phone: userTelephone, 
                address: userAddress
            }, 
            items:[]
        }
        cartData.cart.map((p ,id) => {
            fullOrder.items.push({
                id: p.id,
                price: p.price,
                count: p.amount
            })
        })
        dispatch(formOrder(fullOrder))
        dispatch(asyncFormOrder(fullOrder))
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




