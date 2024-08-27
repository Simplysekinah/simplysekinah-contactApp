import React, { useState, useEffect,useRef } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, database, storage } from '../Constant/FirebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
// import { FaComment } from "react-icons/fa";
// import { IoIosCall } from "react-icons/io";
// import { IoVideocam } from "react-icons/io5";
// import { IoIosMail } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
import { updateContactDetails } from '../Redux/PhoneSlice';

const EditDetails = () => {
    const [toggleVisibility, settoggleVisibility] = useState({
        phone: false,
        email: false,
        pronouns: false,
        url: false,
        address: false,
        birthday: false,
        date: false,
        name: false,
        social: false,
        message: false
    });
    const Visibility = (state) => {
        settoggleVisibility((previous) => ({
            ...previous,
            [state]: !previous[state]
        }));
    };

    const [contact, setContact] = useState({
        firstName: "", lastName: "", company: "",
        phoneNumber: '',
        email: '',
        pronouns: '',
        url: '',
        address: '',
        birthday: '',
        date: '',
        relatedName: '',
        social: '',
        message: '',
        notes: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
        // console.log(contact);
        // dispatch(updateContactDetails({[name]: value}))
    };

    const { id } = useParams()
    // console.log(id,'id');
    

    useEffect(() => {
        const fetchContactsDetails = () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    // console.log(uid);
                    const userRef = doc(database, 'Users', uid)
                    // console.log(userRef);
                    const userDoc = (await getDoc(userRef))
                    // console.log(userDoc)
                    const userData = userDoc.data()
                    // console.log(userData.contact);
                    if (userData && userData.contact) {
                        const pickedContacts = userData.contact.find((contact) => contact.id === parseInt(id))
                        setContact(pickedContacts || {})
                        // console.log(pickedContacts,'picked');
                    }
                }
            })
        }
        fetchContactsDetails()
    }, [id])

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const saveContact = async () => {
        try {
            const uid = auth.currentUser.uid
            const userRef = doc(database, 'Users', uid);
            const userDoc = (await getDoc(userRef))
            const userData = userDoc.data()
            await updateDoc(userRef, {
                contact: userData.contact.map((element) => (element.id === contact.id ? contact : element)),
            });
            dispatch(updateContactDetails(contact));
            toast.success('Contact updated successfully')
            setTimeout(() => {
                navigate('/numberPage')
            }, 2000);
        } catch (error) {
            console.error("Error updating contact:", error.message);
            toast.error('Error updating contact');
        }
    }

    const [Isloading, setIsloading] = useState(false)
    const profileupload = useRef(null)
    const handleInput = async(event) =>{
        const file = event.target.files[0]
        console.log(file);
        if (file) {
            setIsloading(true)
            try {
                const storage =getStorage()
                console.log(storage)
                const storageRef =ref( storage, `contactProfile_picture${file.name}`)
                console.log(storageRef)
                const snapshot = await uploadBytes(storageRef, file)
                console.log(snapshot)
                const photoUrl = await getDownloadURL(snapshot.ref)
                console.log(photoUrl)

                const updatedContacts = { ...contact, photoUrl}

                const uid =auth.currentUser.uid
                const userRef = doc(database, 'Users', uid);
                const userDoc = await getDoc(userRef);
                const userData = userDoc.data();
                await updateDoc(userRef, {
                    contact: userData.contact.map((contact)=>contact.id === updatedContacts.id ? updatedContacts : contact)
                })
                setContact(updatedContacts)
                // dispatch(updateContactDetails(updatedContacts))
                console.log("Profile picture updated successfully!");
                toast.success('Profile picture updated successfully!')
            } catch (error) {
                console.error("Error uploading and updating profile picture:", error);
                toast.success('Error uploading and updating profile picture')
            }finally{
                setIsloading(false)
            }
        }
    }
    useEffect(() => {
        setTimeout(() => {
            if (Isloading) {
                toast.success('uploading profile picture,please wait....')
            }
        }, 1000);
    }, [Isloading])
    
    const profileChange = ()=>{
        profileupload.current.click()
    }

    return (
        <>
            <div className='py-3 save h-100'>
                <div className='d-flex justify-content-around align-items-center position-sticky top-0 p-3'>
                    <div className='text-primary'>Cancel</div>
                    <div className='text-white'>New Contact</div>
                    <div className='text-primary' onClick={saveContact}>Done</div>
                </div>
                {/* <div className='hold-p'>
                    <IoPersonCircleSharp className='defalt' />
                    <div className='add'>Add Photo</div>
                </div> */}
                <div className=' text-center flex items-center justify-center flex-col'>
                    <div className=' bg-slate-300 flex items-center justify-center text-center rounded-full w-[100px] h-[100px]' onClick={profileChange}>
                        {
                        contact.photoUrl ? (
                            <img className='rounded-full w-[100px] h-[100px]' src={contact.photoUrl} alt="" />
                        ) : (
                            <div className=' text-white text-2xl font-bold text-center'>{contact.firstName}</div>
                        )
                        }
                        <input type="file" 
                        hidden 
                        ref={profileupload} 
                        onChange={handleInput}
                        className='bg-white' />
                    </div>
                    <div className=' text-white text-xl font-medium'>{contact.firstName} {contact.lastName}</div>
                    {/* <div className=' flex justify-between items-center gap-4 py-2'>
                        <div className=' bg-slate-400 py-2 px-3 rounded-md flex items-center justify-center flex-col w-20'>
                            <FaComment size={25} className='text-white' />
                            <div className=' text-white'>message</div>
                        </div>
                        <div className=' bg-slate-400 py-2 px-3 rounded-md flex items-center justify-center flex-col w-20'>
                            <IoIosCall size={25} className='text-white' />
                            <div className=' text-white'>call</div>
                        </div>
                        <div className=' bg-slate-400 py-2 px-3 rounded-md flex items-center justify-center flex-col w-20'>
                            <IoVideocam size={25} className='text-white' />
                            <div className=' text-white'>video</div>
                        </div>
                        <div className=' bg-slate-400 py-2 px-3 rounded-md flex items-center justify-center flex-col w-20'>
                            <IoIosMail size={25} className='text-white' />
                            <div className=' text-white'>mail</div>
                        </div>
                    </div> */}
                </div>
                <div className='detail-con'>
                    <input type="text" placeholder='First name' name='firstName' className='first text-white' value={contact.firstName} onChange={(e) => handleInputChange(e)} />
                    <hr />
                    <input type="text" placeholder='Last name' name='lastName' className='first' value={contact.lastName} onChange={(e) => handleInputChange(e)} />
                    <hr />
                    <input type="text" placeholder='Company' name='company' className='first' value={contact.company} onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='detail-con'>
                    {
                        toggleVisibility.phone && (
                            <div className='d-flex gap-4'>
                                <IoMdRemoveCircle className='bg-danger ' />
                                <div className='text-primary'>Mobile</div>
                                <input className='text-light bg-black' type="text" value={contact.phoneNumber} onChange={handleChange} />
                                {/* <div className='text-light'>{phoneNumber}</div> */}
                            </div>
                        )
                    }
                    <div>
                        <div onClick={() => Visibility('phone')} className='text-white'>add phone</div>
                    </div>
                </div>
                <div className='detail-con'>
                    {
                        toggleVisibility.email && (
                            <div className='d-flex gap-4'>
                                <IoMdRemoveCircle className='bg-danger ' />
                                <div className='text-primary'>Email</div>
                                <input className='text-light bg-black' type="text" />
                            </div>
                        )
                    }
                    <div className='text-white' onClick={() => Visibility('email')}>add email</div>
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
                    <div onClick={() => Visibility('pronouns')} className='text-white'>add pronouns</div>
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
                    <div onClick={() => Visibility('url')} className='text-white'>add url</div>
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
                    <div onClick={() => Visibility('address')} className='text-white'>add address</div>
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
                    <div onClick={() => Visibility('birthday')} className='text-white'>add birthday</div>
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
                    <div onClick={() => Visibility('date')} className='text-white'>add date</div>
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
                    <div onClick={() => Visibility('name')} className='text-white'>add related name</div>
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
                    <div onClick={() => Visibility('social')} className='text-white'>add social profile</div>
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
                    <div onClick={() => Visibility('message')} className='text-white'>add instant message</div>
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
    )
}

export default EditDetails