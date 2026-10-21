import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import useCategoriesQuery from "@/features/category/hooks/useCategoriesQuery";
import CategoryPaginationComp from "./CategoryPaginationComp";
import { categoryIcons } from "@/constants/category-icon"; 
import { colors } from "@/constants/colors";
import useHandleNavigateCategory from "../hooks/useHandleNavigateCategory";
import Loading from "@/features/loading/loading";
import ErrorComp from "@/features/error/Error";

interface ICategory{

  _id: string,
  name: string,
  icon: string,
  status: boolean,
 
}
export default function CategoryPagination() {
  const handleNavigateCategory=useHandleNavigateCategory();
 
  const { data, isLoading, isError } = useCategoriesQuery();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const itemsPerPage = isDesktop ? 6 : 2;
   
  const [page, setPage] = useState(0);

  const categories = data?.data?.data || [];
  const totalPages = Math.max(Math.ceil(categories.length / itemsPerPage), 1);
const handleNavigate=(categoryName:string)=>{
handleNavigateCategory(categoryName)
}
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [totalPages, page]);

  if (isLoading) {
  return <Loading variant="section" text="Loading categories..." />;
}
  if (isError) {
  return (
    <ErrorComp 
      variant="section"
      text="Failed to load categories."
      onRetry={() => window.location.reload()}
    />
  );
}

  const startIndex = page * itemsPerPage;
  const visibleCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box sx={{ width: "100%", padding: "25px" }}>
      <CategoryPaginationComp
        onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        disablePrev={page === 0}
        disableNext={page === totalPages - 1}
      />
<Typography sx={{color:`${colors.charocal}`,fontWeight:'600',marginBottom:'32px',fontSize:{xs:'18px',md:'24px'}}} variant="h4">Browse By Category</Typography>
      <Box
        sx={{
          width:'100%',
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(6, 1fr)" },
          gap: 2,
          marginTop: "16px",
      
          overflow:'hidden'
        
        }}
      >
      {visibleCategories.map((category: ICategory) => {
     
  return (
    <Box
      onClick={() => handleNavigate(category.name)}
      key={category._id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        
        cursor: "pointer",
        padding: "24px 52px",
        borderRadius: "15px",
        backgroundColor: colors.backgroundCategory,
        width: { xs: "142px", md: "160px" },
        height: { xs: "85px", md: "128px" },
      }}
    >
      <Box
        sx={{
          fontSize: { xs: "24px", md: "36px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& svg": {
            fontSize: { xs: "24px", md: "36px" },
          },
        }}
      >
        {categoryIcons[category.icon] || null}
      </Box>

      <Typography
        sx={{
          fontSize: { xs: "12px", md: "14px" },
          fontWeight: 500,
          textAlign: "center",
          width:{xs:'100px',md:'110px'},
          
        }}
      >
        {category.name}
      </Typography>
    </Box>
  );
})}
      </Box>
    </Box>
  )
}