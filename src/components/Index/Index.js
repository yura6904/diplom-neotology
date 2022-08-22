import { NavLink } from 'react-router-dom';
import Banner from '../Banner/Banner';
import '../css/style.css';

function Index(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
              {!props.isLoading ? props.data.topSales.map((d, idx) => (
                <div className="col-4" key={idx}>
                  <div className="card">
                    <img src={d.images[0]}
                      className="card-img-top img-fluid" alt={d.title} />
                    <div className="card-body">
                      <p className="card-text">{d.title}</p>
                      <p className="card-text">{d.price}</p>
                      <NavLink to={`/products/product/${d.id}`}
                        state = {{
                          id: d.id,
                          images: d.images,
                          title: d.title,
                          price: d.price
                        }}
                      className="btn btn-outline-primary">Заказать</NavLink>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="preloader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          </section>
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
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
              {!props.isLoading ? props.data.data.map((d, idx) => (
                <div className="col-4" key={idx}>
                  <div className="card">
                    <img src={d.images[0]}
                      className="card-img-top img-fluid" alt={d.title} />
                    <div className="card-body">
                      <p className="card-text">{d.title}</p>
                      <p className="card-text">{d.price}</p>
                      <NavLink to={`/products/product/${d.id}`}
                        state = {{
                          id: d.id,
                          images: d.images,
                          title: d.title,
                          price: d.price
                        }}
                      className="btn btn-outline-primary">Заказать</NavLink>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="preloader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
            <div className="text-center">
              {!props.loadingMore ? (
                <button className="btn btn-outline-primary"
                onClick={() => {props.downloadMoreHandler()}}>Загрузить ещё</button>
              ) : (
                <div className="preloader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Index;


