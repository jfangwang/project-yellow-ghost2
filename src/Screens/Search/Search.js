import React from 'react'
import PropTypes from 'prop-types'
import { resize, changeToIndex, updateDecimalIndex, toggleSlide } from '../../Actions/globalActions';
import { connect } from 'react-redux'
import styles from './Search.module.css'


function Search(props) {
  const { height, width } = props
  return (
    <div style={{ background: "white"}}>
      <h1>Search</h1>
    </div>
  )
}

Search.propTypes = {}

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
