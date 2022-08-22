import Banner from '../../Banner/Banner';
import '../../css/style.css';

function Product(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    
                        {props.isLoading ? null : (
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
                                                {props.info.sizes.map((s, id) => {
                                                    if (id === 0) {
                                                        return (<span className="catalog-item-size selected">{s.size}</span>)
                                                    }
                                                    else {
                                                        return (<span className="catalog-item-size">{s.size}</span>)
                                                    }
                                                })}
                                            </p>
                                            <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                                    <button className="btn btn-secondary">-</button>
                                                    <span className="btn btn-outline-primary">1</span>
                                                    <button className="btn btn-secondary">+</button>
                                                </span>
                                            </p>
                                        </div>
                                        <button className="btn btn-danger btn-block btn-lg"
                                            onClick={() => {props.addToCart(props.info.id)}}>В корзину</button>
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


