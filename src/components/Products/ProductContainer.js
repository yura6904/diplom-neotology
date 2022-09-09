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
        let newProdFromState = stateItems[stateItems.length - 1]
        //let changedProd = {...prod}
        let prodWasAdded = false
        let localCart = JSON.parse(window.localStorage.getItem('cart'))
        let updatedProdsArray = []
        if (localCart.length > 0) {
            for (let i = 0; i < localCart.length; i++) {
                if (newProdFromState.id === localCart[i].id){
                    localCart[i].count += newProdFromState.count
                    prodWasAdded = true
                }
                updatedProdsArray.push(localCart[i])
            }
            if (prodWasAdded === false) {
                updatedProdsArray.push(prod)
            }

        }
        else updatedProdsArray.push(prod)
        
        window.localStorage.removeItem('cart')
        window.localStorage.setItem(`cart`, JSON.stringify(updatedProdsArray))
        dispatch(setNewCart(updatedProdsArray))
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
