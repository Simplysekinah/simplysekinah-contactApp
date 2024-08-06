import React from 'react'
import { Link} from 'react-router-dom'

const Voicemail = () => {
  return (
    <>
      <div className='voicemail p-3'>
        <div className='d-flex justify-content-center align-items-center text-white'>Voicemail</div>
        <div className='bg-secondary'>
          <div className='d-flex justify-content-center align-items-center text-white'>Visual Voicemail is currently unavailable</div>
          <Link className='d-flex justify-content-center align-items-center'>Call Voicemail</Link>
        </div>
        <div className='d-flex justify-content-between align-items-center text-white'>
          <div>Carrier Voicemail</div>
          <div>Call</div>
        </div>
      </div>
    </>
  )
}

export default Voicemail