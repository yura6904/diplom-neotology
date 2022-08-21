import '../css/style.css';

function Cart() {
  return (
    <div className="container">
        <div className="row">
            <div className="col">
            <div className="banner">
                <img src="./img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
                <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
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
                    <tr>
                    <td scope="row">1</td>
                    <td><a href="/products/1.html">Босоножки 'MYER'</a></td>
                    <td>18 US</td>
                    <td>1</td>
                    <td>34 000 руб.</td>
                    <td>34 000 руб.</td>
                    <td><button className="btn btn-outline-danger btn-sm">Удалить</button></td>
                    </tr>
                    <tr>
                    <td colSpan="5" className="text-right">Общая стоимость</td>
                    <td>34 000 руб.</td>
                    </tr>
                </tbody>
                </table>
            </section>
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card" style={{maxWidth: '30em', margin: '0 auto'}}>
                    <form className="card-body">
                        <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input className="form-control" id="phone" placeholder="Ваш телефон" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input className="form-control" id="address" placeholder="Адрес доставки" />
                        </div>
                        <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="agreement" />
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                    </form>
                </div>
            </section>
            </div>
        </div>
    </div>
  );
}

export default Cart;




