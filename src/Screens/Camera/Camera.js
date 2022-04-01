import React from 'react'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'

function Camera(props) {
  return (
    <div>
      <h1>Camera</h1>
    </div>
  )
}

Camera.propTypes = {}

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
  }
}

export default connect(mapStateToProps)(Camera);
