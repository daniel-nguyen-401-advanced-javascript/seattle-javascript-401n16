import React from 'react';

// functional component
// - great for simple stuff
// - DOES NOT ALLOW for state variables
/*
    function Elem() {
        return <div></div>
    }
*/

// class component
// - great for complex stuff
// - DOES ALLOW for state variables
class Content extends React.Component {
    constructor(props) {
        // calls the parent class constructor
        super(props);

        // init our state (init for important local variables)
        this.state = {
            // any number of variables
            name: 'Sarah Smalls',
        };
    }

    render() {
        return (
            <div>
                <h3>Welcome {this.state.name}!</h3>
            </div>
        );
    }
}

export default Content;
