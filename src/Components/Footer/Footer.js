import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import { connect } from 'react-redux'
import styles from './Footer.module.css';
import { IconContext, Chat, Camera, Users } from "phosphor-react";

function Footer(props) {
  const { width, index } = props
  return (
    <footer className={styles.mainFooter} style={{ width: width }}>
      <IconContext.Provider
        value={{
          color: "black",
          size: "2rem",
          weight: "bold",
          mirrored: true,
        }}
      >
        <Link to="/messages" replace><Chat color={index === 0 ? "DodgerBlue" : "black"}/></Link>
        <Link to="/camera" replace><Camera color={index === 1 ? "yellow" : "black"}/></Link>
        <Link to="/discover" replace><Users color={index === 2 ? "purple" : "black"}/></Link>
      </IconContext.Provider>
    </footer>
  )
}

Footer.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth,
}

Footer.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    height: state.global.height,
    width: state.global.width,
    index: state.global.index,
  }
}


export default connect(mapStateToProps)(Footer)