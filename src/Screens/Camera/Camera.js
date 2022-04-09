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
import {updateSendList} from '../../Actions/cameraActions';
import {isMobile} from 'react-device-detect';
import {MetaTags} from 'react-meta-tags';
import {
  setCameraPermissions,
  toggleFacingMode,
  setScreen,
  captureImage,
} from '../../Actions/cameraActions';
import Send from '../Send/Send';
import Memories from '../Memories/Memories';

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
    captureImage,
    updateSendList,
  } = props;
  const [currentStream, setCurrentStream] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(
    isMobile ? (width/height) : 9.5/16);
  const [w, setw] = useState(null);
  const [h, seth] = useState(null);
  const [vidLoaded, setVidLoaded] = useState(false);
  const doubleTap = useDoubleTap(() => {
    if (screen === 'camera') {
      toggleFacingMode();
    }
  });
  const memoriesMenu = useRef();

  /**
   * Starts the camera
   */
  function startCamera() {
    setVidLoaded(false);
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
        width: {ideal: 10000},
        height: {ideal: 10000},
      },
    };


    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
          const v = document.getElementById('mainCamera');
          const ol = document.querySelector('#cameraOverlay');
          ol.classList.remove(styles.fadeIn);
          ol.classList.add(styles.loading);
          setCameraPermissions(true);
          document.getElementById('mainCamera').srcObject = mediaStream;
          setCurrentStream(mediaStream);
          document.getElementById('mainCamera').onloadedmetadata = function(e) {
            v.play();
            setw(v.videoWidth);
            seth(v.videoHeight);
            setAspectRatio(v.videoWidth / v.videoHeight);
            updateVECanvas();
            setVidLoaded(true);
            ol.classList.remove(styles.loading);
            ol.classList.add(styles.fadeIn);
          };
        })
        .catch(function(err) {
          ol.classList.remove(styles.loading);
          console.log(err.name + ': ' + err.message);
          setCameraPermissions(false);
          setAspectRatio(isMobile ? (width/height) : 9.5/16);
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
    setVidLoaded(false);
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
    const video = document.getElementById('mainCamera');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    if (facingMode === 'user') {
      ctx.scale(-1, 1);
      ctx.drawImage(video, canvas.width * -1, 0, canvas.width, canvas.height);
      captureImage('Image Taken Place Holder');
    } else {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      captureImage('Image Taken Place Holder');
    }
    toggleNavFoot(false);
    toggleSlide(false);
    setScreen('capture');
  }

  /**
   * Updates the visual effects canvas
   */
  function updateVECanvas() {
    const vec = document.getElementById('visualEffectsCanvas');
    const cw = (width/height) > aspectRatio ? height * aspectRatio : width;
    const ch = (width/height) >
    aspectRatio ? height : width * (aspectRatio ** -1);
    if (h != null && w != null) {
      vec.width = Math.min(cw, w);
      vec.height = Math.min(ch, h);
    } else {
      vec.width = cw;
      vec.height = ch;
    }
    // console.log(vec.height, vec.width, h, w);
  }

  useEffect(() => {
    document.querySelector('video').onloadeddata = () => {
      console.log('video loaded');
    };
  }, []);

  useEffect(() => {
    updateVECanvas();
  }, [height, width]);

  useEffect(() => {
    if (cameraPermissions === true) {
      if (index === 1 && screen === 'camera') {
        stopCamera();
        startCamera();
        updateSendList([]);
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');
        if (facingMode === 'user') {
          ctx.clearRect(canvas.width*-1, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
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
    <>
      <MetaTags>
        <meta
          name = "viewport"
          content = "width=device-width, \
          minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </MetaTags>
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
            id="imageCanvas"
            className={styles.imageCanvas}
            style={{
              width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
            }}
          />
          <canvas
            id="visualEffectsCanvas"
            className={styles.visualEffectsCanvas}
            style={{
              width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
            }}
          />
          { !cameraPermissions &&
            <>
              <h1>Camera Disabled</h1>
              <button
                style={{
                  zIndex: 0,
                }}
                onClick={() => startCamera()}
              >
                <h1>Allow</h1>
              </button>
            </>
          }
          { (screen === 'camera') &&
            <div id='cameraOverlay' className={styles.cameraOverlay}>
              <div className={styles.cameraHeader}>
                <Navbar opacity={0} position="relative" />
                <div className={styles.cameraStats}>
                  <p>Device AR: {width/height}</p>
                  <p>Height: {height}</p>
                  <p>Width: {width}</p>
                  <p>Cam AR: {w/h}</p>
                  <p>Cam H: {h}</p>
                  <p>Cam W: {w}</p>
                  <p>orientation: {orientation}</p>
                  <p>aspectRatio: {aspectRatio}</p>
                </div>
              </div>
              <div className={styles.cameraFooter}>
                <div className={styles.cameraButtons}>
                  <button onClick={() => memoriesMenu.current.toggle()}>
                    <Image />
                  </button>
                  <button
                    className={styles.captureButton}
                    onClick={
                      (screen === 'camera' && vidLoaded && cameraPermissions) ?
                      capture : () => {}
                    }
                  />
                  <button
                    onClick={
                      (screen === 'camera' && vidLoaded && cameraPermissions) ?
                      () => {} : () => {}
                    }
                  ><MaskHappy /></button>
                </div>
                <Footer position="relative" opacity={0} />
              </div>
            </div>
          }
          <SlidingMenuRouting
            ref={memoriesMenu}
            height={height}
            width={width}
            toggleSlide={toggleUI}
            title="Memories"
            path="/memories"
          >
            <Memories />
          </SlidingMenuRouting>
        </IconContext.Provider>
        { screen === 'capture' &&
          <Capture aspectRatio={aspectRatio} camH={h} camW={w}/>
        }
        { screen === 'send' &&
          <Send />
        }
      </div>
    </>
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
  captureImage: PropTypes.func,
  updateSendList: PropTypes.func,
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
  captureImage: () => { },
  updateSendList: () => { },
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
  captureImage,
  updateSendList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
