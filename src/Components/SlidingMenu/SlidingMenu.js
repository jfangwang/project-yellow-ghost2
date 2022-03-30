import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle } from "react"
import SwipeableViews from 'react-swipeable-views'

let list = [];
for (var i = 0; i < 200; i++) {
  list.push(<h1 style={{ margin: 0 }}>filler</h1>)
}


const SlidingMenu = forwardRef((props, ref) => {
  const { height, width, axis } = props
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0)
  const [disabled, setDisabled] = useState(false)
  useImperativeHandle(ref, () => ({
    toggle(e = !show) {
      setShow(e);
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
    if (index == 0) {
      setShow(false);
    }
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
             <div style={{backgroundColor: "white"}}>
               {list}
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
}
SlidingMenu.defaultProps = {
  axis: 'y'
}

export default SlidingMenu;