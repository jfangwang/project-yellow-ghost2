import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import styles from './Account.module.css';

function Account(props) {
  return (
    <div className={styles.background}>
      <h1>Account</h1>
    </div>
  )
}

Account.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

Account.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
