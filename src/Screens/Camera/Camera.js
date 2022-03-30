import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import SlidingMenu from '../../Components/SlidingMenu/SlidingMenu';
import { connect } from 'react-redux';

function Camera(props) {
  const {height, width} = props;
  const testRef = useRef();
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
