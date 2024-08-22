import React, { useState, useContext } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdRemoveCircle } from "react-icons/io";
import AppContext from '../Constant/AppProvider';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setPhoneNumber,updateContactDetails,saveContactStart,saveContactSuccess,saveContactFailure } from '../Redux/PhoneSlice';
import { auth, database } from '../Constant/FirebaseConfig';
import { doc, updateDoc,getDoc } from 'firebase/firestore';
import { addContact } from '../Redux/Slice';

const Save = () => {
  // const { contacts, addContact } = useContext(AppContext);
  const phoneNumber = useSelector((state)=>state.phonenumber.currentContact.phoneNumber)
  console.log(phoneNumber);
  
  

  const [toggleVisibility, settoggleVisibility] = useState({
    phone:false,
    email:false,
    pronouns:false,
    url:false,
    address:false,
    birthday:false,
    date:false,
    name: false,
    social:false,
    message: false
  });
  const Visibility = (state) => {
    settoggleVisibility((previous)=>({
      ...previous,
      [state]: !previous[state]
    }));
  };
  
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    dispatch(setPhoneNumber(e.target.value))
  }
  const [contact, setContact] = useState({ firstName: "", lastName: "", company: ""});
  const handleInputChange = (e) => {
    const { name,value } = e.target;
    setContact({ ...contact, [name]:value });
    // console.log(contact);
    dispatch(updateContactDetails({[name]: value}))
  };

  const navigate = useNavigate()
  const saveContact = async () => {
    try {
      dispatch(saveContactStart())
      const user = auth.currentUser
      // console.log(user);
      if (user) {
        const userDocRef = doc(database, 'Users',user.uid);
        // console.log(userDocRef);
        
      // Fetch the document data
      const userDoc = (await getDoc(userDocRef));
      // console.log(userDoc);
      const userData = userDoc.data()
      // console.log(userData);
      const contacts = userData.contact || []
      let newContact={
        ...contact,
        phoneNumber:phoneNumber
      }
      dispatch(addContact(newContact))
      contacts.push(newContact)
      await updateDoc(userDocRef, {
        contact: contacts,
      });
      }
      dispatch(saveContactSuccess(contact))
      setTimeout(() => {
        navigate("/numberPage")
      }, 2000);
    } catch (error) {
      dispatch(saveContactFailure(error.message))
    }
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
          <input type="text"  placeholder='First name' name='firstName' className='first' onChange={(e)=>handleInputChange(e)} />
          <hr />
          <input type="text" placeholder='Last name' name='lastName' className='first' onChange={(e)=>handleInputChange(e)} />
          <hr />
          <input type="text" placeholder='Company' name='company' className='first' onChange={(e)=>handleInputChange(e)} />
        </div>
        <div className='detail-con'>
          {
            toggleVisibility.phone && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Mobile</div>
                <input className='text-light bg-black' type="text" value={phoneNumber} onChange={handleChange} />
                {/* <div className='text-light'>{phoneNumber}</div> */}
              </div>
            )
          }
          <div>
            <div onClick={()=>Visibility('phone')} className='text-white'>add phone</div>
          </div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.email && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Email</div>
                <input className='text-light bg-black' type="text"/>
              </div>
            )
          }
          <div className='text-white' onClick={()=>Visibility('email')}>add email</div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.pronouns && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Pronouns</div>
                <input className='text-light bg-black' type="text" />
              </div>
            )
          }
          <div onClick={()=>Visibility('pronouns')} className='text-white'>add pronouns</div>
        </div>
        <div className='detail-con'>
          <div className='text-white'>Ringtone</div>
          <div className='text-white'>Default</div>
        </div>
        <div className='detail-con'>
          <div className='text-white'>Text Tone</div>
          <div className='text-white'>Default</div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.url && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Url</div>
                <input className='text-light bg-black' type="text" />
              </div>
            )
          }
          <div onClick={()=>Visibility('url')} className='text-white'>add url</div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.address && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Address</div>
                <input className='text-light bg-black' type="text" />
              </div>
            )
          }
          <div onClick={()=>Visibility('address')} className='text-white'>add address</div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.birthday && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Birthday</div>
                <input className='text-light bg-black' type="text" />
              </div>
            )
          }
          <div onClick={()=>Visibility('birthday')} className='text-white'>add birthday</div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.date && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Date</div>
                <input className='text-light bg-black' type="text" />
              </div>
            )
          }
          <div onClick={()=>Visibility('date')} className='text-white'>add date</div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.name && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Name</div>
                <input className='text-light bg-black' type="text" />
                {/* <div className='text-light'>{phoneNumber}</div> */}
              </div>
            )
          }
          <div onClick={()=>Visibility('name')} className='text-white'>add related name</div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.social && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Social</div>
                <input className='text-light bg-black' type="text" />
                {/* <div className='text-light'>{phoneNumber}</div> */}
              </div>
            )
          }
          <div onClick={()=>Visibility('social')} className='text-white'>add social profile</div>
        </div>
        <div className='detail-con'>
        {
            toggleVisibility.message && (
              <div className='d-flex gap-4'>
                <IoMdRemoveCircle className='bg-danger ' />
                <div className='text-primary'>Message</div>
                <input className='text-light bg-black' type="text" />
                {/* <div className='text-light'>{phoneNumber}</div> */}
              </div>
            )
          }
          <div onClick={()=>Visibility('message')} className='text-white'>add instant message</div>
        </div>
        <div className='detail-con'>
          {/* <div className='text-white'>Notes</div> */}
          <textarea placeholder='Notes' cols="48" rows="3" className=' bg-transparent'></textarea>
        </div>
        <div className='detail-con'>
          <div className='text-white'>add field</div>
        </div>
      </div>
    </>
  );
};

export default Save;
