// import { useState } from "react";

// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   Paper,
//   IconButton,
//   Chip,
//   Divider,
//   Alert,
// } from "@mui/material";

// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";

// import type {
//   SelectChangeEvent,
// } from "@mui/material/Select";

// import useCategoriesQuery, {
//   type ICategoryType,
// } from "@/features/category/hooks/useCategoriesQuery";

// import useCategoryAttributesQuery from "../hooks/useCategoryAttributesQuery";
// import useCreateCategoryAttribute from "../hooks/useCreateCategoryAttribute";
// import useUpdateCategoryAttribute from "../hooks/useUpdateCategoryAttribute";
// import useDeleteCategoryAttribute from "../hooks/useDeleteCategoryAttribute";

// import type {
//   ICategoryAttribute,
// } from "@/apis/categoryAttributesApi";

// // =====================================================
// // ATTRIBUTE TYPES
// // =====================================================

// type AttributeType =
//   | "text"
//   | "number"
//   | "select"
//   | "boolean";

// // =====================================================
// // FORM STATE
// // =====================================================

// interface IAttributeForm {
//   name: string;
//   key: string;
//   type: AttributeType;
//   options: string;
//   order: number;
// }

// // =====================================================
// // DEFAULT FORM
// // =====================================================

// const defaultForm: IAttributeForm = {
//   name: "",
//   key: "",
//   type: "text",
//   options: "",
//   order: 0,
// };

// // =====================================================
// // COMPONENT
// // =====================================================

// export default function CategoryAttributes() {
//   // ===================================================
//   // CATEGORY
//   // ===================================================

//   const [
//     selectedCategory,
//     setSelectedCategory,
//   ] = useState("");

//   // ===================================================
//   // FORM
//   // ===================================================

//   const [
//     form,
//     setForm,
//   ] = useState<IAttributeForm>({
//     ...defaultForm,
//   });

//   // ===================================================
//   // FORM OPEN
//   // ===================================================

//   const [
//     isFormOpen,
//     setIsFormOpen,
//   ] = useState(false);

//   // ===================================================
//   // EDIT
//   // ===================================================

//   const [
//     editingAttribute,
//     setEditingAttribute,
//   ] = useState<ICategoryAttribute | null>(null);

//   // ===================================================
//   // ERROR
//   // ===================================================

//   const [
//     errorMessage,
//     setErrorMessage,
//   ] = useState("");

//   // ===================================================
//   // CATEGORIES
//   // ===================================================

//   const {
//     data: categoriesData,
//     isLoading: isCategoriesLoading,
//   } = useCategoriesQuery();

//   const categories =
//     categoriesData?.data?.data ?? [];

//   // ===================================================
//   // ATTRIBUTES
//   // ===================================================

//   const {
//     data: attributesData,
//     isLoading: isAttributesLoading,
//   } =
//     useCategoryAttributesQuery(
//       selectedCategory,
//     );

//   // IMPORTANT:
//   // Axios response:
//   //
//   // attributesData
//   //   -> data
//   //      -> data
//   //         -> attributes array
//   //
//   const attributes =
//     attributesData?.data?.data ?? [];
      
//   // ===================================================
//   // MUTATIONS
//   // ===================================================

//   const createMutation =
//     useCreateCategoryAttribute();

//   const updateMutation =
//     useUpdateCategoryAttribute();

//   const deleteMutation =
//     useDeleteCategoryAttribute();

//   // ===================================================
//   // CATEGORY CHANGE
//   // ===================================================

//   const handleCategoryChange = (
//     event: SelectChangeEvent<string>,
//   ) => {
//     const categoryId =
//       event.target.value;

//     setSelectedCategory(categoryId);

//     setEditingAttribute(null);

//     setIsFormOpen(false);

//     setForm({
//       ...defaultForm,
//     });

//     setErrorMessage("");
//   };

//   // ===================================================
//   // FORM CHANGE
//   // ===================================================

//   const handleFormChange = (
//     field: keyof IAttributeForm,
//     value: string | number,
//   ) => {
//     setForm((previous) => ({
//       ...previous,
//       [field]: value,
//     }));
//   };

//   // ===================================================
//   // START ADD
//   // ===================================================

//   const handleStartAdd = () => {
//     if (!selectedCategory) {
//       setErrorMessage(
//         "First select a category.",
//       );

//       return;
//     }

//     if (attributes.length >=7) {
//       setErrorMessage(
//         "A category can have maximum 7 attributes.",
//       );

//       return;
//     }

//     setErrorMessage("");

//     setEditingAttribute(null);

//     setIsFormOpen(true);

//     setForm({
//       ...defaultForm,
//       order: attributes.length,
//     });
//   };

//   // ===================================================
//   // START EDIT
//   // ===================================================

//   const handleStartEdit = (
//     attribute: ICategoryAttribute,
//   ) => {
//     setEditingAttribute(attribute);

//     setIsFormOpen(true);

//     setErrorMessage("");

//     setForm({
//       name: attribute.name,

//       key: attribute.key,

//       type: attribute.type,

//       options:
//         attribute.options?.join(", ") ?? "",

//       order: attribute.order,
//     });
//   };

//   // ===================================================
//   // CANCEL
//   // ===================================================

//   const handleCancel = () => {
//     setEditingAttribute(null);

//     setIsFormOpen(false);

//     setForm({
//       ...defaultForm,
//     });

//     setErrorMessage("");
//   };

//   // ===================================================
//   // VALIDATE
//   // ===================================================

//   const validateForm = () => {
//     if (!selectedCategory) {
//       setErrorMessage(
//         "Please select a category.",
//       );

//       return false;
//     }

//     if (!form.name.trim()) {
//       setErrorMessage(
//         "Attribute name is required.",
//       );

//       return false;
//     }

//     if (!form.key.trim()) {
//       setErrorMessage(
//         "Attribute key is required.",
//       );

//       return false;
//     }

//     if (
//       !/^[a-z0-9_]+$/.test(
//         form.key.trim(),
//       )
//     ) {
//       setErrorMessage(
//         "Key can only contain lowercase letters, numbers and underscore.",
//       );

//       return false;
//     }

//     if (
//       form.type === "select" &&
//       !form.options.trim()
//     ) {
//       setErrorMessage(
//         "Select attributes must have options.",
//       );

//       return false;
//     }

//     return true;
//   };

//   // ===================================================
//   // CREATE / UPDATE
//   // ===================================================

//   const handleSave = () => {
//     if (!validateForm()) {
//       return;
//     }

//     const options =
//       form.type === "select"
//         ? form.options
//             .split(",")
//             .map((option) =>
//               option.trim(),
//             )
//             .filter(Boolean)
//         : [];

//     // =================================================
//     // UPDATE
//     // =================================================

//     if (editingAttribute) {
//       updateMutation.mutate(
//         {
//           id: editingAttribute._id,

//           categoryId: selectedCategory,

//           data: {
//             name: form.name.trim(),

//             key: form.key
//               .trim()
//               .toLowerCase(),

//             type: form.type,

//             options,

//             order: form.order,
//           },
//         },
//         {
//           onSuccess: () => {
//             handleCancel();
//           },

//           onError: (error: any) => {
//             setErrorMessage(
//               error?.response?.data?.message ??
//                 "Failed to update attribute.",
//             );
//           },
//         },
//       );

//       return;
//     }

//     // =================================================
//     // CREATE
//     // =================================================

//     createMutation.mutate(
//       {
//         categoryId: selectedCategory,

//         name: form.name.trim(),

//         key: form.key
//           .trim()
//           .toLowerCase(),

//         type: form.type,

//         options,

//         order: form.order,
//       },
//       {
//         onSuccess: () => {
//           handleCancel();
//         },

//         onError: (error: any) => {
//           setErrorMessage(
//             error?.response?.data?.message ??
//               "Failed to create attribute.",
//           );
//         },
//       },
//     );
//   };

//   // ===================================================
//   // DELETE
//   // ===================================================

//   const handleDelete = (
//     attribute: ICategoryAttribute,
//   ) => {
//     const confirmed =
//       window.confirm(
//         `Delete "${attribute.name}"?`,
//       );

//     if (!confirmed) {
//       return;
//     }

//     deleteMutation.mutate(
//       {
//         id: attribute._id,

//         categoryId: selectedCategory,
//       },
//       {
//         onError: (error: any) => {
//           setErrorMessage(
//             error?.response?.data?.message ??
//               "Failed to delete attribute.",
//           );
//         },
//       },
//     );
//   };

//   // ===================================================
//   // RENDER
//   // ===================================================

//   return (
//     <Box
//       sx={{
//         width: "100%",

//         p: {
//           xs: 1,
//           sm: 2,
//         },
//       }}
//     >
//       {/* =================================================
//           TITLE
//       ================================================= */}

//       <Typography
//         variant="h5"
//         sx={{
//           mb: 3,
//           fontWeight: 600,
//         }}
//       >
//         Category Specific Attributes
//       </Typography>

//       {/* =================================================
//           CATEGORY SELECT
//       ================================================= */}

//       <FormControl
//         fullWidth
//         sx={{
//           mb: 3,
//         }}
//       >
//         <InputLabel>
//           Category
//         </InputLabel>

//         <Select
//           value={selectedCategory}
//           label="Category"
//           onChange={
//             handleCategoryChange
//           }
//           disabled={
//             isCategoriesLoading
//           }
//         >
//           <MenuItem value="">
//             Select Category
//           </MenuItem>

//           {categories.map(
//             (
//               category: ICategoryType,
//               index: number,
//             ) => (
//               <MenuItem
//                 key={
//                   category._id ??
//                   index
//                 }
//                 value={
//                   category._id
//                 }
//               >
//                 {category.name}
//               </MenuItem>
//             ),
//           )}
//         </Select>
//       </FormControl>

//       {/* =================================================
//           ERROR
//       ================================================= */}

//       {errorMessage && (
//         <Alert
//           severity="error"
//           sx={{
//             mb: 2,
//           }}
//         >
//           {errorMessage}
//         </Alert>
//       )}

//       {/* =================================================
//           NO CATEGORY
//       ================================================= */}

//       {!selectedCategory && (
//         <Alert severity="info">
//           Select a category to manage
//           its specific attributes.
//         </Alert>
//       )}

//       {/* =================================================
//           CATEGORY SELECTED
//       ================================================= */}

//       {selectedCategory && (
//         <>
//           {/* =============================================
//               HEADER
//           ============================================= */}

//           <Box
//             sx={{
//               display: "flex",

//               justifyContent:
//                 "space-between",

//               alignItems: {
//                 xs: "flex-start",
//                 sm: "center",
//               },

//               flexDirection: {
//                 xs: "column",
//                 sm: "row",
//               },

//               gap: 2,

//               mb: 2,
//             }}
//           >
//             <Box>
//               <Typography
//                 variant="h6"
//               >
//                 Attributes
//               </Typography>

//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//               >
//                 {attributes.length} / 7
//                 {" attributes"}
//               </Typography>
//             </Box>

//             <Button
//               variant="contained"
//               startIcon={
//                 <AddIcon />
//               }
//               onClick={
//                 handleStartAdd
//               }
//               disabled={
//                 attributes.length >= 7
//               }
//             >
//               Add Attribute
//             </Button>
//           </Box>

//           {/* =============================================
//               FORM
//           ============================================= */}

//           {isFormOpen && (
//             <Paper
//               elevation={2}
//               sx={{
//                 p: 2,

//                 mb: 3,

//                 borderRadius: 2,
//               }}
//             >
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: 600,

//                   mb: 2,
//                 }}
//               >
//                 {editingAttribute
//                   ? "Edit Attribute"
//                   : "New Attribute"}
//               </Typography>

//               <Box
//                 sx={{
//                   display: "grid",

//                   gridTemplateColumns: {
//                     xs: "1fr",
//                     sm: "1fr 1fr",
//                   },

//                   gap: 2,
//                 }}
//               >
//                 {/* NAME */}

//                 <TextField
//                   label="Name"
//                   value={
//                     form.name
//                   }
//                   onChange={(
//                     event,
//                   ) =>
//                     handleFormChange(
//                       "name",
//                       event.target
//                         .value,
//                     )
//                   }
//                   placeholder="Screen Size"
//                   fullWidth
//                 />

//                 {/* KEY */}

//                 <TextField
//                   label="Key"
//                   value={
//                     form.key
//                   }
//                   onChange={(
//                     event,
//                   ) =>
//                     handleFormChange(
//                       "key",
//                       event.target
//                         .value
//                         .toLowerCase()
//                         .replace(
//                           /\s/g,
//                           "_",
//                         ),
//                     )
//                   }
//                   placeholder="screen_size"
//                   fullWidth
//                   helperText="lowercase letters, numbers and underscore"
//                 />

//                 {/* TYPE */}

//                 <FormControl
//                   fullWidth
//                 >
//                   <InputLabel>
//                     Type
//                   </InputLabel>

//                   <Select
//                     value={
//                       form.type
//                     }
//                     label="Type"
//                     onChange={(
//                       event,
//                     ) =>
//                       handleFormChange(
//                         "type",
//                         event.target
//                           .value as AttributeType,
//                       )
//                     }
//                   >
//                     <MenuItem value="text">
//                       Text
//                     </MenuItem>

//                     <MenuItem value="number">
//                       Number
//                     </MenuItem>

//                     <MenuItem value="select">
//                       Select
//                     </MenuItem>

//                     <MenuItem value="boolean">
//                       Boolean
//                     </MenuItem>
//                   </Select>
//                 </FormControl>

//                 {/* ORDER */}

//                 <TextField
//                   label="Order"
//                   type="number"
//                   value={
//                     form.order
//                   }
//                   onChange={(
//                     event,
//                   ) =>
//                     handleFormChange(
//                       "order",
//                       Number(
//                         event.target
//                           .value,
//                       ),
//                     )
//                   }
//                   fullWidth
//                 />

//                 {/* OPTIONS */}

//                 {form.type ===
//                   "select" && (
//                   <TextField
//                     label="Options"
//                     value={
//                       form.options
//                     }
//                     onChange={(
//                       event,
//                     ) =>
//                       handleFormChange(
//                         "options",
//                         event.target
//                           .value,
//                       )
//                     }
//                     placeholder="64GB, 128GB, 256GB, 512GB"
//                     helperText="Separate options with commas"
//                     fullWidth
//                     sx={{
//                       gridColumn: {
//                         sm: "1 / -1",
//                       },
//                     }}
//                   />
//                 )}
//               </Box>

//               {/* FORM BUTTONS */}

//               <Box
//                 sx={{
//                   display: "flex",

//                   gap: 1,

//                   mt: 2,
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   startIcon={
//                     <SaveIcon />
//                   }
//                   onClick={
//                     handleSave
//                   }
//                   disabled={
//                     createMutation
//                       .isPending ||
//                     updateMutation
//                       .isPending
//                   }
//                 >
//                   {editingAttribute
//                     ? "Update"
//                     : "Save"}
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   startIcon={
//                     <CancelIcon />
//                   }
//                   onClick={
//                     handleCancel
//                   }
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Paper>
//           )}

//           {/* =============================================
//               LOADING
//           ============================================= */}

//           {isAttributesLoading && (
//             <Typography>
//               Loading attributes...
//             </Typography>
//           )}

//           {/* =============================================
//               EMPTY
//           ============================================= */}

//           {!isAttributesLoading &&
//             attributes.length ===
//               0 && (
//               <Alert
//                 severity="warning"
//               >
//                 No attributes have
//                 been created for this
//                 category yet.
//               </Alert>
//             )}

//           {/* =============================================
//               ATTRIBUTE LIST
//           ============================================= */}

//           {!isAttributesLoading &&
//             attributes.length > 0 && (
//               <Paper
//                 elevation={1}
//                 sx={{
//                   borderRadius: 2,
//                   overflow: "hidden",
//                 }}
//               >
//                 {attributes.map(
//                   (
//                     attribute,
//                     index,
//                   ) => (
//                     <Box
//                       key={
//                         attribute._id
//                       }
//                     >
//                       <Box
//                         sx={{
//                           p: 2,

//                           display:
//                             "flex",

//                           alignItems:
//                             "center",

//                           gap: 2,
//                         }}
//                       >
//                         {/* ORDER */}

//                         <Typography
//                           sx={{
//                             width: 30,

//                             fontWeight:
//                               600,

//                             color:
//                               "text.secondary",
//                           }}
//                         >
//                           {index + 1}
//                         </Typography>

//                         {/* INFO */}

//                         <Box
//                           sx={{
//                             flex: 1,

//                             minWidth: 0,
//                           }}
//                         >
//                           <Typography
//                             sx={{
//                               fontWeight:
//                                 600,
//                             }}
//                           >
//                             {
//                               attribute.name
//                             }
//                           </Typography>

//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                           >
//                             {
//                               attribute.key
//                             }
//                           </Typography>

//                           {attribute.type ===
//                             "select" &&
//                             attribute.options
//                               ?.length >
//                               0 && (
//                               <Box
//                                 sx={{
//                                   display:
//                                     "flex",

//                                   flexWrap:
//                                     "wrap",

//                                   gap: 0.5,

//                                   mt: 1,
//                                 }}
//                               >
//                                 {attribute.options.map(
//                                   (
//                                     option,
//                                   ) => (
//                                     <Chip
//                                       key={
//                                         option
//                                       }
//                                       label={
//                                         option
//                                       }
//                                       size="small"
//                                     />
//                                   ),
//                                 )}
//                               </Box>
//                             )}
//                         </Box>

//                         {/* TYPE */}

//                         <Chip
//                           label={
//                             attribute.type
//                           }
//                           size="small"
//                           variant="outlined"
//                         />

//                         {/* ACTIONS */}

//                         <Box
//                           sx={{
//                             display:
//                               "flex",
//                           }}
//                         >
//                           <IconButton
//                             color="primary"
//                             onClick={() =>
//                               handleStartEdit(
//                                 attribute,
//                               )
//                             }
//                           >
//                             <EditIcon />
//                           </IconButton>

//                           <IconButton
//                             color="error"
//                             onClick={() =>
//                               handleDelete(
//                                 attribute,
//                               )
//                             }
//                             disabled={
//                               deleteMutation
//                                 .isPending
//                             }
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Box>
//                       </Box>

//                       {index <
//                         attributes.length -
//                           1 && (
//                         <Divider />
//                       )}
//                     </Box>
//                   ),
//                 )}
//               </Paper>
//             )}
//         </>
//       )}
//     </Box>
//   );
// }
import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  IconButton,
  Chip,
  Divider,
  Alert,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import type {
  SelectChangeEvent,
} from "@mui/material/Select";

import useCategoriesQuery, {
  type ICategoryType,
} from "@/features/category/hooks/useCategoriesQuery";

import useCategoryAttributesQuery from "../hooks/useCategoryAttributesQuery";
import useCreateCategoryAttribute from "../hooks/useCreateCategoryAttribute";
import useUpdateCategoryAttribute from "../hooks/useUpdateCategoryAttribute";
import useDeleteCategoryAttribute from "../hooks/useDeleteCategoryAttribute";

import type {
  ICategoryAttribute,
} from "@/apis/categoryAttributesApi";
import Loading from "@/features/loading/loading";

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

const outlinedBtnSx = {
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

const cardSx = {
  borderRadius: "16px",
  border: "1px solid #e8e8e8",
  backgroundColor: "#ffffff",
  boxShadow:
    "0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.08)",
};

const alertSx = {
  borderRadius: "12px",
  fontFamily: "inherit",
  fontWeight: 500,
};

const iconBtnSx = {
  borderRadius: "10px",
  color: "#141011",
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "rgba(20, 16, 17, 0.06)" },
  "&.Mui-disabled": { color: "#c0c0c0" },
};

const deleteIconBtnSx = {
  borderRadius: "10px",
  color: "#d32f2f",
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" },
  "&.Mui-disabled": { color: "#e0b4b4" },
};

const chipSx = {
  fontFamily: "inherit",
  fontWeight: 600,
  borderRadius: "8px",
  backgroundColor: "#f0f0f0",
  color: "#141011",
  border: "1px solid #e0e0e0",
};

const typeChipSx = {
  fontFamily: "inherit",
  fontWeight: 600,
  borderRadius: "8px",
  borderColor: "#141011",
  color: "#141011",
  textTransform: "capitalize",
};

// =====================================================
// ATTRIBUTE TYPES
// =====================================================

type AttributeType =
  | "text"
  | "number"
  | "select"
  | "boolean";

// =====================================================
// FORM STATE
// =====================================================

interface IAttributeForm {
  name: string;
  key: string;
  type: AttributeType;
  options: string;
  order: number;
}

// =====================================================
// DEFAULT FORM
// =====================================================

const defaultForm: IAttributeForm = {
  name: "",
  key: "",
  type: "text",
  options: "",
  order: 0,
};

// =====================================================
// COMPONENT
// =====================================================

export default function CategoryAttributes() {
  // ===================================================
  // CATEGORY
  // ===================================================

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  // ===================================================
  // FORM
  // ===================================================

  const [
    form,
    setForm,
  ] = useState<IAttributeForm>({
    ...defaultForm,
  });

  // ===================================================
  // FORM OPEN
  // ===================================================

  const [
    isFormOpen,
    setIsFormOpen,
  ] = useState(false);

  // ===================================================
  // EDIT
  // ===================================================

  const [
    editingAttribute,
    setEditingAttribute,
  ] = useState<ICategoryAttribute | null>(null);

  // ===================================================
  // ERROR
  // ===================================================

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  // ===================================================
  // CATEGORIES
  // ===================================================

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
  } = useCategoriesQuery();

  const categories =
    categoriesData?.data?.data ?? [];

  // ===================================================
  // ATTRIBUTES
  // ===================================================

  const {
    data: attributesData,
    isLoading: isAttributesLoading,
  } =
    useCategoryAttributesQuery(
      selectedCategory,
    );

  // IMPORTANT:
  // Axios response:
  //
  // attributesData
  //   -> data
  //      -> data
  //         -> attributes array
  //
  const attributes =
    attributesData?.data?.data ?? [];
      
  // ===================================================
  // MUTATIONS
  // ===================================================

  const createMutation =
    useCreateCategoryAttribute();

  const updateMutation =
    useUpdateCategoryAttribute();

  const deleteMutation =
    useDeleteCategoryAttribute();

  // ===================================================
  // CATEGORY CHANGE
  // ===================================================

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
  ) => {
    const categoryId =
      event.target.value;

    setSelectedCategory(categoryId);

    setEditingAttribute(null);

    setIsFormOpen(false);

    setForm({
      ...defaultForm,
    });

    setErrorMessage("");
  };

  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleFormChange = (
    field: keyof IAttributeForm,
    value: string | number,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ===================================================
  // START ADD
  // ===================================================

  const handleStartAdd = () => {
    if (!selectedCategory) {
      setErrorMessage(
        "First select a category.",
      );

      return;
    }

    if (attributes.length >=7) {
      setErrorMessage(
        "A category can have maximum 7 attributes.",
      );

      return;
    }

    setErrorMessage("");

    setEditingAttribute(null);

    setIsFormOpen(true);

    setForm({
      ...defaultForm,
      order: attributes.length,
    });
  };

  // ===================================================
  // START EDIT
  // ===================================================

  const handleStartEdit = (
    attribute: ICategoryAttribute,
  ) => {
    setEditingAttribute(attribute);

    setIsFormOpen(true);

    setErrorMessage("");

    setForm({
      name: attribute.name,

      key: attribute.key,

      type: attribute.type,

      options:
        attribute.options?.join(", ") ?? "",

      order: attribute.order,
    });
  };

  // ===================================================
  // CANCEL
  // ===================================================

  const handleCancel = () => {
    setEditingAttribute(null);

    setIsFormOpen(false);

    setForm({
      ...defaultForm,
    });

    setErrorMessage("");
  };

  // ===================================================
  // VALIDATE
  // ===================================================

  const validateForm = () => {
    if (!selectedCategory) {
      setErrorMessage(
        "Please select a category.",
      );

      return false;
    }

    if (!form.name.trim()) {
      setErrorMessage(
        "Attribute name is required.",
      );

      return false;
    }

    if (!form.key.trim()) {
      setErrorMessage(
        "Attribute key is required.",
      );

      return false;
    }

    if (
      !/^[a-z0-9_]+$/.test(
        form.key.trim(),
      )
    ) {
      setErrorMessage(
        "Key can only contain lowercase letters, numbers and underscore.",
      );

      return false;
    }

    if (
      form.type === "select" &&
      !form.options.trim()
    ) {
      setErrorMessage(
        "Select attributes must have options.",
      );

      return false;
    }

    return true;
  };

  // ===================================================
  // CREATE / UPDATE
  // ===================================================

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const options =
      form.type === "select"
        ? form.options
            .split(",")
            .map((option) =>
              option.trim(),
            )
            .filter(Boolean)
        : [];

    // =================================================
    // UPDATE
    // =================================================

    if (editingAttribute) {
      updateMutation.mutate(
        {
          id: editingAttribute._id,

          categoryId: selectedCategory,

          data: {
            name: form.name.trim(),

            key: form.key
              .trim()
              .toLowerCase(),

            type: form.type,

            options,

            order: form.order,
          },
        },
        {
          onSuccess: () => {
            handleCancel();
          },

          onError: (error: any) => {
            setErrorMessage(
              error?.response?.data?.message ??
                "Failed to update attribute.",
            );
          },
        },
      );

      return;
    }

    // =================================================
    // CREATE
    // =================================================

    createMutation.mutate(
      {
        categoryId: selectedCategory,

        name: form.name.trim(),

        key: form.key
          .trim()
          .toLowerCase(),

        type: form.type,

        options,

        order: form.order,
      },
      {
        onSuccess: () => {
          handleCancel();
        },

        onError: (error: any) => {
          setErrorMessage(
            error?.response?.data?.message ??
              "Failed to create attribute.",
          );
        },
      },
    );
  };

  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete = (
    attribute: ICategoryAttribute,
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${attribute.name}"?`,
      );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(
      {
        id: attribute._id,

        categoryId: selectedCategory,
      },
      {
        onError: (error: any) => {
          setErrorMessage(
            error?.response?.data?.message ??
              "Failed to delete attribute.",
          );
        },
      },
    );
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <Box
      sx={{
        width: "100%",

        p: {
          xs: 1,
          sm: 2,
        },
      }}
    >
      {/* =================================================
          TITLE
      ================================================= */}

      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          fontFamily: "inherit",
          letterSpacing: "-0.5px",
          color: "#141011",
        }}
      >
        Category Specific Attributes
      </Typography>

      {/* =================================================
          CATEGORY SELECT
      ================================================= */}

      <FormControl
        fullWidth
        sx={{
          mb: 3,
          ...fieldSx,
        }}
      >
        <InputLabel>
          Category
        </InputLabel>

        <Select
          value={selectedCategory}
          label="Category"
          onChange={
            handleCategoryChange
          }
          disabled={
            isCategoriesLoading
          }
          MenuProps={{ slotProps: { paper: { sx: menuPaperSx } } }}
        >
          <MenuItem value="">
            Select Category
          </MenuItem>

          {categories.map(
            (
              category: ICategoryType,
              index: number,
            ) => (
              <MenuItem
                key={
                  category._id ??
                  index
                }
                value={
                  category._id
                }
              >
                {category.name}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>

      {/* =================================================
          ERROR
      ================================================= */}

      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            ...alertSx,
          }}
        >
          {errorMessage}
        </Alert>
      )}

      {/* =================================================
          NO CATEGORY
      ================================================= */}

      {!selectedCategory && (
        <Alert
          severity="info"
          sx={alertSx}
        >
          Select a category to manage
          its specific attributes.
        </Alert>
      )}

      {/* =================================================
          CATEGORY SELECTED
      ================================================= */}

      {selectedCategory && (
        <>
          {/* =============================================
              HEADER
          ============================================= */}

          <Box
            sx={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems: {
                xs: "flex-start",
                sm: "center",
              },

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              gap: 2,

              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontFamily: "inherit",
                  letterSpacing: "-0.3px",
                  color: "#141011",
                }}
              >
                Attributes
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "inherit" }}
              >
                {attributes.length} / 7
                {" attributes"}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={
                <AddIcon />
              }
              onClick={
                handleStartAdd
              }
              disabled={
                attributes.length >= 7
              }
              sx={primaryBtnSx}
            >
              Add Attribute
            </Button>
          </Box>

          {/* =============================================
              FORM
          ============================================= */}

          {isFormOpen && (
            <Paper
              elevation={0}
              sx={{
                p: 2,

                mb: 3,

                ...cardSx,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  fontFamily: "inherit",
                  color: "#141011",

                  mb: 2,
                }}
              >
                {editingAttribute
                  ? "Edit Attribute"
                  : "New Attribute"}
              </Typography>

              <Box
                sx={{
                  display: "grid",

                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },

                  gap: 2,
                }}
              >
                {/* NAME */}

                <TextField
                  label="Name"
                  value={
                    form.name
                  }
                  onChange={(
                    event,
                  ) =>
                    handleFormChange(
                      "name",
                      event.target
                        .value,
                    )
                  }
                  placeholder="Screen Size"
                  fullWidth
                  sx={fieldSx}
                />

                {/* KEY */}

                <TextField
                  label="Key"
                  value={
                    form.key
                  }
                  onChange={(
                    event,
                  ) =>
                    handleFormChange(
                      "key",
                      event.target
                        .value
                        .toLowerCase()
                        .replace(
                          /\s/g,
                          "_",
                        ),
                    )
                  }
                  placeholder="screen_size"
                  fullWidth
                  helperText="lowercase letters, numbers and underscore"
                  sx={fieldSx}
                />

                {/* TYPE */}

                <FormControl
                  fullWidth
                  sx={fieldSx}
                >
                  <InputLabel>
                    Type
                  </InputLabel>

                  <Select
                    value={
                      form.type
                    }
                    label="Type"
                    onChange={(
                      event,
                    ) =>
                      handleFormChange(
                        "type",
                        event.target
                          .value as AttributeType,
                      )
                    }
                    MenuProps={{ slotProps: { paper: { sx: menuPaperSx } } }}
                  >
                    <MenuItem value="text">
                      Text
                    </MenuItem>

                    <MenuItem value="number">
                      Number
                    </MenuItem>

                    <MenuItem value="select">
                      Select
                    </MenuItem>

                    <MenuItem value="boolean">
                      Boolean
                    </MenuItem>
                  </Select>
                </FormControl>

                {/* ORDER */}

                <TextField
                  label="Order"
                  type="number"
                  value={
                    form.order
                  }
                  onChange={(
                    event,
                  ) =>
                    handleFormChange(
                      "order",
                      Number(
                        event.target
                          .value,
                      ),
                    )
                  }
                  fullWidth
                  sx={fieldSx}
                />

                {/* OPTIONS */}

                {form.type ===
                  "select" && (
                  <TextField
                    label="Options"
                    value={
                      form.options
                    }
                    onChange={(
                      event,
                    ) =>
                      handleFormChange(
                        "options",
                        event.target
                          .value,
                      )
                    }
                    placeholder="64GB, 128GB, 256GB, 512GB"
                    helperText="Separate options with commas"
                    fullWidth
                    sx={{
                      gridColumn: {
                        sm: "1 / -1",
                      },
                      ...fieldSx,
                    }}
                  />
                )}
              </Box>

              {/* FORM BUTTONS */}

              <Box
                sx={{
                  display: "flex",

                  gap: 1,

                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={
                    <SaveIcon />
                  }
                  onClick={
                    handleSave
                  }
                  disabled={
                    createMutation
                      .isPending ||
                    updateMutation
                      .isPending
                  }
                  sx={primaryBtnSx}
                >
                  {editingAttribute
                    ? "Update"
                    : "Save"}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={
                    <CancelIcon />
                  }
                  onClick={
                    handleCancel
                  }
                  sx={outlinedBtnSx}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          )}

          {/* =============================================
              LOADING
          ============================================= */}

          {isAttributesLoading && (
          <Loading text="loading attributes" />
          )}

          {/* =============================================
              EMPTY
          ============================================= */}

          {!isAttributesLoading &&
            attributes.length ===
              0 && (
              <Alert
                severity="warning"
                sx={alertSx}
              >
                No attributes have
                been created for this
                category yet.
              </Alert>
            )}

          {/* =============================================
              ATTRIBUTE LIST
          ============================================= */}

          {!isAttributesLoading &&
            attributes.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  overflow: "hidden",
                  ...cardSx,
                }}
              >
                {attributes.map(
                  (
                    attribute,
                    index,
                  ) => (
                    <Box
                      key={
                        attribute._id
                      }
                    >
                      <Box
                        sx={{
                          p: 2,

                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap: 2,

                          transition:
                            "background-color 0.2s ease",

                          "&:hover": {
                            backgroundColor:
                              "rgba(20, 16, 17, 0.025)",
                          },
                        }}
                      >
                        {/* ORDER */}

                        <Typography
                          sx={{
                            width: 30,

                            fontWeight:
                              700,

                            fontFamily:
                              "inherit",

                            color:
                              "text.secondary",
                          }}
                        >
                          {index + 1}
                        </Typography>

                        {/* INFO */}

                        <Box
                          sx={{
                            flex: 1,

                            minWidth: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight:
                                600,

                              fontFamily:
                                "inherit",

                              color:
                                "#141011",
                            }}
                          >
                            {
                              attribute.name
                            }
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontFamily:
                                "inherit",
                            }}
                          >
                            {
                              attribute.key
                            }
                          </Typography>

                          {attribute.type ===
                            "select" &&
                            attribute.options
                              ?.length >
                              0 && (
                              <Box
                                sx={{
                                  display:
                                    "flex",

                                  flexWrap:
                                    "wrap",

                                  gap: 0.5,

                                  mt: 1,
                                }}
                              >
                                {attribute.options.map(
                                  (
                                    option,
                                  ) => (
                                    <Chip
                                      key={
                                        option
                                      }
                                      label={
                                        option
                                      }
                                      size="small"
                                      sx={
                                        chipSx
                                      }
                                    />
                                  ),
                                )}
                              </Box>
                            )}
                        </Box>

                        {/* TYPE */}

                        <Chip
                          label={
                            attribute.type
                          }
                          size="small"
                          variant="outlined"
                          sx={typeChipSx}
                        />

                        {/* ACTIONS */}

                        <Box
                          sx={{
                            display:
                              "flex",
                          }}
                        >
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleStartEdit(
                                attribute,
                              )
                            }
                            sx={
                              iconBtnSx
                            }
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDelete(
                                attribute,
                              )
                            }
                            disabled={
                              deleteMutation
                                .isPending
                            }
                            sx={
                              deleteIconBtnSx
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      {index <
                        attributes.length -
                          1 && (
                        <Divider
                          sx={{
                            borderColor:
                              "#eeeeee",
                          }}
                        />
                      )}
                    </Box>
                  ),
                )}
              </Paper>
            )}
        </>
      )}
    </Box>
  );
}