import React from 'react'

const Recent = () => {
  return (
    <>
       <div className='recent p-3'>
            <div className='d-flex'>
                <div className='text-primary'>Edit</div>
                <div className='d-flex mx-auto bg-dark justify-content-between align-items-center up'>
                    <div className='text-white justify-content-center align-items-center all'>All</div>
                    <div className='text-white justify-content-center align-items-center missed'>Missed</div>
                </div>
            </div>
            <div className='text-white fs-1'>Recents</div>
            <hr />
        </div> 
    </>
  )
}

export default Recent