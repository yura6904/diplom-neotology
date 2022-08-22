import { NavLink } from 'react-router-dom';
import Banner from '../Banner/Banner';
import '../css/style.css';

function Catalog() {
  return (
    <div className="container">
        <div className="row">
            <div className="col">
                <Banner />
                <section className="catalog">
                    <h2 className="text-center">Каталог</h2>
                    <form className="catalog-search-form form-inline">
                        <input className="form-control" placeholder="Поиск" />
                    </form>
                    <ul className="catalog-categories nav justify-content-center">
                    <li className="nav-item">
                        <NavLink to="" className="nav-link active" href="#">Все</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="" className="nav-link" href="#">Женская обувь</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="" className="nav-link" href="#">Мужская обувь</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="" className="nav-link" href="#">Обувь унисекс</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="" className="nav-link" href="#">Детская обувь</NavLink>
                    </li>
                    </ul>
                    <div className="row">
                    <div className="col-4">
                        <div className="card catalog-item-card">
                            <img src="./img/products/sandals_myer.jpg"
                                className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
                            <div className="card-body">
                                <p className="card-text">Босоножки 'MYER'</p>
                                <p className="card-text">34 000 руб.</p>
                                <NavLink to="/products" className="btn btn-outline-primary">Заказать</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card catalog-item-card">
                        <img src="./img/products/sandals_keira.jpg"
                            className="card-img-top img-fluid" alt="Босоножки 'Keira'" />
                        <div className="card-body">
                            <p className="card-text">Босоножки 'Keira'</p>
                            <p className="card-text">7 600 руб.</p>
                            <NavLink to="/products" className="btn btn-outline-primary">Заказать</NavLink>
                        </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card catalog-item-card">
                        <img src="./img/products/superhero_sneakers.jpg"
                            className="card-img-top img-fluid" alt="Супергеройские кеды" />
                        <div className="card-body">
                            <p className="card-text">Супергеройские кеды</p>
                            <p className="card-text">1 400 руб.</p>
                            <NavLink to="/products" className="btn btn-outline-primary">Заказать</NavLink>
                        </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card catalog-item-card">
                        <img src="./img/products/sandals_myer.jpg"
                            className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
                        <div className="card-body">
                            <p className="card-text">Босоножки 'MYER'</p>
                            <p className="card-text">34 000 руб.</p>
                            <NavLink to="/products" className="btn btn-outline-primary">Заказать</NavLink>
                        </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card catalog-item-card">
                            <img src="./img/products/sandals_keira.jpg"
                                className="card-img-top img-fluid" alt="Босоножки 'Keira'" />
                            <div className="card-body">
                                <p className="card-text">Босоножки 'Keira'</p>
                                <p className="card-text">7 600 руб.</p>
                                <NavLink to="/products" className="btn btn-outline-primary">Заказать</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card catalog-item-card">
                            <img src="./img/products/superhero_sneakers.jpg"
                                className="card-img-top img-fluid" alt="Супергеройские кеды" />
                            <div className="card-body">
                                <p className="card-text">Супергеройские кеды</p>
                                <p className="card-text">1 400 руб.</p>
                                <NavLink to="/products" className="btn btn-outline-primary">Заказать</NavLink>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="text-center">
                    <button className="btn btn-outline-primary">Загрузить ещё</button>
                    </div>
                </section>
            </div>
        </div>
    </div>
  );
}

export default Catalog;




