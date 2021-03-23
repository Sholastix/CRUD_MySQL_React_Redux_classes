import React, { Component } from 'react';

import './App.css';
import Products from './containers/Products';

class App extends Component {
    render() {
        return (
            <div className='App container'>
                <Products />
            </div>
        );
    };
};

export default App;