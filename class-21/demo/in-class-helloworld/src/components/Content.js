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

        // this.props

        // init our state (init for important local variables)
        this.state = {
            // any number of variables
            name: 'Sarah Smalls',
            count: 1,
        };
    }

    // event handler function
    async onInputChange(e) {
        let val = e.target.value;
        // every time any state variable changes, we call
        // render() again
        // this.state.name = e.target.value;
        await this.setState({ ...this.state, count: 2 });
        await this.setState({ ...this.state, name: val });
    }

    render() {
        console.log('state', this.state);
        return (
            <div className='content'>
                <input
                    type='text'
                    value={this.state.name}
                    onChange={this.onInputChange.bind(this)}
                />
                <h3>Welcome {this.state.name}!</h3>
            </div>
        );
    }
}

export default Content;
