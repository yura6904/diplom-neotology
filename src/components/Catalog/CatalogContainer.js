
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetIndexData, asyncGetMoreItems,asyncGetCategoryProd,
        asyncGetCategories } from '../../store/indexSlice';
import CatalogPage from './CatalogPage';

function CatalogContainer() {
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

    const dispatch = useDispatch() 
    const indexData = useSelector((state) => state.indexData)

    useEffect(() => {
        getAll()
        getCategories()
    }, [])

    const getCategories = async () => {
        await dispatch(asyncGetCategories())
    }
    const getAll = async () => {
        await dispatch(asyncGetIndexData())
    }

    const downLoadProdHandler = async (title, id) => {
        await setLoading(true)
        
        if (title !== 'Все')
            await dispatch(asyncGetCategoryProd(id))
        else dispatch(asyncGetIndexData())
        
        await setLoading(false)
    }

    const downloadMoreHandler = async () => {
        await setLoadingMore(true)
        await dispatch(asyncGetMoreItems(indexData.data.length))
        await setLoadingMore(false)
    }

    return (
        <CatalogPage data={indexData} isLoading={loading} loadingMore={loadingMore} 
            downLoadProdHandler={downLoadProdHandler} downloadMoreHandler={downloadMoreHandler}
            categories={indexData.categories} />
    );
}

export default CatalogContainer;




