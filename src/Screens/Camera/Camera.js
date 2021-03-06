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
import {
  drawDots,
  drawBox,
  drawTriangles,
  drawRandomColorMask,
} from './utilities';
// import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

let fdcount = 0;
let net;
let interval;
let filter = null;
const filterList = ['nothing', 'box', 'dots', 'mask', 'coloredMask'];
const settings = {
  className: styles.slider,
  dots: false,
  infinite: true,
  slidesToScroll: 1,
  centerMode: true,
  focusOnSelect: true,
  variableWidth: true,
  centerPadding: '0px',
  touchThreshold: 5,
  speed: 300,
  swipe: true,
  afterChange: (e) => filter = filterList[e],
};

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
    hideNavFoot,
  } = props;
  const [currentStream, setCurrentStream] = useState(null);
  const [TFOn, setTFOn] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(
    isMobile ? (width/height) : 9.5/16);
  const [w, setw] = useState(null);
  const [h, seth] = useState(null);
  const [vidLoaded, setVidLoaded] = useState(false);
  const doubleTap = useDoubleTap(() => {
    if (TFOn) {
      if (screen === 'camera' && vidLoaded && filter !== null) {
        toggleFacingMode();
      }
    } else {
      if (screen === 'camera' && vidLoaded) {
        toggleFacingMode();
      }
    }
  });
  const memoriesMenu = useRef();

  /**
   * Starts the camera
   */
  function startCamera() {
    updateVECanvas();
    setVidLoaded(false);
    const fec = document.getElementById('faceEffectsCanvas');
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
        width: {ideal: !TFOn ? 10000 : Math.max(fec.height, fec.width)},
        height: {ideal: !TFOn ? 10000 : Math.max(fec.height, fec.width)},
      },
    };


    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
          const v = document.getElementById('mainCamera');
          const ol = document.querySelector('#cameraOverlay');
          if (ol) {
            ol.classList.remove(styles.fadeOut);
          }
          document.getElementById('mainCamera').srcObject = mediaStream;
          setCurrentStream(mediaStream);
          setCameraPermissions(true);
          document.getElementById('mainCamera').onloadeddata = function(e) {
            v.play();
            setw(v.videoWidth);
            seth(v.videoHeight);
            setAspectRatio(v.videoWidth / v.videoHeight);
            setVidLoaded(true);
            updateVECanvas();
            if (TFOn) {
              runFacemesh();
            } else if (ol) {
              ol.classList.remove(styles.loading);
              ol.classList.add(styles.fadeOut);
            }
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
  async function capture() {
    const fec = document.getElementById('faceEffectsCanvas');
    const video = document.getElementById('mainCamera');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    if (facingMode === 'user') {
      await ctx.scale(-1, 1);
      await ctx
          .drawImage(video, canvas.width * -1, 0, canvas.width, canvas.height);
      captureImage('Image Taken Place Holder');
    } else {
      await ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      captureImage('Image Taken Place Holder');
    }
    if (TFOn) {
      await ctx.drawImage(fec, 0, 0, canvas.width, canvas.height);
    }
    await ctx.scale(1, 1);
    await ctx.drawImage(fec, 0, 0, canvas.width, canvas.height);
    toggleNavFoot(true);
    toggleSlide(true);
    setScreen('capture');
  }

  /**
   * Starts Tensorflow
   */
  async function runFacemesh() {
    fdcount = 0;
    updateVECanvas();
    console.log('Starting Facemesh');
    const model = facemesh.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: 'mediapipe', // or 'tfjs'
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    };
    net =
    await facemesh.createDetector(model, detectorConfig);
    console.log('model loaded');
    // detect(net);
    interval = setInterval(async () => {
      await detect(net);
    }, 10);
  };

  /**
   * @param {*} net
   */
  async function detect(net) {
    // Get canvas context
    const ol = document.querySelector('#cameraOverlay');
    const fec = document.getElementById('faceEffectsCanvas');
    const ctx = document.getElementById('faceEffectsCanvas').getContext('2d');
    const video = document.getElementById('mainCamera');
    if (document.getElementById('closeFace')) {
      const estimationConfig = {
        flipHorizontal: facingMode === 'user' ? true : false,
      };
      const face = await net.estimateFaces(video, estimationConfig);
      fdcount += 1;
      if (fdcount === 1) {
        ol.classList.remove(styles.loading);
        ol.classList.add(styles.fadeOut);
        filter = 'nothing';
      }

      ctx.clearRect(0, 0, fec.width, fec.height);
      console.log('filter: ', filter);
      if (filter === 'box') {
        drawBox(face, ctx);
      } else if (filter === 'dots') {
        drawDots(face, ctx);
      } else if (filter === 'mask') {
        drawTriangles(face, ctx);
      } else if (filter === 'coloredMask') {
        drawRandomColorMask(face, ctx);
      }
    } else {
      clearInterval(interval);
      filter = null;
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
    if (index === 1 && screen === 'camera') {
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
    }
    vec.width = width;
    vec.height = height;
    // console.log(fec.width, fec.height, width, height);
  }

  useEffect(() => {
    // document.querySelector('video').onloadeddata = () => {
    //   console.log('video loaded');
    // };
    main();
  }, []);

  useEffect(() => {
    const ol = document.querySelector('#cameraOverlay');
    if (ol) {
      ol.classList.add(styles.loading);
    }
    stopCamera();
    startCamera();
    if (TFOn) {
      toggleSlide(true);
      toggleNavFoot(true);
    } else {
      toggleSlide(false);
      toggleNavFoot(false);
      filter = null;
    }
  }, [TFOn]);

  useEffect(() => {
    updateVECanvas();
    if (index === 1 && screen === 'camera') {
      setTFOn(false);
    }
  }, [height, width]);

  useEffect(() => {
    if (cameraPermissions === true || cameraPermissions === null) {
      if (index === 1 && screen === 'camera') {
        const ol = document.querySelector('#cameraOverlay');
        if (ol) {
          ol.classList.add(styles.loading);
        }
        stopCamera();
        startCamera();
        updateSendList([]);
        updateVECanvas();
        setTFOn(false);
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
      }
    } else {
      const ol = document.querySelector('#cameraOverlay');
      if (ol) {
        ol.classList.remove(styles.loading);
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
              maxWidth: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              maxHeight: (width/height) <= (aspectRatio) ? 'auto' : '100%',
              width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
              height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
              zIndex: index == 1 ? 0 : -10,
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
              zIndex: index == 1 ? 0 : -10,
            }}
          />
          <canvas
            id="visualEffectsCanvas"
            className={styles.visualEffectsCanvas}
            style={{
              zIndex: index == 1 ? 0 : -10,
            }}
          />
          { (screen === 'camera') &&
            <div id='cameraOverlay' className={styles.cameraOverlay}>
              <div className={styles.cameraHeader}>
                { !hideNavFoot && <Navbar opacity={0} position="relative" /> }
                {/* <div className={styles.cameraStats}>
                  <p>Device AR: {width/height}</p>
                  <p>Height: {height} Width: {width}</p>
                  <p>Cam AR: {w/h}</p>
                  <p>Cam H: {h} Cam W: {w}</p>
                  <p>orientation: {orientation}</p>
                </div> */}
              </div>
              <div className={styles.cameraFooter}>
                {TFOn &&
                  <Slider {...settings}>
                    {filterList.map((item) => (
                      <div
                        key={item}
                        className={styles.sliderItem}
                      >
                        <h3>{item}</h3>
                      </div>
                    ))}
                  </Slider>
                }
                <div
                  style={{flexDirection: TFOn ? 'column' : 'row'}}
                  className={styles.cameraButtons}
                >
                  { !TFOn &&
                    <button onClick={() => memoriesMenu.current.toggle()}>
                      <Image />
                    </button>
                  }
                  <button
                    style={{zIndex: TFOn ? 1 : 0}}
                    className={styles.captureButton}
                    onClick={
                      (screen === 'camera' && vidLoaded && cameraPermissions) ?
                      capture : () => {}
                    }
                  />
                  { !TFOn ?
                    <button
                      onClick={
                        (screen === 'camera'&&vidLoaded&&cameraPermissions) ?
                        () => setTFOn(true) : () => {}}
                    ><MaskHappy /></button> :
                    <button id='closeFace' onClick={() => setTFOn(false)}>
                      <XCircle />
                    </button>
                  }
                </div>
                { !hideNavFoot && <Footer position="relative" opacity={0} /> }
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
          <Capture
            aspectRatio={aspectRatio}
            camH={h}
            camW={w}
          />
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
  hideNavFoot: PropTypes.bool,
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
    hideNavFoot: state.global.hideNavFoot,
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
