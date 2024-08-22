import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendSignInLinkToEmail, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { app,database } from '../../Constant/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const AuthSign = () => {
  const [isLogin, setIsLogin] = useState(true);
  // useEffect(() => {
    
  // }, [])
  
  const auth = getAuth(app)
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const collectionRef = collection(database, 'Users')
  // const collectionDoc = doc()
  const navigate = useNavigate()

  const validationSchema = yup.object({
    email: yup.string().email("must be a valid email").required("email is required"),
    password: yup.string().min(6, "password is too short").required("password is required"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "password must match")
    .when('isLogin',{ is:false, then: yup.string().required("confirmPassword is required")})
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      setbuttonDisabled(true);
    
      if (isLogin) {
        try {
          const response = await signInWithEmailAndPassword(auth, email, password);
          // console.log(response);
          toast.success('Welcome, have a nice time!');
          setTimeout(() => {
            navigate('/numberPage');
          }, 2000);
        } catch (error) {
          // console.error(error);
          toast.error('Login Failed');
          setbuttonDisabled(false);
        }
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          await updateProfile(auth.currentUser, {
            displayName: user.email,
          });
    
          const userRef = doc(database, 'Users', user.uid);
          await setDoc(userRef, {
            Email: user.email,
            displayName: user.displayName,
            userId: user.uid,
            contact: [],
          });
    
          toast.success('Sign up Successfully');
          await sendSignInLinkToEmail(auth.currentUser);
          toast.success('A verification has been sent to your mail');
          setIsLogin(true);
        } catch (error) {
          console.error(error);
          toast.error('Sign up Failed');
          setbuttonDisabled(false);
        }
      }
    }
    
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full overflow-hidden">
        {/* Title Text */}
        <div className="flex transition-transform duration-700" style={{ transform: isLogin ? 'translateX(20%)' : 'translateX(-25%)' }}>
          <div className={`text-center w-1/2 text-3xl font-semibold ${!isLogin && '-translate-x-full'}`}>
            Login Form
          </div>
          <div className={`text-center w-1/2 text-3xl font-semibold ${isLogin && 'translate-x-full'}`}>
            Signup Form
          </div>
        </div>
        {/* Slide Controls */}
        <div className="relative flex justify-between items-center mt-8 mb-4 border border-gray-300 rounded-xl h-12 overflow-hidden">
          <label
            htmlFor="login"
            className={`flex-1 text-center text-lg font-medium cursor-pointer leading-12 ${isLogin ? 'text-white' : 'text-black'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </label>
          <label
            htmlFor="signup"
            className={`flex-1 text-center text-lg font-medium cursor-pointer leading-12 ${!isLogin ? 'text-white' : 'text-black'}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </label>
          <div
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-xl transition-transform duration-700"
            style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}
          />
        </div>
        {/* Form Container */}
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-700" style={{ transform: isLogin ? 'translateX(0)' : 'translateX(-100%)' }}>
            {/* Login Form */}
            <form className="w-full flex-shrink-0" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  name='email'
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name='password'
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              <div className="text-right mb-4">
                <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-lg transition-all duration-300 delay-75 transform -translate-x-full hover:translate-x-0" />
                <input
                  type="submit"
                  value="Login"
                  className="relative top-4 z-10 w-full py-2 text-white font-semibold bg-transparent cursor-pointer rounded-lg focus:outline-none"
                  disabled={buttonDisabled}
                />
              </div>
              <div className="text-center mt-4">
                <a
                  href="#"
                  className="text-blue-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                  }}
                >
                  Not a member? Signup now
                </a>
              </div>
            </form>
            {/* <ToastContainer/> */}
            {/* Signup Form */}
            <form className="w-full flex-shrink-0" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition"
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <small>{formik.errors.email}</small>
                ) : null}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition"
                  name='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <small>{formik.errors.password}</small>
                ) : null}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition"
                  name='confirmPassword'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <small>{formik.errors.confirmPassword}</small>
                ) : null}
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-lg transition-all duration-300 transform -translate-x-full hover:translate-x-0" />
                <input
                  type="submit"
                  value="Signup"
                  className="relative top-4 z-10 w-full py-2 text-white font-semibold bg-blue-800 cursor-pointer rounded-lg focus:outline-none"
                  disabled={buttonDisabled}
                />
              </div>
              <div className="text-center mt-4">
                <a
                  href="#"
                  className="text-blue-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(true);
                  }}
                >
                  Already have an account? Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AuthSign;
