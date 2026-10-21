import { authApi, type IAuthPayload } from '@/apis/authApi';
import { useAppDispatch } from '@/hooks/hooks';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@/redux/user/userSlice';
import { showToast } from '@/redux/toast/toastSlice';
import { AxiosError } from 'axios';

export  interface errorResponse{
    success: boolean,
    message: string
}
export const useRegisterMutation=()=>{
const dispatch=useAppDispatch()
    const navigate=useNavigate()
    const mutation=useMutation({
        mutationFn:(data:IAuthPayload)=>authApi.register(data),
        onSuccess:async(res)=>{
                dispatch(showToast({message:'Register Successfully!',type:'success'}))
                console.log('user',res?.data?.user)
                
                const token=res?.data?.token
                localStorage.setItem('token',token)
                const response=await authApi.getMe();
    const user={...response?.data?.user,isAuthenticated
:true}

                dispatch(setUser(user))
                navigate('/')
                console.log('response',response) 
              },
                onError:(error:AxiosError<errorResponse>)=>{
                      dispatch(showToast({message:error.response?.data?.message || 'Register failed',type:'error'}))
                      console.log('error register',error.response?.data?.message)
                      console.log('error itself',error)
                    },
              
    })

    return mutation
    
}