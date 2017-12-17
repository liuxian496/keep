import React, { Component } from 'react';
import Apple from './Apple.js'

class App extends Component {

    componentDidMount(){
    }

    render() {
        return (
            <div>
            <span>React unit test</span>
            <Apple />
            </div>
        );
    }
}

export default App;
