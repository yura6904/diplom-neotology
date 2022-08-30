import '../css/style.css';
const banner = require('../../assets/banner.jpeg')

function Banner() {
  return (
    <div className="banner compBanner">
        <img src={banner} className="img-fluid" alt="К весне готовы!"></img>
        <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
}

export default Banner;


