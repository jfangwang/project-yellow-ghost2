import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import SlidingMenu from '../SlidingMenu/SlidingMenu'
import styles from './Navbar.module.css';
import { connect } from 'react-redux';
import { IconContext, User, MagnifyingGlass, UserPlus, DotsThree } from 'phosphor-react';

function Navbar(props) {
  const { index, dec_index } = props;
  const accountMenu = useRef();
  return (
    <div className={styles.mainNavbar} style={{ backgroundColor: `rgba(255, 255, 255, ${Math.abs(1 - dec_index)})` }}>
      <IconContext.Provider
        value={{
          color: `rgb(
            ${255 - (Math.abs(1 - dec_index) * 255)},
            ${255 - (Math.abs(1 - dec_index) * 255)},
            ${255 - (Math.abs(1 - dec_index) * 255)}
          )`,
          size: "1.5rem",
          weight: "bold",
          mirrored: true,
        }}
      >
        <div>
          <button><User /></button>
          <button><MagnifyingGlass /></button>
        </div>
        <div>
          <h1>Chat</h1>
        </div>
        <div>
          <button><UserPlus /></button>
          <button><DotsThree /></button>
        </div>
      </IconContext.Provider>
    </div>
  )
}

Navbar.propTypes = {}

function mapStateToProps(state) {
  return {
    index: state.global.index,
    height: state.global.height,
    width: state.global.width,
    dec_index: state.global.dec_index,
  }
}

const mapDispatchToProps = {
  // resize,
  // changeToIndex,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
