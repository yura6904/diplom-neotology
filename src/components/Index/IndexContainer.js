import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetIndexData, asyncGetMoreItems, asyncGetTopSales } from '../../store/indexSlice';
import Index from './Index';

function IndexContainer() {
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

    const dispatch = useDispatch() 
    const indexData = useSelector((state) => state.indexData)
    //get data catalog + hit-sales
    useEffect(() => {
        async function fetchData() {
            await setLoading(true)
            await dispatch(asyncGetIndexData())
            await dispatch(asyncGetTopSales())
            await setLoading(false)
        }
        fetchData()
    }, [])

    const downloadMoreHandler = async () => {
        await setLoadingMore(true)
        await dispatch(asyncGetMoreItems(indexData.data.length))
        await setLoadingMore(false)
    }
    
    return (
        <Index data={indexData} isLoading={loading}
        downloadMoreHandler={downloadMoreHandler} loadingMore={loadingMore} />
    );
}

export default IndexContainer;


