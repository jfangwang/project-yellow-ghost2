/* eslint-disable */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {forwardRef, useImperativeHandle} from 'react';
import SwipeableViews from 'react-swipeable-views';
import styles from './Send.module.css';
import {
  IconContext,
  CaretLeft,
  CaretDown,
  PaperPlaneRight,
} from 'phosphor-react';

const list = [];
for (let i = 0; i < 40; i++) {
  list.push(<h1 key={i}>{'User ' + i.toString()}</h1>);
}

const SendSlidingMenu = forwardRef((props, ref) => {
  const {
    height,
    width,
    axis,
    toggleSlide,
    setScreen,
    toggleNavFoot,
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
              <div style={{height: height, width: width}}></div>
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
                    overflowY: 'scroll',
                  }}
                >
                  {list}
                </div>
                <footer>
                  <div className={styles.footerNames}>
                    <h1>Footer</h1>
                    <h1>Footer</h1>
                    <h1>Footer</h1>
                    <h1>Footer</h1>
                    <h1>Footer</h1>
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
};
SendSlidingMenu.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  axis: 'y',
  setScreen: () => { },
  toggleSlide: () => { },
  toggleNavFoot: () => { },
};

export default SendSlidingMenu;
