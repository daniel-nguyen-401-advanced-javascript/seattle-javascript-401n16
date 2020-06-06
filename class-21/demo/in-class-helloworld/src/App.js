import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Graphic from './components/Graphic';

import pic1 from './components/pic1.jpeg';
import pic2 from './components/pic2.jpeg';

import './styles/styles.scss';

function App() {
    let changedCaption = 'this is my first caption';
    setTimeout(() => {
        changedCaption = 'i just changed this';
    }, 1000);

    return (
        <div className='App'>
            <Header />
            <Content />
            <Graphic pic={pic1} caption={changedCaption} />
            <Graphic pic={pic2} caption='this is my second caption' />
        </div>
    );
}

export default App;

// import blah from './App.js'
// blah will be the default export, aka App()
