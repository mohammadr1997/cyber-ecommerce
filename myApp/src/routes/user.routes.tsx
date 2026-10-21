import Header from "@/Components/Header"

import { Navigate, Outlet,ScrollRestoration } from "react-router-dom"
import { useEffect } from "react"
import  { useDispatch } from 'react-redux'
import {setUser} from "@/redux/user/userSlice"
import { useGetMeQuery } from "@/hooks/useGetMeQuery"

import { clearUser } from "@/redux/user/userSlice"
import Footer from "@/Components/Footer"
import Loading from "@/features/loading/loading"
export default function UserRoutes() {
const dispatch=useDispatch()
const {data,isError,isLoading}=useGetMeQuery();


  useEffect(()=>{
 if(data){
 
  dispatch(setUser({
    firstName:data?.data.user.firstName,
    lastName:data?.data.user.lastName,
    avatar:data?.data.user.avatar,
    email:data?.data.user.email,
    role:data?.data.user.role,
    isAuthenticated:true
  })
  

)

 }
  },[dispatch,data])
  // const token=localStorage.getItem('token')
 if (isLoading) {
  return <Loading variant="fullscreen" text="Loading Cyber..." />;
}
  if(isError) {
    localStorage.removeItem('token')
    dispatch(clearUser())
    return <Navigate to="/sign-in" replace />;
  }
// if(!token){
// return <Navigate to="/sign-in" replace />;
// }

  return (
    <>
  <ScrollRestoration />
<Header/>
<Outlet/>
<Footer/>

    </>
  )
}
