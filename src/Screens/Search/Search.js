import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Search.module.css'


function Search(props) {
  return (
    <div className={styles.background}>
      <h1>Search</h1>
    </div>
  )
}

Search.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

Search.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
