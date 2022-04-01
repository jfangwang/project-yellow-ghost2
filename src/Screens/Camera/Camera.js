import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

function Camera(props) {
  return (
    <div>
      <h1>Camera</h1>
    </div>
  )
}

Camera.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

Camera.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
}

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
  }
}

export default connect(mapStateToProps)(Camera);
