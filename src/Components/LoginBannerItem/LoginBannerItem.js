import React from 'react';
import styles from './LoginBannerItem.module.css';
// import PropTypes from 'prop-types';

/**
 * @param {*} props
 * @return {*}
 */
function LoginBannerItem(props) {
  return (
    <>
      <div className={styles.background}>
        <button onClick={() => console.log('login')}><h1>Login</h1></button>
        <button onClick={() => console.log('sign up')}><h1>Sign Up</h1></button>
      </div>
    </>
  );
}

LoginBannerItem.propTypes = {};

export default LoginBannerItem;
