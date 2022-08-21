import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import Catalog from './components/Catalog/Catalog';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Index from './components/Index/Index';
import IndexLoaded from './components/IndexLoaded/IndexLoaded';
import NotFoundError from './components/NotFoundError/NotFoundError';
import Products from './components/Products/Products';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/catalog' element={<Catalog />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/error-404' element={<NotFoundError />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/contacts' element={<Contacts />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/' exact element={<Index />}/>
      </Routes>
      <Footer />
    </div>
  );
}

/** TODO: 
  * убрать повторяющиеся элементы
  * настроить верстку
  * убрать захардкоженные данные и сделать запросы на сервер
  * добавить функционал на кнопки
  * добавить функционал по добавлению классов в элементы страницы
  * Index и IndexLoaded - загрузка
*/

export default App;
