
// import { useState } from "react";

// import {
//   Box,
//   Button,
//   Chip,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
// } from "@mui/material";

// import useCategoriesQuery, {
//   type ICategoryType,
// } from "@/features/category/hooks/useCategoriesQuery";

// import useBrandsQuery from "../hooks/useBrandsQuery";

// import type { IBrandType } from "@/apis/brandApi";

// import brandApi from "@/apis/brandApi";

// export default function AdminBrand() {
//   // ==========================
//   // CATEGORIES
//   // ==========================

//   const {
//     data: categoriesData,
//     isLoading: categoriesLoading,
//     isError: categoriesError,
//   } = useCategoriesQuery();

//   // ==========================
//   // BRANDS
//   // ==========================

//   const {
//     data: brandsData,
//     refetch: refetchBrands,
//     isLoading: brandsLoading,
//   } = useBrandsQuery();

//   // ==========================
//   // STATES
//   // ==========================

//   const [open, setOpen] = useState(false);

//   const [brandName, setBrandName] = useState("");

//   const [selectedCategory, setSelectedCategory] =
//     useState<ICategoryType | null>(null);

//   const [deletingBrandId, setDeletingBrandId] =
//     useState<string | null>(null);

//   const [isCreating, setIsCreating] = useState(false);

//   // ==========================
//   // DATA
//   // ==========================

//   const categories =
//     categoriesData?.data?.data ?? [];

//   const brands: IBrandType[] =
//     brandsData ?? [];

//   // ==========================
//   // OPEN ADD BRAND
//   // ==========================

//   const handleOpenAddBrand = (
//     category: ICategoryType,
//   ) => {
//     setSelectedCategory(category);

//     setBrandName("");

//     setOpen(true);
//   };

//   // ==========================
//   // CLOSE MODAL
//   // ==========================

//   const handleClose = () => {
//     if (isCreating) return;

//     setOpen(false);

//     setBrandName("");

//     setSelectedCategory(null);
//   };

//   // ==========================
//   // ADD BRAND
//   // ==========================

//   const handleAddBrand = async () => {
//     const trimmedName = brandName.trim();

//     // ==========================
//     // VALIDATION
//     // ==========================

//     if (!trimmedName) {
//       return;
//     }

//     if (!selectedCategory?._id) {
//       console.error(
//         "Cannot create brand: category is missing.",
//       );

//       return;
//     }

//     try {
//       setIsCreating(true);

//       // ==========================
//       // CREATE BRAND
//       // ==========================

//       const response =
//         await brandApi.createBrand({
//           name: trimmedName,

//           categories: [
//             selectedCategory._id,
//           ],
//         });

//       console.log(
//         "CREATE BRAND RESPONSE:",
//         response.data,
//       );

//       // ==========================
//       // CHECK RESPONSE
//       // ==========================

//       if (!response.data.success) {
//         console.error(
//           "Brand creation failed:",
//           response.data.message,
//         );

//         return;
//       }

//       // ==========================
//       // REFRESH BRANDS
//       // ==========================

//       await refetchBrands();

//       // ==========================
//       // CLOSE MODAL
//       // ==========================

//       setOpen(false);

//       setBrandName("");

//       setSelectedCategory(null);
//     } catch (error: any) {
//       console.error(
//         "Error creating brand:",
//         error,
//       );

//       if (error?.response) {
//         console.error(
//           "Server response:",
//           error.response.data,
//         );
//       }
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   // ==========================
//   // DELETE BRAND
//   // ==========================

//   const handleDeleteBrand = async (
//     brand: IBrandType,
//   ) => {
//     if (!brand._id) {
//       return;
//     }

//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${brand.name}"?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setDeletingBrandId(brand._id);

//       await brandApi.deleteBrand(
//         brand._id,
//       );

//       // ==========================
//       // REFRESH BRANDS
//       // ==========================

//       await refetchBrands();
//     } catch (error: any) {
//       console.error(
//         "Error deleting brand:",
//         error,
//       );

//       if (error?.response) {
//         console.error(
//           "Server response:",
//           error.response.data,
//         );
//       }
//     } finally {
//       setDeletingBrandId(null);
//     }
//   };

//   // ==========================
//   // LOADING
//   // ==========================

//   if (
//     categoriesLoading ||
//     brandsLoading
//   ) {
//     return (
//       <Box sx={{ p: 3 }}>
//         Loading...
//       </Box>
//     );
//   }

//   // ==========================
//   // CATEGORY ERROR
//   // ==========================

//   if (categoriesError) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography color="error">
//           Error loading categories.
//         </Typography>
//       </Box>
//     );
//   }

//   // ==========================
//   // GET BRANDS FOR CATEGORY
//   // ==========================

//   const getCategoryBrands = (
//     categoryId: string,
//   ) => {
//     return brands.filter((brand) => {
//       if (!brand.categories) {
//         return false;
//       }

//       return brand.categories.some(
//         (category: any) => {
//           // ==========================
//           // CATEGORY IS OBJECT
//           // ==========================

//           if (
//             typeof category === "object" &&
//             category !== null
//           ) {
//             return (
//               category._id === categoryId
//             );
//           }

//           // ==========================
//           // CATEGORY IS STRING
//           // ==========================

//           if (
//             typeof category === "string"
//           ) {
//             return category === categoryId;
//           }

//           return false;
//         },
//       );
//     });
//   };

//   // ==========================
//   // RENDER
//   // ==========================

//   return (
//     <Box
//       sx={{
//         width: "100%",

//         p: {
//           xs: 1,
//           sm: 2,
//           md: 3,
//         },
//       }}
//     >
//       {/* ==========================
//           TITLE
//       ========================== */}

//       <Typography
//         variant="h5"
//         sx={{
//           mb: 3,

//           fontWeight: "bold",

//           fontSize: {
//             xs: "1.3rem",
//             sm: "1.5rem",
//           },
//         }}
//       >
//         Brand Management
//       </Typography>

//       {/* ==========================
//           NO CATEGORIES
//       ========================== */}

//       {categories.length === 0 ? (
//         <Typography color="text.secondary">
//           There is no category added.
//         </Typography>
//       ) : (
//         <Box>
//           {categories.map(
//             (
//               category: ICategoryType,
//             ) => {
//               const categoryBrands =
//                 getCategoryBrands(
//                   category._id,
//                 );

//               return (
//                 <Box
//                   key={category._id}
//                   sx={{
//                     mb: 2,

//                     p: {
//                       xs: 1.5,
//                       sm: 2,
//                     },

//                     border:
//                       "1px solid #ddd",

//                     borderRadius: 2,

//                     backgroundColor:
//                       "#fff",
//                   }}
//                 >
//                   {/* ==========================
//                       CATEGORY HEADER
//                   ========================== */}

//                   <Box
//                     sx={{
//                       display: "flex",

//                       flexDirection: {
//                         xs: "column",
//                         sm: "row",
//                       },

//                       justifyContent:
//                         "space-between",

//                       alignItems: {
//                         xs: "flex-start",
//                         sm: "center",
//                       },

//                       gap: 1.5,
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         fontWeight:
//                           "bold",

//                         fontSize: {
//                           xs: "1.1rem",
//                           sm: "1.25rem",
//                         },
//                       }}
//                     >
//                       {category.name}
//                     </Typography>

//                     {/* ==========================
//                         DESKTOP ADD BUTTON
//                     ========================== */}

//                     <Button
//                       variant="contained"
//                       onClick={() =>
//                         handleOpenAddBrand(
//                           category,
//                         )
//                       }
//                       sx={{
//                         display: {
//                           xs: "none",
//                           sm: "block",
//                         },
//                       }}
//                     >
//                       Add Brand
//                     </Button>
//                   </Box>

//                   {/* ==========================
//                       BRANDS
//                   ========================== */}

//                   <Box
//                     sx={{
//                       mt: 2,

//                       display: "flex",

//                       gap: 1,

//                       flexWrap: "wrap",
//                     }}
//                   >
//                     {categoryBrands.length ===
//                     0 ? (
//                       <Typography
//                         color="text.secondary"
//                         sx={{
//                           fontSize:
//                             "0.9rem",
//                         }}
//                       >
//                         No brands added
//                         to this
//                         category.
//                       </Typography>
//                     ) : (
//                       categoryBrands.map(
//                         (brand) => (
//                           <Chip
//                             key={
//                               brand._id
//                             }
//                             label={
//                               brand.name
//                             }
//                             color={
//                               brand.status
//                                 ? "primary"
//                                 : "default"
//                             }
//                             disabled={
//                               deletingBrandId ===
//                               brand._id
//                             }
//                             onDelete={() =>
//                               handleDeleteBrand(
//                                 brand,
//                               )
//                             }
//                           />
//                         ),
//                       )
//                     )}
//                   </Box>

//                   {/* ==========================
//                       MOBILE ADD BUTTON
//                   ========================== */}

//                   <Button
//                     fullWidth
//                     variant="contained"
//                     onClick={() =>
//                       handleOpenAddBrand(
//                         category,
//                       )
//                     }
//                     sx={{
//                       mt: 2,

//                       display: {
//                         xs: "block",
//                         sm: "none",
//                       },
//                     }}
//                   >
//                     Add Brand
//                   </Button>
//                 </Box>
//               );
//             },
//           )}
//         </Box>
//       )}

//       {/* ==========================
//           ADD BRAND DIALOG
//       ========================== */}

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         fullWidth
//         maxWidth="sm"
//       >
//         {/* ==========================
//             TITLE
//         ========================== */}

//         <DialogTitle>
//           Add Brand
//         </DialogTitle>

//         {/* ==========================
//             CONTENT
//         ========================== */}

//         <DialogContent>
//           <Typography
//             sx={{
//               mb: 2,
//               mt: 1,
//             }}
//           >
//             Category:{" "}
//             <strong>
//               {selectedCategory?.name}
//             </strong>
//           </Typography>

//           <TextField
//             autoFocus
//             fullWidth
//             label="Brand Name"
//             value={brandName}
//             disabled={isCreating}
//             onChange={(event) =>
//               setBrandName(
//                 event.target.value,
//               )
//             }
//             onKeyDown={(event) => {
//               if (
//                 event.key ===
//                   "Enter" &&
//                 !isCreating
//               ) {
//                 event.preventDefault();

//                 handleAddBrand();
//               }
//             }}
//           />
//         </DialogContent>

//         {/* ==========================
//             ACTIONS
//         ========================== */}

//         <DialogActions
//           sx={{
//             p: 2,

//             flexDirection: {
//               xs: "column",
//               sm: "row",
//             },

//             gap: {
//               xs: 1,
//               sm: 0,
//             },
//           }}
//         >
//           {/* ==========================
//               CANCEL
//           ========================== */}

//           <Button
//             onClick={handleClose}
//             disabled={isCreating}
//             sx={{
//               width: {
//                 xs: "100%",
//                 sm: "auto",
//               },
//             }}
//           >
//             Cancel
//           </Button>

//           {/* ==========================
//               ADD
//           ========================== */}

//           <Button
//             variant="contained"
//             onClick={handleAddBrand}
//             disabled={
//               !brandName.trim() ||
//               !selectedCategory?._id ||
//               isCreating
//             }
//             sx={{
//               width: {
//                 xs: "100%",
//                 sm: "auto",
//               },
//             }}
//           >
//             {isCreating
//               ? "Adding..."
//               : "Add Brand"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

import { useState } from "react";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

import useCategoriesQuery, {
  type ICategoryType,
} from "@/features/category/hooks/useCategoriesQuery";

import useBrandsQuery from "../hooks/useBrandsQuery";

import type { IBrandType } from "@/apis/brandApi";

import brandApi from "@/apis/brandApi";

// ==========================
// SHARED APPEARANCE STYLES (فقط ظاهر)
// ==========================

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontFamily: "inherit",
    backgroundColor: "#ffffff",
    transition: "box-shadow 0.2s ease",
    "& fieldset": { borderColor: "#141011" },
    "&:hover fieldset": { borderColor: "#141011" },
    "&.Mui-focused fieldset": {
      borderColor: "#141011",
      borderWidth: "1.5px",
    },
    "&.Mui-focused": {
      boxShadow: "0 0 0 4px rgba(20, 16, 17, 0.08)",
    },
    "&.Mui-error fieldset": { borderColor: "#d32f2f" },
    "&.Mui-disabled fieldset": { borderColor: "#d0d0d0" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "inherit",
    color: "#555",
    "&.Mui-focused": { color: "#141011" },
    "&.Mui-error": { color: "#d32f2f" },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "inherit",
    marginLeft: "4px",
  },
};

const primaryBtnSx = {
  borderRadius: "10px",
  backgroundColor: "#141011",
  color: "#ffffff",
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "none",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#2b2527",
    boxShadow: "0 8px 20px rgba(20, 16, 17, 0.25)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  "&.Mui-disabled": {
    backgroundColor: "#e0e0e0",
    color: "#9a9a9a",
  },
};

const cancelBtnSx = {
  borderRadius: "10px",
  border: "1px solid #141011",
  color: "#141011",
  fontFamily: "inherit",
  fontWeight: 600,
  textTransform: "none",
  backgroundColor: "#ffffff",
  px: 3,
  py: 1.25,
  transition: "all 0.2s ease",
  "&:hover": {
    border: "1px solid #141011",
    backgroundColor: "rgba(20, 16, 17, 0.05)",
  },
  "&.Mui-disabled": {
    border: "1px solid #d0d0d0",
    color: "#a0a0a0",
    backgroundColor: "#f5f5f5",
  },
};

const dialogPaperSx = {
  borderRadius: "16px",
  border: "1px solid #e8e8e8",
  boxShadow:
    "0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.10)",
  fontFamily: "inherit",
};

const chipBaseSx = {
  fontFamily: "inherit",
  fontWeight: 600,
  borderRadius: "8px",
  transition: "all 0.2s ease",
};

const chipActiveSx = {
  ...chipBaseSx,
  backgroundColor: "#141011",
  color: "#ffffff",
  "& .MuiChip-deleteIcon": {
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover": { color: "#ffffff" },
  },
};

const chipInactiveSx = {
  ...chipBaseSx,
  backgroundColor: "#f0f0f0",
  color: "#141011",
  border: "1px solid #e0e0e0",
  "& .MuiChip-deleteIcon": {
    color: "rgba(20, 16, 17, 0.5)",
    "&:hover": { color: "#141011" },
  },
};

export default function AdminBrand() {
  // ==========================
  // CATEGORIES
  // ==========================

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategoriesQuery();

  // ==========================
  // BRANDS
  // ==========================

  const {
    data: brandsData,
    refetch: refetchBrands,
    isLoading: brandsLoading,
  } = useBrandsQuery();

  // ==========================
  // STATES
  // ==========================

  const [open, setOpen] = useState(false);

  const [brandName, setBrandName] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryType | null>(null);

  const [deletingBrandId, setDeletingBrandId] =
    useState<string | null>(null);

  const [isCreating, setIsCreating] = useState(false);

  // ==========================
  // DATA
  // ==========================

  const categories =
    categoriesData?.data?.data ?? [];

  const brands: IBrandType[] =
    brandsData ?? [];

  // ==========================
  // OPEN ADD BRAND
  // ==========================

  const handleOpenAddBrand = (
    category: ICategoryType,
  ) => {
    setSelectedCategory(category);

    setBrandName("");

    setOpen(true);
  };

  // ==========================
  // CLOSE MODAL
  // ==========================

  const handleClose = () => {
    if (isCreating) return;

    setOpen(false);

    setBrandName("");

    setSelectedCategory(null);
  };

  // ==========================
  // ADD BRAND
  // ==========================

  const handleAddBrand = async () => {
    const trimmedName = brandName.trim();

    // ==========================
    // VALIDATION
    // ==========================

    if (!trimmedName) {
      return;
    }

    if (!selectedCategory?._id) {
      console.error(
        "Cannot create brand: category is missing.",
      );

      return;
    }

    try {
      setIsCreating(true);

      // ==========================
      // CREATE BRAND
      // ==========================

      const response =
        await brandApi.createBrand({
          name: trimmedName,

          categories: [
            selectedCategory._id,
          ],
        });

      console.log(
        "CREATE BRAND RESPONSE:",
        response.data,
      );

      // ==========================
      // CHECK RESPONSE
      // ==========================

      if (!response.data.success) {
        console.error(
          "Brand creation failed:",
          response.data.message,
        );

        return;
      }

      // ==========================
      // REFRESH BRANDS
      // ==========================

      await refetchBrands();

      // ==========================
      // CLOSE MODAL
      // ==========================

      setOpen(false);

      setBrandName("");

      setSelectedCategory(null);
    } catch (error: any) {
      console.error(
        "Error creating brand:",
        error,
      );

      if (error?.response) {
        console.error(
          "Server response:",
          error.response.data,
        );
      }
    } finally {
      setIsCreating(false);
    }
  };

  // ==========================
  // DELETE BRAND
  // ==========================

  const handleDeleteBrand = async (
    brand: IBrandType,
  ) => {
    if (!brand._id) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${brand.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingBrandId(brand._id);

      await brandApi.deleteBrand(
        brand._id,
      );

      // ==========================
      // REFRESH BRANDS
      // ==========================

      await refetchBrands();
    } catch (error: any) {
      console.error(
        "Error deleting brand:",
        error,
      );

      if (error?.response) {
        console.error(
          "Server response:",
          error.response.data,
        );
      }
    } finally {
      setDeletingBrandId(null);
    }
  };

  // ==========================
  // LOADING
  // ==========================

  if (
    categoriesLoading ||
    brandsLoading
  ) {
    return (
      <Box
        sx={{
          p: 3,
          fontFamily: "inherit",
          color: "#555",
        }}
      >
        Loading...
      </Box>
    );
  }

  // ==========================
  // CATEGORY ERROR
  // ==========================

  if (categoriesError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography
          color="error"
          sx={{ fontFamily: "inherit" }}
        >
          Error loading categories.
        </Typography>
      </Box>
    );
  }

  // ==========================
  // GET BRANDS FOR CATEGORY
  // ==========================

  const getCategoryBrands = (
    categoryId: string,
  ) => {
    return brands.filter((brand) => {
      if (!brand.categories) {
        return false;
      }

      return brand.categories.some(
        (category: any) => {
          // ==========================
          // CATEGORY IS OBJECT
          // ==========================

          if (
            typeof category === "object" &&
            category !== null
          ) {
            return (
              category._id === categoryId
            );
          }

          // ==========================
          // CATEGORY IS STRING
          // ==========================

          if (
            typeof category === "string"
          ) {
            return category === categoryId;
          }

          return false;
        },
      );
    });
  };

  // ==========================
  // RENDER
  // ==========================

  return (
    <Box
      sx={{
        width: "100%",

        p: {
          xs: 1,
          sm: 2,
          md: 3,
        },
      }}
    >
      {/* ==========================
          TITLE
      ========================== */}

      <Typography
        variant="h5"
        sx={{
          mb: 3,

          fontWeight: 700,

          fontFamily: "inherit",

          letterSpacing: "-0.5px",

          color: "#141011",

          fontSize: {
            xs: "1.3rem",
            sm: "1.5rem",
          },
        }}
      >
        Brand Management
      </Typography>

      {/* ==========================
          NO CATEGORIES
      ========================== */}

      {categories.length === 0 ? (
        <Typography
          color="text.secondary"
          sx={{ fontFamily: "inherit" }}
        >
          There is no category added.
        </Typography>
      ) : (
        <Box>
          {categories.map(
            (
              category: ICategoryType,
            ) => {
              const categoryBrands =
                getCategoryBrands(
                  category._id,
                );

              return (
                <Box
                  key={category._id}
                  sx={{
                    mb: 2,

                    p: {
                      xs: 1.5,
                      sm: 2,
                    },

                    border:
                      "1px solid #e8e8e8",

                    borderRadius: "16px",

                    backgroundColor:
                      "#fff",

                    boxShadow:
                      "0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.06)",

                    transition:
                      "box-shadow 0.2s ease",

                    "&:hover": {
                      boxShadow:
                        "0px 4px 12px rgba(20, 16, 17, 0.06), 0px 20px 40px -8px rgba(20, 16, 17, 0.12)",
                    },
                  }}
                >
                  {/* ==========================
                      CATEGORY HEADER
                  ========================== */}

                  <Box
                    sx={{
                      display: "flex",

                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },

                      justifyContent:
                        "space-between",

                      alignItems: {
                        xs: "flex-start",
                        sm: "center",
                      },

                      gap: 1.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,

                        fontFamily:
                          "inherit",

                        letterSpacing:
                          "-0.3px",

                        color: "#141011",

                        fontSize: {
                          xs: "1.1rem",
                          sm: "1.25rem",
                        },
                      }}
                    >
                      {category.name}
                    </Typography>

                    {/* ==========================
                        DESKTOP ADD BUTTON
                    ========================== */}

                    <Button
                      variant="contained"
                      onClick={() =>
                        handleOpenAddBrand(
                          category,
                        )
                      }
                      sx={{
                        ...primaryBtnSx,
                        px: 3,
                        py: 1,
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    >
                      Add Brand
                    </Button>
                  </Box>

                  {/* ==========================
                      BRANDS
                  ========================== */}

                  <Box
                    sx={{
                      mt: 2,

                      display: "flex",

                      gap: 1,

                      flexWrap: "wrap",
                    }}
                  >
                    {categoryBrands.length ===
                    0 ? (
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize:
                            "0.9rem",
                          fontFamily:
                            "inherit",
                        }}
                      >
                        No brands added
                        to this
                        category.
                      </Typography>
                    ) : (
                      categoryBrands.map(
                        (brand) => (
                          <Chip
                            key={
                              brand._id
                            }
                            label={
                              brand.name
                            }
                            color={
                              brand.status
                                ? "primary"
                                : "default"
                            }
                            disabled={
                              deletingBrandId ===
                              brand._id
                            }
                            onDelete={() =>
                              handleDeleteBrand(
                                brand,
                              )
                            }
                            sx={
                              brand.status
                                ? chipActiveSx
                                : chipInactiveSx
                            }
                          />
                        ),
                      )
                    )}
                  </Box>

                  {/* ==========================
                      MOBILE ADD BUTTON
                  ========================== */}

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      handleOpenAddBrand(
                        category,
                      )
                    }
                    sx={{
                      ...primaryBtnSx,
                      py: 1.5,
                      mt: 2,

                      display: {
                        xs: "block",
                        sm: "none",
                      },
                    }}
                  >
                    Add Brand
                  </Button>
                </Box>
              );
            },
          )}
        </Box>
      )}

      {/* ==========================
          ADD BRAND DIALOG
      ========================== */}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: { sx: dialogPaperSx },
          backdrop: {
            sx: {
              backgroundColor: "rgba(20, 16, 17, 0.45)",
              backdropFilter: "blur(2px)",
            },
          },
        }}
      >
        {/* ==========================
            TITLE
        ========================== */}

        <DialogTitle
          sx={{
            fontFamily: "inherit",
            fontWeight: 700,
            letterSpacing: "-0.5px",
            color: "#141011",
            pt: 3,
          }}
        >
          Add Brand
        </DialogTitle>

        {/* ==========================
            CONTENT
        ========================== */}

        <DialogContent>
          <Typography
            sx={{
              mb: 2,
              mt: 1,
              fontFamily: "inherit",
              color: "#555",
            }}
          >
            Category:{" "}
            <strong
              style={{ color: "#141011" }}
            >
              {selectedCategory?.name}
            </strong>
          </Typography>

          <TextField
            autoFocus
            fullWidth
            label="Brand Name"
            value={brandName}
            disabled={isCreating}
            onChange={(event) =>
              setBrandName(
                event.target.value,
              )
            }
            onKeyDown={(event) => {
              if (
                event.key ===
                  "Enter" &&
                !isCreating
              ) {
                event.preventDefault();

                handleAddBrand();
              }
            }}
            sx={fieldSx}
          />
        </DialogContent>

        {/* ==========================
            ACTIONS
        ========================== */}

        <DialogActions
          sx={{
            p: 2,
            pb: 3,
            px: 3,

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            gap: {
              xs: 1,
              sm: 1,
            },
          }}
        >
          {/* ==========================
              CANCEL
          ========================== */}

          <Button
            onClick={handleClose}
            disabled={isCreating}
            sx={{
              ...cancelBtnSx,
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Cancel
          </Button>

          {/* ==========================
              ADD
          ========================== */}

          <Button
            variant="contained"
            onClick={handleAddBrand}
            disabled={
              !brandName.trim() ||
              !selectedCategory?._id ||
              isCreating
            }
            sx={{
              ...primaryBtnSx,
              px: 3,
              py: 1.25,
              // فاصله‌ی MUI بین دکمه‌ها در حالت ستونی (موبایل) بهم نخورد
              ml: {
                xs: "0 !important",
                sm: undefined,
              },
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            {isCreating
              ? "Adding..."
              : "Add Brand"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}