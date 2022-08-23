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