import React from 'react'
import logo from '../../assets/logo.png'
import classes from './Logo.scss'

export default function Logo() {
  return (
    <img src={logo} alt="logo" className={classes.logo} />
  )
}
