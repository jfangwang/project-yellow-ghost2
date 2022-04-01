import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Extra.module.css'


function Extra(props) {
  return (
    <div className={styles.background}>
      <h1>Extra</h1>
    </div>
  )
}

Extra.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

Extra.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
}

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
  }
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Extra);
