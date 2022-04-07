import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddFriendItem.module.css';
import {connect} from 'react-redux';
import {Guest} from '../../Assets/data/GuestInfo';
import {
  IconContext,
  UserPlus,
  X,
} from 'phosphor-react';


/**
 * @param {*} props
 * @return {*} ;
 */
function AddFriendItem(props) {
  const {
    profileURL,
    firstName,
    lastName,
    username,
  } = props;
  return (
    <li
      className={styles.row}
      style={{
        justifyContent: 'space-between',
      }}
    >
      <div className={styles.row}>
        <img src={profileURL} className={styles.profilePic}/>
        <div className={styles.info}>
          <p>{firstName} {lastName[0]}</p>
          <p>{username}</p>
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
          <button>
            <div className={styles.row}>
              <UserPlus />
              <p><b>Accept</b></p>
            </div>
          </button>
          <button><X /></button>
        </IconContext.Provider>
      </div>
    </li>
  );
}

AddFriendItem.propTypes = {
  profileURL: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
};

AddFriendItem.defaultProps = {
  profileURL: Guest.profilePicUrl,
  firstName: Guest.firstName,
  lastName: Guest.lastName,
  username: Guest.username,
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
