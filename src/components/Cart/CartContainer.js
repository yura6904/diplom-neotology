import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountCartContext } from '../../App';
import { asyncFormOrder, deleteProdFromOrder, formOrder } from '../../store/cartSlice';
import Cart from './Cart';

function CartContainer() {
    const cartData = useSelector(state => state.cartData)
    const [sumPrice, setSumPrice] = useState(0)
    const [userTelephone, setUserTelephone] = useState()
    const [userAddress, setUserAddress] = useState()
    const [userAgreement, setUserAgreement] = useState(false)
    const dispatch = useDispatch()
    const [cartProducts, setCartProducts] = useState([])
    
    const {countCart, changeCount} = useContext(CountCartContext)

    useEffect(() => {
        let price = 0
        let prods = []

        for (let i = 0; i < window.localStorage.length; i++) {
            prods.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(i))))
        }
        setCartProducts(prods)

        if (prods.length > 0) {
            prods.map((p, id) => {
                price += p.price * p.count
            })
            setSumPrice(price)
        }
        else {
            setSumPrice(0)
        }
        
    }, [])
    useEffect(() => {
        changeCount(window.localStorage.length)
    })

    const formNewOrderHandler = () => {
        let items = []
        for (let i = 0; i < window.localStorage.length; i++) {
            items.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(i))))
        }
        let fullOrder = {
            owner: { 
                phone: userTelephone, 
                address: userAddress
            }, 
            items: items
        }
        cartData.cart.map((p ,id) => {
            fullOrder.items.push({
                id: p.id,
                price: p.price,
                count: p.count
            })
        })
        dispatch(formOrder(fullOrder))
        dispatch(asyncFormOrder(fullOrder))
    }
    const deleteHandler = (id, prodId, size) => {
        let indexToDelete = ''
        let items = []
        for (let i = 0; i < window.localStorage.length; i++) {
            let item = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)))
            if ((item.id !== prodId) || item.size.size !== size) {
                items.push(item)
            }
            else {
                indexToDelete = i
                setSumPrice(sumPrice - item.price * item.count)
            }
        }
        setCartProducts(items)        
        dispatch(deleteProdFromOrder(id))
        window.localStorage.removeItem(window.localStorage.key(indexToDelete))
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
        <Cart cartData={cartProducts ? cartProducts : []} sumPrice={sumPrice}
            formNewOrderHandler={formNewOrderHandler} deleteHandler={deleteHandler}
            onChangeTelephoneInput={onChangeTelephoneInput} onChangeAdressInput={onChangeAdressInput}
            onChangeAgreementInput={onChangeAgreementInput} userAgreement={userAgreement} />
    );
}

export default CartContainer;




