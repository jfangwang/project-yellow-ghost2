import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddFriendItem.module.css';
import {connect} from 'react-redux';
import {Guest} from '../../Assets/data/GuestInfo';
import {
  IconContext,
  UserMinus,
  UserPlus,
  HourglassMedium,
  X,
} from 'phosphor-react';


/**
 * @param {*} props
 * @return {*} ;
 */
function AddFriendItem(props) {
  const {
    type,
    friend,
  } = props;

  let buttonType;

  if (type === 'pending') {
    buttonType = (<><HourglassMedium /><p><b>Pending</b></p></>);
  } else if (type === 'addedMe') {
    buttonType = (<><UserPlus /><p><b>Add</b></p></>);
  } else if (type === 'quickAdd') {
    buttonType = (<><UserPlus /><p><b>Accept</b></p></>);
  } else if (type === 'friends') {
    buttonType = (<><UserMinus /><p><b>Remove</b></p></>);
  } else {
    buttonType = (<></>);
  }

  return (
    <li
      className={styles.row}
      style={{
        justifyContent: 'space-between',
      }}
    >
      <div className={styles.row}>
        <img src={friend['profilePicUrl']} className={styles.profilePic}/>
        <div className={styles.info}>
          <p>{friend['firstName']} {friend['lastName'][0]}</p>
          <p>{friend['username']}</p>
        </div>
      </div>
      <div className={styles.row}>
        <IconContext.Provider
          value={{
            color: 'black',
            size: 15,
            weight: 'bold',
          }}
        >
          { type !== null &&
            <button>
              <div className={styles.row}>
                {buttonType}
              </div>
            </button>
          }
          { type === 'pending' && <button><X /></button>}
        </IconContext.Provider>
      </div>
    </li>
  );
}

AddFriendItem.propTypes = {
  type: PropTypes.string,
  friend: PropTypes.object,
};

AddFriendItem.defaultProps = {
  type: null,
  friend: {
    profileURL: Guest.profilePicUrl,
    firstName: Guest.firstName,
    lastName: Guest.lastName,
    username: Guest.username,
  },
};

/**
 *
 *
 * @param {*} state
 * @return {*}
 */
function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendItem);
