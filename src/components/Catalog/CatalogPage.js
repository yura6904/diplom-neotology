import Banner from '../Banner/Banner';
import '../css/style.css';
import Catalog from './Catalog';

function CatalogPage(props) {
  return (
    <div className="container">
        <div className="row">
            <div className="col">
                <Banner />
                <h2 className="text-center">Каталог</h2>
                <form className="catalog-search-form form-inline">
                    <input className="form-control" placeholder="Поиск" />
                </form>
                <Catalog data={props.data} isLoading={props.loading} loadingMore={props.loadingMore} 
                    downloadMoreHandler={props.downloadMoreHandler} downLoadProdHandler={props.downLoadProdHandler}
                    categories={props.categories} />
            </div>
        </div>
    </div>
  );
}

export default CatalogPage;




