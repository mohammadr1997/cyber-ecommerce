// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
//   Rating,
//   Box,
//   Typography,
// } from "@mui/material";
// import type { ComponentProps, ComponentType } from "react";

// import type { IUserType } from "@/apis/userApi";

// import useProductsQuery from "../hooks/useProductsQuery";

// import { useProductReviewsQuery } from "../hooks/useProductReviewsQuery";
// import {useAddReviewMutation} from "../hooks/useAddReviewMutation";
// import {useUpdateReviewMutation} from "../hooks/useUpdateReviewMutation";
// import {useDeleteReviewMutation} from "../hooks/useDeleteReviewMutation";

// const TypographyWithExistingFontWeight = Typography as ComponentType<
//   ComponentProps<typeof Typography> & { fontWeight?: number }
// >;


// // =====================================================
// // TYPES
// // =====================================================

// interface IProduct {
//   _id: string;
//   name: string;
// }

// interface IReview {
//   _id: string;
//   productId: string;
//   userId:
//     | string
//     | {
//         _id: string;
//       };
//   rating: number;
//   comment: string;
//   createdAt?: string;
//   updatedAt?: string;
// }


// // =====================================================
// // PROPS
// // =====================================================

// interface IReviewModalProps {
//   open: boolean;

//   handleClose: () => void;

//   selectedUser: IUserType | null;
// }


// // =====================================================
// // COMPONENT
// // =====================================================

// export default function ReviewModal({
//   open,
//   handleClose,
//   selectedUser,
// }: IReviewModalProps) {
//   // ===================================================
//   // STATE
//   // ===================================================

//   const [selectedProductId, setSelectedProductId] =
//     useState("");

//   const [rating, setRating] =
//     useState<number | null>(5);

//   const [comment, setComment] =
//     useState("");

//   const [existingReview, setExistingReview] =
//     useState<IReview | null>(null);


//   // ===================================================
//   // PRODUCTS
//   // ===================================================

//   const {
//     data: productsData,
//     isLoading: productsLoading,
//   } = useProductsQuery();


//   // ===================================================
//   // PRODUCT REVIEWS
//   // ===================================================

//   const {
//     data: reviewsData,
//     isLoading: reviewsLoading,
//   } =
//     useProductReviewsQuery(
//       selectedProductId,
//     );


//   // ===================================================
//   // MUTATIONS
//   // ===================================================

//   const addMutation =
//     useAddReviewMutation();

//   const updateMutation =
//     useUpdateReviewMutation();

//   const deleteMutation =
//     useDeleteReviewMutation();


//   // ===================================================
//   // FIND USER REVIEW
//   // ===================================================

//   useEffect(() => {
//     if (
//       !selectedProductId ||
//       !selectedUser?._id
//     ) {
//       setExistingReview(null);
//       return;
//     }

//     const reviews =
//       reviewsData?.data?.data?.reviews ?? [];

//     const userReview = reviews.find(
//       (review: IReview) => {
//         const reviewUserId =
//           typeof review.userId === "string"
//             ? review.userId
//             : review.userId?._id;

//         return (
//           reviewUserId === selectedUser._id
//         );
//       },
//     );

//     if (userReview) {
//       setExistingReview(userReview);

//       setRating(userReview.rating);
//       setComment(userReview.comment);
//     } else {
//       setExistingReview(null);

//       setRating(5);
//       setComment("");
//     }
//   }, [
//     selectedProductId,
//     selectedUser,
//     reviewsData,
//   ]);


//   // ===================================================
//   // PRODUCT CHANGE
//   // ===================================================

//   const handleProductChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     setSelectedProductId(
//       event.target.value,
//     );
//   };


//   // ===================================================
//   // ADD REVIEW
//   // ===================================================

//   const handleAddReview = async () => {
//     if (
//       !selectedUser?._id ||
//       !selectedProductId ||
//       !rating ||
//       !comment.trim()
//     ) {
//       return;
//     }

//     try {
//       await addMutation.mutateAsync({
//         productId: selectedProductId,
//         userId: selectedUser._id,
//         rating,
//         comment,
//       });

//       handleClose();
//     } catch (error) {
//       console.error(
//         "Add review error:",
//         error,
//       );
//     }
//   };


//   // ===================================================
//   // UPDATE REVIEW
//   // ===================================================

//  const handleUpdateReview = async () => {
//   if (
//     !existingReview ||
//     !rating ||
//     !comment.trim()
//   ) {
//     return;
//   }

//   try {
//     await updateMutation.mutateAsync({
//       id: existingReview._id,
//       data: {
//         rating,
//         comment,
//       },
//     });

//     handleClose();
//   } catch (error) {
//     console.error("Update review error:", error);
//   }
// };


//   // ===================================================
//   // DELETE REVIEW
//   // ===================================================

//   const handleDeleteReview = async () => {
//     if (!existingReview) {
//       return;
//     }

//     try {
//       await deleteMutation.mutateAsync(
//         existingReview._id,
//       );

//       setExistingReview(null);
//       setRating(5);
//       setComment("");

//       handleClose();
//     } catch (error) {
//       console.error(
//         "Delete review error:",
//         error,
//       );
//     }
//   };


//   // ===================================================
//   // CLOSE
//   // ===================================================

//   const handleModalClose = () => {
//     setSelectedProductId("");
//     setExistingReview(null);
//     setRating(5);
//     setComment("");

//     handleClose();
//   };


//   // ===================================================
//   // PRODUCTS DATA
//   // ===================================================

//   const products: IProduct[] =
//     productsData?.data?.data ?? [];


//   // ===================================================
//   // RENDER
//   // ===================================================

//   return (
//     <Dialog
//       open={open}
//       onClose={handleModalClose}
//       fullWidth
//       maxWidth="sm"
//     >
//       <DialogTitle>
//         Manage Review
//       </DialogTitle>

//       <DialogContent>

//         {/* =========================================
//             USER
//         ========================================= */}

//         <Box
//           sx={{
//             mb: 3,
//             mt: 1,
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: "#f5f5f5",
//           }}
//         >
//           <TypographyWithExistingFontWeight
//             variant="subtitle1"
//             fontWeight={600}
//           >
//             User
//           </TypographyWithExistingFontWeight>

//           <Typography>
//             {selectedUser?.firstName}{" "}
//             {selectedUser?.lastName}
//           </Typography>

//           <Typography
//             variant="body2"
//             color="text.secondary"
//           >
//             {selectedUser?.email}
//           </Typography>
//         </Box>


//         {/* =========================================
//             PRODUCT
//         ========================================= */}

//         <TextField
//           select
//           fullWidth
//           label="Product"
//           value={selectedProductId}
//           onChange={handleProductChange}
//           disabled={productsLoading}
//           sx={{ mb: 3 }}
//         >
//           {products.map(
//             (product) => (
//               <MenuItem
//                 key={product._id}
//                 value={product._id}
//               >
//                 {product.name}
//               </MenuItem>
//             ),
//           )}
//         </TextField>


//         {/* =========================================
//             CHECKING REVIEW
//         ========================================= */}

//         {selectedProductId &&
//           reviewsLoading && (
//             <Typography
//               sx={{ mb: 2 }}
//               color="text.secondary"
//             >
//               Checking existing review...
//             </Typography>
//           )}


//         {/* =========================================
//             EXISTING REVIEW
//         ========================================= */}

//         {selectedProductId &&
//           !reviewsLoading &&
//           existingReview && (
//             <Box
//               sx={{
//                 mb: 2,
//                 p: 2,
//                 borderRadius: 2,
//                 backgroundColor:
//                   "#fff3e0",
//               }}
//             >
//               <TypographyWithExistingFontWeight
//                 fontWeight={600}
//                 sx={{ mb: 1 }}
//               >
//                 This user has already
//                 reviewed this product.
//               </TypographyWithExistingFontWeight>

//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//               >
//                 You can update or delete
//                 the existing review.
//               </Typography>
//             </Box>
//           )}


//         {/* =========================================
//             RATING
//         ========================================= */}

//         {selectedProductId &&
//           !reviewsLoading && (
//             <>
//               <Typography
//                 sx={{
//                   mb: 1,
//                   fontWeight: 600,
//                 }}
//               >
//                 Rating
//               </Typography>

//               <Rating
//                 value={rating}
//                 onChange={(
//                   _event,
//                   newValue,
//                 ) => {
//                   setRating(newValue);
//                 }}
//                 size="large"
//                 sx={{ mb: 3 }}
//               />


//               {/* =====================================
//                   COMMENT
//               ===================================== */}

//               <TextField
//                 fullWidth
//                 multiline
//                 minRows={4}
//                 label="Comment"
//                 value={comment}
//                 onChange={(event) =>
//                   setComment(
//                     event.target.value,
//                   )
//                 }
//               />
//             </>
//           )}

//       </DialogContent>


//       {/* =========================================
//           ACTIONS
//       ========================================= */}

//       <DialogActions
//         sx={{
//           px: 3,
//           pb: 2,
//         }}
//       >
//         <Button
//           onClick={handleModalClose}
//         >
//           Cancel
//         </Button>


     

//         {existingReview ? (
//           <>
//             <Button
//               color="error"
//               variant="outlined"
//               onClick={
//                 handleDeleteReview
//               }
//               disabled={
//                 deleteMutation.isPending
//               }
//             >
//               Delete
//             </Button>

//             <Button
//               variant="contained"
//               onClick={
//                 handleUpdateReview
//               }
//               disabled={
//                 updateMutation.isPending ||
//                 !rating ||
//                 !comment.trim()
//               }
//             >
//               {updateMutation.isPending
//                 ? "Updating..."
//                 : "Update Review"}
//             </Button>
//           </>
//         ) : (
//           /* =====================================
//              NEW REVIEW
//           ===================================== */

//           <Button
//             variant="contained"
//             onClick={handleAddReview}
//             disabled={
//               addMutation.isPending ||
//               !selectedProductId ||
//               !rating ||
//               !comment.trim()
//             }
//           >
//             {addMutation.isPending
//               ? "Adding..."
//               : "Add Review"}
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// }
import {
  useEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Rating,
  Box,
  Typography,
} from "@mui/material";
import type { ComponentProps, ComponentType } from "react";

import type { IUserType } from "@/apis/userApi";

import useProductsQuery from "../hooks/useProductsQuery";

import { useProductReviewsQuery } from "../hooks/useProductReviewsQuery";
import {useAddReviewMutation} from "../hooks/useAddReviewMutation";
import {useUpdateReviewMutation} from "../hooks/useUpdateReviewMutation";
import {useDeleteReviewMutation} from "../hooks/useDeleteReviewMutation";

const TypographyWithExistingFontWeight = Typography as ComponentType<
  ComponentProps<typeof Typography> & { fontWeight?: number }
>;

// =====================================================
// SHARED APPEARANCE STYLES (فقط ظاهر)
// =====================================================

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

const menuPaperSx = {
  mt: 0.5,
  borderRadius: "12px",
  border: "1px solid #e8e8e8",
  boxShadow:
    "0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.10)",
  "& .MuiMenuItem-root": {
    fontFamily: "inherit",
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#141011",
    "&:hover": { backgroundColor: "rgba(20, 16, 17, 0.05)" },
    "&.Mui-selected": { backgroundColor: "rgba(20, 16, 17, 0.08)" },
    "&.Mui-selected:hover": { backgroundColor: "rgba(20, 16, 17, 0.12)" },
  },
};

const dialogPaperSx = {
  borderRadius: "16px",
  border: "1px solid #e8e8e8",
  boxShadow:
    "0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.10)",
  fontFamily: "inherit",
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
  px: 3,
  py: 1.25,
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

const dangerBtnSx = {
  borderRadius: "10px",
  fontFamily: "inherit",
  fontWeight: 600,
  textTransform: "none",
  px: 3,
  py: 1.25,
  borderColor: "#d32f2f",
  color: "#d32f2f",
  backgroundColor: "#ffffff",
  "&:hover": {
    borderColor: "#d32f2f",
    backgroundColor: "rgba(211, 47, 47, 0.06)",
  },
  "&.Mui-disabled": {
    borderColor: "#e0b4b4",
    color: "#e0b4b4",
  },
};

const infoBoxSx = {
  mb: 3,
  mt: 1,
  p: 2,
  borderRadius: "12px",
  backgroundColor: "#fafafa",
  border: "1px solid #e8e8e8",
};

const warningBoxSx = {
  mb: 2,
  p: 2,
  borderRadius: "12px",
  backgroundColor: "rgba(20, 16, 17, 0.04)",
  border: "1px solid #141011",
};

// =====================================================
// TYPES
// =====================================================

interface IProduct {
  _id: string;
  name: string;
}

interface IReview {
  _id: string;
  productId: string;
  userId:
    | string
    | {
        _id: string;
      };
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}


// =====================================================
// PROPS
// =====================================================

interface IReviewModalProps {
  open: boolean;

  handleClose: () => void;

  selectedUser: IUserType | null;
}


// =====================================================
// COMPONENT
// =====================================================

export default function ReviewModal({
  open,
  handleClose,
  selectedUser,
}: IReviewModalProps) {
  // ===================================================
  // STATE
  // ===================================================

  const [selectedProductId, setSelectedProductId] =
    useState("");

  const [rating, setRating] =
    useState<number | null>(5);

  const [comment, setComment] =
    useState("");

  const [existingReview, setExistingReview] =
    useState<IReview | null>(null);


  // ===================================================
  // PRODUCTS
  // ===================================================

  const {
    data: productsData,
    isLoading: productsLoading,
  } = useProductsQuery();


  // ===================================================
  // PRODUCT REVIEWS
  // ===================================================

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
  } =
    useProductReviewsQuery(
      selectedProductId,
    );


  // ===================================================
  // MUTATIONS
  // ===================================================

  const addMutation =
    useAddReviewMutation();

  const updateMutation =
    useUpdateReviewMutation();

  const deleteMutation =
    useDeleteReviewMutation();


  // ===================================================
  // FIND USER REVIEW
  // ===================================================

  useEffect(() => {
    if (
      !selectedProductId ||
      !selectedUser?._id
    ) {
      setExistingReview(null);
      return;
    }

    const reviews =
      reviewsData?.data?.data?.reviews ?? [];

    const userReview = reviews.find(
      (review: IReview) => {
        const reviewUserId =
          typeof review.userId === "string"
            ? review.userId
            : review.userId?._id;

        return (
          reviewUserId === selectedUser._id
        );
      },
    );

    if (userReview) {
      setExistingReview(userReview);

      setRating(userReview.rating);
      setComment(userReview.comment);
    } else {
      setExistingReview(null);

      setRating(5);
      setComment("");
    }
  }, [
    selectedProductId,
    selectedUser,
    reviewsData,
  ]);


  // ===================================================
  // PRODUCT CHANGE
  // ===================================================

  const handleProductChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedProductId(
      event.target.value,
    );
  };


  // ===================================================
  // ADD REVIEW
  // ===================================================

  const handleAddReview = async () => {
    if (
      !selectedUser?._id ||
      !selectedProductId ||
      !rating ||
      !comment.trim()
    ) {
      return;
    }

    try {
      await addMutation.mutateAsync({
        productId: selectedProductId,
        userId: selectedUser._id,
        rating,
        comment,
      });

      handleClose();
    } catch (error) {
      console.error(
        "Add review error:",
        error,
      );
    }
  };


  // ===================================================
  // UPDATE REVIEW
  // ===================================================

 const handleUpdateReview = async () => {
  if (
    !existingReview ||
    !rating ||
    !comment.trim()
  ) {
    return;
  }

  try {
    await updateMutation.mutateAsync({
      id: existingReview._id,
      data: {
        rating,
        comment,
      },
    });

    handleClose();
  } catch (error) {
    console.error("Update review error:", error);
  }
};


  // ===================================================
  // DELETE REVIEW
  // ===================================================

  const handleDeleteReview = async () => {
    if (!existingReview) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(
        existingReview._id,
      );

      setExistingReview(null);
      setRating(5);
      setComment("");

      handleClose();
    } catch (error) {
      console.error(
        "Delete review error:",
        error,
      );
    }
  };


  // ===================================================
  // CLOSE
  // ===================================================

  const handleModalClose = () => {
    setSelectedProductId("");
    setExistingReview(null);
    setRating(5);
    setComment("");

    handleClose();
  };


  // ===================================================
  // PRODUCTS DATA
  // ===================================================

  const products: IProduct[] =
    productsData?.data?.data ?? [];


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
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
      <DialogTitle
        sx={{
          fontFamily: "inherit",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: "#141011",
          pt: 3,
        }}
      >
        Manage Review
      </DialogTitle>

      <DialogContent>

        {/* =========================================
            USER
        ========================================= */}

        <Box sx={infoBoxSx}>
          <TypographyWithExistingFontWeight
            variant="subtitle1"
            fontWeight={600}
            sx={{ fontFamily: "inherit", color: "#141011" }}
          >
            User
          </TypographyWithExistingFontWeight>

          <Typography
            sx={{ fontFamily: "inherit", color: "#141011" }}
          >
            {selectedUser?.firstName}{" "}
            {selectedUser?.lastName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "inherit" }}
          >
            {selectedUser?.email}
          </Typography>
        </Box>


        {/* =========================================
            PRODUCT
        ========================================= */}

        <TextField
          select
          fullWidth
          label="Product"
          value={selectedProductId}
          onChange={handleProductChange}
          disabled={productsLoading}
          sx={{ mb: 3, ...fieldSx }}
          slotProps={{
            select: {
              MenuProps: {
                slotProps: { paper: { sx: menuPaperSx } },
              },
            },
          }}
        >
          {products.map(
            (product) => (
              <MenuItem
                key={product._id}
                value={product._id}
              >
                {product.name}
              </MenuItem>
            ),
          )}
        </TextField>


        {/* =========================================
            CHECKING REVIEW
        ========================================= */}

        {selectedProductId &&
          reviewsLoading && (
            <Typography
              sx={{ mb: 2, fontFamily: "inherit" }}
              color="text.secondary"
            >
              Checking existing review...
            </Typography>
          )}


        {/* =========================================
            EXISTING REVIEW
        ========================================= */}

        {selectedProductId &&
          !reviewsLoading &&
          existingReview && (
            <Box sx={warningBoxSx}>
              <TypographyWithExistingFontWeight
                fontWeight={600}
                sx={{ mb: 1, fontFamily: "inherit", color: "#141011" }}
              >
                This user has already
                reviewed this product.
              </TypographyWithExistingFontWeight>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "inherit" }}
              >
                You can update or delete
                the existing review.
              </Typography>
            </Box>
          )}


        {/* =========================================
            RATING
        ========================================= */}

        {selectedProductId &&
          !reviewsLoading && (
            <>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  color: "#141011",
                }}
              >
                Rating
              </Typography>

              <Rating
                value={rating}
                onChange={(
                  _event,
                  newValue,
                ) => {
                  setRating(newValue);
                }}
                size="large"
                sx={{
                  mb: 3,
                  "& .MuiRating-iconFilled": { color: "#141011" },
                  "& .MuiRating-iconHover": { color: "#2b2527" },
                  "& .MuiRating-iconEmpty": { color: "#c8c8c8" },
                }}
              />


              {/* =====================================
                  COMMENT
              ===================================== */}

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Comment"
                value={comment}
                onChange={(event) =>
                  setComment(
                    event.target.value,
                  )
                }
                sx={fieldSx}
              />
            </>
          )}

      </DialogContent>


      {/* =========================================
          ACTIONS
      ========================================= */}

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          gap: 1,
        }}
      >
        <Button
          onClick={handleModalClose}
          sx={cancelBtnSx}
        >
          Cancel
        </Button>


     

        {existingReview ? (
          <>
            <Button
              color="error"
              variant="outlined"
              onClick={
                handleDeleteReview
              }
              disabled={
                deleteMutation.isPending
              }
              sx={dangerBtnSx}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              onClick={
                handleUpdateReview
              }
              disabled={
                updateMutation.isPending ||
                !rating ||
                !comment.trim()
              }
              sx={primaryBtnSx}
            >
              {updateMutation.isPending
                ? "Updating..."
                : "Update Review"}
            </Button>
          </>
        ) : (
          /* =====================================
             NEW REVIEW
          ===================================== */

          <Button
            variant="contained"
            onClick={handleAddReview}
            disabled={
              addMutation.isPending ||
              !selectedProductId ||
              !rating ||
              !comment.trim()
            }
            sx={primaryBtnSx}
          >
            {addMutation.isPending
              ? "Adding..."
              : "Add Review"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}