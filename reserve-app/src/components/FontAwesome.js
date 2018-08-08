import React from 'react'

export const FontAwesome = ({ icon , className}) => (
  className ? <i className={`fa fa-${icon} ${className}`}></i> : <i className={`fa fa-${icon}`}></i>
)