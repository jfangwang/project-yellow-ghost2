import React, {useState} from 'react';
import styles from './LoginBannerItem.module.css';
// import PropTypes from 'prop-types';

/**
 * @param {*} props
 * @return {*}
 */
function LoginBannerItem(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
      <div className={styles.background}>
        <button onClick={() => setShowLogin(true)}><h1>Login</h1></button>
        <button onClick={() => setShowSignUp(true)}><h1>Sign Up</h1></button>
      </div>
      { showLogin &&
        <div className={styles.modal}>
          <div className={styles.modalBackground}>
            <h1>Login</h1>
            <button onClick={() => setShowLogin(false)}>
              <h3>Login with Google</h3>
            </button>
            <button onClick={() => setShowLogin(false)}>
              <h3>Go Back</h3>
            </button>
          </div>
        </div>
      }
      { showSignUp &&
        <div className={styles.modal}>
          <div className={styles.modalBackground}>
            <h1>Sign Up</h1>
            <button onClick={() => setShowSignUp(false)}>
              <h3>Sign up with Google</h3>
            </button>
            <button onClick={() => setShowSignUp(false)}>
              <h3>Go Back</h3>
            </button>
          </div>
        </div>
      }
    </>
  );
}

LoginBannerItem.propTypes = {};

export default LoginBannerItem;
