import React from 'react';
import PropTypes from 'prop-types';
import styles from './Message.module.css';
import {connect} from 'react-redux';
import {LinuxLogo} from 'phosphor-react';
import TimeAgo from 'react-timeago';
import enShort from 'react-timeago/lib/language-strings/en-short';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(enShort);
const statusDict = {
  'new-friend': 'New Friend!',
  'new': 'New Snap',
  'received': 'Received',
  'sent': 'Sent',
  'opened': 'Opened',
  'pending': 'Pending',
  'not-friends': 'Unfriended You',
  'blocked': 'Blocked',
};
const emojiDict = {
  'pending': '\u{23F3}',
  'not-friends': '\u{1F494}',
  'blocked': '\u{26D4}',
};
/**
 *
 *
 * @param {*} props
 * @return {*}
 */
function Message(props) {
  const {friend, user} = props;
  const messageNewFriend = <div className={styles.messageNewFriend}></div>;
  const messageNew = <div className={styles.messageNew}></div>;
  const messageReceived = <div className={styles.messageReceived}></div>;
  const messageSent = <div className={styles.messageSent}></div>;
  const messageOpened = <div className={styles.messageOpened}></div>;
  let icon = <div></div>;

  switch (friend['status']) {
    case 'new-friend':
      icon = messageNewFriend;
      break;
    case 'new':
      icon = messageNew;
      break;
    case 'received':
      icon = messageReceived;
      break;
    case 'sent':
      icon = messageSent;
      break;
    case 'opened':
      icon = messageOpened;
      break;
    default:
      icon = <div>asdf</div>;
      break;
  }

  return (
    <button
      className={styles.background}
      onClick={() => console.log(friend)}
    >
      <div className={styles.row}>
        <div
          className={styles.row}
          style={{marginRight: '0.5rem'}}
        >
          {friend['profilePicUrl'] ?
            <img
              src={friend['profilePicUrl']}
              className={styles.friendProfilePic}
            /> :
            <LinuxLogo
              className={styles.friendProfilePic}
              size='4rem'
            />
          }
        </div>
        <div className={styles.col}>
          <div
            className={styles.row}
            style={{justifyContent: 'start', marginBottom: '0.2rem'}}
          >
            <h1>{friend['username']}</h1>
          </div>
          <div
            className={styles.row}
            style={{justifyContent: 'start', marginTop: '0.2rem'}}
          >
            {emojiDict[friend['status']] ?
              <p className={styles.emojiIcon}>
                {emojiDict[friend['status']]}
              </p> :
              <>{icon}</>
            }
            <h3>{statusDict[friend['status']]}</h3>
            <div className={styles.separator}/>
            <h3>
              <TimeAgo date='Apr 1, 2022' formatter={formatter}/>
            </h3>
            <div className={styles.separator}/>
            <h3>{friend['streak']}</h3>
            <h5>{user.streakEmoji}</h5>
          </div>
        </div>
      </div>
      {/* <div className={styles.row}>
        <p>Friend Status Emoji</p>
      </div> */}
    </button>
  );
}

Message.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  friend: PropTypes.object,
  user: PropTypes.object,
};

Message.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  friend: {
    name: 'Error',
  },
  user: {
    name: 'Error',
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Message);
