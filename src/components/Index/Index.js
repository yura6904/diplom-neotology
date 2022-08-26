import { NavLink } from 'react-router-dom';
import Banner from '../Banner/Banner';
import Catalog from '../Catalog/Catalog';
import '../css/style.css';
import Loading from '../Loading/Loading';

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
              )) : (<Loading />)}
            </div>
          </section>
          <Catalog data={props.data} isLoading={props.loading} loadingMore={props.loadingMore} 
            downloadMoreHandler={props.downloadMoreHandler} downLoadProdHandler={props.downLoadProdHandler}
            categories={props.categories} />
        </div>
      </div>
    </div>
  );
}

export default Index;


