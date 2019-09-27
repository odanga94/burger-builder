import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import './App.css'


class App extends React.Component {
  render(){
    return (
      <div className="App"> 
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
          
        </Layout>
      </div>
    )
  }
}

export default App;
