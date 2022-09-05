import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountCartContext } from '../../App';
import { asyncFormOrder, deleteProdFromOrder, formOrder } from '../../store/cartSlice';
import { asyncGetProductById } from '../../store/productSlice';
import Cart from './Cart';

function CartContainer() {
    const cartData = useSelector(state => state.cartData)
    const productData = useSelector(state => state.productData.product)
    const [sumPrice, setSumPrice] = useState(0)
    const [userTelephone, setUserTelephone] = useState()
    const [userAddress, setUserAddress] = useState()
    const [userAgreement, setUserAgreement] = useState(false)
    const [cartProducts, setCartProducts] = useState([])
    const [warnings, setWarnings] = useState([])
    const dispatch = useDispatch()

    const {countCart, changeCount} = useContext(CountCartContext)

    useEffect(() => {
        //одиночные запросы на серввер гет по ид из локалсторедж
        getProductsFromServer()
        let warns = checkActualData()
        setWarnings(warns)
    }, [])

    useEffect(() => {
        changeCount(window.localStorage.length)
    })

    const getProductsFromServer = async () => {
        let prods = []
        let price = 0

        for (let i = 0; i < window.localStorage.length; i++) {
            let localItem = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)))
            await dispatch(asyncGetProductById(localItem.id))
            prods.push(productData)
        }
        if (prods.length > 0) {
            prods.map((p, id) => {
                price += p.price * p.count
            })
            setSumPrice(price)
        }
        else {
            setSumPrice(0)
        }
        setCartProducts(prods)
    }
    //проверка на соответствие инфы
    const checkActualData = () => {
        let changesWarning = []
        for (let i = 0; i < window.localStorage.length; i++) {
            let localProdFromOrder = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)))
            if (cartProducts[i].price !== localProdFromOrder.price)
                changesWarning.push(`Цена товар ${cartProducts[i].title} поменялась, актуальная цена - ${cartProducts[i].price}`)
            return changesWarning
        }
    }
    const formNewOrderHandler = () => {
        let items = []
        for (let i = 0; i < window.localStorage.length; i++) {
            items.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(i))))
        }
        let fullOrder = {
            owner: { 
                phone: userTelephone, 
                address: userAddress
            }, 
            items: items
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
        let indexToDelete = ''
        let items = []
        for (let i = 0; i < window.localStorage.length; i++) {
            let item = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)))
            if ((item.id !== prodId) || item.size.size !== size) {
                items.push(item)
            }
            else {
                indexToDelete = i
                setSumPrice(sumPrice - item.price * item.count)
            }
        }
        setCartProducts(items)        
        dispatch(deleteProdFromOrder(id))
        window.localStorage.removeItem(window.localStorage.key(indexToDelete))
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

    return (
        <Cart cartData={cartProducts ? cartProducts : []} sumPrice={sumPrice} warnings={warnings}
            formNewOrderHandler={formNewOrderHandler} deleteHandler={deleteHandler}
            onChangeTelephoneInput={onChangeTelephoneInput} onChangeAdressInput={onChangeAdressInput}
            onChangeAgreementInput={onChangeAgreementInput} userAgreement={userAgreement} />
    );
}

export default CartContainer;




