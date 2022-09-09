import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { addToCart, setNewCart } from '../../store/cartSlice';
import { asyncGetProductById } from '../../store/productSlice';
import Product from './Product';
import { useNavigate } from "react-router-dom";
import store from '../../store/store';


function ProductContainer(props) {
    const navigate = useNavigate()
    const id = useLocation().state.id
    const [loading, setLoading] = useState(true)
    const [size, setSize] = useState(0)
    const [amountOfProd, setAmountOfProd] = useState(1)

    const dispatch = useDispatch()
    const productInfo = useSelector(state => state.productData.product)
    const cartData = useSelector(state => state.cartData)


    useEffect(() => {
        async function fetchData() {
            await setLoading(true)
            await dispatch(asyncGetProductById(id))
            await setLoading(false)
        }
        fetchData()
    }, [])

    function select(state) {
        console.log(state.cartData.cart)
        return state.cartData.cart
    }
      
    function stateChange() {
        let previousValue = cartData //состояние до рендера
        let currentValue = select(store.getState()) //состояние после запроса
        
        if (previousValue !== currentValue) {
            return currentValue
        }
        return previousValue
    }

    const addProdToCart = (prod) => {
        //подписываемся на изменение корзины
        dispatch(addToCart(prod))
        //поменялось, значит меняем локалстор
        let stateItems = stateChange()
        let changedProd = {...prod}
        let newCart = []
        let prodWasAdded = false
        let localCart = JSON.parse(window.localStorage.getItem('cart'))

        if (stateItems.length > 1) {
            for (let i = 0; i < stateItems.length; i++) {
                if (i !== stateItems.length - 1) {
                    if (prod.id === (cartData.cart[i].id)) {
                        if (prod.size.size === stateItems[i].size.size) {
                            let newCount = stateItems[i].count + prod.count
                            changedProd.count = newCount
                            newCart.push(changedProd)
                            prodWasAdded = true
                            continue
                        }
                        else {
                            newCart.push(stateItems[i])
                            continue
                        }
                    }
                    newCart.push(stateItems[i])
                }
                else if (prodWasAdded === false) {
                    newCart.push(stateItems[i])
                }
            }
        }
        else {
            newCart.push(prod)
        }
        let result = newCart.concat(localCart)
        
        window.localStorage.removeItem('cart')
        window.localStorage.setItem(`cart`, JSON.stringify(result))
        dispatch(setNewCart(result))
    }
    
    const chooseSizeHandler = (prod) => {
        setSize(prod)
    }
    const incrementHandler = () => {
        setAmountOfProd(amountOfProd + 1)
    }
    const decrementHandler = () => {
        if (amountOfProd > 1)
            setAmountOfProd(amountOfProd - 1)
    }
    const routeChange = () =>{ 
        navigate('/cart')
    }

    const unsubscribe = store.subscribe(stateChange)
    unsubscribe()
    return (
        <Product info={productInfo} addProdToCart={addProdToCart}
            isLoading={loading} chooseSizeHandler={chooseSizeHandler}
            size={size} incrementHandler={incrementHandler}
            decrementHandler={decrementHandler} amountOfProd={amountOfProd}
            routeChange={routeChange} />
    );
}

export default ProductContainer;