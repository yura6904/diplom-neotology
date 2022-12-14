import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { CountCartContext } from '../../App';
import { asyncGetProductBySearch } from '../../store/indexSlice';
import '../css/style.css'

function Header() {
    const navigate = useNavigate()
    
    const {countCart, searchProdStr, changeCount, changeSearchProd} = useContext(CountCartContext)
    const [inputDisplay, setInputDisplay] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        changeCount(JSON.parse(window.localStorage.getItem('cart')).length)
    })

    const displayInputHandler = () => {
        setInputDisplay(!inputDisplay)
    }
    const onChangeSearchInput = (evt) => {
        changeSearchProd(evt.target.value)
    }
    const searchProd = async (str) => {
        if (str !== '') {
            await dispatch(asyncGetProductBySearch(str))
            await navigate('/catalog')
        }
        else return
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            <img src="./img/header-logo.png" alt="Bosa Noga" />
                        </a>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Главная</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/catalog">Каталог</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">О магазине</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contacts">Контакты</NavLink>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics" >
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search"
                                    onClick={() => {displayInputHandler()}}></div>
                                    <div className="header-controls-pic header-controls-cart" onClick={() => {navigate('/cart')}}>
                                        <div className="header-controls-cart-full"
                                            style={{display: countCart === 0 ? 'none' : 'block'}}
                                            onClick={() => searchProd(searchProdStr)}
                                        >{countCart}</div>
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                </div>
                                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                    <input className="form-control" placeholder="Поиск"
                                        defaultValue={searchProdStr}
                                        onChange={(evt) => {onChangeSearchInput(evt)}}
                                        style={{
                                            display: inputDisplay ? 'none' : 'block',
                                            backgroundColor: 'red',
                                            color: 'red'
                                    }}/>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;
