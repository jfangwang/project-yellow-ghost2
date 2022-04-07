import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './AddFriends.module.css';

/**
 *
 *
 * @param {*} props
 * @return {*}
 */
function AddFriends(props) {
  const {
    test,
  } = props;
  return (
    <div className={styles.background}>
      <h1>Add Friends</h1>
      <button onClick={test}>Test</button>
    </div>
  );
}

AddFriends.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  test: PropTypes.func,
};

AddFriends.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  test: () => {},
};

/**
 *
 *
 * @param {*} state
 * @return {*}
 */
function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
