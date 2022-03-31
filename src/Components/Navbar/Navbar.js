import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import SlidingMenu from '../SlidingMenu/SlidingMenu'
import styles from './Navbar.module.css';
import { connect } from 'react-redux';
import { toggleSlide } from '../../Actions/globalActions';
import { IconContext, User, MagnifyingGlass, UserPlus, DotsThree, ArrowsClockwise } from 'phosphor-react';

function Navbar(props) {
  const { index, dec_index, height, width, toggleSlide, position, opacity } = props;
  const accountMenu = useRef();
  const searchMenu = useRef();
  const addFriendMenu = useRef();
  const extraMenu = useRef();

  return (
    <div
      className={styles.mainNavbar}
      style={{ backgroundColor: `rgba(255, 255, 255, ${Math.abs(1 - dec_index)})`, position: position }}
    // style={{ backgroundColor: `rgba(255, 255, 255, ${Math.abs(1 - dec_index)})` }}
    >
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
        <div style={{opacity: opacity}}>
          <button onClick={() => accountMenu.current.toggle()}><User /></button>
          <button onClick={() => searchMenu.current.toggle()}><MagnifyingGlass /></button>
        </div>
        <div style={{opacity: opacity}}>
          <h1 style={{ color: `rgba(${255 - (Math.abs(1 - dec_index) * 255)}, ${255 - (Math.abs(1 - dec_index) * 255)}, ${255 - (Math.abs(1 - dec_index) * 255)}, ${(Math.abs(1 - dec_index))})` }}>
            {dec_index < 1 && "Chat"}
            {dec_index > 1 && "Discover"}
          </h1>
        </div>
        <div style={{opacity: opacity}}>
          <button onClick={() => addFriendMenu.current.toggle()}><UserPlus /></button>
          {index == 1 ?
            <button><ArrowsClockwise /></button>
            :
            <button onClick={() => extraMenu.current.toggle()}><DotsThree /></button>
          }
        </div>
        <SlidingMenu axis='x' ref={accountMenu} height={height} width={width} toggleSlide={toggleSlide} title="Account">
          <div>
            <h1>Account Menu</h1>
          </div>
        </SlidingMenu>
        <SlidingMenu ref={searchMenu} height={height} width={width} toggleSlide={toggleSlide} title="Search">
          <div>
            <h1>Search Menu</h1>
          </div>
        </SlidingMenu>
        <SlidingMenu ref={addFriendMenu} height={height} width={width} toggleSlide={toggleSlide} title="Add Friends">
          <div>
            <h1>Add Friends Menu</h1>
          </div>
        </SlidingMenu>
        <SlidingMenu ref={extraMenu} height={height} width={width} toggleSlide={toggleSlide} title="Extra">
          <div>
            <h1>Extra Menu</h1>
          </div>
        </SlidingMenu>
      </IconContext.Provider>
    </div>
  )
}

Navbar.propTypes = {
  position: PropTypes.string,
  opacity: PropTypes.number,
}

Navbar.defaultProps = {
  position: "absolute",
  opacity: 1,
}

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
  toggleSlide,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
