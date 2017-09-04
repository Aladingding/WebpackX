
import React, {PropTypes,Component} from 'react';
import ReactDom from 'react-dom';

class App extends  Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div><h1>首页</h1></div>
    }
}

ReactDom.render(<App />, document.querySelector('#main'));