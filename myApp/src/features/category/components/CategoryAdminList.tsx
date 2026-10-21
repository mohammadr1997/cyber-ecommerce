import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { ICategoryType } from '../hooks/useCategoriesQuery';
import useCategoriesQuery from '../hooks/useCategoriesQuery';
import { categoryIcons } from '@/constants/category-icon';
import { Button } from '@mui/material';


// interface ICategoryResponse{
// success: boolean;
//   count: number;
//   data: ICategoryType[]
// }

interface ICategoryAdminProps{
  handleOpenConfirmModal:()=>void,
setSelectedCategory:React.Dispatch<React.SetStateAction<ICategoryType>>,
handleCloseAddOrUpdateModal:()=>void,
handleOpenAddOrUpdateModal:()=>void,
openAddOrUpdateModal:boolean,
selectedCategory:ICategoryType
}
export default function CategoryAdminList({handleOpenConfirmModal,setSelectedCategory,handleOpenAddOrUpdateModal}:ICategoryAdminProps) {


const handleDelete=(category:ICategoryType)=>{
handleOpenConfirmModal()
setSelectedCategory(category)
}

const handleUpdate=(category:ICategoryType)=>{
console.log('check category,',category)
setSelectedCategory(category)
handleOpenAddOrUpdateModal()

}


  const {data,isLoading,isError}=useCategoriesQuery();

  if(isLoading) return <div> loading...</div>

  if (isError) return <div> error...</div>

  const categories=data?.data?.data || []

  if(categories) console.log('categories',categories)

   return (
   <>
   {categories.length
> 0 ?( <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Icon</TableCell>
            <TableCell align="right">Actions</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((dt:ICategoryType) => (
            <TableRow
              key={dt.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {dt.name}
              </TableCell> */}
              <TableCell align="left">{dt.name}</TableCell>
              <TableCell align="right">{categoryIcons[dt.icon]}</TableCell>
              <TableCell align="right">
               
                  <Button sx={{marginRight:'10px'}} onClick={()=>handleUpdate(dt)} variant='contained' color='warning'>ِUpdate</Button>
                   <Button onClick={()=>handleDelete(dt)} variant='contained' color='error'>ِDelete</Button>
              </TableCell>
                         </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>) : <div style={{marginLeft:'200px'}}> there is no category added</div> }
    
   </>
   )
  
}
