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
                <form className="catalog-search-form form-inline" onSubmit={evt => evt.preventDefault()}>
                  <input className="form-control" placeholder={props.searchStr === "" ? "Поиск" : props.searchStr}
                    onChange={evt => props.onChangeSearch(evt)}
                    onKeyDown={evt => props.findItem(evt)} />
                </form>
                <Catalog data={props.data} isLoading={props.loading} loadingMore={props.loadingMore} 
                    downloadMoreHandler={props.downloadMoreHandler} downLoadCategoriesHandler={props.downLoadCategoriesHandler}
                    categories={props.categories} />
            </div>
        </div>
    </div>
  );
}

export default CatalogPage;




