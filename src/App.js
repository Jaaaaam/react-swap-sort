import React, { Component } from 'react';
import Swappable from './components/SwappableComponent'
import './App.css';

class App extends Component {
    constructor() {
        super()

        this.state = {
            data: [
                { order: 1, data: 'I am test 1' },
                { order: 2, data: 'I am test 2' },
                { order: 3, data: 'I am test 3' },
                { order: 4, data: 'I am test 4' },
            ]
        }
    }

    sampleCustomFunction() {
        alert('TEST')
    }
    render() {
        return (
            <div>
                <Swappable data={ this.state.data } customFunc={() => this.sampleCustomFunction()}/>
            </div>
        );
    }
}

export default App;
