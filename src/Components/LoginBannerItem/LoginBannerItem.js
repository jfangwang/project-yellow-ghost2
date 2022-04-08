import React, {useRef} from 'react';
import SlidingMenuRouting from '../SlidingMenu/SlidingMenuRouting';
import styles from './LoginBannerItem.module.css';
// import PropTypes from 'prop-types';

/**
 * @param {*} props
 * @return {*}
 */
function LoginBannerItem(props) {
  const loginMenu = useRef();
  const signupMenu = useRef();
  return (
    <>
      <div className={styles.background}>
        <button onClick={() => loginMenu.current.toggle()}>
          <h1>Login</h1>
        </button>
        <button onClick={() => signupMenu.current.toggle()}>
          <h1>Sign Up</h1>
        </button>
      </div>
      <SlidingMenuRouting
        axis='x'
        ref={loginMenu}
        title="Login"
        path="/login"
      >
        <h1>Login</h1>
      </SlidingMenuRouting>
      <SlidingMenuRouting
        axis='x'
        ref={signupMenu}
        title="Sign Up"
        path="/signup"
      >
        <h1>Sign Up</h1>
      </SlidingMenuRouting>
    </>
  );
}

LoginBannerItem.propTypes = {};

export default LoginBannerItem;
