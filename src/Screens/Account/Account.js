import React from 'react'
import PropTypes from 'prop-types'
import { resize, changeToIndex, updateDecimalIndex, toggleSlide } from '../../Actions/globalActions';
import { connect } from 'react-redux';
import styles from './Account.module.css';

function Account(props) {
  const { height, width } = props
  return (
    <div style={{ backgroundColor: 'white' }}>
      <h1>Account</h1>
    </div>
  )
}

Account.propTypes = {}

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
