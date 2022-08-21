import '../css/style.css';

function Index() {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="banner">
            <img src="./img/banner.jpg" class="img-fluid" alt="К весне готовы!" />
            <h2 class="banner-header">К весне готовы!</h2>
          </div>
          <section class="top-sales">
            <h2 class="text-center">Хиты продаж!</h2>
            <div class="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </section>
          <section class="catalog">
            <h2 class="text-center">Каталог</h2>
            <div class="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Index;


