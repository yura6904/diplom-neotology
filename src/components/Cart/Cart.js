import { NavLink } from 'react-router-dom';
import Banner from '../Banner/Banner';
import '../css/style.css';

function Cart(props) {
    
  return (
    <div className="container">
        <div className="row">
            <div className="col">
            <Banner />
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                {props.warnings.length > 0 ? (
                    <div>
                        <h4>Изменения информации:</h4>
                        {props.warnings.map((w, id) => (
                            <p key={id}>{w}</p>
                        ))}
                    </div>
                    
                ) : null}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Итого</th>
                        <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.cartData ? 
                                props.cartData[0] !== null ? 
                                    props.cartData.length > 0 ? props.cartData.map(
                                        (p, id) => (p.price ? (
                                            <tr key={id}>
                                                <td scope="row">{id+1}</td>
                                                <td><NavLink to={`/products/product/${p.id}`}>{p.title}</NavLink></td>
                                                <td>{p.size.size}</td>
                                                <td>{p.count}</td>
                                                <td>{p.price}</td>
                                                <td>{p.price*p.count}</td>
                                                <td><button className="btn btn-outline-danger btn-sm"
                                                onClick={() => {props.deleteHandler(id, p.id, p.size.size)}}>Удалить</button></td>
                                            </tr>
                                        ) : null)
                                            
                                    ) : (<tr>
                                            <td>Корзина пуста.</td>
                                        </tr>)
                                : null
                            : null 
                        }
                        <tr>
                            <td colSpan="5" className="text-right">Общая стоимость</td>
                            <td>{props.cartData.length > 0 ? props.sumPrice : 0}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </section>
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card" style={{maxWidth: '30em', margin: '0 auto'}}>
                    <form className="card-body" onSubmit={evt => evt.preventDefault()}>
                        <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input className="form-control" id="phone" 
                            placeholder="Ваш телефон" onChange={(evt) => {props.onChangeTelephoneInput(evt)}} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input className="form-control" id="address"
                            placeholder="Адрес доставки" onChange={(evt) => {props.onChangeAdressInput(evt)}} />
                        </div>
                        <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="agreement"
                            onChange={(evt) => {props.onChangeAgreementInput(evt)}} />
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary"
                            onClick={() => {props.formNewOrderHandler()}} disabled={!props.userAgreement}
                        >Оформить</button>
                    </form>
                </div>
            </section>
            </div>
        </div>
    </div>
  );
}

export default Cart;




