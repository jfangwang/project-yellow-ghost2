import React from 'react';
import { shallow } from 'enzyme';
import {Footer} from './Footer';
// import {render, screen, fireEvent, Link} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import {createMemoryHistory} from 'history'
// import { MemoryRouter } from 'react-router-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from '../../Reducers/rootReducer';

// const store = createStore(rootReducer);
const wrapper = shallow(<Footer />);

describe('Footer Basic Test Suite', () => {
  it('Renders without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('3 link are there', () => {
    expect(wrapper.find('Link').length).toBe(3);
  })
})