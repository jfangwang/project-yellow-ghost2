import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './Account.module.css';
import {editFakeDB} from '../../Actions/userActions';

/**
 *
 *
 * @param {*} props
 * @return {*}
 */
function Account(props) {
  const {
    user,
  } = props;

  return (
    <div id='background' className={styles.background}>
      <div className={styles.account}>
        <img src={user.profilePicUrl} alt='img' className={styles.profilePic} />
        <div className={styles.info}>
          <h2><b>{user.firstName} {user.lastName}</b></h2>
          <h4><i>{user.username}</i></h4>
        </div>
        <div className={styles.info}>
          <h4>Received: {user.received}</h4>
          <h4>Sent: {user.sent}</h4>
          <h4>Total: {user.sent + user.received}</h4>
        </div>
      </div>

      <div className={styles.acountSettings}>
        <h1>Account Settings</h1>
        <ul>
          <li><h3>Change Username</h3></li>
          <li><h3>Change Profile Pic</h3></li>
          <li><h3>Change Streak Emoji</h3></li>
          <li><h3>Add Phone Number</h3></li>
          <li><h3>Add Face ID</h3></li>
        </ul>
      </div>

      <div className={styles.uiSettings}>
        <h1>UI Settings</h1>
        <ul>
          <li><h3>Change Theme</h3></li>
        </ul>
      </div>

      <div className={styles.messagesSettings}>
        <h1>Messages Settings</h1>
        <ul>
          <li><h3>Change Default Snap Timer</h3></li>
        </ul>
      </div>

      <div className={styles.cameraSettings}>
        <h1>Camera Settings</h1>
        <ul>
          <li><h3>Change Camera Resolution</h3></li>
          <li><h3>Change Capture Button Location</h3></li>
          <li><h3>Camera Video</h3></li>
          <li><h3>Camera Mic</h3></li>
          <li><h3>Change Audio</h3></li>
          <li><h3>Toggle Camera Stats</h3></li>
        </ul>
      </div>
    </div>
  );
}

Account.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  user: PropTypes.object,
};

Account.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  user: {},
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
    user: state.user.user,
  };
}

const mapDispatchToProps = {
  editFakeDB,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
