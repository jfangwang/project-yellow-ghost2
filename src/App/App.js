import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import SwipeableViews from 'react-swipeable-views';
import Camera from '../Screens/Camera/Camera';
import Messages from '../Screens/Messages/Messages';
import Discover from '../Screens/Discover/Discover';
import Account from '../Screens/Account/Account';
import Search from '../Screens/Search/Search';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { resize, changeToIndex, updateDecimalIndex, toggleSlide } from '../Actions/globalActions';
import { connect } from 'react-redux'
import SlidingMenuRouting from '../Components/SlidingMenu/SlidingMenuRouting';

export class App extends Component {
  constructor(props) {
    super(props);
    this.test = this.test.bind(this);
    this.logKey = this.logKey.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.props.resize)
    window.addEventListener('keydown', this.logKey);
  }
  test(e) {
    console.log(e)
  }
  logKey(e) {
    if ((this.props.index < 2 && this.props.slide_disabled === false) && (e.code === "KeyD" || e.code === "ArrowRight")) {
      this.props.changeToIndex(this.props.index + 1)
    } else if ((this.props.index > 0 && this.props.slide_disabled === false) && (e.code === "KeyA" || e.code === "ArrowLeft")) {
      this.props.changeToIndex(this.props.index - 1)
    }
  }
  render() {
    const { height, width, changeToIndex, index, updateDecimalIndex, slide_disabled, } = this.props
    return (
      <>
        <BrowserRouter>
          <Router>
            <SwipeableRoutes
              enableMouseEvents
              onSwitching={updateDecimalIndex}
              index={index}
              onChangeIndex={changeToIndex}
              disabled={slide_disabled}
              style={{ backgroundColor: 'lightCoral', height: height, width: width }}
              containerStyle={{ height: '100%' }}
              replace
            >
              <Route path="/messages" component={Messages} />
              <Route path="/camera" component={Camera} />
              <Route path="/discover" component={Discover} />
            </SwipeableRoutes>
            <SlidingMenuRouting path="/account" />
            <Footer />
            <Navbar />
          </Router>
        </BrowserRouter>
      </>

    );
  }
}

App.propTypes = {
};

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
    index: state.global.index,
    slide_disabled: state.global.slide_disabled
  }
}

const mapDispatchToProps = {
  resize,
  changeToIndex,
  updateDecimalIndex,
  toggleSlide,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);