
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountCartContext } from '../../App';
import { asyncGetIndexData, asyncGetMoreItems,asyncGetCategoryProd,
        asyncGetCategories, 
        setActiveCategory} from '../../store/indexSlice';
import { asyncGetProductBySearch } from '../../store/indexSlice';
import CatalogPage from './CatalogPage';

function CatalogContainer() {
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const {countCart, searchProdStr, changeCount, changeSearchProd} = useContext(CountCartContext)
    
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
        await dispatch(asyncGetIndexData(indexData.categoryId))
    }

    const downLoadCategoriesHandler = async (title, id) => {
        dispatch(setActiveCategory(id))
        await setLoading(true)
        if (title !== 'Все')
            await dispatch(asyncGetCategoryProd(id))
        else await dispatch(asyncGetIndexData())
        
        await setLoading(false)
    }

    const downloadMoreHandler = async () => {
        await setLoading(true)
        await dispatch(asyncGetMoreItems({skipNum: indexData.data.length, categoryId: indexData.activeCategory}))
        await setLoading(false)
    }

    const onChangeSearch = (evt) => {
        changeSearchProd(evt.target.value)
    }
    const findItem  = async (evt) => {
        if (evt.key === 'Enter'){
            await dispatch(asyncGetProductBySearch(searchProdStr))}
    }

    return (
        <CatalogPage data={indexData} isLoading={loading} loadingMore={loadingMore} 
        downLoadCategoriesHandler={downLoadCategoriesHandler} downloadMoreHandler={downloadMoreHandler}
            categories={indexData.categories} onChangeSearch={onChangeSearch}
            findItem={findItem} searchStr={searchProdStr}/>
    );
}

export default CatalogContainer;




