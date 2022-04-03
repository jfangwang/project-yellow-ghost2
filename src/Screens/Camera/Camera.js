import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Camera.module.css';
import {isMobile} from 'react-device-detect';
import {setCameraPermissions} from '../../Actions/cameraActions';

/**
 *
 *
 * @param {*} props
 * @return {*}
 */
function Camera(props) {
  const {height, width, cameraPermissions, facingMode, index} = props;
  const [currentStream, setCurrentStream] = useState(null);

  /**
   * Starts the camera
   */
  function startCamera() {
    // Prefer camera resolution nearest to 1280x720.
    const constraints = {
      audio: false,
      video: {
        facingMode: facingMode,
        aspectRatio: {
          exact: isMobile ? width / height : 9.5 / 16,
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
  }, [index]);

  return (
    <div
      className={styles.background}
      style={{height: height, width: width}}
    >
      <video
        autoPlay
        playsInline
        id='mainCamera'
        className={styles.mainCamera}
      />
      { !cameraPermissions &&
        <h1>Camera Permisions {`${cameraPermissions}`}</h1>
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
};

Camera.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  facingMode: 'user',
  index: 1,
  cameraPermissions: false,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
