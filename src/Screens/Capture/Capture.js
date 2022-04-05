import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './Capture.module.css';
import {connect} from 'react-redux';
import {toggleSlide, toggleNavFoot} from '../../Actions/globalActions';
import {setScreen} from '../../Actions/cameraActions';
import SendSlidingMenu from '../Send/SendSlidingMenu';
import {Guest} from '../../Assets/data/GuestInfo';
import {
  IconContext,
  X,
  PaperPlaneRight,
  DownloadSimple,
  Export,
  TextT,
  PencilSimple,
  Crop,
  Paperclip,
  Alarm,
} from 'phosphor-react';
// import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';


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
    user,
    sendList,
    orientation,
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
        <canvas
          id='drawingCanvas'
          className={styles.drawingCanvas}
          style={{
            width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
            height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
          }}
        />
        {/* <SwipeableViews
          enableMouseEvents
          containerStyle={{
            width: (width/height) <= (aspectRatio) ?
              width : height * aspectRatio,
            height: (width/height) <= (aspectRatio) ?
              width * (aspectRatio ** -1) : height,
          }}
          style={{
            position: 'absolute',
            width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
            height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
          }}
          slideStyle={{
            height: '100%',
            width: '100%',
          }}
        >
          <div/>
          <div className={styles.screen1}/>
        </SwipeableViews> */}
        <header>
          <IconContext.Provider
            value={{
              color: 'white',
              size: '2rem',
              weight: 'bold',
            }}
          >
            <div
              className={styles.toolbar}
              style={{
                flexDirection: orientation === 'landscape' ?
                  'column':'column',
              }}
            >
              <button onClick={close}><X /></button>
            </div>
            <div
              className={styles.toolbar}
              style={{
                flexDirection: orientation === 'landscape' ?
                  'row':'column',
              }}
            >
              <button><TextT /></button>
              <button><PencilSimple /></button>
              <button><Crop /></button>
              <button><Paperclip /></button>
              <button><Alarm /></button>
            </div>
          </IconContext.Provider>
        </header>
        <footer className={styles.captureFooter}>
          <IconContext.Provider
            value={{
              color: 'black',
              size: '1.5rem',
              weight: 'bold',
            }}
          >
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
          </IconContext.Provider>
        </footer>
      </div>
      <SendSlidingMenu
        ref={sendMenu}
        height={height}
        width={width}
        title="Send"
        setScreen={setScreen}
        toggleSlide={toggleSlide}
        toggleNavFoot={toggleNavFoot}
        user={user}
        sendList={sendList}
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
  user: PropTypes.object,
  sendList: PropTypes.array,
  orientation: PropTypes.string,
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
  user: Guest,
  sendList: [],
  orientation: window.innerHeight > window.innerWidth ?
  'portrait':'landscape',
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
    user: state.user.user,
    sendList: state.camera.sendList,
    orientation: state.global.orientation,
  };
}

const mapDispatchToProps = {
  toggleSlide,
  toggleNavFoot,
  setScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Capture);
