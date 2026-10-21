import CategoryModal from "../components/CategoryModal"
import CategoryAdminList from "../components/CategoryAdminList"
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";
import type { ICategoryType } from "../hooks/useCategoriesQuery";
import useDeleteCategory from "../hooks/useDeleteCategory";

export default function CategoryAdminPage() {
  const [selectedCategory,setSelectedCategory]=useState<ICategoryType>({
    name:'',
    icon:'',
    status:false,
    _id:''
  })
   const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleOpenConfirmModal = () => setOpenConfirmModal(true);
  const handleCloseConfirmModal = () => setOpenConfirmModal(false);
    const [openAddOrUpdateModal, setOpenAddOrUpdateModal] =useState(false);
    const handleOpenAddOrUpdateModal = () => setOpenAddOrUpdateModal(true);
     const handleCloseAddOrUpdateModal = () => setOpenAddOrUpdateModal(false);
     
  const deleteCategory=useDeleteCategory(handleCloseConfirmModal)
  return (
    <div style={{marginLeft:'250px'}}>
      <CategoryModal setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} open={openAddOrUpdateModal} handleOpen={handleOpenAddOrUpdateModal} handleClose={handleCloseAddOrUpdateModal}/>
        <CategoryAdminList selectedCategory={selectedCategory} handleCloseAddOrUpdateModal={handleCloseAddOrUpdateModal} handleOpenAddOrUpdateModal={handleOpenAddOrUpdateModal} openAddOrUpdateModal={openAddOrUpdateModal}  setSelectedCategory={setSelectedCategory}  handleOpenConfirmModal={handleOpenConfirmModal}/>
        <ConfirmationModal useDelete={deleteCategory} itemSelected="category" selectedItem={selectedCategory}  openConfirmModal={openConfirmModal} handleOpenConfirmModal={handleOpenConfirmModal}  handleCloseConfirmModal={handleCloseConfirmModal} />
    </div>
  )
}
