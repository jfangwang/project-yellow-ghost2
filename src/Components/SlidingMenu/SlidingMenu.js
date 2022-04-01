import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle } from "react"
import SwipeableViews from 'react-swipeable-views'
import styles from './SlidingMenu.module.css';
import { IconContext, CaretLeft, CaretDown } from 'phosphor-react';


const SlidingMenu = forwardRef((props, ref) => {
  const { height, width, axis, children, toggleSlide, title } = props
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0)
  const [disabled, setDisabled] = useState(false)
  useImperativeHandle(ref, () => ({
    toggle(e = !show) {
      setShow(e);
      toggleSlide();
    }
  }))
  useEffect(() => {
    if (show) {
      changeToIndex(1)
    }
  }, [show])
  function changeToIndex(e) {
    setIndex(e)
  }
  function checkIndex(e) {
    if (index === 0) {
      setShow(false);
      toggleSlide();
    }
  }
  const close = () => {
    console.log("close")
    changeToIndex(0)
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
      {show &&
        <div style={{ position: 'absolute', top: 0 }}>
          <SwipeableViews
            disabled={disabled}
            index={index}
            onChangeIndex={changeToIndex}
            onTransitionEnd={checkIndex}
            enableMouseEvents
            axis={axis}
            containerStyle={{ height: height, width: width }}
          >
            <div style={{ height: height, width: width }}></div>
            <div
              onScroll={handleScroll}
              style={{ backgroundColor: "white", height: height, overflowY: 'scroll' }}
            >
              <div className={styles.slidingMenuNavbar}>
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "1.5rem",
                    weight: "bold",
                    mirrored: true,
                  }}
                >
                <div>
                  <button onClick={close}>{axis === 'y' ? <CaretDown/> : <CaretLeft/>}</button>
                </div>
                <div>
                  <h1>{title}</h1>
                </div>
                <div>
                  <button style={{opacity: 0}}><CaretLeft/></button>
                </div>
                </IconContext.Provider>
              </div>
              <div>
                {children}
              </div>
            </div>
          </SwipeableViews>
        </div>
      }
    </>
  )
})

SlidingMenu.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  axis: PropTypes.string,
  title: PropTypes.string,
  toggleSlide: PropTypes.func,
}
SlidingMenu.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  axis: 'y',
  title: "Error",
  toggleSlide: () => { },
}

export default SlidingMenu;
