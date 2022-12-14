import { createContext, useEffect, useState } from 'react';
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

export const CountCartContext = createContext()

function App() {
  const [countCart, setCountCart] = useState(0)
  const [searchProdStr, setSearchProdStr] = useState('')

  const changeCount = () => {
    setCountCart(JSON.parse(window.localStorage.getItem('cart')).length)
  }

  const changeSearchProd = (str) => {
    setSearchProdStr(str)
  }

  useEffect(() => {
    window.localStorage.cart ? changeCount() : window.localStorage.setItem('cart', JSON.stringify([]))
  }, [])

  return (
    <div className="App">
      <CountCartContext.Provider value={{countCart, searchProdStr, changeCount, changeSearchProd}}>
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
      </CountCartContext.Provider>
      
    </div>
  );
}

export default App;
