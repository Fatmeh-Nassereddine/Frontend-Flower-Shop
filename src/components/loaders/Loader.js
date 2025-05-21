import React from 'react'
import './loader.css'

const Loader = () => {
  return (
    <div className='loader-main'>
      <div className="l-container">
        <p>Loading...<br></br>Please be patient</p>
        <div className="loader">
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Loader;
