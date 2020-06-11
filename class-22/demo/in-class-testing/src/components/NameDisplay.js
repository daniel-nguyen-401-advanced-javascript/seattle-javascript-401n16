import React from 'react';
import Child from './Child';

class NameDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Sarah Smalls',
            favoriteFood: 'ice cream',
        };
    }

    handleInputChange(e) {
        // content of the text input
        let newValue = e.target.value;

        this.setState({ ...this.state, name: newValue });
    }

    render() {
        return (
            <>
                <h1 className='title'>Enter your name</h1>
                <input
                    className='my-input'
                    type='text'
                    value={this.state.name}
                    onChange={this.handleInputChange.bind(this)}
                />

                <h2 className='fun-display'>
                    Welcome {this.state.name}! Do you like{' '}
                    {this.state.favoriteFood}?
                </h2>
                <Child />
            </>
        );
    }
}

export default NameDisplay;
