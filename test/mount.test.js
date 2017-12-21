import React from 'react';
import ReactDOM from 'react-dom';

import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

import App from '../src/App';

describe('<App />', () => {
    it('App componentDidMount is called with error.', function () {
        sinon.spy(App.prototype, 'componentDidMount');
        const wrapper = mount(<App />);
        expect(App.prototype.componentDidMount.callCount).to.be.equal(1);
    });
});