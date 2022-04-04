import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './Capture.module.css';
import {connect} from 'react-redux';
import {toggleSlide, toggleNavFoot} from '../../Actions/globalActions';
import {setScreen} from '../../Actions/cameraActions';
import SendSlidingMenu from '../Send/SendSlidingMenu';
import {
  IconContext,
  X,
  PaperPlaneRight,
  DownloadSimple,
  Export,
} from 'phosphor-react';


/**
 * @param {*} props
 * @return {*}
 */
function Capture(props) {
  const {
    setScreen,
    toggleSlide,
    toggleNavFoot,
    height,
    width,
    aspectRatio,
    camH,
    camW,
  } = props;
  const sendMenu = useRef();

  /**
   * Close
   */
  function close() {
    setScreen('camera');
    toggleSlide(false);
    toggleNavFoot(false);
  }

  /**
   * Update Drawing Canvas
   */
  function updateDrawingCanvas() {
    const vec = document.getElementById('drawingCanvas');
    const cw = (width/height) > aspectRatio ? height * aspectRatio : width;
    const ch = (width/height) >
    aspectRatio ? height : width * (aspectRatio ** -1);
    if (camH != null && camW != null) {
      vec.width = Math.min(cw, camW);
      vec.height = Math.min(ch, camH);
    } else {
      vec.width = cw;
      vec.height = ch;
    }
  }

  useEffect(() => {
    updateDrawingCanvas();
  }, [height, width]);
  return (
    <>
      <div
        className={styles.background}
      >
        <IconContext.Provider
          value={{
            color: 'black',
            size: '1.5rem',
            weight: 'bold',
          }}
        >
          <header>
            <button onClick={close}><X color='white' size='2rem'/></button>
            {/* imageCanvas */}
          </header>
          <canvas
            id='drawingCanvas'
            className={styles.drawingCanvas}
            style={{
              width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
            }}
          />
          <footer className={styles.captureFooter}>
            <div>
              <button disabled><DownloadSimple /></button>
              <button disabled><Export /></button>
            </div>
            <div>
              <button
                className={styles.sendButton}
                onClick={() => sendMenu.current.toggle()}
              >
                <h2 style={{marginRight: '0.2rem'}}>Send</h2>
                <PaperPlaneRight />
              </button>
            </div>
          </footer>
        </IconContext.Provider>
      </div>
      <SendSlidingMenu
        ref={sendMenu}
        height={height}
        width={width}
        title="Send"
        setScreen={setScreen}
        toggleSlide={toggleSlide}
        toggleNavFoot={toggleNavFoot}
      />
    </>
  );
}

Capture.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  toggleSlide: PropTypes.func,
  toggleNavFoot: PropTypes.func,
  setScreen: PropTypes.func,
  screen: PropTypes.string,
  aspectRatio: PropTypes.number,
  camH: PropTypes.number,
  camW: PropTypes.number,
};

Capture.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  toggleSlide: () => { },
  toggleNavFoot: () => { },
  setScreen: () => { },
  screen: 'camera',
  aspectRatio: 9.5/16,
  camH: null,
  camW: null,
};

/**
  * @param {*} state
  * @return {*}
  */
function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
    screen: state.camera.screen,
  };
}

const mapDispatchToProps = {
  toggleSlide,
  toggleNavFoot,
  setScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Capture);
