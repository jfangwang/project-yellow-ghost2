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
  'not-friends': '\u{1F494}',
  'blocked': '\u{26D4}',
  'pending': '\u{23F3}',
};
/**
 *
 *
 * @param {*} props
 * @return {*}
 */
function Message(props) {
  const {friend, user} = props;
  return (
    <div className={styles.background}>
      <div className={styles.row}>
        <div
          className={styles.row}
          style={{marginRight: '0.5rem', borderRadius: '1rem'}}
        >
          <LinuxLogo size='4rem'/>
        </div>
        <div className={styles.col}>
          <div className={styles.row} style={{justifyContent: 'start'}}>
            <h3>{friend.name}</h3>
          </div>
          <div
            className={styles.row}
            style={{justifyContent: 'start'}}
          >
            {emojiDict[friend.status] ?
              <p>{emojiDict[friend.status]}</p> :
              <div className={styles.row}><p>EMOJI</p></div>
            }
            <h6>{statusDict[friend.status]}</h6>
            <div className={styles.separator}/>
            <h6>
              <TimeAgo date='3-24-2022, 1:50:23 AM' formatter={formatter}/>
            </h6>
            <div className={styles.separator}/>
            <h6>{friend.streak}</h6>
            <h6>{user.streakEmoji}</h6>
          </div>
        </div>
      </div>
      {/* <div className={styles.row}>
        <p>Streak</p>
      </div> */}
    </div>
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
