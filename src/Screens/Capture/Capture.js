import React from 'react';
import PropTypes from 'prop-types';
import styles from './Capture.module.css';
import {connect} from 'react-redux';
import {toggleSlide, toggleNavFoot} from '../../Actions/globalActions';
import {setScreen} from '../../Actions/cameraActions';
import {IconContext, X} from 'phosphor-react';


/**
 * @param {*} props
 * @return {*}
 */
function Capture(props) {
  const {
    setScreen,
    toggleSlide,
    toggleNavFoot,
  } = props;

  /**
   * Close
   */
  function close() {
    setScreen('camera');
    toggleSlide(false);
    toggleNavFoot(false);
  }
  return (
    <div
      className={styles.background}
    >
      <IconContext.Provider
        value={{
          color: 'black',
          size: '2rem',
          weight: 'bold',
        }}
      >
        <header>
          <button onClick={close}><X /></button>
          {/* imageCanvas */}
        </header>
      </IconContext.Provider>
    </div>
  );
}

Capture.propTypes = {
  // height: PropTypes.number,
  // width: PropTypes.number,
  toggleSlide: PropTypes.func,
  toggleNavFoot: PropTypes.func,
  setScreen: PropTypes.func,
  screen: PropTypes.string,
};

Capture.defaultProps = {
  // height: window.innerHeight,
  // width: window.innerWidth,
  toggleSlide: () => { },
  toggleNavFoot: () => { },
  setScreen: () => { },
  screen: 'camera',
};

/**
  * @param {*} state
  * @return {*}
  */
function mapStateToProps(state) {
  return {
    // height: state.global.height,
    // width: state.global.width,
    screen: state.camera.screen,
  };
}

const mapDispatchToProps = {
  toggleSlide,
  toggleNavFoot,
  setScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Capture);
