import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {BrowserRouter as Router, Route, BrowserRouter} from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import Camera from '../Screens/Camera/Camera';
import Messages from '../Screens/Messages/Messages';
import Discover from '../Screens/Discover/Discover';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import {MetaTags} from 'react-meta-tags';
import {
  resize,
  changeToIndex,
  updateDecimalIndex,
  toggleSlide,
} from '../Actions/globalActions';
import {connect} from 'react-redux';

/**
 * App Class
 */
export class App extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.logKey = this.logKey.bind(this);
  }
  /**
   * Runs when component is mounted
   */
  componentDidMount() {
    this.props.resize();
    window.addEventListener('resize', this.props.resize);
    window.addEventListener('keydown', this.logKey);
  }
  /**
   * tied to event listener, changes index based on given key input.
   * @param {*} e
   */
  logKey(e) {
    if ((this.props.index < 2 && this.props.slideDisabled === false) &&
    (e.code === 'KeyD' || e.code === 'ArrowRight')) {
      this.props.changeToIndex(this.props.index + 1);
    } else if ((this.props.index > 0 && this.props.slideDisabled === false) &&
    (e.code === 'KeyA' || e.code === 'ArrowLeft')) {
      this.props.changeToIndex(this.props.index - 1);
    }
  }
  /**
   * Renders
   * @return {*}
   */
  render() {
    const {
      height,
      width,
      changeToIndex,
      index,
      updateDecimalIndex,
      slideDisabled,
    } = this.props;
    return (
      <>
        <MetaTags>
          <meta
            name = "viewport"
            content = "width=device-width, \
            minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
          />
        </MetaTags>
        <BrowserRouter>
          <Router>
            <SwipeableRoutes
              enableMouseEvents
              onSwitching={updateDecimalIndex}
              index={index}
              onChangeIndex={changeToIndex}
              disabled={slideDisabled}
              style={{
                backgroundColor: 'lightCoral',
                height: height,
                width: width,
              }}
              containerStyle={{height: '100%'}}
              replace
            >
              <Route exact path="/messages" component={Messages} />
              <Route exact path="/camera" component={Camera} />
              <Route exact path="/discover" component={Discover} />
            </SwipeableRoutes>
            <Footer />
            <Navbar placeHolder={false}/>
          </Router>
        </BrowserRouter>
      </>

    );
  }
}

App.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  index: PropTypes.number,
  slideDisabled: PropTypes.bool,
  resize: PropTypes.func,
  changeToIndex: PropTypes.func,
  updateDecimalIndex: PropTypes.func,
  toggleSlide: PropTypes.func,
  orientation: PropTypes.string,
};

App.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  index: 1,
  slideDisabled: false,
  orientation: window.innerHeight >= window.innerWidth ?
  'portrait' : 'landscape',
  resize: () => {},
  changeToIndex: () => {},
  updateDecimalIndex: () => {},
  toggleSlide: () => {},
};
/**
 * mapStateToProps to fetch states from redux store
 * @param {int} state
 * @return {object}
 */
function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
    index: state.global.index,
    slideDisabled: state.global.slideDisabled,
    orientation: state.global.orientation,
  };
}

const mapDispatchToProps = {
  resize,
  changeToIndex,
  updateDecimalIndex,
  toggleSlide,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
