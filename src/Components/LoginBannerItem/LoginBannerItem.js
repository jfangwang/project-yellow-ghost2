import React, {useRef} from 'react';
import styles from './LoginBannerItem.module.css';
import {toggleSlide, toggleNavFoot} from '../../Actions/globalActions';
import
SlidingMenuRouting from '../../Components/SlidingMenu/SlidingMenuRouting';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Signup from '../../Screens/Signup/Signup';
import {auth, provider} from '../../Firebase/Firebase';

/**
 * @param {*} props
 * @return {*}
 */
function LoginBannerItem(props) {
  const signupMenu = useRef();
  const {toggleNavFoot, toggleSlide, height, width} = props;

  /**
   * @param {*} e
   */
  function toggleUI(e) {
    toggleNavFoot(e);
    toggleSlide(e);
  }

  /**
   *
   */
  function login() {
    auth.signInWithPopup(provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log('access token: ', credential.accessToken);
      console.log('user: ', result.user);
    });
  }

  return (
    <>
      <div className={styles.background}>
        <button onClick={() => login()}><h1>Login</h1></button>
        <button onClick={() => signupMenu.current.toggle()}>
          <h1>Sign Up</h1>
        </button>
      </div>
      <SlidingMenuRouting
        ref={signupMenu}
        height={height}
        width={width}
        toggleSlide={toggleUI}
        title="Sign Up"
        path="/signup"
      >
        <Signup />
      </SlidingMenuRouting>
    </>
  );
}

LoginBannerItem.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  toggleSlide: PropTypes.func,
  toggleNavFoot: PropTypes.func,
};

LoginBannerItem.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  toggleSlide: () => {},
  toggleNavFoot: () => {},
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
  toggleSlide,
  toggleNavFoot,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginBannerItem);
