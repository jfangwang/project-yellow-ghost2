import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Link} from 'react-router-dom';
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
  const {index, opacity, position} = props;
  return (
    <footer
      className={styles.mainFooter}
      style={{opacity: opacity, position: position}}
    >
      <IconContext.Provider
        value={{
          color: 'black',
          size: 32,
          weight: 'bold',
          mirrored: true,
        }}
      >
        <Link to="/messages" replace>
          <Chat color={index === 0 ? 'DodgerBlue' : 'black'}/>
        </Link>
        <Link to="/camera" replace>
          <Camera color={index === 1 ? 'yellow' : 'black'}/>
        </Link>
        <Link to="/discover" replace>
          <Users color={index === 2 ? 'purple' : 'black'}/>
        </Link>
      </IconContext.Provider>
    </footer>
  );
}

Footer.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  opacity: PropTypes.number,
  position: PropTypes.string,
  index: PropTypes.number,
};

Footer.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
  opacity: 1,
  position: 'absolute',
  index: 1,
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
  };
}


export default connect(mapStateToProps)(Footer);
