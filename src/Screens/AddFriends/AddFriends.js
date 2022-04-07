import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './AddFriends.module.css';
import AddFriendItem from './AddFriendItem';

const list = [];
for (let i=0; i<100; i+=1) {
  list.push(<h1>asdf</h1>);
}

/**
 *
 *
 * @param {*} props
 * @return {*}
 */
function AddFriends(props) {
  const {
    handleScroll,
  } = props;
  return (
    <div className={styles.background} onScroll={handleScroll}>
      <h2>Pending</h2>
      <ul className={styles.peopleList}>
        <AddFriendItem type='pending'/>
      </ul>
      <h2>Added Me</h2>
      <ul className={styles.peopleList}>
        <AddFriendItem type='addedMe'/>
      </ul>
      <h2>Quick Add</h2>
      <ul className={styles.peopleList}>
        <AddFriendItem type='quickAdd'/>
      </ul>
      <h2>Friends</h2>
      <ul className={styles.peopleList}>
        <AddFriendItem type='friends'/>
      </ul>
      <h2>Everyone</h2>
      <ul className={styles.peopleList}>
        <AddFriendItem />
        <AddFriendItem />
      </ul>
    </div>
  );
}

AddFriends.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  test: PropTypes.func,
  handleScroll: PropTypes.func,
};

AddFriends.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  test: () => {},
  handleScroll: () => {},
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
