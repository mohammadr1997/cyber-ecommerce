import axiosClient from "./axiosClient"
interface ICategoryType{
    name:string,
    icon:string
}
const categoryApi={
    addCategory:async(data:ICategoryType)=>{

        const token=localStorage.getItem('token')
        return await axiosClient.post('/auth/categories',data,{
             headers: {
        Authorization: `Bearer ${token}`,
      },
        })
    },

    getAllCategories:async()=>{
        const token=localStorage.getItem('token')
        return  await axiosClient.get('/auth/categories',{
              headers: {
        Authorization: `Bearer ${token}`,
      },
        })
    },
      deleteCategory:async(id:string)=>{
        const token=localStorage.getItem('token')
        return  await axiosClient.delete(`/auth/categories/${id}`,{
              headers: {
        Authorization: `Bearer ${token}`,
      },
        })
    } ,
      updateCategory: async (id: string, data: Omit<ICategoryType, "id">) => {
    const token = localStorage.getItem("token");

    return await axiosClient.put(`/auth/categories/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },   
}

export default categoryApi