import { NavLink, useNavigate } from 'react-router-dom';
import '../css/style.css'

function Header() {
    const navigate = useNavigate()
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
                                <div className="header-controls-pics" onClick={() => {navigate('/cart')}}>
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    <div className="header-controls-pic header-controls-cart">
                                        <div className="header-controls-cart-full">1</div>
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                </div>
                                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                    <input className="form-control" placeholder="Поиск" />
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
