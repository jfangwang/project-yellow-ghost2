import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Camera.module.css';
import {useDoubleTap} from 'use-double-tap';
import {MaskHappy, Image, IconContext, XCircle} from 'phosphor-react';
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
import main from './Fireworks';
import {drawMesh} from './utilities';
// import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';

let fdcount = 0;
let net;
let faceStream = null;

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
  const [faceVideoOn, setFaceVideoOn] = useState(false);
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
   * Starts the FaceInputCamera
   */
  function startFaceInputCamera() {
    updateVECanvas();
    const fec = document.getElementById('faceEffectsCanvas');
    const constraints = {
      audio: false,
      video: {
        facingMode: facingMode,
        aspectRatio: {
          exact: aspectRatio,
        },
        width: {ideal: fec.width},
        height: {ideal: fec.height},
      },
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
          const fv = document.getElementById('faceInputCamera');
          fv.srcObject = stream;
          faceStream = stream;
          fv.onloadeddata = (event) => {
            console.log('face input camera is running');
            setFaceVideoOn(true);
            runFacemesh();
          };
        })
        .catch(function(err) {
          console.log('faceInputCamera: ', err);
          faceStream = null;
        });
  }

  /**
   * Stops the camera
   */
  function stopFaceInputCamera() {
    if (faceStream !== null) {
      faceStream.getTracks().forEach((element) => {
        element.stop();
      });
      document.querySelector('#faceInputCamera').srcObject = null;
    }
    console.log('face camera stopped', faceStream);
    faceStream = null;
  }

  /**
   * Starts the camera
   */
  function startCamera() {
    setVidLoaded(false);
    const ratio = isMobile ?
      (orientation !== 'portrait' ? width / height : height / width) :
      (orientation !== 'portrait' ? 16/9.5 : 9.5/16);
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
          ol.classList.remove(styles.fadeOut);
          document.getElementById('mainCamera').srcObject = mediaStream;
          setCurrentStream(mediaStream);
          setCameraPermissions(true);
          document.getElementById('mainCamera').onloadeddata = function(e) {
            v.play();
            setw(v.videoWidth);
            seth(v.videoHeight);
            setAspectRatio(v.videoWidth / v.videoHeight);
            setVidLoaded(true);
            ol.classList.remove(styles.loading);
            ol.classList.add(styles.fadeOut);
            updateVECanvas();
          };
        })
        .catch(function(err) {
          const ol = document.querySelector('#cameraOverlay');
          if (ol) {
            ol.classList.remove(styles.loading);
          }
          if (cameraPermissions === false) {
            alert('Enable camera in browser settings or refresh the page.');
          }
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
      document.querySelector('#mainCamera').srcObject = null;
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
   * Starts Tensorflow
   */
  async function runFacemesh() {
    fdcount = 0;
    updateVECanvas();
    console.log('Starting Facemesh');
    net =
    await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    console.log('model loaded');
    detect(net);
  };

  /**
   * @param {*} net
   */
  async function detect(net) {
    // Get canvas context
    const fec = document.getElementById('faceEffectsCanvas');
    const ctx = document.getElementById('faceEffectsCanvas').getContext('2d');
    if (faceStream != null) {
      fdcount += 1;
      if (fdcount === 1) {
        ctx.translate(fec.width, 0);
      }
      const video = document.getElementById('faceInputCamera');
      const face = await net.estimateFaces({
        input: video,
        flipHorizontal: true,
      });

      requestAnimationFrame(()=>{
        console.log('running');
        ctx.translate(fec.width * -1, 0);
        ctx.clearRect(0, 0, fec.width, fec.height);
        ctx.translate(fec.width, 0);
        drawMesh(face, ctx);
        detect(net);
      });
    } else {
      ctx.translate(fec.width * -1, 0);
      ctx.clearRect(0, 0, fec.width, fec.height);
      console.log('faceStream is null');
    }
  }

  /**
   * Updates the visual effects canvas
   */
  function updateVECanvas() {
    const fec = document.getElementById('faceEffectsCanvas');
    const vec = document.getElementById('visualEffectsCanvas');
    const cw = isMobile ?
      width : ((width/height) > aspectRatio ? height * aspectRatio : width);
    const ch = isMobile ?
      height : ((width/height)>aspectRatio ? height : width*(aspectRatio**-1));
    if (h != null && w != null) {
      // vec.width = Math.min(cw, w);
      // vec.height = Math.min(ch, h);
      fec.width = Math.min(cw, w);
      fec.height = Math.min(ch, h);
    } else {
      // vec.width = cw;
      // vec.height = ch;
      fec.width = cw;
      fec.height = ch;
    }
    vec.width = width;
    vec.height = height;
    console.log(fec.width, fec.height, width, height);
  }

  useEffect(() => {
    // document.querySelector('video').onloadeddata = () => {
    //   console.log('video loaded');
    // };
    main();
  }, []);

  useEffect(() => {
    updateVECanvas();
  }, [height, width]);

  useEffect(() => {
    if (cameraPermissions === true || cameraPermissions === null) {
      if (index === 1 && screen === 'camera') {
        const ol = document.querySelector('#cameraOverlay');
        ol.classList.add(styles.loading);
        stopCamera();
        startCamera();
        if (faceVideoOn) {
          startFaceInputCamera();
        }
        updateSendList([]);
        updateVECanvas();
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');
        if (facingMode === 'user') {
          ctx.clearRect(canvas.width*-1, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        canvas.width = 0;
        canvas.height = 0;
      } else {
        stopCamera();
        stopFaceInputCamera();
      }
    } else {
      const ol = document.querySelector('#cameraOverlay');
      ol.classList.remove(styles.loading);
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
            id='faceInputCamera'
            className={styles.faceInputCamera}
            style={{
              transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)',
            }}
          />
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
              maxWidth: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              maxHeight: (width/height) <= (aspectRatio) ? 'auto' : '100%',
              width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
            }}
          />
          <canvas
            id="faceEffectsCanvas"
            className={styles.faceEffectsCanvas}
            style={{
              maxWidth: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              maxHeight: (width/height) <= (aspectRatio) ? 'auto' : '100%',
              width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
            }}
          />
          <canvas
            id="visualEffectsCanvas"
            className={styles.visualEffectsCanvas}
            style={{
              zIndex: screen === 'camera' ? 0 : -1,
            }}
          />
          { (screen === 'camera') &&
            <div id='cameraOverlay' className={styles.cameraOverlay}>
              <div className={styles.cameraHeader}>
                <Navbar opacity={0} position="relative" />
                <div className={styles.cameraStats}>
                  <p>Device AR: {width/height}</p>
                  <p>Height: {height} Width: {width}</p>
                  <p>Cam AR: {w/h}</p>
                  <p>Cam H: {h} Cam W: {w}</p>
                  <p>orientation: {orientation}</p>
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
                    onClick={ faceVideoOn == false ?
                      ((screen === 'camera' && vidLoaded && cameraPermissions) ?
                        startFaceInputCamera : () => {}) :
                      (() => {
                        stopFaceInputCamera();
                        setFaceVideoOn(false);
                      })
                    }
                  >{faceVideoOn == false ? <MaskHappy /> : <XCircle />}</button>
                </div>
                <Footer position="relative" opacity={0} />
              </div>
            </div>
          }
          { cameraPermissions === false &&
            <div className={styles.disabled}>
              <h1>Camera Disabled</h1>
              <button
                style={{
                  zIndex: 0,
                }}
                onClick={() => startCamera()}
              >
                <h1>Allow</h1>
              </button>
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
