import Banner from '../Banner/Banner';
import '../css/style.css';

function NotFoundError() {
  return (
    <div className="container">
        <div className="row">
            <div className="col">
                <Banner />
                <section className="top-sales">
                <h2 className="text-center">Страница не найдена</h2>
                <p>
                    Извините, такая страница не найдена!
                </p>
                </section>
            </div>
        </div>
    </div>
  );
}

export default NotFoundError;


