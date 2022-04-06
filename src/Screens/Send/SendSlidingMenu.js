/* eslint-disable */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {forwardRef, useImperativeHandle} from 'react';
import SwipeableViews from 'react-swipeable-views';
import styles from './Send.module.css';
import SendItem from './SendItem';
import {Guest, FakeDB} from '../../Assets/data/GuestInfo';
import {connect} from 'react-redux';
import {
  editUser
} from '../../Actions/userActions';
import {
  IconContext,
  CaretLeft,
  CaretDown,
  PaperPlaneRight,
} from 'phosphor-react';


const SendSlidingMenu = forwardRef((props, ref) => {
  const {
    height,
    width,
    axis,
    toggleSlide,
    setScreen,
    toggleNavFoot,
    user,
    sendList,
    aspectRatio,
    isUserLoggedIn,
    editUser,
  } = props;
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  useImperativeHandle(ref, () => ({
    toggle(e = !show) {
      setShow(e);
    },
  }));

  useEffect(() => {
    if (show) {
      changeToIndex(1);
    }
  }, [show]);

  /**
   * Change to index
   * @param {*} e
   */
  function changeToIndex(e) {
    setIndex(e);
  }

  /**
   * Check which index slide is on
   * @param {*} e
   */
  function checkIndex(e) {
    if (index === 0) {
      setShow(false);
    }
  }
  /**
   * close
   */
  const close = () => {
    changeToIndex(0);
  };

  /**
   * Disables slide unles scroll is at the top
   * @param {*} e
   */
  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop > 0 && axis === 'y') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  /**
   * Send
   */
   function send() {

    const img = document.getElementById('imageCanvas');
    const drawing = document.getElementById('drawingCanvas');
    let final = document.getElementById('finalImage');
    final.width = img.width;
    final.height = img.height;
    final = document.getElementById('finalImage').getContext('2d');
    final.clearRect(0, 0, final.width, final.height);
    final.drawImage(img, 0, 0, img.width, img.height);
    final.drawImage(drawing, 0, 0, drawing.width, drawing.height);
    const dataURL = document.getElementById('finalImage').toDataURL();
    const date = new Date();
    const updated = {...user}
    const friends = updated.friends

    if (!isUserLoggedIn) {
      sendList.forEach((id) => {
        // Update User's Fields
        friends[id]['status'] = 'sent';
        friends[id]['sent']['lastTimeStamp'] = date.toISOString();
        friends[id]['lastTimeStamp'] = date.toISOString();
        friends[id]['sent']['receivedSnaps'] += 1
        // Update Friend's Fields in FakeDB
        FakeDB[id]['friends'][id]['received']['lastTimeStamp'] = date.toISOString();
        FakeDB[id]['friends'][id]['received']['receivedSnaps'] += 1;
        FakeDB[id]['friends'][id]['status'] = 'new';
        FakeDB[id]['friends'][id]['newSnaps'] = {[date.toISOString()]: dataURL};
      })
      editUser(updated);
    }

    setScreen('camera');
    toggleSlide();
    toggleNavFoot();
  };

  return (
    <>
      {show &&
        <IconContext.Provider
          value={{
            color: 'black',
            size: '1.5rem',
            weight: 'bold',
          }}
        >
          <div style={{overflow: 'hidden'}}>
            <SwipeableViews
              disabled={disabled}
              index={index}
              onChangeIndex={changeToIndex}
              onTransitionEnd={checkIndex}
              enableMouseEvents
              axis={axis}
              containerStyle={{height: height, width: width}}
            >
              <div style={{height: height, width: width}}>
                <canvas
                  id='finalImage'
                  style={{
                    width: (width/height) <= (aspectRatio) ? '100%' : 'auto',
                    height: (width/height) <= (aspectRatio) ? 'auto' : '100%',
                    display: 'none',
                  }}
                />
              </div>
              <div
                className={styles.background}
                style={{height: height, width: width}}
              >
                <header>
                  <button onClick={close}>
                    {axis === 'y' ? <CaretDown/> : <CaretLeft/>}
                  </button>
                  <input
                    type='search'
                    autoComplete='on'
                    placeholder='Send To...'
                  ></input>
                </header>
                <div
                  onScroll={handleScroll}
                  style={{
                    height: height,
                    width: width,
                    overflowY: 'auto',
                  }}
                  className={styles.body}
                >
                  <h2>Friends</h2>
                  <ul className={styles.friendsList}>
                    {Object.keys(user.friends).map((item, index) => (
                      <SendItem key={index} friend={user.friends[item]}/>
                    ))}
                  </ul>
                </div>
                { sendList.length > 0 &&
                  <footer>
                    <div className={styles.footerNames}>
                        {sendList.map((item) => (
                          <h1 key={user.friends[item]['username']}>
                            {user.friends[item]['username']}
                          </h1>
                        ))}
                    </div>
                    <div>
                      <button
                        className={styles.sendButton}
                        onClick={send}
                      >
                        <h2 style={{marginRight: '0.2rem'}}>Send</h2>
                        <PaperPlaneRight />
                      </button>
                    </div>
                  </footer>
                }
              </div>
            </SwipeableViews>
          </div>
        </IconContext.Provider>
      }
    </>
  );
});

SendSlidingMenu.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  axis: PropTypes.string,
  setScreen: PropTypes.func,
  toggleSlide: PropTypes.func,
  toggleNavFoot: PropTypes.func,
  user: PropTypes.object,
  sendList: PropTypes.array,
  aspectRatio: PropTypes.number,
  isUserLoggedIn: PropTypes.bool,
};
SendSlidingMenu.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  axis: 'y',
  setScreen: () => { },
  toggleSlide: () => { },
  toggleNavFoot: () => { },
  user: Guest,
  sendList: [],
  isUserLoggedIn: false,
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
    user: state.user.user,
    isUserLoggedIn: state.user.isUserLoggedIn,
  };
}

const mapDispatchToProps = {
  editUser,
  // setCameraPermissions,
  // toggleFacingMode,
  // toggleSlide,
  // toggleNavFoot,
  // setScreen,
  // captureImage,
  // updateSendList,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(SendSlidingMenu);
