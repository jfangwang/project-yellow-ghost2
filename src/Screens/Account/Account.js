import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './Account.module.css';
import {editFakeDB} from '../../Actions/userActions';
import AccountItem from './AccountItem';

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
          <AccountItem title='Change Username'>
            <input type='text' id='username' placeholder={user.username}>
            </input>
          </AccountItem>
          <AccountItem title='Change Profile Pic'></AccountItem>
          <AccountItem title='Manage Streak Emoji'></AccountItem>
          <AccountItem title='Manage Phone Number'></AccountItem>
          <AccountItem title='Manage Face ID'></AccountItem>
        </ul>
      </div>

      <div className={styles.uiSettings}>
        <h1>UI Settings</h1>
        <ul>
          <AccountItem title='Set Theme'></AccountItem>
        </ul>
      </div>

      <div className={styles.messagesSettings}>
        <h1>Messages Settings</h1>
        <ul>
          <AccountItem title='Manage Snap Timer'></AccountItem>
        </ul>
      </div>

      <div className={styles.cameraSettings}>
        <h1>Camera Settings</h1>
        <ul>
          <AccountItem title='Set Camera Resolution'></AccountItem>
          <AccountItem title='Change Capture Button Location'></AccountItem>
          <AccountItem title='Set Camera Video'></AccountItem>
          <AccountItem title='Set Camera Mic'></AccountItem>
          <AccountItem title='Set Audio'></AccountItem>
          <AccountItem title='Toggle Camera Stats'></AccountItem>
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
