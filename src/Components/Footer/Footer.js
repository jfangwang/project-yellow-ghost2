import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import { connect } from 'react-redux'
import styles from './Footer.module.css';
import { IconContext, Chat, Camera, Users } from "phosphor-react";

function Footer(props) {
  const { width } = props
  return (
    <footer className={styles.mainFooter} style={{ width: width }}>
      <IconContext.Provider
        value={{
          color: "black",
          size: 32,
          weight: "regular",
          mirrored: true,
        }}
      >
        <Link to="/messages" replace><Chat /></Link>
        <Link to="/camera" replace><Camera /></Link>
        <Link to="/discover" replace><Users /></Link>
      </IconContext.Provider>
    </footer>
  )
}

Footer.propTypes = {
  height: window.innerHeight,
  width: window.innerWidth,
};

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
    index: state.global.index,
  }
}


export default connect(mapStateToProps)(Footer)
