import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";

describe('App Render Test', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true)
  })
})