// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import MuiCard from '@mui/material/Card';
// import { styled } from '@mui/material/styles';
// import { Link } from "react-router";
// import {useForm} from "react-hook-form"

// // import AppTheme from '../shared-theme/AppTheme';

// import { useLoginMutation } from '../hooks/useLoginMutation';
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
// export interface dataFormTypes{
//   email:string,
//   password:string
// }
// export default function SignIn(_props: { disableCustomTheme?: boolean }) {
 
//   const {handleSubmit,reset,register,formState:{errors}}=useForm<dataFormTypes>();
//   // const [emailError, setEmailError] = React.useState(false);
//   // const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
//   // const [passwordError, setPasswordError] = React.useState(false);
//   // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  
 

//   // const validateInputs = () => {
//   //   const email = document.getElementById('email') as HTMLInputElement;
//   //   const password = document.getElementById('password') as HTMLInputElement;
   

//   //   let isValid = true;

//   //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
//   //     setEmailError(true);
//   //     setEmailErrorMessage('Please enter a valid email address.');
//   //     isValid = false;
//   //   } else {
//   //     setEmailError(false);
//   //     setEmailErrorMessage('');
//   //   }

//   //   if (!password.value || password.value.length < 6) {
//   //     setPasswordError(true);
//   //     setPasswordErrorMessage('Password must be at least 6 characters long.');
//   //     isValid = false;
//   //   } else {
//   //     setPasswordError(false);
//   //     setPasswordErrorMessage('');
//   //   }



//   //   return isValid;
//   // };

//   // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   //   if ( emailError || passwordError) {
//   //     event.preventDefault();
//   //     return;
//   //   }
//   //   const data = new FormData(event.currentTarget);
//   //   console.log({
//   //     name: data.get('name'),
//   //     lastName: data.get('lastName'),
//   //     email: data.get('email'),
//   //     password: data.get('password'),
//   //   });
//   // };
// const mutation=useLoginMutation()


// const submitForm=(data:dataFormTypes)=>{

// mutation.mutate(data)




// reset()
// }
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
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//            onSubmit={handleSubmit(submitForm)}
//             sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//           >
          
//             <FormControl>
//               <FormLabel htmlFor="email">Email</FormLabel>
//               <TextField
//               {...register('email',{required:'email is required', pattern:{
//   value:/\S+@\S+\.\S+/,
//   message:'please enter valid email'
//                 }
//               })}

//               helperText={errors.email?.message}
//               error={!!errors.email}
//                 fullWidth
//                 id="email"
//                 placeholder="your@email.com"
//                 name="email"
//                 autoComplete="email"
//                 variant="outlined"
            
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="password">Password</FormLabel>
//               <TextField
//                 {...register('password',{required:'password is required',minLength:{
//                   value:6,
//                   message:'Password must be at least 6 characters long',
//                 }})}
//                 fullWidth
//                 name="password"
//                 error={!!errors.password}
//                 placeholder="••••••"
//                 type="password"
//                 id="password"
//                 autoComplete="new-password"
//                 variant="outlined"
//                 helperText={errors.password?.message}
             
//               />
//             </FormControl>
           
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
           
//             >
//               Sign In
//             </Button>
//           </Box>
      
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
//             <Typography sx={{ textAlign: 'center' }}>
//               Don't have an account?{' '}
//                 <Link to={'/sign-up'} style={{textDecoration:'none'}}>Sign Up</Link>     
//             </Typography>
//           </Box>
//         </Card>
//       </SignUpContainer>
 
//     </>
//   );
// }

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link } from "react-router";
import {useForm} from "react-hook-form"

// import AppTheme from '../shared-theme/AppTheme';

import { useLoginMutation } from '../hooks/useLoginMutation';
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
export interface dataFormTypes{
  email:string,
  password:string
}
export default function SignIn(_props: { disableCustomTheme?: boolean }) {
 
  const {handleSubmit,reset,register,formState:{errors}}=useForm<dataFormTypes>();
  // const [emailError, setEmailError] = React.useState(false);
  // const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  // const [passwordError, setPasswordError] = React.useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  
 

  // const validateInputs = () => {
  //   const email = document.getElementById('email') as HTMLInputElement;
  //   const password = document.getElementById('password') as HTMLInputElement;
   

  //   let isValid = true;

  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage('Please enter a valid email address.');
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage('');
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage('Password must be at least 6 characters long.');
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage('');
  //   }



  //   return isValid;
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   if ( emailError || passwordError) {
  //     event.preventDefault();
  //     return;
  //   }
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     name: data.get('name'),
  //     lastName: data.get('lastName'),
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
const mutation=useLoginMutation()


const submitForm=(data:dataFormTypes)=>{

mutation.mutate(data)




reset()
}
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
            Sign in
          </Typography>
          <Box
            component="form"
           onSubmit={handleSubmit(submitForm)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
          
            <FormControl>
              <FormLabel
                htmlFor="email"
                sx={{
                  mb: 0.75,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  color: '#141011',
                  '&.Mui-focused': { color: '#141011' },
                }}
              >
                Email
              </FormLabel>
              <TextField
              {...register('email',{required:'email is required', pattern:{
  value:/\S+@\S+\.\S+/,
  message:'please enter valid email'
                }
              })}

              helperText={errors.email?.message}
              error={!!errors.email}
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                sx={{
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
                }}
            
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="password"
                sx={{
                  mb: 0.75,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  color: '#141011',
                  '&.Mui-focused': { color: '#141011' },
                }}
              >
                Password
              </FormLabel>
              <TextField
                {...register('password',{required:'password is required',minLength:{
                  value:6,
                  message:'Password must be at least 6 characters long',
                }})}
                fullWidth
                name="password"
                error={!!errors.password}
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                helperText={errors.password?.message}
                sx={{
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
                }}
             
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
              Sign In
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
              Don't have an account?{' '}
                <Link
                  to={'/sign-up'}
                  style={{
                    textDecoration: 'none',
                    color: '#141011',
                    fontWeight: 700,
                    borderBottom: '1.5px solid #141011',
                  }}
                >
                  Sign Up
                </Link>     
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
 
    </>
  );
}