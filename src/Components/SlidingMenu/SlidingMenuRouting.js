import React, { Component, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, BrowserRouter, useLocation } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import Account from '../../Screens/Account/Account';
import Search from '../../Screens/Search/Search';
import styles from './SlidingMenu.module.css';
import { IconContext, CaretLeft, CaretDown } from 'phosphor-react';

const SlidingMenuRouting = forwardRef((props, ref) => {
  const { height, width, axis, children, toggleSlide, title, path } = props
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [prevPath, setPrevPath] = useState("/");
  const location = useLocation();
  useImperativeHandle(ref, () => ({
    toggle() {
      setPrevPath(location.pathname)
      setShow(true);
      toggleSlide(true);
    }
  }))
  useEffect(() => {
    if (show) {
      setTimeout(() => changeToIndex(1), 100);
    }
  }, [show])
  useEffect(() => {
    if (location.pathname === path) {
      setShow(true);
      toggleSlide(true)
    }
  }, [])
  function changeToIndex(e) {
    setIndex(e)
  }
  function checkIndex(e) {
    if (index === 0) {
      setShow(false);
      toggleSlide(false);
    }
  }
  const close = () => {
    changeToIndex(0)
  }
  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop > 0 && axis === 'y') {
      setDisabled(true);
    } else {
      setDisabled(false)
    }
  }
  return (
    <>
      {show &&
        <SwipeableRoutes
          disabled={disabled}
          index={index}
          onChangeIndex={changeToIndex}
          onTransitionEnd={checkIndex}
          enableMouseEvents
          axis={axis}
          containerStyle={{ height: height, width: width }}
          style={{
            position: 'absolute',
            top: 0,
          }}
          replace
        >
          <Route path={prevPath}>
            <div style={{ height: height, width: width }}></div>
          </Route>
          <Route path={path}>
            {title !== "" ?
              <div
                onScroll={handleScroll}
                style={{ backgroundColor: "white", height: height, overflowY: 'scroll' }}
              >
                <div className={styles.slidingMenuNavbar}>
                  <IconContext.Provider
                    value={{
                      color: "black",
                      size: 32,
                      weight: "bold",
                      mirrored: true,
                    }}
                  >
                    <div>
                      <button onClick={close}>{axis === 'y' ? <CaretDown /> : <CaretLeft />}</button>
                    </div>
                    <div>
                      <h1>{title}</h1>
                    </div>
                    <div>
                      <button style={{ opacity: 0 }}><CaretLeft /></button>
                    </div>
                  </IconContext.Provider>
                </div>
                <div>
                  {children}
                </div>
              </div>
              :
              <></>
            }
          </Route>
        </SwipeableRoutes>
      }
    </>
  );
});

SlidingMenuRouting.propTypes = {
  axis: PropTypes.string,
  toggleSlide: PropTypes.func,
};
SlidingMenuRouting.defaultProps = {
  axis: 'y',
  title: "",
  toggleSlide: () => { },
}

export default SlidingMenuRouting;