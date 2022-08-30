import { createContext, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import CartContainer from './components/Cart/CartContainer';
import CatalogContainer from './components/Catalog/CatalogContainer';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import IndexContainer from './components/Index/IndexContainer';
import NotFoundError from './components/NotFoundError/NotFoundError';
import ProductContainer from './components/Products/ProductContainer';

function App() {
  const searchStr = ''
  const SearchContext = createContext(searchStr)
  //вынести значение строки поиска сюда
  return (
    <div className="App">
      <SearchContext.Provider value={searchStr}>
        <Header />
        <Routes>
          <Route path='/catalog' element={<CatalogContainer />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/error-404' element={<NotFoundError />}/>
          <Route path='/cart' element={<CartContainer />}/>
          <Route path='/contacts' element={<Contacts />}/>
          <Route path='/products/product/:id' element={<ProductContainer />}/>
          <Route path='/' exact element={<IndexContainer />}/>
        </Routes>
        <Footer />
      </SearchContext.Provider>
      
    </div>
  );
}

/** TODO: 
  * настроить цифру на корзине
  * настроить верстку
  * сообщение об ошибках загрузки данных +-
  * оформление заказа проблема с запросом
  * поиск
*/

export default App;
