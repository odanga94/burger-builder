import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css'

class App extends React.Component {
  render(){
    return (
      <div className="App"> 
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    )
  }
}

export default App;
