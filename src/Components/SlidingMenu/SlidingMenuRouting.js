import React, { Component, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, BrowserRouter, useLocation, useHistory, Redirect } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import Account from '../../Screens/Account/Account';
import Search from '../../Screens/Search/Search';
import { resize, changeToIndex, updateDecimalIndex, toggleSlide } from '../../Actions/globalActions';
import { connect } from 'react-redux'
import styles from './SlidingMenu.module.css';
import { IconContext, CaretLeft, CaretDown } from 'phosphor-react';

const SlidingMenuRouting = forwardRef((props, ref) => {
  const {
    height, 
    width, 
    toggleSlide, 
    changeToIndex, 
    index, 
    updateDecimalIndex, 
    path, 
    children,
    axis,
    title,
  } = props
  const [localIndex, setlocalIndex] = useState(0);
  const [disabled, setDisabled] = useState(false)
  const [show, setShow] = useState(false)
  const location = useLocation();
  let history = useHistory();
  useImperativeHandle(ref, () => ({
    toggle(e = localIndex) {
      if (e === 1) {
        changeIndex(0)
        toggleSlide();
      } else {
        console.log("asdf")
        changeIndex(1)
        history.replace(path)
      }
    }
  }))
  useEffect(() => {
    if (location.pathname === path) {
      setlocalIndex(1);
    } else {
      setlocalIndex(0);
    }
  }, [])
  function changeIndex(e) {
    setlocalIndex(e)
    toggleSlide();
    setShow(!show)
  }
  const close = () => {
    console.log("close")
    changeIndex(0)
    history.replace('/')
  }
  const handleScroll = (e) => {
    console.log(e)
    if (e.currentTarget.scrollTop > 0 && axis === 'y') {
      setDisabled(true);
    } else {
      setDisabled(false)
    }
  }
  return (
    <>
      {localIndex === 1 &&
        <SwipeableRoutes
          axis={axis}
          enableMouseEvents
          index={localIndex}
          onTransitionEnd={changeIndex}
          disabled={disabled}
          containerStyle={{ height: height, width: width }}
          style={{
            position: 'absolute',
            top: 0,
          }}
          replace
        >
          <Route path="/">
            <div style={{ height: height, width: width }}></div>
          </Route>
          <Route path={path}>
            <div
              onScroll={handleScroll}
              style={{ backgroundColor: "white", height: height, overflowY: 'scroll' }}
            >
              <div className={styles.slidingMenuNavbar}>
                <IconContext.Provider
                  value={{
                    color: "black",
                    // size: "1.5rem",
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
          </Route>
        </SwipeableRoutes>
      }
    </>
  );
});

SlidingMenuRouting.propTypes = {
  axis: PropTypes.string,
};
SlidingMenuRouting.defaultProps = {
  axis: 'y',
  title: "No Title"
}

export default SlidingMenuRouting;