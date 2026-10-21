import { useMutation } from '@tanstack/react-query';
// import AppTheme from '../shared-theme/AppTheme';

import { showToast } from '@/redux/toast/toastSlice';
import { authApi} from '@/apis/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';
import type { dataFormTypes } from '../components/SignIn';
import type { errorResponse } from './useRegisterMutation';
import { setUser } from '@/redux/user/userSlice';
export const useLoginMutation=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch()
const mutation=useMutation({
    mutationFn:(data:dataFormTypes)=>authApi.loginUser(data),
    onSuccess:(res)=>{
         dispatch(showToast({
                  message:'You successfully signed in!',
                  type:'success'
                }))
                console.log('user role',res?.data.user.role)
                if(res?.data?.user?.role ==='admin') navigate('/admin')
                    if(res?.data?.user?.role==='user') navigate('/products')
                const token=res?.data?.token
                localStorage.setItem('token',token)
                const userLoggedIn={...res?.data?.user,isAuthenticated:true}
                dispatch(setUser(userLoggedIn))
               

    },
    onError:(error:AxiosError<errorResponse>)=>{
         dispatch(showToast({
                message:error.response?.data?.message || 'Login Failed',
                type:'error'
              }))
    }
})

return mutation
}