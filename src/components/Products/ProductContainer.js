import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { addToCart } from '../../store/cartSlice';
import { asyncGetProductById } from '../../store/productSlice';
import Product from './Product';
import { useNavigate } from "react-router-dom";


function ProductContainer(props) {
    const navigate = useNavigate()
    const id = useLocation().state.id
    const [loading, setLoading] = useState(true)
    const [size, setSize] = useState(0)
    const [amountOfProd, setAmountOfProd] = useState(1)

    const dispatch = useDispatch()
    const productInfo = useSelector(state => state.productData.product)

    useEffect(() => {
        async function fetchData() {
            await setLoading(true)
            await dispatch(asyncGetProductById(id))
            await setLoading(false)
        }
        fetchData()
    }, [])

    const addProdToCart = (prod) => {
        dispatch(addToCart(prod))
        let newProd = {...prod}
        for (let i = 0; i < window.localStorage.length; i++) {
            if (prod.id === (JSON.parse(window.localStorage.getItem(window.localStorage.key(i))).id)) {
                newProd.amount = JSON.parse(window.localStorage.getItem(window.localStorage.key(i))).amount + prod.amount
                window.localStorage.removeItem(window.localStorage.key(i))
            }
        }
        window.localStorage.setItem(`prod-${prod.id}`, JSON.stringify(newProd))
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

    return (
        <Product info={productInfo} addProdToCart={addProdToCart}
            isLoading={loading} chooseSizeHandler={chooseSizeHandler}
            size={size} incrementHandler={incrementHandler}
            decrementHandler={decrementHandler} amountOfProd={amountOfProd}
            routeChange={routeChange} />
    );
}

export default ProductContainer;