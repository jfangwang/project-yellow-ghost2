import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Capture.module.css';
import {connect} from 'react-redux';
import {toggleSlide, toggleNavFoot} from '../../Actions/globalActions';
import {setScreen} from '../../Actions/cameraActions';
import SendSlidingMenu from '../Send/SendSlidingMenu';
import SlidingMenu from '../../Components/SlidingMenu/SlidingMenu';
import {Guest} from '../../Assets/data/GuestInfo';
import {create} from 'simple-drawing-board';
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
  CaretLeft,
  ArrowCounterClockwise,
  ArrowClockwise,
} from 'phosphor-react';
import {MetaTags} from 'react-meta-tags';
import Timer from '../Timer/Timer';
// import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';

let sdb;

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
  const toolTime = useRef();
  const [activeTool, setActiveTool] = useState(null);
  const [hideUI, setHideUI] = useState(false);

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

  /**
   * Toggle Text
   */
  function toggleText() {
    if (activeTool == null) {
      setActiveTool('text');
    } else {
      setActiveTool(null);
    }
  }

  /**
   * Toggle Draw
   */
  function toggleDraw() {
    if (activeTool == null) {
      console.log('asdf');
      setActiveTool('draw');
      sdb = create(document.getElementById('drawingCanvas'));
      sdb.setLineSize(10);
      sdb.setLineColor('red');
      sdb.observer.on('drawBegin', (coords) => {
        setHideUI(true);
      });
      sdb.observer.on('drawEnd', (coords) => {
        setHideUI(false);
      });
    } else {
      setActiveTool(null);
      sdb.destroy();
    }
  }

  /**
   * Undo draw
   */
  async function undo() {
    await sdb.undo();
  }

  /**
   * Redo draw
   */
  async function redo() {
    await sdb.redo();
  }

  /**
   * Toggle Crop
   */
  function toggleCrop() {
    if (activeTool == null) {
      setActiveTool('crop');
    } else {
      setActiveTool(null);
    }
  }

  /**
   * Toggle Link
   */
  function toggleLink() {
    if (activeTool == null) {
      setActiveTool('link');
    } else {
      setActiveTool(null);
    }
  }

  /**
   * Toggle Time
   */
  function toggleTime() {
    if (activeTool == null) {
      setActiveTool(null);
      toolTime.current.toggle();
    } else {
      setActiveTool(null);
    }
  }

  /**
   * Close whatever tool is open
   */
  function closeTool() {
    activeTool === 'text' && toggleText();
    activeTool === 'draw' && toggleDraw();
    activeTool === 'crop' && toggleCrop();
    activeTool === 'link' && toggleLink();
    setActiveTool(null);
  }

  useEffect(() => {
    updateDrawingCanvas();
  }, [height, width]);
  return (
    <>
      <MetaTags>
        <meta
          name = "viewport"
          content = "width=device-width, \
          minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
      </MetaTags>
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
        { !hideUI &&
          <>
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
                  <button
                    onClick={activeTool == null ? close : closeTool}
                  >
                    { activeTool == null ?
                      <X /> : <CaretLeft />
                    }
                  </button>
                </div>
                <div
                  className={styles.toolbar}
                  style={{
                    flexDirection: orientation === 'landscape' ?
                      'row':'column',
                  }}
                >
                  { activeTool == null || activeTool === 'text' ?
                    <button
                      onClick={toggleText}
                    ><TextT /></button>: null}
                  { activeTool == null || activeTool === 'draw' ?
                    <div className={styles.drawToolContainer}>
                      { activeTool === 'draw' &&
                        <>
                          <button onClick={undo}>
                            <ArrowCounterClockwise />
                          </button>
                          <button onClick={redo}>
                            <ArrowClockwise />
                          </button>
                        </>
                      }
                      <button onClick={toggleDraw}>
                        <PencilSimple />
                      </button>
                    </div> :
                    null}
                  { activeTool == null || activeTool === 'crop' ?
                    <button
                      onClick={toggleCrop}
                    ><Crop /></button> : null}
                  { activeTool == null || activeTool === 'link' ?
                    <button
                      onClick={toggleLink}
                    ><Paperclip /></button> : null}
                  { activeTool == null || activeTool === 'time' ?
                  <button
                    onClick={toggleTime}
                  ><Alarm /></button> : null}
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
          </>
        }
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
      <SlidingMenu
        ref={toolTime}
        height={height}
        width={width}
        axis='x'
        backgroundColor='rgba(0, 0, 0, 0.7)'
      >
        <Timer />
      </SlidingMenu>
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
