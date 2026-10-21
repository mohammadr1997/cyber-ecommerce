// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { Controller, useForm } from "react-hook-form"
// import useCreateCategories from '../hooks/useCreateCategories';
// import { zodResolver } from '@hookform/resolvers/zod';
// import type { SubmitHandler } from 'react-hook-form';
// import {CategorySchema } from '../Schema/CategorySchema';
// import type { formDataType } from '../Schema/CategorySchema';
// import { categoryIcons } from '@/constants/category-icon';
// import type { ICategoryType } from '../hooks/useCategoriesQuery';
// import { useEffect } from 'react';
// import useCategoriesUpdate from '../hooks/useCategoriesUpdate';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };
// interface InputsType{
//   name:string,
//  icon:string
// }

// interface ICategoryModalProps{
//   open:boolean,
//   handleOpen:()=>void,
//   handleClose:()=>void,
//   selectedCategory:ICategoryType,
//   setSelectedCategory:React.Dispatch<React.SetStateAction<ICategoryType>>
// }
// export default function CategoryModal({setSelectedCategory,selectedCategory,open,handleOpen,handleClose}:ICategoryModalProps) {
   
//    const {
//     register,
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<formDataType>({
//     resolver:zodResolver(CategorySchema),
//     defaultValues:{
//       name:'',
//       icon:''
//     }
//   })

//    const mutationCategoryCreate=useCreateCategories()
//    const mutationCategoryUpdate=useCategoriesUpdate(handleClose)
//   const onSubmit: SubmitHandler<InputsType> = (data) => {
//     console.log('check data in modal',data)
//     const updateDataPayload={
//       name:data.name,
//       icon:data.icon,
//       _id:selectedCategory._id,
//       status:selectedCategory.status
//     }
//     console.log('check selected category',selectedCategory)
//     if(selectedCategory && selectedCategory.name && selectedCategory.icon){
//       mutationCategoryUpdate.mutate(updateDataPayload)
//       setSelectedCategory({
//         name:'',
//         icon:'',
//         _id:'',
//         status:false
//       })
//     }else{
//       mutationCategoryCreate.mutate(data,{
//   onSuccess:()=>{
//   reset({
//         name: "",
//         icon: "",
//       });
//     handleClose()
//   }
// })
//     }





//   }
//  useEffect(()=>{

//   if(selectedCategory && selectedCategory.name && selectedCategory.icon) {
//     reset({
//       name:selectedCategory.name,
//       icon:selectedCategory.icon
//     })
//   }else{
//     reset({
//       name:'',
//       icon:''
//     })
//   }
//  },[selectedCategory])

//   //test
   
//   return (
//     <div>
//       <Button variant='contained' sx={{marginTop:'15px'}} onClick={()=>{
//         reset({
//           name:'',
//           icon:''
//         })
// handleOpen()
//       }}>Add Category</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={style}>
//           <Typography sx={{marginBottom:'10px'}} id="modal-modal-title" variant="h6" component="h2">
//          Category
//           </Typography>
//         <TextField
//         {...register('name',{required:'name is required'})}
//         error={Boolean(errors.name)}
      
//         helperText={errors.name?.message}
//         fullWidth  sx={{marginBottom:'10px'}} id="outlined-basic" label="name" variant="outlined" />
//         {/* <TextField {...register('icon',{required:'icon is required'})}
//         error={Boolean(errors.icon)}
//         helperText={errors.icon?.message}
//         fullWidth sx={{marginBottom:'10px'}} id="outlined-basic" label="icon" variant="outlined" /> */}
//         <FormControl fullWidth>
//   <InputLabel id="demo-simple-select-label">Category Icon</InputLabel>
//    <Controller
//     name="icon"
//     control={control}
//     render={({ field }) => (
//       <Select
//         {...field}
        
//         labelId="category-icon-label"
//         label="Category Icon"
        
//         value={field.value || ""}
//       >
//         {Object.keys(categoryIcons).map((iconName) => (
//           <MenuItem key={iconName} value={iconName}>
//             {categoryIcons[iconName]} - {iconName}
//           </MenuItem>
//         ))}
//       </Select>
//     )}
//   />
//   {errors.icon && <Typography color="error">{errors.icon.message}</Typography>}
// </FormControl>
//         <Button type='submit' variant='contained' sx={{marginBottom:'10px'}} fullWidth> Submit</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from "react-hook-form"
import useCreateCategories from '../hooks/useCreateCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import {CategorySchema } from '../Schema/CategorySchema';
import type { formDataType } from '../Schema/CategorySchema';
import { categoryIcons } from '@/constants/category-icon';
import type { ICategoryType } from '../hooks/useCategoriesQuery';
import { useEffect } from 'react';
import useCategoriesUpdate from '../hooks/useCategoriesUpdate';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #e8e8e8',
  borderRadius: '16px',
  boxShadow:
    '0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.10)',
  p: 4,
  outline: 'none',
  fontFamily: 'inherit',
};

// استایل مشترک فیلدها (فقط ظاهر)
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
  '& .MuiInputLabel-root': {
    fontFamily: 'inherit',
    color: '#555',
    '&.Mui-focused': { color: '#141011' },
    '&.Mui-error': { color: '#d32f2f' },
  },
  '& .MuiFormHelperText-root': {
    fontFamily: 'inherit',
    marginLeft: '4px',
  },
};

const menuPaperSx = {
  mt: 0.5,
  borderRadius: '12px',
  border: '1px solid #e8e8e8',
  boxShadow:
    '0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.10)',
  '& .MuiMenuItem-root': {
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#141011',
    '&:hover': { backgroundColor: 'rgba(20, 16, 17, 0.05)' },
    '&.Mui-selected': { backgroundColor: 'rgba(20, 16, 17, 0.08)' },
    '&.Mui-selected:hover': { backgroundColor: 'rgba(20, 16, 17, 0.12)' },
  },
};

const primaryBtnSx = {
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
};

interface InputsType{
  name:string,
 icon:string
}

interface ICategoryModalProps{
  open:boolean,
  handleOpen:()=>void,
  handleClose:()=>void,
  selectedCategory:ICategoryType,
  setSelectedCategory:React.Dispatch<React.SetStateAction<ICategoryType>>
}
export default function CategoryModal({setSelectedCategory,selectedCategory,open,handleOpen,handleClose}:ICategoryModalProps) {
   
   const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataType>({
    resolver:zodResolver(CategorySchema),
    defaultValues:{
      name:'',
      icon:''
    }
  })

   const mutationCategoryCreate=useCreateCategories()
   const mutationCategoryUpdate=useCategoriesUpdate(handleClose)
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    console.log('check data in modal',data)
    const updateDataPayload={
      name:data.name,
      icon:data.icon,
      _id:selectedCategory._id,
      status:selectedCategory.status
    }
    console.log('check selected category',selectedCategory)
    if(selectedCategory && selectedCategory.name && selectedCategory.icon){
      mutationCategoryUpdate.mutate(updateDataPayload)
      setSelectedCategory({
        name:'',
        icon:'',
        _id:'',
        status:false
      })
    }else{
      mutationCategoryCreate.mutate(data,{
  onSuccess:()=>{
  reset({
        name: "",
        icon: "",
      });
    handleClose()
  }
})
    }





  }
 useEffect(()=>{

  if(selectedCategory && selectedCategory.name && selectedCategory.icon) {
    reset({
      name:selectedCategory.name,
      icon:selectedCategory.icon
    })
  }else{
    reset({
      name:'',
      icon:''
    })
  }
 },[selectedCategory])

  //test
   
  return (
    <div>
      <Button variant='contained' sx={{marginTop:'15px', ...primaryBtnSx, px: 3, py: 1.25}} onClick={()=>{
        reset({
          name:'',
          icon:''
        })
handleOpen()
      }}>Add Category</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(20, 16, 17, 0.45)',
              backdropFilter: 'blur(2px)',
            },
          },
        }}
      >
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={style}>
          <Typography
            sx={{
              marginBottom:'18px',
              fontFamily: 'inherit',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              color: '#141011',
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
         Category
          </Typography>
        <TextField
        {...register('name',{required:'name is required'})}
        error={Boolean(errors.name)}
      
        helperText={errors.name?.message}
        fullWidth  sx={{marginBottom:'18px', ...fieldSx}} id="outlined-basic" label="name" variant="outlined" />
        {/* <TextField {...register('icon',{required:'icon is required'})}
        error={Boolean(errors.icon)}
        helperText={errors.icon?.message}
        fullWidth sx={{marginBottom:'10px'}} id="outlined-basic" label="icon" variant="outlined" /> */}
        <FormControl fullWidth sx={{ marginBottom: '18px', ...fieldSx }}>
  <InputLabel id="demo-simple-select-label">Category Icon</InputLabel>
   <Controller
    name="icon"
    control={control}
    render={({ field }) => (
      <Select
        {...field}
        
        labelId="category-icon-label"
        label="Category Icon"
        
        value={field.value || ""}
        MenuProps={{ slotProps: { paper: { sx: menuPaperSx } } }}
        sx={{ borderRadius: '10px', fontFamily: 'inherit' }}
      >
        {Object.keys(categoryIcons).map((iconName) => (
          <MenuItem key={iconName} value={iconName}>
            {categoryIcons[iconName]} - {iconName}
          </MenuItem>
        ))}
      </Select>
    )}
  />
  {errors.icon && (
    <Typography color="error" sx={{ fontFamily: 'inherit', fontSize: '0.75rem', mt: 0.5, ml: '4px' }}>
      {errors.icon.message}
    </Typography>
  )}
</FormControl>
        <Button type='submit' variant='contained' sx={{marginBottom:'10px', py: 1.5, ...primaryBtnSx}} fullWidth> Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}