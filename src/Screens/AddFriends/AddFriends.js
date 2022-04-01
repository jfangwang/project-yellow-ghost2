import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './AddFriends.module.css'

function AddFriends(props) {
  return (
    <div className={styles.background}>
      <h1>Add Friends</h1>
    </div>
  )
}

AddFriends.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

AddFriends.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);