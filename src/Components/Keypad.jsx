import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoCall } from "react-icons/io5";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { MdPersonAdd } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setPhoneNumber } from '../Redux/PhoneSlice';

const Keypad = () => {
  const [data, setdata] = useState({ number: "" })
  const [show, setshow] = useState(false)
  const [create, setcreate] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ser = () => {
    if (!data == "") {
      setshow(true)
    }
    else {
      setshow(false)
    }
  }
  

  const clear = () => {
    if (data && data.number) {
      const newdata = { ...data }
      newdata.number = newdata.number.slice(0, -1)
      setdata(newdata)
      // setdata({...data, number: data.number.slice(0,-1)})
    }
  }
  const add = () => {
    setcreate(!create)
    // setcontacts(data.number)
    // console.log(store)
  }
  const contact = () => {
    if (data.number) {
      console.log(data.number);
      
      // setcontacts(data.number)
      dispatch(setPhoneNumber(data.number))
      // addContact({ number: data.number });
      setdata({ number: "" });
      setcreate(false);
      setshow(false);
      navigate("/save")
    }
  }
  return (
    <>
      <div className='keypad p-3'>
        {/* <div className='text-white display fs-1' onChange={ser}>{data.number}</div> */}
        <input onChange={(e) => ser(e)} type="text" className='text-white display fs-1' value={data.number} />
        {
          show && (
            <div onClick={add} className='text-primary d-flex align-items-center justify-content-center position-relative'>Add Number</div>
          )
        }
        {
          create && (
            <div className='create mx-auto'>
              <div className='d-flex gap-3'>
                <div onClick={contact} className='new'>Create New Contact</div>
                <IoMdContact className='fs-4' />
              </div>
              <div className='line'></div>
              <div className='d-flex gap-3'>
                <div >Add to Existing Contact</div>
                <MdPersonAdd className='fs-4' />
              </div>
            </div>

          )
        }
        <div className='mt-3 holder-key'>
          <div className='numbers'>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((value) => (
              <button
                key={value}
                className='touch fs-1'
                value={value}
                onClick={(e) => {
                  ser();
                  setdata({ ...data, number: `${data.number}${e.target.value}` });
                }}
              >
                {value}
              </button>
            ))}
          </div>
          {/* <div className='d-flex align-items-center justify-content-around mt-2'>
            <button className='touch fs-1' value={1} onClick={(e)=>{
            ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>1</button>
            <button className='touch fs-1' value={2} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>2</button>
            <button className='touch fs-1' value={3} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>3</button>
          </div>
          <div className='d-flex align-items-center justify-content-around mt-2'>
            <button className='touch fs-1' value={4} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>4</button>
            <button className='touch fs-1' value={5} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>5</button>
            <button className='touch fs-1' value={6} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>6</button>
          </div>
          <div className='d-flex align-items-center justify-content-around mt-2'>
            <button className='touch fs-1' value={7} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>7</button>
            <button className='touch fs-1' value={8} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>8</button>
            <button className='touch fs-1' value={9} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>9</button>
          </div>
          <div className='d-flex align-items-center justify-content-around mt-2'>
            <button className='touch fs-1' value={'*'} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>*</button>
            <button className='touch fs-1' value={0} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>0</button>
            <button className='touch fs-1' value={'#'} onClick={(e)=>{
              ser()
              setdata({ ...data, number: `${data.number}${e.target.value}` })}}>#</button>
          </div> */}
          <div className='d-flex align-items-center justify-content-center mt-3'>
            <button className='touchs fs-1'>
              <IoCall className='call' />
            </button>
            {
              show && (
                <FaDeleteLeft onClick={clear} className='dell' />
              )
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Keypad