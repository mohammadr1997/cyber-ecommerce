
// import * as React from "react";
// import Box from "@mui/material/Box";
// import { API_URL } from "@/constants/api";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { InputLabel, MenuItem, TextField } from "@mui/material";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import type { SelectChangeEvent } from "@mui/material/Select";
// import { styled } from "@mui/material/styles";
// import { Grid } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import type { SubmitHandler } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { z } from "zod";

// import useCreateBanner from "@/features/banner/hooks/useCreateBanner";
// import useUpdateBanner from "@/features/banner/hooks/useUpdateBanner";

// import type { IBanner } from "@/apis/bannerApi";

// // ==========================
// // MODAL STYLE
// // ==========================

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",

//   width: {
//     xs: "95%",
//     sm: 500,
//   },

//   maxHeight: "90vh",
//   overflowY: "auto",

//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// // ==========================
// // BACKEND URL
// // ==========================



// // ==========================
// // HIDDEN INPUT
// // ==========================

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// // ==========================
// // ZOD SCHEMA
// // ==========================

// const bannerSchema = z.object({
//   title: z.string().min(1, "Title is required"),

//   type: z.enum(["banner", "small"], {
//     message: "Type is required",
//   }),

//   description: z.string().optional(),

//   imageUrl: z.string().min(1, "Image is required"),
// });

// type BannerSchemaType = z.infer<typeof bannerSchema>;

// // ==========================
// // PROPS
// // ==========================

// interface IBannerModalProp {
//   open: boolean;

//   handleOpen: () => void;

//   handleClose: () => void;

//   selectedBanner: IBanner | null;

//   signEditOrAdd: string | null;

//   setSignEditOrAdd: React.Dispatch<
//     React.SetStateAction<string | null>
//   >;

//   selectedImage: string;

//   setSelectedImage: React.Dispatch<
//     React.SetStateAction<string>
//   >;
// }

// // ==========================
// // COMPONENT
// // ==========================

// export default function BannerModal({
//   open,
//   handleOpen,
//   handleClose,
//   selectedBanner,
//   signEditOrAdd,
//   setSignEditOrAdd,
//   selectedImage,
//   setSelectedImage,
// }: IBannerModalProp) {
//   // ==========================
//   // FORM
//   // ==========================

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm<BannerSchemaType>({
//     resolver: zodResolver(bannerSchema),

//     defaultValues: {
//       title: "",
//       type: "banner",
//       description: "",
//       imageUrl: "",
//     },
//   });

//   // ==========================
//   // IMAGE STATE
//   // ==========================

//   const [imageFile, setImageFile] = useState<File | null>(
//     null,
//   );

//   // ==========================
//   // MUTATIONS
//   // ==========================

//   const createBanner = useCreateBanner(handleClose);

//   const updateBanner = useUpdateBanner(handleClose);

//   // ==========================
//   // WATCH
//   // ==========================

//   const type = watch("type");

//   // ==========================
//   // TYPE CHANGE
//   // ==========================

//   const handleTypeChange = (
//     event: SelectChangeEvent<string>,
//   ) => {
//     const newType = event.target.value as
//       | "banner"
//       | "small";

//     setValue("type", newType, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };

//   // ==========================
//   // IMAGE CHANGE
//   // ==========================

//   const handleSetImage = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     // فقط image قبول کن
//     if (!file.type.startsWith("image/")) {
//       return;
//     }

//     // اگر قبلاً object URL داشتیم، آزادش می‌کنیم
//     if (selectedImage?.startsWith("blob:")) {
//       URL.revokeObjectURL(selectedImage);
//     }

//     const objectUrl = URL.createObjectURL(file);

//     setSelectedImage(objectUrl);

//     setImageFile(file);

//     setValue("imageUrl", objectUrl, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };

//   // ==========================
//   // SUBMIT
//   // ==========================

//   const onSubmit: SubmitHandler<BannerSchemaType> = (
//     data,
//   ) => {
//     // ==========================
//     // EDIT
//     // ==========================

//     if (signEditOrAdd === "edit") {
//       if (!selectedBanner?._id) {
//         console.error(
//           "Cannot update banner: selectedBanner is missing.",
//         );

//         return;
//       }

//       updateBanner.mutate({
//         id: selectedBanner._id,

//         updates: {
//           title: data.title,

//           type: data.type,

//           description: data.description,

//           // فقط اگر عکس جدید انتخاب شده باشد
//           image:
//             imageFile instanceof File
//               ? imageFile
//               : undefined,
//         },
//       });

//       return;
//     }

//     // ==========================
//     // CREATE
//     // ==========================

//     if (signEditOrAdd === null) {
//       if (!(imageFile instanceof File)) {
//         console.error(
//           "Cannot create banner: image is required.",
//         );

//         return;
//       }

//       createBanner.mutate({
//         title: data.title,

//         type: data.type,

//         description: data.description,

//         image: imageFile,
//       });
//     }
//   };

//   // ==========================
//   // EDIT MODE
//   // ==========================

//   useEffect(() => {
//     if (
//       signEditOrAdd === "edit" &&
//       selectedBanner
//     ) {
//       setValue(
//         "title",
//         selectedBanner.title,
//         {
//           shouldValidate: true,
//         },
//       );

//       setValue(
//         "type",
//         selectedBanner.type,
//         {
//           shouldValidate: true,
//         },
//       );

//       setValue(
//         "description",
//         selectedBanner.description ?? "",
//         {
//           shouldValidate: true,
//         },
//       );

//       setValue(
//         "imageUrl",
//         selectedBanner.imageUrl,
//         {
//           shouldValidate: true,
//         },
//       );

//       // در شروع Edit عکس جدید نداریم
//       setImageFile(null);
//     }
//   }, [
//     signEditOrAdd,
//     selectedBanner,
//     setValue,
//   ]);

//   // ==========================
//   // ADD MODE
//   // ==========================

//   useEffect(() => {
//     if (signEditOrAdd === null) {
//       reset({
//         title: "",
//         type: "banner",
//         description: "",
//         imageUrl: "",
//       });

//       setImageFile(null);
//       setSelectedImage("");
//     }
//   }, [
//     signEditOrAdd,
//     reset,
//     setSelectedImage,
//   ]);

//   // ==========================
//   // CLEAN OBJECT URL
//   // ==========================

//   useEffect(() => {
//     return () => {
//       if (selectedImage?.startsWith("blob:")) {
//         URL.revokeObjectURL(selectedImage);
//       }
//     };
//   }, [selectedImage]);

//   // ==========================
//   // ADD BANNER
//   // ==========================

//   const handleAddBanner = () => {
//     setSignEditOrAdd(null);

//     setSelectedImage("");

//     setImageFile(null);

//     reset({
//       title: "",
//       type: "banner",
//       description: "",
//       imageUrl: "",
//     });

//     handleOpen();
//   };

//   // ==========================
//   // IMAGE URL
//   // ==========================

//   const getImageUrl = () => {
//     // عکس جدید
//     if (selectedImage) {
//       return selectedImage;
//     }

//     // عکس قبلی در Edit
//     if (
//       signEditOrAdd === "edit" &&
//       selectedBanner?.imageUrl
//     ) {
//       const imageUrl =
//         selectedBanner.imageUrl;

//       // اگر URL کامل باشد
//       if (
//         imageUrl.startsWith("http://") ||
//         imageUrl.startsWith("https://")
//       ) {
//         return imageUrl;
//       }

//       // اگر /uploads/... باشد
//       return `${API_URL}${imageUrl}`;
//     }

//     return "";
//   };

//   const previewImage = getImageUrl();

//   // ==========================
//   // RENDER
//   // ==========================

//   return (
//     <div>
//       {/* ==========================
//           ADD BUTTON
//       ========================== */}

//       <Button
//         variant="contained"
//         sx={{
//           margin: "15px 5px",
//         }}
//         onClick={handleAddBanner}
//       >
//         Add Banner
//       </Button>

//       {/* ==========================
//           MODAL
//       ========================== */}

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="banner-modal-title"
//         aria-describedby="banner-modal-description"
//       >
//         <Box
//           sx={style}
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           {/* ==========================
//               TITLE
//           ========================== */}

//           <Typography
//             sx={{
//               marginBottom: "20px",
//             }}
//             id="banner-modal-title"
//             variant="h6"
//             component="h2"
//           >
//             {signEditOrAdd === "edit"
//               ? "Edit Banner"
//               : "Add Banner"}
//           </Typography>

//           {/* ==========================
//               FIELDS
//           ========================== */}

//           <Grid
//             container
//             spacing={2}
//           >
//             {/* TITLE */}

//             <Grid size={12}>
//               <TextField
//                 {...register("title")}
//                 error={!!errors.title}
//                 helperText={
//                   errors.title?.message
//                 }
//                 label="Title"
//                 fullWidth
//               />
//             </Grid>

//             {/* DESCRIPTION */}

//             <Grid size={12}>
//               <TextField
//                 {...register("description")}
//                 error={
//                   !!errors.description
//                 }
//                 helperText={
//                   errors.description?.message
//                 }
//                 label="Description"
//                 fullWidth
//                 multiline
//                 rows={3}
//               />
//             </Grid>
//           </Grid>

//           {/* ==========================
//               TYPE
//           ========================== */}

//           <FormControl
//             fullWidth
//             sx={{
//               mt: 2,
//             }}
//             error={!!errors.type}
//           >
//             <InputLabel id="banner-type-label">
//               Type
//             </InputLabel>

//             <Select<string>
//               labelId="banner-type-label"
//               id="banner-type-select"
//               value={type}
//               label="Type"
//               onChange={
//                 handleTypeChange
//               }
//             >
//               <MenuItem value="banner">
//                 Banner (large)
//               </MenuItem>

//               <MenuItem value="small">
//                 Small
//               </MenuItem>
//             </Select>

//             {errors.type && (
//               <Typography
//                 color="error"
//                 sx={{
//                   mt: 1,
//                   fontSize: 14,
//                 }}
//               >
//                 {errors.type.message}
//               </Typography>
//             )}
//           </FormControl>

//           {/* ==========================
//               IMAGE UPLOAD
//           ========================== */}

//           <Button
//             sx={{
//               margin: "15px 0px",
//             }}
//             component="label"
//             variant="contained"
//             tabIndex={-1}
//             color="warning"
//             startIcon={
//               <CloudUploadIcon />
//             }
//           >
//             {signEditOrAdd === "edit"
//               ? "Change Image"
//               : "Upload Image"}

//             <VisuallyHiddenInput
//               type="file"
//               accept="image/jpeg,image/png,image/webp,image/jpg"
//               onChange={
//                 handleSetImage
//               }
//             />
//           </Button>

//           {/* ==========================
//               IMAGE PREVIEW
//           ========================== */}

//           {previewImage && (
//             <Box
//               sx={{
//                 mt: 1,
//                 mb: 2,
//               }}
//             >
//               <img
//                 src={previewImage}
//                 alt={
//                   selectedBanner?.title ??
//                   "Banner preview"
//                 }
//                 style={{
//                   width: "150px",
//                   height: "150px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                   display: "block",
//                 }}
//               />
//             </Box>
//           )}

//           {/* ==========================
//               IMAGE ERROR
//           ========================== */}

//           {signEditOrAdd === null &&
//             errors.imageUrl && (
//               <Typography
//                 color="error"
//                 sx={{
//                   mb: 1,
//                 }}
//               >
//                 {
//                   errors.imageUrl
//                     .message
//                 }
//               </Typography>
//             )}

//           {/* ==========================
//               SUBMIT
//           ========================== */}

//           <Button
//             type="submit"
//             sx={{
//               margin: "10px 0px",
//             }}
//             variant="contained"
//             fullWidth
//           >
//             {signEditOrAdd === "edit"
//               ? "Update Banner"
//               : "Create Banner"}
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import { getBannerImageUrl } from "@/constants/api";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { InputLabel, MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";

import useCreateBanner from "@/features/banner/hooks/useCreateBanner";
import useUpdateBanner from "@/features/banner/hooks/useUpdateBanner";

import type { IBanner } from "@/apis/bannerApi";

// ==========================
// MODAL STYLE
// ==========================

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: {
    xs: "95%",
    sm: 500,
  },

  maxHeight: "90vh",
  overflowY: "auto",

  bgcolor: "background.paper",
  border: "1px solid #e8e8e8",
  borderRadius: "16px",
  boxShadow:
    "0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.10)",
  outline: "none",
  fontFamily: "inherit",
  p: 4,
};

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
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#2b2527",
    boxShadow: "0 8px 20px rgba(20, 16, 17, 0.25)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
};

// ==========================
// BACKEND URL
// ==========================



// ==========================
// HIDDEN INPUT
// ==========================

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// ==========================
// ZOD SCHEMA
// ==========================

const bannerSchema = z.object({
  title: z.string().min(1, "Title is required"),

  type: z.enum(["banner", "small"], {
    message: "Type is required",
  }),

  description: z.string().optional(),

  imageUrl: z.string().min(1, "Image is required"),
});

type BannerSchemaType = z.infer<typeof bannerSchema>;

// ==========================
// PROPS
// ==========================

interface IBannerModalProp {
  open: boolean;

  handleOpen: () => void;

  handleClose: () => void;

  selectedBanner: IBanner | null;

  signEditOrAdd: string | null;

  setSignEditOrAdd: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  selectedImage: string;

  setSelectedImage: React.Dispatch<
    React.SetStateAction<string>
  >;
}

// ==========================
// COMPONENT
// ==========================

export default function BannerModal({
  open,
  handleOpen,
  handleClose,
  selectedBanner,
  signEditOrAdd,
  setSignEditOrAdd,
  selectedImage,
  setSelectedImage,
}: IBannerModalProp) {
  // ==========================
  // FORM
  // ==========================

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BannerSchemaType>({
    resolver: zodResolver(bannerSchema),

    defaultValues: {
      title: "",
      type: "banner",
      description: "",
      imageUrl: "",
    },
  });

  // ==========================
  // IMAGE STATE
  // ==========================

  const [imageFile, setImageFile] = useState<File | null>(
    null,
  );

  // ==========================
  // MUTATIONS
  // ==========================

  const createBanner = useCreateBanner(handleClose);

  const updateBanner = useUpdateBanner(handleClose);

  // ==========================
  // WATCH
  // ==========================

  const type = watch("type");

  // ==========================
  // TYPE CHANGE
  // ==========================

  const handleTypeChange = (
    event: SelectChangeEvent<string>,
  ) => {
    const newType = event.target.value as
      | "banner"
      | "small";

    setValue("type", newType, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // ==========================
  // IMAGE CHANGE
  // ==========================

  const handleSetImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // فقط image قبول کن
    if (!file.type.startsWith("image/")) {
      return;
    }

    // اگر قبلاً object URL داشتیم، آزادش می‌کنیم
    if (selectedImage?.startsWith("blob:")) {
      URL.revokeObjectURL(selectedImage);
    }

    const objectUrl = URL.createObjectURL(file);

    setSelectedImage(objectUrl);

    setImageFile(file);

    setValue("imageUrl", objectUrl, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // ==========================
  // SUBMIT
  // ==========================

  const onSubmit: SubmitHandler<BannerSchemaType> = (
    data,
  ) => {
    // ==========================
    // EDIT
    // ==========================

    if (signEditOrAdd === "edit") {
      if (!selectedBanner?._id) {
        console.error(
          "Cannot update banner: selectedBanner is missing.",
        );

        return;
      }

      updateBanner.mutate({
        id: selectedBanner._id,

        updates: {
          title: data.title,

          type: data.type,

          description: data.description,

          // فقط اگر عکس جدید انتخاب شده باشد
          image:
            imageFile instanceof File
              ? imageFile
              : undefined,
        },
      });

      return;
    }

    // ==========================
    // CREATE
    // ==========================

    if (signEditOrAdd === null) {
      if (!(imageFile instanceof File)) {
        console.error(
          "Cannot create banner: image is required.",
        );

        return;
      }

      createBanner.mutate({
        title: data.title,

        type: data.type,

        description: data.description,

        image: imageFile,
      });
    }
  };

  // ==========================
  // EDIT MODE
  // ==========================

  useEffect(() => {
    if (
      signEditOrAdd === "edit" &&
      selectedBanner
    ) {
      setValue(
        "title",
        selectedBanner.title,
        {
          shouldValidate: true,
        },
      );

      setValue(
        "type",
        selectedBanner.type,
        {
          shouldValidate: true,
        },
      );

      setValue(
        "description",
        selectedBanner.description ?? "",
        {
          shouldValidate: true,
        },
      );

      setValue(
        "imageUrl",
        selectedBanner.imageUrl,
        {
          shouldValidate: true,
        },
      );

      // در شروع Edit عکس جدید نداریم
    setSelectedImage("");
setImageFile(null);
    }
  }, [
    signEditOrAdd,
    selectedBanner,
    setValue,
      setSelectedImage,
  ]);

  // ==========================
  // ADD MODE
  // ==========================

  useEffect(() => {
    if (signEditOrAdd === null) {
      reset({
        title: "",
        type: "banner",
        description: "",
        imageUrl: "",
      });

      setImageFile(null);
      setSelectedImage("");
    }
  }, [
    signEditOrAdd,
    reset,
    setSelectedImage,
  ]);

  // ==========================
  // CLEAN OBJECT URL
  // ==========================

  useEffect(() => {
    return () => {
      if (selectedImage?.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  // ==========================
  // ADD BANNER
  // ==========================

  const handleAddBanner = () => {
    setSignEditOrAdd(null);

    setSelectedImage("");

    setImageFile(null);

    reset({
      title: "",
      type: "banner",
      description: "",
      imageUrl: "",
    });

    handleOpen();
  };

  // ==========================
  // IMAGE URL
  // ==========================


const getImageUrl = () => {
  // اگر کاربر تصویر جدید انتخاب کرده، همان را نمایش بده
  if (selectedImage) {
    return selectedImage;
  }

  // در حالت ویرایش، تصویر متعلق به بنر انتخاب‌شده را نمایش بده
  if (signEditOrAdd === "edit" && selectedBanner?.imageUrl) {
    return getBannerImageUrl(selectedBanner.imageUrl);
  }

  // در حالت افزودن، تا انتخاب تصویر چیزی نمایش نده
  return "";
};




  const previewImage = getImageUrl();

  // ==========================
  // RENDER
  // ==========================

  return (
    <div>
      {/* ==========================
          ADD BUTTON
      ========================== */}

      <Button
        variant="contained"
        sx={{
          margin: "15px 5px",
          ...primaryBtnSx,
          px: 3,
          py: 1.25,
        }}
        onClick={handleAddBanner}
      >
        Add Banner
      </Button>

      {/* ==========================
          MODAL
      ========================== */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="banner-modal-title"
        aria-describedby="banner-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(20, 16, 17, 0.45)",
              backdropFilter: "blur(2px)",
            },
          },
        }}
      >
        <Box
          sx={style}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* ==========================
              TITLE
          ========================== */}

          <Typography
            sx={{
              marginBottom: "20px",
              fontWeight: 700,
              fontFamily: "inherit",
              letterSpacing: "-0.5px",
              color: "#141011",
            }}
            id="banner-modal-title"
            variant="h6"
            component="h2"
          >
            {signEditOrAdd === "edit"
              ? "Edit Banner"
              : "Add Banner"}
          </Typography>

          {/* ==========================
              FIELDS
          ========================== */}

          <Grid
            container
            spacing={2}
          >
            {/* TITLE */}

            <Grid size={12}>
              <TextField
                {...register("title")}
                error={!!errors.title}
                helperText={
                  errors.title?.message
                }
                label="Title"
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* DESCRIPTION */}

            <Grid size={12}>
              <TextField
                {...register("description")}
                error={
                  !!errors.description
                }
                helperText={
                  errors.description?.message
                }
                label="Description"
                fullWidth
                multiline
                rows={3}
                sx={fieldSx}
              />
            </Grid>
          </Grid>

          {/* ==========================
              TYPE
          ========================== */}

          <FormControl
            fullWidth
            sx={{
              mt: 2,
              ...fieldSx,
            }}
            error={!!errors.type}
          >
            <InputLabel id="banner-type-label">
              Type
            </InputLabel>

            <Select<string>
              labelId="banner-type-label"
              id="banner-type-select"
              value={type}
              label="Type"
              onChange={
                handleTypeChange
              }
              MenuProps={{ slotProps: { paper: { sx: menuPaperSx } } }}
            >
              <MenuItem value="banner">
                Banner (large)
              </MenuItem>

              <MenuItem value="small">
                Small
              </MenuItem>
            </Select>

            {errors.type && (
              <Typography
                color="error"
                sx={{
                  mt: 1,
                  fontSize: 14,
                  fontFamily: "inherit",
                }}
              >
                {errors.type.message}
              </Typography>
            )}
          </FormControl>

          {/* ==========================
              IMAGE UPLOAD
          ========================== */}

          <Button
            sx={{
              margin: "15px 0px",
              ...primaryBtnSx,
              fontSize: "0.95rem",
              px: 2.5,
              py: 1,
            }}
            component="label"
            variant="contained"
            tabIndex={-1}
            color="warning"
            startIcon={
              <CloudUploadIcon />
            }
          >
            {signEditOrAdd === "edit"
              ? "Change Image"
              : "Upload Image"}

            <VisuallyHiddenInput
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={
                handleSetImage
              }
            />
          </Button>

          {/* ==========================
              IMAGE PREVIEW
          ========================== */}

          {previewImage && (
            <Box
              sx={{
                mt: 1,
                mb: 2,
              }}
            >
              <img
                src={previewImage}
                alt={
                  selectedBanner?.title ??
                  "Banner preview"
                }
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "1px solid #e8e8e8",
                  display: "block",
                }}
              />
            </Box>
          )}

          {/* ==========================
              IMAGE ERROR
          ========================== */}

          {signEditOrAdd === null &&
            errors.imageUrl && (
              <Typography
                color="error"
                sx={{
                  mb: 1,
                  fontFamily: "inherit",
                }}
              >
                {
                  errors.imageUrl
                    .message
                }
              </Typography>
            )}

          {/* ==========================
              SUBMIT
          ========================== */}

          <Button
            type="submit"
            sx={{
              margin: "10px 0px",
              py: 1.5,
              ...primaryBtnSx,
            }}
            variant="contained"
            fullWidth
          >
            {signEditOrAdd === "edit"
              ? "Update Banner"
              : "Create Banner"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}