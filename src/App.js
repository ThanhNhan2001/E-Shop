import MyHeader from './Layout/MyHeader';
import MenuLeft from './Layout/MenuLeft';
import MyFooter from './Layout/MyFooter';
import './App.css';
import MenuAcc from "./Member/MenuAcc"
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { UserContext } from './Context/UserContext';
import HomePage from './HomePage';


function App(props) {
  // const user = { name: 'Nhân', loggedIn: true }
  // return (
  // )
  const [tongQty, setTongQTY] = useState([])
  const [tongQtyWish, setTongQTYWish] = useState()
  let pramas1 = useLocation();
  function getQty(data) {
    setTongQTY(data)
  }
  function getQtyWish(data) {
    setTongQTYWish(data)
  }
  return (
    <UserContext.Provider value={{
      tongQty: tongQty,
      getQty: getQty,
      tongQtyWish: tongQtyWish,
      getQtyWish: getQtyWish
    }}


    >
      <div className="App">
        <MyHeader />
        <section>
          <div class="container">
            <div class="row">
              {pramas1['pathname'].includes("account") ? <MenuAcc /> : <MenuLeft />}
              {props.children}
            </div>
          </div>
        </section>
        <MyFooter />
      </div>
    </UserContext.Provider >

  );
}

export default App;
