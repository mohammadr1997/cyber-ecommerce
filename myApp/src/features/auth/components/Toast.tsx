
import Snackbar from '@mui/material/Snackbar';

import Alert from '@mui/material/Alert';


import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { hideToast } from '@/redux/toast/toastSlice';
export default function Toast() {

  const {open,message,type}=useAppSelector((state)=>state.toast)
  const dispatch=useAppDispatch()
 

  const handleClose=()=>{
    dispatch(hideToast())
  }
  return (
    <div>
    
      <Snackbar  anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
      {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
