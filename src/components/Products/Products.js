import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { asyncGetProductById } from '../../store/productSlice';
import Product from './Product/Product';

function Products(props) {
    const id = useLocation().state.id
    const [loading, setLoading] = useState(true)
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


    const addToCart = async (id) => {

    }

    return (
        <Product info={productInfo} addToCart={addToCart} isLoading={loading}/>
    );
}

export default Products;