import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountCartContext } from '../../App';
import { asyncFormOrder, deleteProdFromOrder, formOrder } from '../../store/cartSlice';
import { asyncGetProductById } from '../../store/productSlice';
import store from '../../store/store';

import Cart from './Cart';

function CartContainer() {
    const cartData = useSelector(state => state.cartData)
    const productData = useSelector(state => state.productData)
    const [sumPrice, setSumPrice] = useState(0)
    const [userTelephone, setUserTelephone] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [userAgreement, setUserAgreement] = useState(false)
    const [cartProducts, setCartProducts] = useState([])
    const [warnings, setWarnings] = useState([])
    const dispatch = useDispatch()

    const {countCart, changeCount} = useContext(CountCartContext)

    useEffect(() => {
        changeCount(JSON.parse(window.localStorage.getItem('cart')).length)
    })
   
    useEffect(() => {
        (async () => {
            let prods = []
            let warns = []
            let price = 0
            
            let cart = JSON.parse(window.localStorage.getItem('cart')).length > 0 ? 
                JSON.parse(window.localStorage.getItem('cart')) :
                cartData.cart

            for (let i = 0; i < cart.length; i++) {
                await dispatch(asyncGetProductById(cart[i].id))
                let actualProd = stateChange() 
                price += actualProd.price * cart[i].count

                if (actualProd.price !== cart[i].price) {
                    warns.push(`Цена товар ${cart[i].title} поменялась, актуальная цена - ${actualProd.price}`)
                    cart[i].price = actualProd.price
                }
                prods.push(cart[i])
            }
            setWarnings(warns)
            setSumPrice(price)
            setCartProducts(prods)
            
        })()
    }, [])

    function select(state) {
        console.log(state.productData.product)
        return state.productData.product
    }
      
    function stateChange() {
        let previousValue = productData
        let currentValue = select(store.getState())
        
        if (previousValue !== currentValue) {
            return currentValue
        }
        return previousValue
    }
      
    const formNewOrderHandler = () => {
        let localItems = JSON.parse(window.localStorage.getItem('cart')) //cartData.cart
        let orderItems = []

        localItems.map((i, id) => 
            orderItems.push(
                {
                    id: i.id,
                    price: i.price,
                    count: i.count
                }
            )
        )

        let fullOrder = {
            owner: { 
                phone: userTelephone, 
                address: userAddress
            }, 
            items: orderItems
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
        let localItems = JSON.parse(window.localStorage.getItem('cart'))//cartData.cart
        let items = []
        for (let i = 0; i < localItems.length; i++) {
            let item = localItems[i]
            if ((item.id !== prodId) || item.size.size !== size) {
                items.push(item)
            }
            else {
                setSumPrice(sumPrice - item.price * item.count)
            }
        }
        setCartProducts(items)        
        dispatch(deleteProdFromOrder(id))
        window.localStorage.removeItem('cart')//cartData.cart
        window.localStorage.setItem('cart', JSON.stringify(items))//cartData.cart
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

    const unsubscribe = store.subscribe(stateChange)
    unsubscribe()

    return (
        <Cart cartData={cartProducts ? cartProducts : []} sumPrice={sumPrice} warnings={warnings}
            formNewOrderHandler={formNewOrderHandler} deleteHandler={deleteHandler}
            onChangeTelephoneInput={onChangeTelephoneInput} onChangeAdressInput={onChangeAdressInput}
            onChangeAgreementInput={onChangeAgreementInput} userAgreement={userAgreement} countCart={countCart}
            userTelephone={userTelephone} userAddress={userAddress}/>
    );
}

export default CartContainer;