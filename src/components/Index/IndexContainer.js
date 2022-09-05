import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetIndexData, asyncGetMoreItems, asyncGetCategoryProd,
    asyncGetCategories, asyncGetTopSales } from '../../store/indexSlice';import Index from './Index';

function IndexContainer() {
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

    const dispatch = useDispatch() 
    const indexData = useSelector((state) => state.indexData)

    useEffect(() => {
        getAll()
        getCategories()
    }, [])

    const getAll = async () => {
        await setLoading(true)
        await dispatch(asyncGetIndexData())
        await dispatch(asyncGetTopSales())
        await setLoading(false)
    }

    const getCategories = async () => {
        await dispatch(asyncGetCategories())
    }

    const downLoadProdHandler = async (title, id) => {
        await setLoading(true)
        
        if (title !== 'Все')
            await dispatch(asyncGetCategoryProd(id))
        else await dispatch(asyncGetIndexData())
        
        await setLoading(false)
    }

    const downloadMoreHandler = async () => {
        await setLoadingMore(true)
        console.log('downloadMoreHandler index:', indexData.activeCategory)
        await dispatch(asyncGetMoreItems({skipNum: indexData.data.length, categoryId: indexData.activeCategory}))
        await setLoadingMore(false)
    }
    
    return (
        <Index data={indexData} isLoading={loading} loadingMore={loadingMore} 
            downloadMoreHandler={downloadMoreHandler} downLoadProdHandler={downLoadProdHandler}
            categories={indexData.categories} />
    );
}

export default IndexContainer;


