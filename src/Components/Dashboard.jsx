import React from 'react'
import Icons from './Icons'
import { Outlet } from 'react-router-dom'
import Keypad from './Keypad'

const Dashboard = () => {
  return (
    <div className='hood'>
        <Outlet/>
        <Icons/>
    </div>
  )
}

export default Dashboard