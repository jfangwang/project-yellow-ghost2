import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

let list = []
for (var i = 0; i < 200; i++) {
  list.push(<h1>ASDFASDF</h1>)
}

export class Messages extends Component {
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Navbar opacity={0} position="relative" />
        <h1>Messages</h1>
        {/* {list} */}
        <Footer position="relative" opacity={0} />
      </div>
    );
  }
}

Messages.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

Messages.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
}

export default Messages;