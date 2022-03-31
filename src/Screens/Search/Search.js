import React from 'react'
import PropTypes from 'prop-types'
import { resize, changeToIndex, updateDecimalIndex, toggleSlide } from '../../Actions/globalActions';
import { connect } from 'react-redux'

function Search(props) {
  const { height, width, changeToIndex, index, updateDecimalIndex, slide_disabled, } = props
  return (
    <div style={{height:height, width:width, background: "white"}}>
      <h1>Search</h1>
    </div>
  )
}

Search.propTypes = {}

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
    index: state.global.index,
    slide_disabled: state.global.slide_disabled
  }
}

const mapDispatchToProps = {
  resize,
  changeToIndex,
  updateDecimalIndex,
  toggleSlide,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
