import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import type { ICategoryType } from '../hooks/useCategoriesQuery';
import type { IProductType } from '@/apis/productsApi';
import type { AxiosResponse } from 'axios';
import type { UseMutationResult } from 'node_modules/@tanstack/react-query/build/modern/_tsup-dts-rollup';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface IConfirmModalType{
    handleOpenConfirmModal:()=>void,
    handleCloseConfirmModal:()=>void,
    openConfirmModal:boolean,
   useDelete:UseMutationResult<
  AxiosResponse<any>,
  Error,
  string,
  unknown
>;
    selectedItem:ICategoryType | IProductType | null
    itemSelected:string
}
export default function ConfirmationModal({useDelete,itemSelected,selectedItem,handleCloseConfirmModal,openConfirmModal}:IConfirmModalType) {
//  const deleteMutation=useDeleteCategory(handleCloseConfirmModal)
    const handleDeleteItem=()=>{
   if( selectedItem &&selectedItem._id){useDelete.mutate(selectedItem._id)}
    
   
        // deleteMutation.mutate(selectedCategory.id)
    
 }

  return (
    <div>
      {/* <Button onClick={handleOpenConfirmModal}>Open modal</Button> */}
      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{marginBottom:'10px'}} id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete this {itemSelected}:{selectedItem && selectedItem.name && selectedItem.name || ''}
          </Typography>
         <Button onClick={handleDeleteItem} variant='contained' fullWidth>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
