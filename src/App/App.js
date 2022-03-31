import React from 'react'
import PropTypes from 'prop-types'
import Main from './Main'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Camera from '../Screens/Camera/Camera';
import Messages from '../Screens/Messages/Messages';
import Discover from '../Screens/Discover/Discover';
import Account from '../Screens/Account/Account';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import { connect } from 'react-redux'
import { resize, changeToIndex, updateDecimalIndex, toggleSlide } from '../Actions/globalActions';

function Error(props) {
  return (
    <main style={{ height: props.height }}>
      <p>There's nothing here!</p>
    </main>
  )
}

function App(props) {
  const { height, width, changeToIndex, index, updateDecimalIndex, slide_disabled, } = props
  return (
    <BrowserRouter>
      <Router>
        <SwipeableRoutes
          replace
          enableMouseEvents
          style={{ backgroundColor: 'lightgreen', height: height, width: width }}
          containerStyle={{ height: '100%' }}
          axis="y"
        >
          <Route exact path="/" component={Main} />
        </SwipeableRoutes>
      </Router>
      <Navbar />
      <Footer />
    </BrowserRouter>
  )
}

App.propTypes = {}

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
