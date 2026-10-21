import ProductModal from "../components/ProductModal";
import ProductListAdmin from "../components/ProductListAdmin";
import { useState } from "react";
import ConfirmationModal from "@/features/category/components/ConfirmationModal";
import useDeleteproduct from "../hooks/useDeleteProduct";
import type { IProductType } from "@/apis/productsApi";
export default function AdminProductPage() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const handleOpenConfirmModal = () => setOpenConfirmModal(true);
    const handleCloseConfirmModal = () => setOpenConfirmModal(false);
    const [selectedProduct,setSelectedProduct]=useState<null | IProductType>(null)
const deleteProduct=useDeleteproduct(handleCloseConfirmModal)
 const [openAddOrEditModal, setOpenAddOrEditModal] = useState(false);
 const handleOpenAddOrEditModal=()=>setOpenAddOrEditModal(true)
 const handleCloseAddOrEditModal=()=>setOpenAddOrEditModal(false)
 const [signEditOrAdd,setSignEditOrAdd]=useState<null | string>(null)
 const [selectedImage,setSelectedImage]=useState('')
  return (
    <div style={{marginLeft:'250px'}}>
        <ProductModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} signEditOrAdd={signEditOrAdd} setSignEditOrAdd={setSignEditOrAdd} selectedProduct={selectedProduct} open={openAddOrEditModal} handleOpen={handleOpenAddOrEditModal} handleClose={handleCloseAddOrEditModal}/>
        
        <ProductListAdmin setSelectedImage={setSelectedImage}  signEditOrAdd={signEditOrAdd} setSignEditOrAdd={setSignEditOrAdd} handleOpenEditModal={handleOpenAddOrEditModal} handleCloseEditModal={handleCloseAddOrEditModal} setSelectedProduct={setSelectedProduct} handleOpenConfirmModal={handleOpenConfirmModal} handleCloseConfirmModal={handleCloseConfirmModal}/>
        <ConfirmationModal useDelete={deleteProduct} itemSelected="product" selectedItem={selectedProduct}  openConfirmModal={openConfirmModal} handleOpenConfirmModal={handleOpenConfirmModal}  handleCloseConfirmModal={handleCloseConfirmModal} />
    </div>
  )
}
