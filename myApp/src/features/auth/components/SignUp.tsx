// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { useForm } from "react-hook-form";
// import CssBaseline from '@mui/material/CssBaseline';
// import { zodResolver } from "@hookform/resolvers/zod";
// import {signUpFormSchema} from '../Schemas/Schemas'
// import type {formValues} from '../Schemas/Schemas'
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import { Link } from 'react-router';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import MuiCard from '@mui/material/Card';
// import { styled } from '@mui/material/styles';

// import type { IAuthPayload } from '@/apis/authApi';
// import { useRegisterMutation } from '../hooks/useRegisterMutation';








// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   margin: 'auto',
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   [theme.breakpoints.up('sm')]: {
//     width: '450px',
//   },
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
//   }),
// }));

// const SignUpContainer = styled(Stack)(({ theme }) => ({
//   height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
//   minHeight: '100%',
//   padding: theme.spacing(2),
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(4),
//   },
//   '&::before': {
//     content: '""',
//     display: 'block',
//     position: 'absolute',
//     zIndex: -1,
//     inset: 0,
//     backgroundImage:
//       'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
//     backgroundRepeat: 'no-repeat',
//     ...theme.applyStyles('dark', {
//       backgroundImage:
//         'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
//     }),
//   },
// }));


// export default function SignUp() {

// const mutation=useRegisterMutation();
//   const {register,formState:{errors},handleSubmit,reset}=useForm<formValues>({
//   resolver:zodResolver(signUpFormSchema)
//   });

//   const onSubmit=async(data:IAuthPayload)=>{
//       mutation.mutate(data)
//     // mutation.mutate(data,{
//     //   onError:(error:any)=>{
//     //     dispatch(showToast({message:'Register Failed!',type:'error'}))
//     //     console.log('error register',error.response?.data?.message)
//     //   },
//     //   onSuccess:async(res)=>{
//     //     dispatch(showToast({message:'Register Successfully!',type:'success'}))
//     //     console.log('user',res?.data?.user)
        
//     //     const token=res?.data?.token
//     //     localStorage.setItem('token',token)
//     //     const response=await authApi.getMe()
//     //     dispatch(setUser(response.data?.user))
//     //     navigate('/products')
//     //     console.log('response',response) 
//     //   }
//     // })
  




// //clear all data from form after submit
// reset()
//   }
// //   const initials={
// //   firstName:'',
// //   lastName:'',
// //   email:'',
// //   password:''
// // }
// //  const [fields,setFields]=React.useState(initials);
// //  const [fieldsError,setFieldsError]=React.useState(initials); 


// //  const handleChangeForm=(e:React.ChangeEvent<HTMLInputElement>)=>{
// //   setFields(prev=>{
// //     return {...prev,[e.target.name]:e.target.value}
// //   })
// // }
// //   const validateInputs = () => {
 
// // const errors={...initials}
// //     let isValid = true;

// //     if (!fields.email|| !/\S+@\S+\.\S+/.test(fields.email)) {
// //       errors.email='email is invalid'
// //       isValid = false;
// //     } 

// //     if (!fields.password || fields.password.length < 6) {
// //       errors.password='Password must be at least 6 characters long'
// //       isValid = false;
// //     }

// //     if (!fields.firstName || fields.firstName.length < 1) {
// //       errors.firstName='FullName is required'
// //       isValid = false;
// //     }
// //     if (!fields.lastName || fields.lastName.length < 1) {
// //       errors.lastName='lastName is required'
// //       isValid = false;
// //     } 
// //     setFieldsError(errors)
// //     return isValid;
// //   };

//   // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
//   //  event.preventDefault();
        
//   //   const data = new FormData(event.currentTarget);
//   //   console.log({
//   //     firstName: data.get('firstName'),
//   //     lastName: data.get('lastName'),
//   //     email: data.get('email'),
//   //     password: data.get('password'),
//   //   });

//   //   setFields(initials)
    
 
//   // };

//   return (
//     <>
//       <CssBaseline enableColorScheme />
     
//       <SignUpContainer direction="column" sx={{ justifyContent: 'space-between' }}>
//         <Card variant="outlined">
       
//           <Typography
//             component="h1"
//             variant="h4"
//             sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
//           >
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//           >
//             <FormControl>
//               <FormLabel htmlFor="name">FirstName</FormLabel>
//               <TextField
//                 autoComplete="firstName"
//                 fullWidth
           
//                 id="firstName"
//                 placeholder="Jon"
//                 error={!!errors.firstName}
//                 helperText={errors.firstName?.message}
//                 {...register('firstName')}
               
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="name">LastName</FormLabel>
//               <TextField
//                 autoComplete="lastName"
                
//                 fullWidth
//                 id="lastName"
                
//                 placeholder=" Snow"
//                 error={!!errors.lastName}
//                 helperText={errors.lastName?.message}
//                 {...register('lastName')}
               
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="email">Email</FormLabel>
//               <TextField
              
//                 fullWidth
                
//                 id="email"
//                 placeholder="your@email.com"
                
//                 autoComplete="email"
               
//                 variant="outlined"
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//                 {...register('email')}
               
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="password">Password</FormLabel>
//               <TextField
//                 fullWidth
               

//                 placeholder="••••••"
//                 type="password"
//                 id="password"
//                 autoComplete="new-password"
//                 variant="outlined"
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//                 {...register('password')}
               
//               />
//             </FormControl>
           
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
             
//             >
//               Sign up
//             </Button>
//           </Box>
      
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
//             <Typography sx={{ textAlign: 'center' }}>
//               Already have an account?{' '}
//                 <Link to={'/sign-in'} style={{textDecoration:'none'}}>Sign In</Link>
//             </Typography>
//           </Box>
//         </Card>
//       </SignUpContainer>
    
//     </>
//   );
// }
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import CssBaseline from '@mui/material/CssBaseline';
import { zodResolver } from "@hookform/resolvers/zod";
import {signUpFormSchema} from '../Schemas/Schemas'
import type {formValues} from '../Schemas/Schemas'
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import type { IAuthPayload } from '@/apis/authApi';
import { useRegisterMutation } from '../hooks/useRegisterMutation';








const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2.5),
  margin: 'auto',
  borderRadius: '16px',
  border: '1px solid #e8e8e8',
  backgroundColor: '#ffffff',
  boxShadow:
    '0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.10)',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    border: '1px solid #2a2a2a',
    backgroundColor: '#141011',
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 30%, #f5f5f5, #ffffff 70%)',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

// ظاهر مشترک فیلدها (فقط استایل، بدون تاثیر روی منطق)
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    transition: 'box-shadow 0.2s ease',
    '& fieldset': { borderColor: '#141011' },
    '&:hover fieldset': { borderColor: '#141011' },
    '&.Mui-focused fieldset': {
      borderColor: '#141011',
      borderWidth: '1.5px',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 4px rgba(20, 16, 17, 0.08)',
    },
    '&.Mui-error fieldset': { borderColor: '#d32f2f' },
  },
  '& .MuiOutlinedInput-input': {
    padding: '16px 14px',
    fontFamily: 'inherit',
  },
  '& .MuiFormHelperText-root': {
    fontFamily: 'inherit',
    marginLeft: '4px',
  },
};

// ظاهر مشترک لیبل‌ها
const labelSx = {
  mb: 0.75,
  fontSize: '0.9rem',
  fontWeight: 600,
  fontFamily: 'inherit',
  color: '#141011',
  '&.Mui-focused': { color: '#141011' },
};


export default function SignUp() {

const mutation=useRegisterMutation();
  const {register,formState:{errors},handleSubmit,reset}=useForm<formValues>({
  resolver:zodResolver(signUpFormSchema)
  });

  const onSubmit=async(data:IAuthPayload)=>{
      mutation.mutate(data)
    // mutation.mutate(data,{
    //   onError:(error:any)=>{
    //     dispatch(showToast({message:'Register Failed!',type:'error'}))
    //     console.log('error register',error.response?.data?.message)
    //   },
    //   onSuccess:async(res)=>{
    //     dispatch(showToast({message:'Register Successfully!',type:'success'}))
    //     console.log('user',res?.data?.user)
        
    //     const token=res?.data?.token
    //     localStorage.setItem('token',token)
    //     const response=await authApi.getMe()
    //     dispatch(setUser(response.data?.user))
    //     navigate('/products')
    //     console.log('response',response) 
    //   }
    // })
  




//clear all data from form after submit
reset()
  }
//   const initials={
//   firstName:'',
//   lastName:'',
//   email:'',
//   password:''
// }
//  const [fields,setFields]=React.useState(initials);
//  const [fieldsError,setFieldsError]=React.useState(initials); 


//  const handleChangeForm=(e:React.ChangeEvent<HTMLInputElement>)=>{
//   setFields(prev=>{
//     return {...prev,[e.target.name]:e.target.value}
//   })
// }
//   const validateInputs = () => {
 
// const errors={...initials}
//     let isValid = true;

//     if (!fields.email|| !/\S+@\S+\.\S+/.test(fields.email)) {
//       errors.email='email is invalid'
//       isValid = false;
//     } 

//     if (!fields.password || fields.password.length < 6) {
//       errors.password='Password must be at least 6 characters long'
//       isValid = false;
//     }

//     if (!fields.firstName || fields.firstName.length < 1) {
//       errors.firstName='FullName is required'
//       isValid = false;
//     }
//     if (!fields.lastName || fields.lastName.length < 1) {
//       errors.lastName='lastName is required'
//       isValid = false;
//     } 
//     setFieldsError(errors)
//     return isValid;
//   };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
  //  event.preventDefault();
        
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     firstName: data.get('firstName'),
  //     lastName: data.get('lastName'),
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });

  //   setFields(initials)
    
 
  // };

  return (
    <>
      <CssBaseline enableColorScheme />
     
      <SignUpContainer direction="column" sx={{ justifyContent: 'space-between' }}>
        <Card variant="outlined">
       
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              fontFamily: 'inherit',
              color: '#141011',
            }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <FormControl>
              <FormLabel htmlFor="name" sx={labelSx}>FirstName</FormLabel>
              <TextField
                autoComplete="firstName"
                fullWidth
           
                id="firstName"
                placeholder="Jon"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                {...register('firstName')}
                sx={fieldSx}
               
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name" sx={labelSx}>LastName</FormLabel>
              <TextField
                autoComplete="lastName"
                
                fullWidth
                id="lastName"
                
                placeholder=" Snow"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...register('lastName')}
                sx={fieldSx}
               
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" sx={labelSx}>Email</FormLabel>
              <TextField
              
                fullWidth
                
                id="email"
                placeholder="your@email.com"
                
                autoComplete="email"
               
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
                sx={fieldSx}
               
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={labelSx}>Password</FormLabel>
              <TextField
                fullWidth
               

                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
                sx={fieldSx}
               
              />
            </FormControl>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                py: 1.75,
                borderRadius: '10px',
                backgroundColor: '#141011',
                color: '#ffffff',
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#2b2527',
                  boxShadow: '0 8px 20px rgba(20, 16, 17, 0.25)',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
             
            >
              Sign up
            </Button>
          </Box>
      
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: 'inherit',
                color: '#555',
                fontSize: '0.95rem',
              }}
            >
              Already have an account?{' '}
                <Link
                  to={'/sign-in'}
                  style={{
                    textDecoration: 'none',
                    color: '#141011',
                    fontWeight: 700,
                    borderBottom: '1.5px solid #141011',
                  }}
                >
                  Sign In
                </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    
    </>
  );
}