import '../css/style.css';
import Banner from '../Banner/Banner';
import Loading from '../Loading/Loading';

function Product(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                        {props.isLoading ? (<Loading />) : (
                            <section className="catalog-item">
                                <h2 className="text-center">{props.info.title}</h2>
                                <div className="row">
                                    <div className="col-5">
                                        <img src={props.info.images[0]}
                                            className="img-fluid" alt="" />
                                    </div>
                                    <div className="col-7">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Артикул</td>
                                                    <td>{props.info.sku}</td>
                                                </tr>
                                                <tr>
                                                    <td>Производитель</td>
                                                    <td>{props.info.manufacturer}</td>
                                                </tr>
                                                <tr>
                                                    <td>Цвет</td>
                                                    <td>{props.info.color}</td>
                                                </tr>
                                                <tr>
                                                    <td>Материалы</td>
                                                    <td>{props.info.material}</td>
                                                </tr>
                                                <tr>
                                                    <td>Сезон</td>
                                                    <td>{props.info.season}</td>
                                                </tr>
                                                <tr>
                                                    <td>Повод</td>
                                                    <td>{props.info.reason}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="text-center">
                                            <p>Размеры в наличии: 
                                                {props.info.sizes.map((s, id) => (
                                                    <span className={`catalog-item-size ${props.size === id ? 'selected' : ''}`} key={id}
                                                    onClick={() => {props.chooseSizeHandler(id)}}>{s.size}</span>
                                                ))}
                                            </p>
                                            <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                                    <button className="btn btn-secondary" onClick={() => {
                                                        props.decrementHandler()
                                                    }}>-</button>
                                                    <span className="btn btn-outline-primary">{props.amountOfProd}</span>
                                                    <button className="btn btn-secondary" onClick={() => {
                                                        props.incrementHandler()
                                                    }}>+</button>
                                                </span>
                                            </p>
                                        </div>
                                        <button className="btn btn-danger btn-block btn-lg"
                                            onClick={() => {
                                                props.addProdToCart({
                                                    id: props.info.id,
                                                    size: props.info.sizes[props.size],
                                                    count: props.amountOfProd,
                                                    title: props.info.title,
                                                    category: props.info.category,
                                                    season: props.info.season,
                                                    reason: props.info.reason,
                                                    color: props.info.color,
                                                    material: props.info.material,
                                                    manufacturer: props.info.manufacturer,
                                                    sku: props.info.sku,
                                                    price: props.info.price,
                                                    sumPrice: props.amountOfProd * props.info.price
                                                })
                                                props.routeChange()
                                            }}>
                                        В корзину</button>
                                    </div>
                                </div>
                            </section>
                        )}
                </div>
            </div>
        </div>

    );
}

export default Product;


