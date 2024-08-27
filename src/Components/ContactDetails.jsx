import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React,{useEffect,useRef,useState} from 'react'
import { useParams,Link } from 'react-router-dom'
// import { auth } from '../Constant/FirebaseConfig'
import { addContact, selectContact } from '../Redux/Slice'
import { useDispatch, useSelector } from 'react-redux'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth,database, storage } from '../Constant/FirebaseConfig';
import { FaComment } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { updateContactDetails } from '../Redux/PhoneSlice'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

const ContactDetails = () => {
    const { id } = useParams()
    const [userContacts, setuserContacts] = useState({})
    useEffect(() => {
        const auth = getAuth()
    }, [auth])
    const dispatch = useDispatch()
    // const contacts =useSelector((state)=>state.contacts.contacts.filter(contact=>contact !==null && contact !== undefined))

    // console.log(contacts);
    // const selectedContact = useSelector((state) => state.contacts.selectedContact);
    // console.log(selectedContact);
    
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
                        const pickedContacts = userData.contact.find((contact)=>contact.id === parseInt(id))
                        setuserContacts(pickedContacts)
                        // console.log(pickedContacts,'picked');
                    }
                }
            })
        }
        fetchContactsDetails()
    }, [id])
    // console.log(userContacts,'use')

    if (!userContacts) {
        return(
        <div>
            loading...
        </div>
        )
    }
    
    const profileupload = useRef(null)
    const handleInput = async(event) =>{
        const file = event.target.files[0]
        console.log(file);
        if (file) {
            try {
                const storage =getStorage()
                const storageRef =ref( storage, `contactProfile_picture${file.name}`)
                console.log(storageRef)
                const snapshot = await uploadBytes(storageRef, file)
                console.log(snapshot)
                const photoUrl = await getDownloadURL(snapshot.ref)
                console.log(photoUrl)

                const updatedContacts = { ...userContacts, photoUrl}

                const uid =auth.currentUser.uid
                const userRef = doc(database, 'Users', uid);
                const userDoc = await getDoc(userRef);
                const userData = userDoc.data();
                await updateDoc(userRef, {
                    contact: userData.contact.map((contact)=>contact.id === updatedContacts.id ? updatedContacts : contact)
                })
                dispatch(updateContactDetails(updatedContacts))
                console.log("Profile picture updated successfully!");
                toast.success('Profile picture updated successfully!')
            } catch (error) {
                console.error("Error uploading and updating profile picture:", error);
                toast.success('Error uploading and updating profile picture')
            }
        }
    }
    const profileChange = ()=>{
        profileupload.current.click()
    }
    return (
        <>
            <div className=' bg-black p-4'>
                <div className=' flex justify-between'>
                    <IoIosArrowBack size={25} className='text-white' />
                    <div className='text-white'>Edit</div>
                </div>
                <div className=' text-center flex items-center justify-center flex-col'>
                    <div className=' bg-slate-300 flex items-center justify-center text-center rounded-full w-[100px] h-[100px]' onClick={profileChange}>
                        {
                        userContacts.photoUrl ? (
                            <img src={userContacts.photoUrl} alt="" />
                        ) : (
                            <div className=' text-white text-2xl font-bold text-center'>{userContacts.firstName}</div>
                        )
                        }
                        <input type="file" 
                        hidden 
                        ref={profileupload} 
                        onChange={handleInput}
                        className='bg-white' />
                    </div>
                    <div className=' text-white text-xl font-medium'>{userContacts.firstName} {userContacts.lastName}</div>
                    <div className=' flex justify-between items-center gap-4 py-2'>
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
                    </div>
                </div>
                <div className=' p-2 rounded-md bg-zinc-600 my-1'>
                    <div className=' text-white'>mobile</div>
                    <Link>{userContacts.phoneNumber}</Link>
                </div>
                <div className='bg-zinc-600 text-white rounded-md my-2'>
                    <textarea 
                     cols="49" rows="5"
                     placeholder='Notes'
                     className=' rounded-md bg-zinc-600 text-white'></textarea>
                </div>
                <div className=' bg-zinc-600 p-3 flex flex-col rounded-md'>
                    <a href="" className='py-2 border-b-2 no-underline'>Share Message</a>
                    <a href="" className='py-2 border-b-2 no-underline'>Share Contacts</a>
                    <a href="" className='py-2 no-underline'>Add to Favourites</a>
                </div>
                <div className=' p-2 rounded-md bg-zinc-600 my-2'>
                    <a href="" className=' no-underline'>Add to Emergency Contacts</a>
                </div>
                <div className=' p-2 rounded-md bg-zinc-600 my-2'>
                    <a href="" className='no-underline'>Block Caller</a>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default ContactDetails