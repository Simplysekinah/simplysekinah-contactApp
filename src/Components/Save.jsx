import React, { useState, useContext } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdRemoveCircle } from "react-icons/io";
import AppContext from '../Constant/AppProvider';
import { useNavigate } from 'react-router-dom';
// import {storage} from './Keypad'

const Save = () => {
  const { contacts, addContact } = useContext(AppContext);
  const navigate = useNavigate()
  // const phonenumber =storage
  // console.log(phoneNumber);

  const [mobile, setMobile] = useState(true);
  const [contact, setContact] = useState({ firstName: "", lastName: "", company: "",contacts });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const add = () => {
    setMobile(!mobile);
  };

  const saveContact = () => {
    addContact(contact);
    navigate("/numberPage")
  };

  return (
    <>
      <div className='py-3 save h-100'>
        <div className='d-flex justify-content-around align-items-center position-sticky top-0 p-3'>
          <div className='text-primary'>Cancel</div>
          <div className='text-white'>New Contact</div>
          <div className='text-primary' onClick={saveContact}>Done</div>
        </div>
        <div className='hold-p'>
          <IoPersonCircleSharp className='defalt' />
          <div className='add'>Add Photo</div>
        </div>
        <div className='detail-con'>
          <input type="text" placeholder='First name' className='first' onChange={handleInputChange} />
          <hr />
          <input type="text" placeholder='Last name' className='first' onChange={handleInputChange} />
          <hr />
          <input type="text" placeholder='Company' className='first' onChange={handleInputChange} />
        </div>
        <div className='detail-con'>
          {
            mobile && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger' />
                <div className='text-primary'>Mobile</div>
                <div className='text-light'>{contacts}</div>
              </div>
            )
          }
          <div>
            <div onClick={add} className='text-white'>add phone</div>
          </div>
        </div>
        <div className='detail-con'>
          <div>add email</div>
        </div>
        <div className='detail-con'>
          <div>add pronouns</div>
        </div>
        <div className='detail-con'>
          <div>Ringtone</div>
          <div>Default</div>
        </div>
        <div className='detail-con'>
          <div>Text Tone</div>
          <div>Default</div>
        </div>
        <div className='detail-con'>
          <div>add url</div>
        </div>
        <div className='detail-con'>
          <div>add address</div>
        </div>
        <div className='detail-con'>
          <div>add birthday</div>
        </div>
        <div className='detail-con'>
          <div>add date</div>
        </div>
        <div className='detail-con'>
          <div>add related name</div>
        </div>
        <div className='detail-con'>
          <div>add social profile</div>
        </div>
        <div className='detail-con'>
          <div>add instant message</div>
        </div>
        <div className='detail-con'>
          <div>Notes</div>
        </div>
        <div className='detail-con'>
          <div>add field</div>
        </div>
      </div>
    </>
  );
};

export default Save;
