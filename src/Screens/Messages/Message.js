import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Message.module.css';
import {connect} from 'react-redux';
import {XSquare} from 'phosphor-react';
import TimeAgo from 'react-timeago';
import GuestPic from '../../Assets/images/guest-profile-pic.png';
import enShort from 'react-timeago/lib/language-strings/en-short';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import {editUser, editFakeDB} from '../../Actions/userActions';
import {toggleNavFoot} from '../../Actions/globalActions';
import {db} from '../../Firebase/Firebase';

const formatter = buildFormatter(enShort);
export const statusDict = {
  'new-friend': 'New Friend!',
  'new': 'New Snap',
  'received': 'Received',
  'sent': 'Sent',
  'opened': 'Opened',
  'pending': 'Pending',
  'not-friends': 'Unfriended You',
  'blocked': 'Blocked',
  'unknown': 'Unknown',
};
const emojiDict = {
  'pending': '\u{23F3}',
  'not-friends': '\u{1F494}',
  'blocked': '\u{26D4}',
  'unknown': '\u{26A0}',
};
/**
 *
 *
 * @param {*} props
 * @return {*}
 */
export function Message(props) {
  const {friend, user, isUserLoggedIn, height, width, editUser,
    toggleNavFoot, fakeDB, editFakeDB,
  } = props;
  const [showSnaps, setShowSnaps] = useState(false);
  const messageNewFriend = <div className={styles.messageNewFriend}></div>;
  const messageNew = <div className={styles.messageNew}></div>;
  const messageReceived = <div className={styles.messageReceived}></div>;
  const messageSent = <div className={styles.messageSent}></div>;
  const messageOpened = <div className={styles.messageOpened}></div>;
  const messagePending = <p className={styles.emojiIcon}>
    {emojiDict['pending']}
  </p>;
  const messageNotFriends = <p className={styles.emojiIcon}>
    {emojiDict['not-friends']}
  </p>;
  const messageBlocked = <p className={styles.emojiIcon}>
    {emojiDict['blocked']}
  </p>;
  const messageUnknown = <p className={styles.emojiIcon}>
    {emojiDict['unknown']}
  </p>;
  let icon;

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
    case 'pending':
      icon = messagePending;
    case 'not-friends':
      icon = messageNotFriends;
    case 'blocked':
      icon = messageBlocked;
    default:
      icon = messageUnknown;
      break;
  }

  /**
   * Open Snap
   */
  async function openSnap() {
    setShowSnaps(true);
    const snapID = await getSnap();
    const currSnap = document.getElementById('currentSnap');
    if (snapID === null) {
      updateDB(snapID);
      currSnap.src = '';
      closeSnap();
    } else {
      toggleNavFoot(true);
      if (friend['newSnaps'][snapID]['type'] === 'image') {
        currSnap.src = friend['newSnaps'][snapID]['imgURL'].slice();
        updateDB(snapID);
      }
    }
  }

  /**
   * Get Snap
   * @return {*}
   */
  function getSnap() {
    const snaps = Object
        .keys(friend['newSnaps']).sort((date1, date2) => date1 - date2);
    if (snaps.length > 0) {
      return (snaps[0]);
    } else {
      return (null);
    }
  }

  /**
   * Update DB
   * @param {*} id
   */
  function updateDB(id) {
    const date = new Date();
    if (isUserLoggedIn) {
      const userDoc = {...user};
      const fi = friend['id'];
      const ui = user.id;
      if (id === null) {
        userDoc['friends'][user.id]['status'] = 'opened';
        db.collection('Users').doc(ui).update(userDoc);
        db.collection('Users').doc(fi).get().then((doc) => {
          const friendDoc = doc.data();
          friendDoc['friends'][friend.id]['status'] = 'received';
          db.collection('Users').doc(fi).update(friendDoc);
        });
      } else {
        delete userDoc['friends'][friend['id']]['newSnaps'][id];
        userDoc['friends'][fi]['openedByMe'] = {
          lastTimeStamp: date.toISOString(),
          opened: userDoc['friends'][fi]['openedByMe']['opened'] + 1,
        };
        db.collection('Users').doc(ui).update(userDoc);
        db.collection('Users').doc(fi).get().then((doc) => {
          const friendDoc = doc.data();
          friendDoc['friends'][ui]['openedByFriend'] = {
            lastTimeStamp: date.toISOString(),
            opened: friendDoc['friends'][ui]['openedByFriend']['opened'] + 1,
          };
          db.collection('Users').doc(fi).update(friendDoc);
        });
      }
    } else {
      const update = {...user};
      const updateFake = {...fakeDB};
      if (id === null) {
        // Viewed all snaps
        updateFake[friend.id]['friends'][user.id]['status'] = 'opened';
        update['friends'][friend.id]['status'] = 'received';
      } else {
        delete update['friends'][friend['id']]['newSnaps'][id];
        const fi = friend['id'];
        const ui = user.id;
        // User
        update['friends'][fi]['openedByMe'] = {
          lastTimeStamp: date.toISOString(),
          opened: update['friends'][fi]['openedByMe']['opened'] + 1,
        };
        // Friend
        updateFake[ui]['friends'][ui]['openedByFriend'] = {
          lastTimeStamp: date.toISOString(),
          opened: updateFake[ui]['friends'][ui]['openedByFriend']['opened'] + 1,
        };
      }
      editUser(update);
      editFakeDB(updateFake);
    }
  }

  /**
   * Close Snap
   */
  function closeSnap() {
    setShowSnaps(false);
    toggleNavFoot(false);
  }

  return (
    <>
      <button
        className={styles.background}
        onClick={() => openSnap()}
        disabled={friend['status'] !== 'new'}
      >
        <div className={styles.row}>
          <div
            className={styles.row}
            style={{marginRight: '0.5rem'}}
          >
            {friend['profilePicUrl'] ?
              <img
                id='friendProfilePic'
                src={friend['profilePicUrl']}
                className={styles.friendProfilePic}
              /> :
              <XSquare
                className={styles.friendProfilePic}
                size={32}
              />
            }
          </div>
          <div
            id="messageInfo"
            className={styles.col}
          >
            <div
              id="messageFriendName"
              className={styles.row}
              style={{justifyContent: 'start', marginBottom: '0.2rem'}}
            >
              <h1>{friend['username']}</h1>
            </div>
            <div
              className={styles.row}
              style={{justifyContent: 'start', marginTop: '0.2rem'}}
            >
              {icon}
              <h3 id='messageStatus'>
                {statusDict[friend['status']]}
              </h3>
              { friend['lastTimeStamp'] !== null &&
                <>
                  <div className={styles.separator}/>
                  <h3>
                    <TimeAgo
                      date={friend['lastTimeStamp']}
                      formatter={formatter}
                    />
                  </h3>
                </>
              }
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
      { showSnaps &&
        <div
          className={styles.snapContainer}
          style={{
            height: height,
            width: width,
          }}
        >
          <img
            onClick={openSnap}
            id='currentSnap'
            className={styles.currentSnap}
          />
        </div>
      }
    </>
  );
}

Message.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  friend: PropTypes.object,
  user: PropTypes.object,
  isUserLoggedIn: PropTypes.bool,
  editUser: PropTypes.func,
  editFakeDB: PropTypes.func,
  toggleNavFoot: PropTypes.func,
  fakeDB: PropTypes.object,
};

Message.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  isUserLoggedIn: false,
  toggleNavFoot: () => {},
  editUser: () => {},
  editFakeDB: () => {},
  friend: {
    username: 'User',
    profilePicUrl: GuestPic,
    status: 'unknown',
    streak: 0,
    lastTimeStamp: null,
  },
  user: {
    streakEmoji: '\u{1F525}',
  },
  fakeDB: {},
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
    isUserLoggedIn: state.user.isUserLoggedIn,
    fakeDB: state.user.fakeDB,
  };
}

const mapDispatchToProps = {
  editUser,
  editFakeDB,
  toggleNavFoot,
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
