import React, {Component} from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import PropTypes from 'prop-types';

/**
 * @export
 * @class Discover
 * @extends {Component}
 */
export class Discover extends Component {
  /**
   * @return {*}
   * @memberof Discover
   */
  render() {
    return (
      <div>
        <Navbar opacity={0} position="relative" />
        <h1>Discover</h1>
      </div>
    );
  }
}

Discover.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

Discover.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
};

export default Discover;
