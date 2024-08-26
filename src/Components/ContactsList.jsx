import React, { useContext,useState,useEffect } from 'react';
import AppContext from '../Constant/AppProvider';
import { auth,database } from '../Constant/FirebaseConfig';
import { MdAddCall } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const ContactsList = () => {
  const navigate = useNavigate()
  const Save = ()=>{
      navigate('/dash/keypad')
  }
  const [contactDetails, setcontactDetails] = useState([])
  useEffect(() => {
   
    const auth = getAuth()
  }, [auth])
  useEffect(() => {
   
    try {
      
      onAuthStateChanged (auth,async(user)=>{
        if(user){
          const uid = user.uid;
          // console.log(uid);
          const userRef = doc(database, 'Users', uid)
          // console.log(userRef);
          const userDoc = (await getDoc(userRef))
          // console.log(userDoc)
          const userNumbers =userDoc.data()
          // console.log(userNumbers);
            
            const phoneNumbers = userNumbers.contact
            // console.log(phoneNumbers);
            setcontactDetails(phoneNumbers)
            // console.log(contactDetails);
            
        }else{
          navigate('/')
        }
      })
    } catch (error) {
      
    }
  }, [])
  const route = useParams()
  let id = route.id
  const ContactPage = (id)=>{
    console.log(id)
    navigate(`/contactDetails/${id}`)
  }

  return (
    <div className="contacts-list py-3 px-3">
      <h2>Saved Contacts</h2>
      {contactDetails.length > 0 ? (
        <main>
          {contactDetails.map((contact, index) => (
            <div key={index} className=' border-b-2 py-1' onClick={(()=>ContactPage(contact.id))}>
              <div>{contact.firstName} {contact.lastName}</div>
              {/* <div><strong>Company:</strong> {contact.company}</div> */}
              {/* <div><strong>Phone:</strong> {contact.phonenumber}</div> */}
            </div>
          ))}
        </main>
      ) : (
        <p>No contacts saved yet.</p>
      )}
      <button className=' bg-gray-400 rounded-full p-4 text-white fixed right-10 bottom-4' onClick={Save}>
        <MdAddCall size={40} />
      </button>
    </div>
  );
};

export default ContactsList;
