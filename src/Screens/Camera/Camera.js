import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Camera(props) {
  const { height, width } = props;
  const testRef = useRef();
  return (
    <>
      <h1>Camera</h1>
    </>
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
