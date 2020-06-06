import React from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Content from './components/Content';

function App() {
    return (
        <div className='App'>
            <Header />
            <Button />
            <Content />
        </div>
    );
}

export default App;

// import blah from './App.js'
// blah will be the default export, aka App()
