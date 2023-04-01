import React from 'react'
import css from  '../styles/loader.module.scss';
function loader() {
  return (
<div className={css.center}>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  <div className={css.wave}></div>
  </div>
  )
}

export default loader