import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import useProductsQuery from "../hooks/useProductsQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { IProductType } from "@/apis/productsApi";
import { getProductImageUrl } from "@/constants/api";
import { PRODUCT_COLORS } from "@/constants/colors";
import Loading from "@/features/loading/loading";

// =====================================================
// TYPES
// =====================================================

interface ICategory {
  _id: string;
  name: string;
}

interface IBrand {
  _id: string;
  name: string;
}

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
interface IProductAttribute {
  attributeId:
    | string
    | {
        _id: string;
        name: string;
        key: string;
      };

  value: string;
}
export interface IProducts {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  quantity: number;
  price: number;
  mainImage: string;
mainImageColorId?: string;

  categoryId: ICategory;


  images?: {
    _id?: string;
    url: string;
    colorId: string;
  }[];
  shopId?: IUser | number;
attributes?: IProductAttribute[];
  brand?: IBrand;

  // ============================
  // COLORS
  // ============================

  colors?: string[] | undefined;

  isFeatured: boolean;
  isBestSeller: boolean;

  createdAt?: string;
  updatedAt?: string;
}

// =====================================================
// PROPS
// =====================================================

interface IProductListAdminProps {
  handleCloseConfirmModal: () => void;
  handleOpenConfirmModal: () => void;
  handleOpenEditModal: () => void;
  handleCloseEditModal: () => void;

  signEditOrAdd: string | null;

  setSelectedImage: React.Dispatch<
    React.SetStateAction<string>
  >;

  setSignEditOrAdd: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  setSelectedProduct: React.Dispatch<
    React.SetStateAction<IProductType | null>
  >;
}

// =====================================================
// COMPONENT
// =====================================================

export default function ProductListAdmin({
  setSelectedImage,
  setSignEditOrAdd,
  handleOpenEditModal,
  handleOpenConfirmModal,
  setSelectedProduct,
}: IProductListAdminProps) {
  // =====================================================
  // COLUMNS
  // =====================================================

  const columns: GridColDef<IProductType>[] = [
    // ===================================================
    // ID
    // ===================================================

    {
      field: "_id",
      headerName: "_ID",
      width: 90,
    },

    // ===================================================
    // NAME
    // ===================================================

    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },

    // ===================================================
    // SHORT DESCRIPTION
    // ===================================================

    {
      field: "shortDescription",
      headerName: "Short Description",
      width: 150,
      editable: true,
    },

    // ===================================================
    // LONG DESCRIPTION
    // ===================================================

    {
      field: "longDescription",
      headerName: "Long Description",
      width: 150,
      editable: true,
    },

    // ===================================================
    // QUANTITY
    // ===================================================

    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 110,
      editable: true,
    },

    // ===================================================
    // PRICE
    // ===================================================

    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 160,
      editable: true,

      renderCell: (params) => {
        return <>{params.value} $</>;
      },
    },

    // ===================================================
    // BRAND
    // ===================================================

    {
      field: "brand",
      headerName: "Brand Name",
      sortable: false,
      width: 160,

      renderCell: (params) => {
        return (
          <>
            {params.row.brand?.name ?? "No brand"}
          </>
        );
      },
    },

    // ===================================================
    // CATEGORY
    // ===================================================

    {
      field: "categoryId",
      headerName: "Category Name",
      description:
        "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,

      renderCell: (params) => {
        return (
          <>
            {params.row.categoryId?.name ??
              "No category"}
          </>
        );
      },
    },
{
  field: "attributes",
  headerName: "Attributes",
  sortable: false,
  width: 250,

  renderCell: (params) => {
    const attributes = params.row.attributes ?? [];

    if (attributes.length === 0) {
      return (
        <span style={{ color: "#999" }}>
          No attributes
        </span>
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {attributes.map((attribute) => {
          console.log('attributes',attribute)
          const attributeName =
            typeof attribute.attributeId === "object"
              ? attribute.attributeId.name
              : attribute.attributeId;

          return (
            <Box key={attributeName}>
              <strong>{attributeName}:</strong>{" "}
              {attribute.value}
            </Box>
          );
        })}
      </Box>
    );
  },
},
    // ===================================================
    // COLORS
    // ===================================================

    {
      field: "colors",
      headerName: "Colors",
      description:
        "Colors selected for this product.",
      sortable: false,
      width: 220,

      renderCell: (params) => {
        const productColors =
          (params.row.colors ?? []) as string[];

        // اگر محصول رنگی نداشت
        if (productColors.length === 0) {
          return (
            <span style={{ color: "#999" }}>
              No colors
            </span>
          );
        }

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              flexWrap: "wrap",
            }}
          >
            {productColors.map(
              (colorId: string) => {
                const color =
                  PRODUCT_COLORS.find(
                    (item) =>
                      item.id === colorId,
                  );

                // اگر id رنگ در لیست ثابت نبود
                if (!color) {
                  return (
                    <Box
                      key={colorId}
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border:
                          "2px solid #999",
                        backgroundColor:
                          "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        fontSize: 10,
                      }}
                      title={colorId}
                    >
                      ?
                    </Box>
                  );
                }

                return (
                  <Box
                    key={color.id}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor:
                        color.hexCode,

                      border:
                        color.id === "white" ||
                        color.id === "beige"
                          ? "1px solid #999"
                          : "2px solid #ddd",

                      boxShadow:
                        "0 1px 3px rgba(0,0,0,0.25)",

                      cursor: "pointer",

                      "&:hover": {
                        transform:
                          "scale(1.15)",
                      },

                      transition:
                        "transform 0.15s ease",
                    }}
                    title={`${color.name} — ${color.hexCode}`}
                  />
                );
              },
            )}
          </Box>
        );
      },
    },
{
  field: "colorImages",
  headerName: "Colors & Images",
  sortable: false,
  width: 420,
  renderCell: (params) => {
    const colors = (params.row.colors ?? []) as string[];
    const images = (params.row.images ?? []) as {
      _id?: string;
      url: string;
      colorId: string;
    }[];
    const mainImage = params.row.mainImage;
    const mainImageColorId = params.row.mainImageColorId;

    if (colors.length === 0) {
      return (
        <span style={{ color: "#999" }}>
          No colors
        </span>
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          py: 1,
          width: "100%",
        }}
      >
        {colors.map((colorId: string) => {
          const color = PRODUCT_COLORS.find(
            (item) => item.id === colorId
          );

          // Gallery images belonging to this color
          const colorImages = images.filter(
            (image) => image.colorId === colorId
          );

          // Check if main image belongs to this color
          const isMainColor = mainImageColorId === colorId;

          return (
            <Box
              key={colorId}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minHeight: 50,
                borderBottom: "1px solid #eee",
                pb: 1,
              }}
            >
              {/* COLOR */}
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: color?.hexCode ?? "#eee",
                  border:
                    colorId === "white" ||
                    colorId === "beige"
                      ? "1px solid #999"
                      : "2px solid #ddd",
                  flexShrink: 0,
                }}
                title={color?.name ?? colorId}
              />

              {/* COLOR NAME */}
              <Box
                sx={{
                  width: 70,
                  fontSize: 12,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {color?.name ?? colorId}
              </Box>

              {/* IMAGES */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                  flexWrap: "wrap",
                }}
              >
                {/* MAIN IMAGE */}
                {isMainColor && mainImage && (
                  <Box
                    sx={{
                      position: "relative",
                      width: 45,
                      height: 45,
                    }}
                  >
                    <img
                      src={getProductImageUrl(mainImage)}
                      alt={`${colorId} main`}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "2px solid #1976d2",
                        display: "block",
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(25, 118, 210, 0.85)",
                        color: "white",
                        fontSize: "8px",
                        textAlign: "center",
                        borderRadius: "0 0 4px 4px",
                        lineHeight: "13px",
                      }}
                    >
                      Main
                    </Box>
                  </Box>
                )}

                {/* GALLERY IMAGES */}
                {colorImages.map(
                  (image) => (
                    <img
                      key={image._id ?? image.url}
                    src={getProductImageUrl(image.url)}
                      alt={colorId}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        display: "block",
                      }}
                    />
                  )
                )}

                {/* NO IMAGE */}
                {!isMainColor && colorImages.length === 0 && (
                  <Box
                    sx={{
                      color: "#999",
                      fontSize: 11,
                    }}
                  >
                    No image
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  },
},
    // ===================================================
    // MAIN IMAGE
    // ===================================================

    {
      field: "mainImage",
      headerName: "MainImage",
      description:
        "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,

      renderCell: (params) => {
        return (
          <img
            src={getProductImageUrl(params.value)}
            alt="Product"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        );
      },
    },

    // ===================================================
    // SHOP
    // ===================================================

    {
      field: "shopId",
      headerName: "Shop Id",
      description:
        "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,

      valueGetter: (_value, row) =>
        row.shopId
          ? `${row.shopId}`
          : "",
    },

    // ===================================================
    // FEATURED
    // ===================================================

    {
      field: "isFeatured",
      headerName: "Featured",
      width: 120,

      renderCell: (params) => (
        <span>
          {params.value
            ? "⭐ Yes"
            : "—"}
        </span>
      ),
    },

    // ===================================================
    // BEST SELLER
    // ===================================================

    {
      field: "isBestSeller",
      headerName: "Best Seller",
      width: 130,

      renderCell: (params) => (
        <span>
          {params.value
            ? "🔥 Yes"
            : "—"}
        </span>
      ),
    },

    // ===================================================
    // ACTIONS
    // ===================================================

    {
      field: "actions",
      headerName: "Actions",
      description:
        "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,

      renderCell: (params) => {
        const handleDelete = () => {
          console.log(
            "check id",
            params,
          );

          setSelectedProduct(
            params.row,
          );

          handleOpenConfirmModal();
        };

      const handleEdit = () => {
  const product = params.row as IProducts;

  console.log("========== EDIT PRODUCT ==========");
  console.log("PRODUCT:", product);
  console.log("PRODUCT ID:", product._id);
  console.log("MAIN IMAGE:", product.mainImage);
  console.log("MAIN IMAGE COLOR:", product.mainImageColorId);
  console.log("COLORS:", product.colors);
  console.log("IMAGES:", product.images);
  console.log("ATTRIBUTES:", product.attributes);

 
  setSignEditOrAdd("edit");

 
  setSelectedProduct(product as IProductType);

 
  if (product.mainImage) {
   setSelectedImage(
  getProductImageUrl(product.mainImage)
);
  } else {
    setSelectedImage("");
  }


  handleOpenEditModal();
};

      

        return (
          <>
          

            <EditIcon
              onClick={handleEdit}
              sx={{
                cursor: "pointer",
              }}
              color="warning"
            />

            <DeleteIcon
              onClick={handleDelete}
              sx={{
                cursor: "pointer",
              }}
              color="error"
            />
          </>
        );
      },
    },
  ];

  // =====================================================
  // PRODUCTS QUERY
  // =====================================================

  const {
    data,
    isLoading,
    error,
  } = useProductsQuery();

  // =====================================================
  // LOADING
  // =====================================================

 if (isLoading) {
  return <Loading variant="section" text="Loading products..." />;
}

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return <div>error</div>;
  }

  // =====================================================
  // DEBUG
  // =====================================================

  if (data) {
    console.log(
      "check products",
      data.data.data,
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
      }}
    >
      <DataGrid
        rows={
          data?.data?.data?.map(
            (
              product: IProducts,
              index: number,
            ) => ({
              ...product,

              id:
                product._id ??
                index,
            }),
          ) ?? []
        }
        getRowHeight={() => "auto"}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}