import React from 'react'
// import profile from '../src/pic.jfif'
import { FaStar } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { IoIosKeypad } from "react-icons/io";
import { FaVoicemail } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

const Favourites = () => {
  return (
    <>
       <div className='landing'>
            <div className='p-3 d-flex'>
                <FaPlus className='text-primary fs-5' />
                <p className='mx-auto text-white'>Favourite</p>
            </div>
            <div className='fav-p'>
                <div>No Favourites</div>
            </div>
        </div> 
    </>
  )
}

export default Favourites