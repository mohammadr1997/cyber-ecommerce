
import {  Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import  { useDispatch } from 'react-redux'
import {setUser} from "@/redux/user/userSlice"
import { useGetMeQuery } from "@/hooks/useGetMeQuery"
import { useAppSelector } from "@/hooks/hooks"
import { clearUser } from "@/redux/user/userSlice"
import AdminHeader from '@/Components/AdminHeader'
import Sidebar from "@/Components/Sidebar"

export default function AdminRoutes() {

const dispatch=useDispatch()
const {data,isError,isLoading}=useGetMeQuery();
const user=useAppSelector((state)=>state.user)
  console.log({
  isLoading,
  isError,
  role: user.role,
});

  useEffect(()=>{
    console.log('data in admin',data)
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
  const token=localStorage.getItem('token')
  if(isLoading) return <h1>Loading...</h1>
  if(isError) {
    localStorage.removeItem('token')
    dispatch(clearUser())
    return <Navigate to="/sign-in" replace />;
  }
if(!token){
return <Navigate to="/sign-in" replace />;
}

if(data?.data.user.role!=='admin') return <Navigate to="/" replace/>

return(
  <>
  
   <AdminHeader/>
   <Sidebar/>
<Outlet/>
  </>
 


)


}
