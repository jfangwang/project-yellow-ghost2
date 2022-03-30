import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import Camera from '../Screens/Camera/Camera';
import Messages from '../Screens/Messages/Messages';
import Discover from '../Screens/Discover/Discover';
import { resize } from '../Actions/globalActions';
import { connect } from 'react-redux'

export class App extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.props.resize)
  }
  render() {
    const {height, width} = this.props
    return (
      <Router>
        <SwipeableRoutes enableMouseEvents replace style={{backgroundColor: 'lightCoral', height:height, width: width}}>
          <Route path="/messages" component={Messages}/>
          <Route path="/" component={Camera}/>
          <Route path="/discover" component={Discover}/>
        </SwipeableRoutes>
      </Router>
    );
  }
}

App.propTypes = {
};

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width
  }
}

const mapDispatchToProps = {
  resize,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);