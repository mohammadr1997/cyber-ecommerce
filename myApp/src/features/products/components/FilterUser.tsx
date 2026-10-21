import KeyboardArrowLeftSharpIcon from "@mui/icons-material/KeyboardArrowLeftSharp";
import { Typography } from "@mui/material";

import { useNavigate, useSearchParams } from "react-router-dom";
import AccordionFilter from "./AccordionFilter";
import type { IProductType } from "@/apis/productsApi";
import useGetCategoriesAttributes from "../hooks/useGetCategoriesAttributes";
import ErrorComp from "@/features/error/Error";
import Loading from "@/features/loading/loading";

interface IFilterUser {
  filteredProducts: IProductType[];
  filteredproducts?: IProductType[];
}

export default function FilterUser({
  filteredProducts,
  filteredproducts,
}: IFilterUser) {
  const categoryId = filteredProducts[0]?.categoryId._id;

  const { data, isLoading, isError,refetch } =
    useGetCategoriesAttributes(categoryId);

  const brands = filteredProducts.map(
    (product) => product.brand?.name
  );

 

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/catalog?${searchParams}`);
  };

  return (
    <aside
      style={{
        width: "100%",
     
        display: "flex",
        flexDirection: "column",
        marginBottom:'auto',
      
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          flexDirection: "row",
          justifyContent: "start",
          gap: "5px",
          padding: "16px",
          position: "relative",
          marginBottom: "48px",
          backgroundColor:'red'
        }}
      >
        <span onClick={handleBack}>
          <KeyboardArrowLeftSharpIcon
            sx={{
              marginTop: "0",
              display: "inline-block",
              position: "absolute",
              left: "0px",
              top: "18px",
            }}
            fontSize="large"
          />
        </span>

        <span
          style={{
            fontSize: "24px",
            fontWeight: "600",
            display: "inline-block",
            position: "absolute",
            left: "54px",
            top: "20px",
          }}
        >
          Filters
        </span>
      </Typography>

      <div
        style={{
          display: "flex",
    
       position:'relative',
       width: "100%",
          flexDirection: "column",
          gap: "24px",
        }}
      >
      {isLoading && (
  <Loading
    variant="section"
    text="Loading filters..."
  />
)}

{isError && (
  <ErrorComp
    variant="section"
    text="Failed to load filters."
    onRetry={() => refetch()}
  />
)}

{data && !isLoading && !isError && (
  <AccordionFilter
    filteredproducts={filteredproducts ?? filteredProducts}
    attributes={data.data.data}
    brands={brands}
  />
)}
      </div>
    </aside>
  );
}