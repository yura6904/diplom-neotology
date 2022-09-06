import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountCartContext } from '../../App';
import { asyncFormOrder, deleteProdFromOrder, formOrder } from '../../store/cartSlice';
import { fetchRequest } from "../../store/fetchRequest"

import Cart from './Cart';

function CartContainer() {
    const cartData = useSelector(state => state.cartData)
    const [sumPrice, setSumPrice] = useState(0)
    const [userTelephone, setUserTelephone] = useState()
    const [userAddress, setUserAddress] = useState()
    const [userAgreement, setUserAgreement] = useState(false)
    const [cartProducts, setCartProducts] = useState([])
    const [warnings, setWarnings] = useState([])
    const dispatch = useDispatch()

    const {countCart, changeCount} = useContext(CountCartContext)
   
    useEffect(() => {
        (async () => {
            let prods = []
            let warns = []
            let price = 0
            let localItems = JSON.parse(window.localStorage.getItem('cart'))

            for (let i = 0; i < localItems.length; i++) {
                let actualProd = await fetchRequest(`http://localhost:7070/api/items/${localItems[i].id}`)
                price += actualProd.price * localItems[i].count

                //проверка на соответствие инфы
                if (actualProd.price !== localItems[i].price) {
                    warns.push(`Цена товар ${localItems[i].title} поменялась, актуальная цена - ${actualProd.price}`)
                    localItems[i].price = actualProd.price
                }
                prods.push(localItems[i])
            }
            window.localStorage.removeItem('cart')
            window.localStorage.setItem(`cart`, JSON.stringify(localItems))
            setWarnings(warns)
            setSumPrice(price)
            setCartProducts(prods)
            
        })()
    }, [])

    useEffect(() => {
        changeCount(JSON.parse(window.localStorage.getItem('cart')).length)
    })

    const formNewOrderHandler = () => {
        let localItems = JSON.parse(window.localStorage.getItem('cart'))
        let orderItems = []

        localItems.map((i, id) => 
            orderItems.push(
                {
                    id: i.id,
                    price: i.price,
                    count: i.count
                }
            )
        )

        let fullOrder = {
            owner: { 
                phone: userTelephone, 
                address: userAddress
            }, 
            items: orderItems
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
        let localItems = JSON.parse(window.localStorage.getItem('cart'))
        let items = []
        for (let i = 0; i < localItems.length; i++) {
            let item = localItems[i]
            if ((item.id !== prodId) || item.size.size !== size) {
                items.push(item)
            }
            else {
                setSumPrice(sumPrice - item.price * item.count)
            }
        }
        setCartProducts(items)        
        dispatch(deleteProdFromOrder(id))
        window.localStorage.removeItem('cart')
        window.localStorage.setItem('cart', JSON.stringify(items))
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




