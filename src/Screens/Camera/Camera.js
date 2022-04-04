import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Camera.module.css';
import {useDoubleTap} from 'use-double-tap';
import {MaskHappy, Image, IconContext} from 'phosphor-react';
import SlidingMenuRouting
  from '../../Components/SlidingMenu/SlidingMenuRouting';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Capture from '../Capture/Capture';
import {toggleSlide, toggleNavFoot} from '../../Actions/globalActions';
import {isMobile} from 'react-device-detect';
import {
  setCameraPermissions,
  toggleFacingMode,
  setScreen,
} from '../../Actions/cameraActions';

/**
 *
 *
 * @param {*} props
 * @return {*}
 */
function Camera(props) {
  const {
    height,
    width,
    cameraPermissions,
    facingMode,
    index,
    orientation,
    toggleFacingMode,
    setCameraPermissions,
    toggleSlide,
    toggleNavFoot,
    screen,
    setScreen,
  } = props;
  const [currentStream, setCurrentStream] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const doubleTap = useDoubleTap(() => toggleFacingMode());
  const memoriesMenu = useRef();

  /**
   * Starts the camera
   */
  function startCamera() {
    // Prefer camera resolution nearest to 1280x720.
    const ratio = isMobile ?
      (orientation !== 'portrait' ? width / height : height / width) :
      9.5 / 16;
    setAspectRatio(ratio);
    const constraints = {
      audio: false,
      video: {
        facingMode: facingMode,
        aspectRatio: {
          exact: ratio,
        },
        width: {ideal: 1920},
        height: {ideal: 1920},
      },
    };


    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
          setCameraPermissions(true);
          document.getElementById('mainCamera').srcObject = mediaStream;
          setCurrentStream(mediaStream);
          document.getElementById('mainCamera').onloadedmetadata = function(e) {
            document.getElementById('mainCamera').play();
          };
        })
        .catch(function(err) {
          console.log(err.name + ': ' + err.message);
          setCameraPermissions(false);
        });
  }


  /**
   * Stops the camera
   */
  function stopCamera() {
    if (currentStream !== null) {
      currentStream.getTracks().forEach((element) => {
        element.stop();
      });
      document.querySelector('video').srcObject = null;
    }
    setCurrentStream(null);
  }

  /**
   * @param {*} e
   */
  function toggleUI(e) {
    toggleNavFoot(e);
    toggleSlide(e);
  }


  /**
   * Capture
   */
  function capture() {
    toggleNavFoot(false);
    toggleSlide(false);
    setScreen('capture');
  }

  useEffect(() => {
    document.querySelector('video').onloadeddata = () => {
      console.log('video loaded');
    };
  }, []);

  useEffect(() => {
    if (cameraPermissions === true) {
      if (index === 1 && screen === 'camera') {
        stopCamera();
        startCamera();
      } else {
        stopCamera();
      }
    }
  }, [index, facingMode, orientation, screen]);

  useEffect(() => {
    if (index !== 1) {
      setScreen('camera');
    }
  }, [index]);

  return (
    <div
      className={styles.background}
      style={{height: height, width: width}}
      {...doubleTap}
    >
      <IconContext.Provider
        value={{
          color: 'white',
          size: '2rem',
          weight: 'bold',
          mirrored: true,
        }}
      >
        <video
          autoPlay
          playsInline
          id='mainCamera'
          className={styles.mainCamera}
          style={{
            transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        />
        <canvas
          id="main-canvas"
          style={{
            width: isMobile ? '100%' :
              (width / height < aspectRatio ? '100%' : 'auto'),
            height: isMobile ? '100%' :
              (width / height > aspectRatio ? '100%' : 'auto'),
            position: 'absolute',
          }}
        />
        <div className={styles.cameraOverlay}>
          <div className={styles.cameraHeader}>
            <Navbar opacity={0} position="relative" />
            <div className={styles.cameraStats}>
              <p>Height: {height}</p>
              <p>Width: {width}</p>
              <p>orientation: {orientation}</p>
              <p>aspectRatio: {aspectRatio}</p>
            </div>
          </div>
          <div className={styles.cameraFooter}>
            <div className={styles.cameraButtons}>
              <button onClick={() => memoriesMenu.current.toggle()}>
                <Image />
              </button>
              <button className={styles.captureButton} onClick={capture}/>
              <button><MaskHappy /></button>
            </div>
            <Footer position="relative" opacity={0} />
          </div>
        </div>
        <SlidingMenuRouting
          ref={memoriesMenu}
          height={height}
          width={width}
          toggleSlide={toggleUI}
          title="Memories"
          path="/memories"
        >
          <h1>Memories</h1>
        </SlidingMenuRouting>
      </IconContext.Provider>
      { screen === 'capture' &&
        <Capture />
      }
    </div>
  );
}

Camera.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  facingMode: PropTypes.string,
  index: PropTypes.number,
  cameraPermissions: PropTypes.bool,
  orientation: PropTypes.string,
  toggleFacingMode: PropTypes.func,
  setCameraPermissions: PropTypes.func,
  toggleSlide: PropTypes.func,
  toggleNavFoot: PropTypes.func,
  screen: PropTypes.string,
  setScreen: PropTypes.func,
};

Camera.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  facingMode: 'user',
  index: 1,
  cameraPermissions: false,
  orientation: window.innerHeight >= window.innerWidth ?
    'portrait' : 'landscape',
  toggleFacingMode: () => { },
  setCameraPermissions: () => { },
  toggleSlide: () => { },
  toggleNavFoot: () => { },
  setScreen: () => { },
};

/**
 *
 *
 * @param {*} state
 * @return {*}
 */
function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
    facingMode: state.camera.facingMode,
    index: state.global.index,
    cameraPermissions: state.camera.cameraPermissions,
    orientation: state.global.orientation,
    screen: state.camera.screen,
  };
}

const mapDispatchToProps = {
  setCameraPermissions,
  toggleFacingMode,
  toggleSlide,
  toggleNavFoot,
  setScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
