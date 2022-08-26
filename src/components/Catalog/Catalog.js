import { NavLink } from 'react-router-dom';
import '../css/style.css';
import Loading from '../Loading/Loading';

function Catalog(props) {
  return (
    <section className="catalog">
        <ul className="catalog-categories nav justify-content-center">
            {props.categories.map((el, id) => (
                <li className="nav-item" key={id}>
                    <span className="nav-link active" href="#"
                        onClick={() => {
                            props.downLoadProdHandler(el.title, el.id)
                        }}>{el.title}</span>
                </li>
            ))}    
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
            )) : (<Loading />)}
        </div>
        <div className="text-center">
            {!props.loadingMore ? (
                <button className="btn btn-outline-primary"
                    onClick={() => {props.downloadMoreHandler()}}>Загрузить ещё</button>
            ) : (<Loading />)}
        </div>
    </section>
  );
}

export default Catalog;




