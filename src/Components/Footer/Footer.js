import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './Footer.module.css';
import {IconContext, Chat, Camera, Users} from 'phosphor-react';


/**
 *
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export function Footer(props) {
  const {index, opacity, position, hideNavFoot} = props;
  return (
    <>
      <footer
        className={styles.mainFooter}
        style={{
          opacity: opacity,
          position: position,
          zIndex: hideNavFoot ? -1 : 1,
        }}
      >
        <IconContext.Provider
          value={{
            size: '1.8rem',
            weight: 'bold',
            mirrored: true,
          }}
        >
          <Link to="/messages" replace>
            <Chat color={index === 0 ? 'DodgerBlue' : 'white'}/>
          </Link>
          <Link to="/camera" replace>
            <Camera color={index === 1 ? 'yellow' : 'white'}/>
          </Link>
          <Link to="/discover" replace>
            <Users color={index === 2 ? 'purple' : 'white'}/>
          </Link>
        </IconContext.Provider>
      </footer>
    </>
  );
}

Footer.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  opacity: PropTypes.number,
  position: PropTypes.string,
  index: PropTypes.number,
  hideNavFoot: PropTypes.bool,
};

Footer.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  opacity: 1,
  position: 'absolute',
  index: 1,
  hideNavFoot: false,
};

/**
 * mapStateToProps to fetch states from redux store
 * @param {int} state
 * @return {object}
 */
function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
    index: state.global.index,
    hideNavFoot: state.global.hideNavFoot,
  };
}


export default connect(mapStateToProps)(Footer);
