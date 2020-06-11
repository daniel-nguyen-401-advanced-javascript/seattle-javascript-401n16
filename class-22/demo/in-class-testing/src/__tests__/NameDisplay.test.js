import React from 'react';
import { shallow, mount, render } from 'enzyme';
import NameDisplay from '../components/NameDisplay';

describe('does component work right', () => {
    it('has the right initial state values', () => {
        let component = shallow(<NameDisplay />);
        expect(component.state('name')).toBe('Sarah Smalls');
        expect(component.state('favoriteFood')).toBe('ice cream');
    });

    it('updates the state correctly when we type into the input field', () => {
        let component = shallow(<NameDisplay />);
        let fakeEventData = { target: { value: 'Sonia Kandah' } };
        component.find('input').simulate('change', fakeEventData);
        expect(component.state('name')).toBe('Sonia Kandah');
        expect(component.state('favoriteFood')).toBe('ice cream');
    });

    it('can see child html', () => {
        let component = mount(<NameDisplay />);

        let childHeader = component.find('h3');
        expect(childHeader).toBeDefined();
        expect(childHeader.text()).toBe("Hello! I'm a child component");
    });
});

describe('does component look right', () => {
    it('has a welcome message', () => {
        let component = render(<NameDisplay />);
        console.log('html', component.html());
        console.log('text', component.text());

        let header = component.find('.title');
        console.log(header['_root']['0']);
        //expect(component.html()).to.contain('h1');
    });
});
