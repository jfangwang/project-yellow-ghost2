import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Extra.module.css'


function Extra(props) {
  const { height, width } = props
  return (
    <div style={{ background: "white" }}>
      <h1>Extra</h1>
    </div>
  )
}

Extra.propTypes = {}

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Extra);
