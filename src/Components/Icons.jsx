import React from 'react'
import { FaStar } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { IoIosKeypad } from "react-icons/io";
import { FaVoicemail } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Icons = () => {
    return (
        <>
            <div className='d-flex justify-content-center holds'>
                <div className='d-flex w-100 px-3 py-2 justify-content-between position-fixed bottom-0 hold'>
                    <div className='iphone-hold'>
                        <Link to='/favourite' className='Link'>
                            <FaStar className='iphone' />
                            <p className='iphone-p'>Favourites</p>
                        </Link>
                    </div>
                    <div className='iphone-hold'>
                        <Link className='Link' to='/recent'>
                            <MdOutlineAccessTime className='iphone' />
                            <p className='iphone-p'>Recents</p>
                        </Link>
                    </div>
                    <div className='iphone-hold'>
                        <Link className='Link' to='/contact'>
                            <IoMdContact className='iphone' />
                            <p className='iphone-p'>Contacts</p>
                        </Link>
                    </div>
                    <div className='iphone-hold'>
                        <Link className='Link' to='/keypad'>
                            <IoIosKeypad className='iphone' />
                            <p className='iphone-p'>Keypads</p>
                        </Link>
                    </div>
                    <div className='iphone-hold'>
                        <Link className='Link' to='voice'>
                            <FaVoicemail className='iphone' />
                            <p className='iphone-p'>Voicemail</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Icons