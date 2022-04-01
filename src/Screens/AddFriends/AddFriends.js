import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './AddFriends.module.css'

function AddFriends(props) {
  const { height, width } = props
  return (
    <div style={{ background: "white" }}>
      <h1>Add Friends</h1>
    </div>
  )
}

AddFriends.propTypes = {}

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);