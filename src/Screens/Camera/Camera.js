import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Camera.module.css';
import {useDoubleTap} from 'use-double-tap';
import {
  isMobile,
} from 'react-device-detect';
import {
  setCameraPermissions,
  toggleFacingMode,
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
  } = props;
  const [currentStream, setCurrentStream] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(16/9);
  const doubleTap = useDoubleTap(() => toggleFacingMode());

  /**
   * Starts the camera
   */
  function startCamera() {
    // Prefer camera resolution nearest to 1280x720.
    setAspectRatio(isMobile ?
      (orientation !== 'portrait' ? width / height : height / width ) :
      9.5 / 16);
    const constraints = {
      audio: false,
      video: {
        facingMode: facingMode,
        aspectRatio: {
          exact: isMobile ?
          (orientation !== 'portrait' ? width / height : height / width ) :
          9.5 / 16,
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

  useEffect(() => {
    document.querySelector('video').onloadeddata = () => {
      console.log('video loaded');
    };
  }, []);

  useEffect(() => {
    if (cameraPermissions === true) {
      if (index === 1) {
        stopCamera();
        startCamera();
      } else {
        stopCamera();
      }
    }
  }, [index, facingMode]);

  useEffect(() => {
    setAspectRatio(isMobile ?
      (orientation !== 'portrait' ? width / height : height / width ) :
      9.5 / 16);
  }, [orientation, height, width]);

  return (
    <div
      className={styles.background}
      style={{height: height, width: width}}
      {...doubleTap}
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
      {/* <div style={{
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
      }}>
        <p>Height: {height}</p>
        <p>Width: {width}</p>
        <p>orientation: {orientation}</p>
        <p>aspectRatio: {aspectRatio}</p>
      </div> */}
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
};

Camera.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  facingMode: 'user',
  index: 1,
  cameraPermissions: false,
  orientation: window.innerHeight >= window.innerWidth ?
  'portrait' : 'landscape',
  toggleFacingMode: () => {},
  setCameraPermissions: () => {},
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
  };
}

const mapDispatchToProps = {
  setCameraPermissions,
  toggleFacingMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
