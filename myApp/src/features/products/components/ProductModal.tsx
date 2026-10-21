
// import * as React from "react";
// import { useEffect, useState } from "react";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";

// import {
//   InputLabel,
//   MenuItem,
//   TextField,
//   Checkbox,
//   FormControl,
//   Select,
// } from "@mui/material";

// import type { SelectChangeEvent } from "@mui/material/Select";

// import { styled } from "@mui/material/styles";
// import { Grid } from "@mui/material";

// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   useForm,
//   type SubmitHandler,
// } from "react-hook-form";

// import useBrandsQuery from "../hooks/useBrandsQuery";

// import useCategoriesQuery, {
//   type ICategoryType,
// } from "@/features/category/hooks/useCategoriesQuery";

// import useCategoryAttributesQuery from "../hooks/useCategoryAttributesQuery";

// import useCreateProducts from "../hooks/useCreateProducts";
// import useUpdateProducts from "../hooks/useUpdateProducts";

// import type {
//   ProductSchemaInputType,
//   ProductSchemaType,
// } from "../productsSchema/productSchema";
// import { productSchema } from "../productsSchema/productSchema";

// import type {
//   IProductType,
//   IProductColor,
//   IProductAttribute,
// } from "@/apis/productsApi";

// import type { ICategoryAttribute } from "@/apis/categoryAttributesApi";
// import { getProductImageUrl } from "@/constants/api";

// // =====================================================
// // PRODUCT COLORS
// // =====================================================

// const PRODUCT_COLORS = [
//   {
//     id: "black",
//     name: "Black",
//     hexCode: "#000000",
//   },
//   {
//     id: "white",
//     name: "White",
//     hexCode: "#FFFFFF",
//   },
//   {
//     id: "red",
//     name: "Red",
//     hexCode: "#F44336",
//   },
//   {
//     id: "blue",
//     name: "Blue",
//     hexCode: "#2196F3",
//   },
//   {
//     id: "green",
//     name: "Green",
//     hexCode: "#4CAF50",
//   },
//   {
//     id: "yellow",
//     name: "Yellow",
//     hexCode: "#FFEB3B",
//   },
//   {
//     id: "orange",
//     name: "Orange",
//     hexCode: "#FF9800",
//   },
//   {
//     id: "purple",
//     name: "Purple",
//     hexCode: "#9C27B0",
//   },
//   {
//     id: "pink",
//     name: "Pink",
//     hexCode: "#E91E63",
//   },
//   {
//     id: "gray",
//     name: "Gray",
//     hexCode: "#9E9E9E",
//   },

//   // Additional colors
//   {
//     id: "deep-purple",
//     name: "Deep Purple",
//     hexCode: "#512DA8",
//   },
//   {
//     id: "gold",
//     name: "Gold",
//     hexCode: "#D4AF37",
//   },
//   {
//     id: "silver",
//     name: "Silver",
//     hexCode: "#C0C0C0",
//   },
//   {
//     id: "titanium",
//     name: "Titanium",
//     hexCode: "#8A8D8F",
//   },
//   {
//     id: "natural-titanium",
//     name: "Natural Titanium",
//     hexCode: "#A9A9A0",
//   },
//   {
//     id: "desert-titanium",
//     name: "Desert Titanium",
//     hexCode: "#B7A58A",
//   },
//   {
//     id: "blue-titanium",
//     name: "Blue Titanium",
//     hexCode: "#4F5965",
//   },
//   {
//     id: "black-titanium",
//     name: "Black Titanium",
//     hexCode: "#3A3A3C",
//   },
//   {
//     id: "space-gray",
//     name: "Space Gray",
//     hexCode: "#53565A",
//   },
//   {
//     id: "rose-gold",
//     name: "Rose Gold",
//     hexCode: "#B76E79",
//   },
// ];

// // =====================================================
// // MODAL STYLE
// // =====================================================

// const style = {
//   position: "absolute" as const,

//   top: "50%",
//   left: "50%",

//   transform: "translate(-50%, -50%)",

//   width: {
//     xs: "95%",
//     sm: 600,
//     md: 700,
//   },

//   maxHeight: "90vh",

//   overflowY: "auto",

//   bgcolor: "background.paper",

//   border: "2px solid #000",

//   boxShadow: 24,

//   p: {
//     xs: 2,
//     sm: 3,
//     md: 4,
//   },
// };

// // =====================================================
// // HIDDEN INPUT
// // =====================================================

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

// // =====================================================
// // TYPES
// // =====================================================

// interface IProductModalProp {
//   open: boolean;

//   handleOpen: () => void;

//   handleClose: () => void;

//   selectedProduct: null | IProductType;

//   signEditOrAdd: string | null;

//   setSignEditOrAdd: React.Dispatch<
//     React.SetStateAction<string | null>
//   >;

//   selectedImage: string;

//   setSelectedImage: React.Dispatch<
//     React.SetStateAction<string>
//   >;
// }

// // =====================================================
// // GALLERY TYPE
// // =====================================================

// interface IGalleryImage {
//   id: string;
//   file?: File;
//   preview: string;
//   colorId: string;
//   existing: boolean;
// }

// // =====================================================
// // COMPONENT
// // =====================================================

// export default function ProductModal({
//   selectedImage,
//   setSelectedImage,
//   setSignEditOrAdd,
//   signEditOrAdd,
//   selectedProduct,
//   open,
//   handleClose,
//   handleOpen,
// }: IProductModalProp) {
//   // ===================================================
//   // FORM
//   // ===================================================

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,

//     formState: {
//       errors,
//     },
//   } = useForm<ProductSchemaInputType, any, ProductSchemaType>({
//     resolver: zodResolver(productSchema),

//     defaultValues: {
//       name: "",

//       shortDescription: "",

//       longDescription: "",

//       price: undefined,

//       quantity: undefined,

//       categoryId: "",

//       mainImage: "",

//       isFeatured: false,

//       isBestSeller: false,

//       brand: "",

//       colors: [],

//       attributes: [],
//     },
//   });

//   // ===================================================
//   // STATE
//   // ===================================================

//   const [imageFile, setImageFile] =
//     useState<File | string>("");

//   const [galleryImages, setGalleryImages] =
//     useState<IGalleryImage[]>([]);
    
// const [deletedGalleryImageIds, setDeletedGalleryImageIds] =
//   useState<string[]>([]);
//   // ===================================================
//   // MUTATIONS
//   // ===================================================

//   const createProducts =
//     useCreateProducts(handleClose);

//   const updateProducts =
//     useUpdateProducts(handleClose);

//   // ===================================================
//   // WATCH
//   // ===================================================

//   const category = watch("categoryId");

//   const brand = watch("brand");

//   const colors = watch("colors") ?? [];

//   const attributes =
//     watch("attributes") ?? [];

//   const isFeatured =
//     watch("isFeatured");

//   const isBestSeller =
//     watch("isBestSeller");

//   // ===================================================
//   // CATEGORIES
//   // ===================================================

//   const {
//     data: categoriesData,
//   } = useCategoriesQuery();

//   const categories =
//     categoriesData?.data?.data ?? [];

//   // ===================================================
//   // BRANDS
//   // ===================================================

//   const {
//     data: brandsData,
//     isLoading: isBrandsLoading,
//   } = useBrandsQuery(category);

//   const brands = brandsData ?? [];

//   // ===================================================
//   // CATEGORY ATTRIBUTES
//   // ===================================================

//   const {
//     data: categoryAttributesData,
//     isLoading:
//       isCategoryAttributesLoading,
//   } = useCategoryAttributesQuery(
//     category,
//   );

//   const categoryAttributes: ICategoryAttribute[] =
//     categoryAttributesData?.data?.data ?? [];

//   // ===================================================
//   // COLORS
//   // ===================================================

//   const productColors = PRODUCT_COLORS;

//   // ===================================================
//   // HELPERS
//   // ===================================================

//   const revokeGalleryUrls = (
//     images: IGalleryImage[],
//   ) => {
//     images.forEach((image) => {
//       if (
//         !image.existing &&
//         image.preview.startsWith("blob:")
//       ) {
//         URL.revokeObjectURL(
//           image.preview,
//         );
//       }
//     });
//   };

//   const getColorId = (
//     color:
//       | string
//       | IProductColor,
//   ): string => {
//     if (typeof color === "string") {
//       return color;
//     }

//     return (
//       color._id ??
//       color.id ??
//       ""
//     );
//   };

//   const getGalleryColorId = (
//     colorId:
//       | string
//       | IProductColor,
//   ): string => {
//     if (typeof colorId === "string") {
//       return colorId;
//     }

//     return (
//       colorId._id ??
//       colorId.id ??
//       ""
//     );
//   };

//   // ===================================================
//   // CATEGORY CHANGE
//   // ===================================================

//   const handleCategoryChange = (
//     event: SelectChangeEvent<string>,
//   ) => {
//     const newCategoryId =
//       event.target.value;

//     setValue(
//       "categoryId",
//       newCategoryId,
//       {
//         shouldValidate: true,
//         shouldDirty: true,
//       },
//     );

//     setValue("brand", "", {
//       shouldValidate: true,
//       shouldDirty: true,
//     });

//     setValue("colors", [], {
//       shouldValidate: true,
//       shouldDirty: true,
//     });

//     setValue("attributes", [], {
//       shouldValidate: true,
//       shouldDirty: true,
//     });

//     revokeGalleryUrls(
//       galleryImages,
//     );

//     setGalleryImages([]);
//   };

//   // ===================================================
//   // BRAND CHANGE
//   // ===================================================

//   const handleBrandChange = (
//     event: SelectChangeEvent<string>,
//   ) => {
//     const newBrandId =
//       event.target.value;

//     setValue(
//       "brand",
//       newBrandId,
//       {
//         shouldValidate: true,
//         shouldDirty: true,
//       },
//     );

//     setValue("colors", [], {
//       shouldValidate: true,
//       shouldDirty: true,
//     });

//     revokeGalleryUrls(
//       galleryImages,
//     );

//     setGalleryImages([]);
//   };

//   // ===================================================
//   // COLOR CHANGE
//   // ===================================================

//  // ===================================================
// // COLOR CHANGE
// // ===================================================

// const handleColorChange = (
//   colorId: string,
//   checked: boolean,
// ) => {
//   const currentColors =
//     colors ?? [];

//   // ================================================
//   // ADD COLOR
//   // ================================================

//   if (checked) {
//     if (
//       !currentColors.includes(colorId)
//     ) {
//       setValue(
//         "colors",
//         [
//           ...currentColors,
//           colorId,
//         ],
//         {
//           shouldValidate: true,
//           shouldDirty: true,
//         },
//       );
//     }

//     return;
//   }

//   // ================================================
//   // REMOVE COLOR
//   // ================================================

//   const newColors =
//     currentColors.filter(
//       (id) => id !== colorId,
//     );

//   setValue(
//     "colors",
//     newColors,
//     {
//       shouldValidate: true,
//       shouldDirty: true,
//     },
//   );

//   // عکس‌های مربوط به رنگ حذف‌شده هم حذف شوند
//   setGalleryImages(
//     (previous) => {
//       const removedImages =
//         previous.filter(
//           (image) =>
//             image.colorId === colorId,
//         );

//       removedImages.forEach(
//         (image) => {
//           if (
//             !image.existing &&
//             image.preview.startsWith(
//               "blob:",
//             )
//           ) {
//             URL.revokeObjectURL(
//               image.preview,
//             );
//           }
//         },
//       );

//       return previous.filter(
//         (image) =>
//           image.colorId !==
//           colorId,
//       );
//     },
//   );
// };

//   // ===================================================
//   // ATTRIBUTE CHANGE
//   // ===================================================

// const handleAttributeChange = (
//   attributeId: string,
//   value: string
// ) => {
//   const currentAttributes = attributes ?? [];

//   const existingAttribute = currentAttributes.find(
//     (item) => getAttributeId(item) === attributeId
//   );

//   if (existingAttribute) {
//     setValue(
//       "attributes",
//       currentAttributes.map((item) =>
//         getAttributeId(item) === attributeId
//           ? { ...item, value }
//           : item
//       ),
//       {
//         shouldValidate: true,
//         shouldDirty: true,
//       }
//     );

//     return;
//   }

//   setValue(
//     "attributes",
//     [
//       ...currentAttributes,
//       {
//         attributeId,
//         value,
//       },
//     ],
//     {
//       shouldValidate: true,
//       shouldDirty: true,
//     }
//   );
// };
//   // ===================================================
//   // GET ATTRIBUTE VALUE
//   // ===================================================
// const getAttributeId = (attribute: IProductAttribute): string => {
//   if (typeof attribute.attributeId === "string") {
//     return attribute.attributeId;
//   }

//   return attribute.attributeId?._id ?? "";
// };
// const getAttributeValue = (attributeId: string) => {
//   const attribute = attributes.find(
//     (item) => getAttributeId(item) === attributeId
//   );

//   return attribute?.value ?? "";
// };

//   // ===================================================
//   // MAIN IMAGE
//   // ===================================================

//   const handleSetImage = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file =
//       event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     if (
//       selectedImage &&
//       selectedImage.startsWith("blob:")
//     ) {
//       URL.revokeObjectURL(
//         selectedImage,
//       );
//     }

//     const objectUrl =
//       URL.createObjectURL(file);

//     setSelectedImage(objectUrl);

//     setImageFile(file);

//     setValue(
//       "mainImage",
//       objectUrl,
//       {
//         shouldValidate: true,
//         shouldDirty: true,
//       },
//     );

//     event.target.value = "";
//   };

//   // ===================================================
//   // GALLERY UPLOAD
//   // ===================================================

// // ===================================================
// // GALLERY UPLOAD
// // ===================================================

// const handleGalleryUpload = (
//   event: React.ChangeEvent<HTMLInputElement>,
// ) => {
//   const files = Array.from(
//     event.target.files ?? [],
//   );

//   if (files.length === 0) {
//     return;
//   }

//   // آخرین رنگ انتخاب‌شده
//   // یعنی اگر کاربر رنگ دوم را انتخاب کرده باشد،
//   // عکس جدید به رنگ دوم اختصاص داده می‌شود.
//   const selectedGalleryColorId =
//     colors[colors.length - 1] ?? "";

//   // نباید بدون رنگ عکس اضافه شود
//   if (!selectedGalleryColorId) {
//     console.error(
//       "Please select at least one product color first.",
//     );

//     event.target.value = "";
//     return;
//   }

//   const newImages: IGalleryImage[] =
//     files.map((file) => ({
//       id: `${Date.now()}-${Math.random()
//         .toString(36)
//         .substring(2)}`,

//       file,

//       preview: URL.createObjectURL(file),

//       // مهم:
//       // عکس به آخرین رنگ انتخاب‌شده متصل می‌شود
//       colorId: selectedGalleryColorId,

//       existing: false,
//     }));

//   setGalleryImages(
//     (previous) => [
//       ...previous,
//       ...newImages,
//     ],
//   );

//   event.target.value = "";
// };
//   // ===================================================
//   // GALLERY COLOR CHANGE
//   // ===================================================

//   const handleGalleryColorChange = (
//     imageId: string,
//     colorId: string,
//   ) => {
//     setGalleryImages(
//       (previous) =>
//         previous.map(
//           (image) =>
//             image.id === imageId
//               ? {
//                   ...image,
//                   colorId,
//                 }
//               : image,
//         ),
//     );
//   };

//   // ===================================================
//   // DELETE GALLERY IMAGE
//   // ===================================================

// const handleDeleteGalleryImage = (
//   imageId: string,
// ) => {
//   setGalleryImages((previous) => {
//     const image = previous.find(
//       (item) => item.id === imageId
//     );

//     if (!image) {
//       return previous;
//     }

//     // اگر عکس از قبل در database بوده
//     if (image.existing) {
//       setDeletedGalleryImageIds((previousDeleted) => {
//         if (previousDeleted.includes(imageId)) {
//           return previousDeleted;
//         }

//         return [...previousDeleted, imageId];
//       });
//     }

//     // اگر عکس جدید بوده، فقط blob را آزاد کن
//     if (
//       !image.existing &&
//       image.preview.startsWith("blob:")
//     ) {
//       URL.revokeObjectURL(image.preview);
//     }

//     return previous.filter(
//       (item) => item.id !== imageId
//     );
//   });
// };

//   // ===================================================
//   // SUBMIT
//   // ===================================================

//   const onSubmit: SubmitHandler<
//     ProductSchemaType
//   > = (data) => {
    
//     // =================================================
//     // BRAND
//     // =================================================

//     if (!data.brand) {
//       console.error(
//         "Brand is required",
//       );

//       return;
//     }

//     // =================================================
//     // COLORS
//     // =================================================

//     if (
//       !data.colors ||
//       data.colors.length === 0
//     ) {
//       console.error(
//         "At least one color is required",
//       );

//       return;
//     }

//     // =================================================
//     // MAIN COLOR
//     // =================================================

//     const mainImageColorId =
//       data.colors[0];

//     // =================================================
//     // GALLERY VALIDATION
//     // =================================================

//     const galleryWithoutColor =
//       galleryImages.filter(
//         (image) =>
//           !image.colorId,
//       );

//     if (
//       galleryWithoutColor.length >
//       0
//     ) {
//       console.error(
//         "Every gallery image must have a color",
//       );

//       return;
//     }

//     // =================================================
//     // ATTRIBUTES
//     // =================================================

//     const productAttributes =
//       (
//         data.attributes ?? []
//       )
//         .filter(
//           (attribute) =>
//             attribute.attributeId &&
//             attribute.value
//               .trim() !== "",
//         )
//         .map((attribute) => {
//           const attributeId = attribute.attributeId as
//             | string
//             | { _id: string };

//           return {
//             attributeId:
//               typeof attributeId === "string"
//                 ? attributeId
//                 : attributeId._id,
//             value: attribute.value.trim(),
//           };
//         });

//     // =================================================
//     // FORM DATA
//     // =================================================

//     const formData =
//       new FormData();

//     // =================================================
//     // BASIC
//     // =================================================

//     formData.append(
//       "name",
//       data.name,
//     );

//     formData.append(
//       "shortDescription",
//       data.shortDescription,
//     );

//     formData.append(
//       "longDescription",
//       data.longDescription,
//     );

//     formData.append(
//       "price",
//       String(data.price),
//     );

//     formData.append(
//       "quantity",
//       String(data.quantity),
//     );

//     // =================================================
//     // CATEGORY
//     // =================================================

//     formData.append(
//       "categoryId",
//       data.categoryId,
//     );

//     // =================================================
//     // BRAND
//     // =================================================

//     formData.append(
//       "brand",
//       data.brand,
//     );

//     // =================================================
//     // STATUS
//     // =================================================

//     formData.append(
//       "isFeatured",
//       String(
//         data.isFeatured,
//       ),
//     );

//     formData.append(
//       "isBestSeller",
//       String(
//         data.isBestSeller,
//       ),
//     );

//     // =================================================
//     // COLORS
//     // =================================================

//     formData.append(
//       "colors",
//       JSON.stringify(
//         data.colors ?? [],
//       ),
//     );

//     // =================================================
//     // MAIN IMAGE COLOR
//     // =================================================

//     formData.append(
//       "mainImageColorId",
//       mainImageColorId,
//     );

//     // =================================================
//     // MAIN IMAGE
//     // =================================================

//     if (
//       imageFile instanceof File
//     ) {
//       formData.append(
//         "mainImage",
//         imageFile,
//       );
//     }

//     // =================================================
//     // ATTRIBUTES
//     // =================================================

//     formData.append(
//       "attributes",
//       JSON.stringify(
//         productAttributes,
//       ),
//     );

//     // =================================================
//     // GALLERY METADATA
//     // =================================================

//   // =================================================
// // GALLERY
// // =================================================

// // عکس‌های جدید

// const newGalleryImages = galleryImages.filter(
//   (image) =>
//     !image.existing &&
//     image.file
// );

// // metadata فقط برای عکس‌های جدید
// const galleryMetadata = newGalleryImages.map(
//   (image, index) => ({
//     index,
//     colorId: image.colorId,
//   })
// );

// // عکس‌های موجود که هنوز نگه داشته شده‌اند
// const existingGalleryMetadata = galleryImages
//   .filter((image) => image.existing)
//   .map((image) => ({
//     id: image.id,
//     colorId: image.colorId,
//   }));

// // عکس‌های جدید
// formData.append(
//   "gallery",
//   JSON.stringify(galleryMetadata)
// );

// // عکس‌های موجود
// formData.append(
//   "existingGallery",
//   JSON.stringify(existingGalleryMetadata)
// );

// // عکس‌های حذف‌شده
// formData.append(
//   "deletedGalleryImageIds",
//   JSON.stringify(deletedGalleryImageIds)
// );

// // فایل‌های جدید
// newGalleryImages.forEach((image) => {
//   if (image.file) {
//     formData.append(
//       "galleryImages",
//       image.file
//     );
//   }
// });

 

//     // =================================================
//     // DEBUG
//     // =================================================

//     console.log(
//       "========== PRODUCT SUBMIT ==========",
//     );

//     console.log(
//       "PRODUCT DATA:",
//       data,
//     );

//     console.log(
//       "COLORS:",
//       data.colors,
//     );

//     console.log(
//       "MAIN COLOR:",
//       mainImageColorId,
//     );

//     console.log(
//       "ATTRIBUTES:",
//       productAttributes,
//     );

//     console.log(
//       "GALLERY:",
//       galleryMetadata,
//     );

//     console.log(
//       "========== FORMDATA ==========",
//     );

//     for (
//       const [
//         key,
//         value,
//       ] of formData.entries()
//     ) {
//       console.log(
//         key,
//         value,
//       );
//     }

//     // =================================================
//     // EDIT
//     // =================================================

//     if (
//       signEditOrAdd === "edit" &&
//       selectedProduct?._id
//     ) {
//       updateProducts.mutate({
//         id: selectedProduct._id,
//         formData,
//       });

//       return;
//     }

//     // =================================================
//     // CREATE
//     // =================================================

//     if (
//       signEditOrAdd === "add"
//     ) {
//       createProducts.mutate(
//         formData,
//       );
//     }
//   };

//   // ===================================================
//   // EDIT PRODUCT
//   // ===================================================

//   useEffect(() => {
//     if (
//       signEditOrAdd !== "edit" ||
//       !selectedProduct
//     ) {
//       return;
//     }

//     // =================================================
//     // BASIC
//     // =================================================

//     setValue(
//       "name",
//       selectedProduct.name,
//     );

//     setValue(
//       "shortDescription",
//       selectedProduct.shortDescription,
//     );

//     setValue(
//       "longDescription",
//       selectedProduct.longDescription,
//     );

//     setValue(
//       "price",
//       selectedProduct.price,
//     );

//     setValue(
//       "quantity",
//       selectedProduct.quantity,
//     );

//     setValue(
//       "categoryId",
//       selectedProduct.categoryId?._id ??
//         "",
//     );

//     setValue(
//       "brand",
//       selectedProduct.brand?._id ??
//         "",
//     );

//     setValue(
//       "mainImage",
//       selectedProduct.mainImage,
//     );

//     setValue(
//       "isFeatured",
//       selectedProduct.isFeatured ??
//         false,
//     );

//     setValue(
//       "isBestSeller",
//       selectedProduct.isBestSeller ??
//         false,
//     );

//     // =================================================
//     // COLORS
//     // =================================================

//     const existingColors =
//       selectedProduct.colors ??
//       [];

//     const existingColorIds =
//       existingColors
//         .map(getColorId)
//         .filter(Boolean);

//     setValue(
//       "colors",
//       existingColorIds,
//       {
//         shouldValidate: true,
//         shouldDirty: false,
//       },
//     );

//     // =================================================
//     // ATTRIBUTES
//     // =================================================

//     const existingAttributes =
//       selectedProduct.attributes ??
//       [];

//     const normalizedAttributes =
//       existingAttributes
//         .map(
//           (attribute) => {
//             const attributeId =
//               typeof attribute.attributeId ===
//               "string"
//                 ? attribute.attributeId
//                 : attribute
//                     .attributeId
//                     ?._id;

//             return {
//               attributeId:
//                 attributeId ??
//                 "",

//               value:
//                 String(
//                   attribute.value ??
//                     "",
//                 ),
//             };
//           },
//         )
//         .filter(
//           (attribute) =>
//             Boolean(
//               attribute.attributeId,
//             ),
//         );

//     setValue(
//       "attributes",
//       normalizedAttributes,
//       {
//         shouldValidate: true,
//         shouldDirty: false,
//       },
//     );

//     // =================================================
//     // RESET NEW MAIN IMAGE
//     // =================================================

//     setImageFile("");

//     // =================================================
//     // MAIN IMAGE PREVIEW
//     // =================================================

//     setSelectedImage("");

//     // =================================================
//     // EXISTING GALLERY
//     // =================================================

//     revokeGalleryUrls(
//       galleryImages,
//     );

//     const existingGallery =
//       selectedProduct.images ??
//       [];

//   const normalizedGallery: IGalleryImage[] =
//   existingGallery
//     .filter((image) => image._id)
//     .map((image) => ({
//       id: image._id!,
//       preview: getProductImageUrl(image.url),
//       colorId: getGalleryColorId(image.colorId),
//       existing: true,
//     }));

// setGalleryImages(normalizedGallery);

// // خیلی مهم
// setDeletedGalleryImageIds([]);

//     setGalleryImages(
//       normalizedGallery,
//     );
//   }, [
//     signEditOrAdd,
//     selectedProduct,
//     setValue,
//     setSelectedImage,
//   ]);

//   // ===================================================
//   // RESET ADD PRODUCT
//   // ===================================================

//   useEffect(() => {
//     if (
//       signEditOrAdd !== "add"
//     ) {
//       return;
//     }

//     revokeGalleryUrls(
//       galleryImages,
//     );

//     reset({
//       name: "",

//       shortDescription: "",

//       longDescription: "",

//       price: undefined,

//       quantity: undefined,

//       categoryId: "",

//       mainImage: "",

//       isFeatured: false,

//       isBestSeller: false,

//       brand: "",

//       colors: [],

//       attributes: [],
//     });

//     setImageFile("");

//     setGalleryImages([]);

//     setSelectedImage("");
//   }, [
//     signEditOrAdd,
//     reset,
//     setSelectedImage,
//   ]);

//   // ===================================================
//   // ADD PRODUCT
//   // ===================================================

//   const handleAddProduct = () => {
//     setSignEditOrAdd("add");

//     if (
//       selectedImage &&
//       selectedImage.startsWith("blob:")
//     ) {
//       URL.revokeObjectURL(
//         selectedImage,
//       );
//     }

//     setSelectedImage("");

//     setImageFile("");

//     revokeGalleryUrls(
//       galleryImages,
//     );

//     setGalleryImages([]);

//     reset({
//       name: "",

//       shortDescription: "",

//       longDescription: "",

//       price: undefined,

//       quantity: undefined,

//       categoryId: "",

//       mainImage: "",

//       isFeatured: false,

//       isBestSeller: false,

//       brand: "",

//       colors: [],

//       attributes: [],
//     });

//     handleOpen();
//   };

//   // ===================================================
//   // CLEANUP
//   // ===================================================

//   useEffect(() => {
//     return () => {
//       if (
//         selectedImage &&
//         selectedImage.startsWith("blob:")
//       ) {
//         URL.revokeObjectURL(
//           selectedImage,
//         );
//       }

//       revokeGalleryUrls(
//         galleryImages,
//       );
//     };
//   }, []);

//   // ===================================================
//   // RENDER
//   // ===================================================

//   return (
//     <div>
//       {/* =================================================
//           ADD PRODUCT BUTTON
//       ================================================= */}

//       <Button
//         variant="contained"
//         sx={{
//           margin: "15px 5px",
//         }}
//         onClick={
//           handleAddProduct
//         }
//       >
//         Add Product
//       </Button>

//       {/* =================================================
//           MODAL
//       ================================================= */}

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="product-modal-title"
//       >
//         <Box
//           sx={style}
//           component="form"
//           onSubmit={handleSubmit(
//             onSubmit,
//           )}
//         >
//           {/* =================================================
//               TITLE
//           ================================================= */}

//           <Typography
//             sx={{
//               marginBottom: "20px",
//               fontWeight: 600,
//             }}
//             id="product-modal-title"
//             variant="h6"
//             component="h2"
//           >
//             Product
//           </Typography>

//           {/* =================================================
//               BASIC FIELDS
//           ================================================= */}

//           <Grid
//             container
//             spacing={2}
//           >
//             {/* NAME */}

//             <Grid
//               size={{
//                 xs: 12,
//                 sm: 6,
//               }}
//             >
//               <TextField
//                 {...register(
//                   "name",
//                 )}
//                 error={
//                   !!errors.name
//                 }
//                 helperText={
//                   errors.name
//                     ?.message
//                 }
//                 label="Name"
//                 fullWidth
//               />
//             </Grid>

//             {/* SHORT DESCRIPTION */}

//             <Grid
//               size={{
//                 xs: 12,
//                 sm: 6,
//               }}
//             >
//               <TextField
//                 {...register(
//                   "shortDescription",
//                 )}
//                 error={
//                   !!errors.shortDescription
//                 }
//                 helperText={
//                   errors
//                     .shortDescription
//                     ?.message
//                 }
//                 label="Short Description"
//                 fullWidth
//               />
//             </Grid>

//             {/* PRICE */}

//             <Grid
//               size={{
//                 xs: 12,
//                 sm: 6,
//               }}
//             >
//               <TextField
//                 {...register(
//                   "price",
//                   {
//                     setValueAs:
//                       (
//                         value,
//                       ) =>
//                         value ===
//                         ""
//                           ? undefined
//                           : Number(
//                               value,
//                             ),
//                   },
//                 )}
//                 error={
//                   !!errors.price
//                 }
//                 helperText={
//                   errors.price
//                     ?.message
//                 }
//                 label="Price"
//                 type="number"
//                 fullWidth
//               />
//             </Grid>

//             {/* QUANTITY */}

//             <Grid
//               size={{
//                 xs: 12,
//                 sm: 6,
//               }}
//             >
//               <TextField
//                 {...register(
//                   "quantity",
//                   {
//                     setValueAs:
//                       (
//                         value,
//                       ) =>
//                         value ===
//                         ""
//                           ? undefined
//                           : Number(
//                               value,
//                             ),
//                   },
//                 )}
//                 error={
//                   !!errors.quantity
//                 }
//                 helperText={
//                   errors.quantity
//                     ?.message
//                 }
//                 label="Quantity"
//                 type="number"
//                 fullWidth
//               />
//             </Grid>

//             {/* LONG DESCRIPTION */}

//             <Grid size={12}>
//               <TextField
//                 {...register(
//                   "longDescription",
//                 )}
//                 error={
//                   !!errors.longDescription
//                 }
//                 helperText={
//                   errors
//                     .longDescription
//                     ?.message
//                 }
//                 label="Long Description"
//                 multiline
//                 minRows={4}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>

//           {/* =================================================
//               CATEGORY
//           ================================================= */}

//           <FormControl
//             fullWidth
//             sx={{
//               mt: 2,
//             }}
//             error={
//               !!errors.categoryId
//             }
//           >
//             <InputLabel id="product-category-label">
//               Category
//             </InputLabel>

//             <Select
//               labelId="product-category-label"
//               value={
//                 category
//               }
//               label="Category"
//               onChange={
//                 handleCategoryChange
//               }
//             >
//               <MenuItem value="">
//                 Select Category
//               </MenuItem>

//               {categories.map(
//                 (
//                   categoryItem: ICategoryType,
//                   index: number,
//                 ) => (
//                   <MenuItem
//                     key={
//                       categoryItem._id ??
//                       index
//                     }
//                     value={
//                       categoryItem._id
//                     }
//                   >
//                     {
//                       categoryItem.name
//                     }
//                   </MenuItem>
//                 ),
//               )}
//             </Select>

//             {errors.categoryId && (
//               <Typography
//                 color="error"
//                 sx={{
//                   mt: 1,
//                   fontSize: 13,
//                 }}
//               >
//                 {
//                   errors
//                     .categoryId
//                     .message
//                 }
//               </Typography>
//             )}
//           </FormControl>

//           {/* =================================================
//               CATEGORY ATTRIBUTES
//           ================================================= */}

//           {category && (
//             <Box
//               sx={{
//                 mt: 3,
//                 p: 2,
//                 border:
//                   "1px solid #ddd",
//                 borderRadius: 2,
//               }}
//             >
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: 600,
//                   mb: 1,
//                 }}
//               >
//                 Specific Attributes
//               </Typography>

//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{
//                   mb: 2,
//                 }}
//               >
//                 Enter the specifications
//                 for this product.
//               </Typography>

//               {isCategoryAttributesLoading && (
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                 >
//                   Loading attributes...
//                 </Typography>
//               )}

//               {!isCategoryAttributesLoading &&
//                 categoryAttributes.length ===
//                   0 && (
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                   >
//                     No specific attributes
//                     have been configured
//                     for this category.
//                   </Typography>
//                 )}

//               {!isCategoryAttributesLoading &&
//                 categoryAttributes.length >
//                   0 && (
//                   <Box
//                     sx={{
//                       display:
//                         "grid",

//                       gridTemplateColumns:
//                         {
//                           xs: "1fr",
//                           sm: "1fr 1fr",
//                         },

//                       gap: 2,
//                     }}
//                   >
//                     {categoryAttributes
//                       .slice()
//                       .sort(
//                         (
//                           a,
//                           b,
//                         ) =>
//                           a.order -
//                           b.order,
//                       )
//                       .slice(
//                         0,
//                         7,
//                       )
//                       .map(
//                         (
//                           attribute,
//                         ) => {
//                           const value =
//                             getAttributeValue(
//                               attribute._id,
//                             );

//                           if (
//                             attribute.type ===
//                             "text"
//                           ) {
//                             return (
//                               <TextField
//                                 key={
//                                   attribute._id
//                                 }
//                                 label={
//                                   attribute.name
//                                 }
//                                 value={
//                                   value
//                                 }
//                                 onChange={(
//                                   event,
//                                 ) =>
//                                   handleAttributeChange(
//                                     attribute._id,
//                                     event
//                                       .target
//                                       .value,
//                                   )
//                                 }
//                                 fullWidth
//                                 helperText={
//                                   attribute.key
//                                 }
//                               />
//                             );
//                           }

//                           if (
//                             attribute.type ===
//                             "number"
//                           ) {
//                             return (
//                               <TextField
//                                 key={
//                                   attribute._id
//                                 }
//                                 label={
//                                   attribute.name
//                                 }
//                                 type="number"
//                                 value={
//                                   value
//                                 }
//                                 onChange={(
//                                   event,
//                                 ) =>
//                                   handleAttributeChange(
//                                     attribute._id,
//                                     event
//                                       .target
//                                       .value,
//                                   )
//                                 }
//                                 fullWidth
//                                 helperText={
//                                   attribute.key
//                                 }
//                               />
//                             );
//                           }

//                           if (
//                             attribute.type ===
//                             "select"
//                           ) {
//                             return (
//                               <FormControl
//                                 key={
//                                   attribute._id
//                                 }
//                                 fullWidth
//                               >
//                                 <InputLabel>
//                                   {
//                                     attribute.name
//                                   }
//                                 </InputLabel>

//                                 <Select
//                                   value={
//                                     value
//                                   }
//                                   label={
//                                     attribute.name
//                                   }
//                                   onChange={(
//                                     event,
//                                   ) =>
//                                     handleAttributeChange(
//                                       attribute._id,
//                                       event
//                                         .target
//                                         .value,
//                                     )
//                                   }
//                                 >
//                                   <MenuItem value="">
//                                     Select{" "}
//                                     {
//                                       attribute.name
//                                     }
//                                   </MenuItem>

//                                   {(
//                                     attribute.options ??
//                                     []
//                                   ).map(
//                                     (
//                                       option,
//                                     ) => (
//                                       <MenuItem
//                                         key={
//                                           option
//                                         }
//                                         value={
//                                           option
//                                         }
//                                       >
//                                         {
//                                           option
//                                         }
//                                       </MenuItem>
//                                     ),
//                                   )}
//                                 </Select>
//                               </FormControl>
//                             );
//                           }

//                           if (
//                             attribute.type ===
//                             "boolean"
//                           ) {
//                             return (
//                               <Box
//                                 key={
//                                   attribute._id
//                                 }
//                                 sx={{
//                                   display:
//                                     "flex",
//                                   alignItems:
//                                     "center",
//                                   border:
//                                     "1px solid #ddd",
//                                   borderRadius:
//                                     1,
//                                   px: 1,
//                                   minHeight:
//                                     56,
//                                 }}
//                               >
//                                 <FormControlLabel
//                                   control={
//                                     <Switch
//                                       checked={
//                                         value ===
//                                         "true"
//                                       }
//                                       onChange={(
//                                         event,
//                                       ) =>
//                                         handleAttributeChange(
//                                           attribute._id,
//                                           String(
//                                             event
//                                               .target
//                                               .checked,
//                                           ),
//                                         )
//                                       }
//                                     />
//                                   }
//                                   label={
//                                     attribute.name
//                                   }
//                                 />
//                               </Box>
//                             );
//                           }

//                           return null;
//                         },
//                       )}
//                   </Box>
//                 )}
//             </Box>
//           )}

//           {/* =================================================
//               BRAND
//           ================================================= */}

//           <FormControl
//             fullWidth
//             sx={{
//               mt: 2,
//             }}
//             disabled={
//               !category ||
//               isBrandsLoading
//             }
//             error={
//               !!errors.brand
//             }
//           >
//             <InputLabel id="product-brand-label">
//               Brand
//             </InputLabel>

//             <Select
//               labelId="product-brand-label"
//               value={brand}
//               label="Brand"
//               onChange={
//                 handleBrandChange
//               }
//             >
//               {!category && (
//                 <MenuItem value="">
//                   First select category
//                 </MenuItem>
//               )}

//               {category &&
//                 isBrandsLoading && (
//                   <MenuItem value="">
//                     Loading brands...
//                   </MenuItem>
//                 )}

//               {category &&
//                 !isBrandsLoading &&
//                 brands.length ===
//                   0 && (
//                   <MenuItem value="">
//                     No brands found
//                   </MenuItem>
//                 )}

//               {brands.map(
//                 (
//                   brandItem,
//                 ) => (
//                   <MenuItem
//                     key={
//                       brandItem._id
//                     }
//                     value={
//                       brandItem._id
//                     }
//                   >
//                     {
//                       brandItem.name
//                     }
//                   </MenuItem>
//                 ),
//               )}
//             </Select>

//             {errors.brand && (
//               <Typography
//                 color="error"
//                 sx={{
//                   mt: 1,
//                   fontSize: 13,
//                 }}
//               >
//                 {
//                   errors.brand
//                     .message
//                 }
//               </Typography>
//             )}
//           </FormControl>

//           {/* =================================================
//               COLORS
//           ================================================= */}

//           <Box
//             sx={{
//               mt: 3,
//               p: 2,
//               border:
//                 "1px solid #ddd",
//               borderRadius: 2,
//             }}
//           >
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//               }}
//             >
//               Product Colors
//             </Typography>

//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 mb: 2,
//               }}
//             >
//               Select one or more colors.
//               The first selected color will
//               be the main color.
//             </Typography>

//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   {
//                     xs: "1fr",
//                     sm: "1fr 1fr",
//                   },
//                 gap: 1,
//               }}
//             >
//               {productColors.map(
//                 (color) => {
//                   const checked =
//                     colors.includes(
//                       color.id,
//                     );

//                   const colorIndex =
//                     colors.indexOf(
//                       color.id,
//                     );

//                   return (
//                     <Box
//                       key={
//                         color.id
//                       }
//                       sx={{
//                         display:
//                           "flex",
//                         alignItems:
//                           "center",
//                         border:
//                           checked
//                             ? "2px solid"
//                             : "1px solid #ddd",
//                         borderColor:
//                           checked
//                             ? "primary.main"
//                             : "#ddd",
//                         borderRadius: 2,
//                         px: 1,
//                         py: 1,
//                         cursor:
//                           "pointer",
//                       }}
//                       onClick={() =>
//                         handleColorChange(
//                           color.id,
//                           !checked,
//                         )
//                       }
//                     >
//                       <Box
//                         sx={{
//                           width: 30,
//                           height: 30,
//                           borderRadius:
//                             "50%",
//                           backgroundColor:
//                             color.hexCode,
//                           border:
//                             color.id ===
//                             "white"
//                               ? "1px solid #999"
//                               : "1px solid transparent",
//                           mr: 1,
//                           flexShrink: 0,
//                         }}
//                       />

//                       <Checkbox
//                         checked={
//                           checked
//                         }
//                         onChange={(
//                           event,
//                         ) =>
//                           handleColorChange(
//                             color.id,
//                             event
//                               .target
//                               .checked,
//                           )
//                         }
//                         onClick={(
//                           event,
//                         ) =>
//                           event.stopPropagation()
//                         }
//                       />

//                       <Box
//                         sx={{
//                           minWidth: 0,
//                         }}
//                       >
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             fontWeight:
//                               600,
//                           }}
//                         >
//                           {
//                             color.name
//                           }
//                         </Typography>

//                         <Typography
//                           variant="caption"
//                           color="text.secondary"
//                         >
//                           {
//                             color.hexCode
//                           }
//                         </Typography>
//                       </Box>

//                       {checked &&
//                         colorIndex ===
//                           0 && (
//                           <Typography
//                             variant="caption"
//                             sx={{
//                               ml: "auto",
//                               px: 1,
//                               py: 0.5,
//                               borderRadius:
//                                 1,
//                               bgcolor:
//                                 "primary.main",
//                               color:
//                                 "white",
//                               whiteSpace:
//                                 "nowrap",
//                             }}
//                           >
//                             Main
//                           </Typography>
//                         )}
//                     </Box>
//                   );
//                 },
//               )}
//             </Box>

//             {colors.length >
//               0 && (
//               <Box
//                 sx={{
//                   mt: 2,
//                   p: 1.5,
//                   bgcolor:
//                     "rgba(25,118,210,0.06)",
//                   borderRadius: 1,
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     fontWeight: 600,
//                     mb: 1,
//                   }}
//                 >
//                   Selected colors:
//                 </Typography>

//                 {colors.map(
//                   (
//                     colorId,
//                     index,
//                   ) => {
//                     const color =
//                       productColors.find(
//                         (
//                           item,
//                         ) =>
//                           item.id ===
//                           colorId,
//                       );

//                     return (
//                       <Box
//                         key={
//                           colorId
//                         }
//                         sx={{
//                           display:
//                             "flex",
//                           alignItems:
//                             "center",
//                           gap: 1,
//                           mt: 0.5,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             width: 18,
//                             height: 18,
//                             borderRadius:
//                               "50%",
//                             backgroundColor:
//                               color?.hexCode,
//                             border:
//                               "1px solid #999",
//                           }}
//                         />

//                         <Typography
//                           variant="body2"
//                         >
//                           {index +
//                             1}
//                           .{" "}
//                           {
//                             color?.name ??
//                             colorId
//                           }

//                           {index ===
//                             0 && (
//                             <strong>
//                               {" "}
//                               — Main
//                               Color
//                             </strong>
//                           )}
//                         </Typography>
//                       </Box>
//                     );
//                   },
//                 )}
//               </Box>
//             )}

//             {errors.colors && (
//               <Typography
//                 color="error"
//                 sx={{
//                   mt: 1,
//                   fontSize: 13,
//                 }}
//               >
//                 {
//                   errors.colors
//                     .message
//                 }
//               </Typography>
//             )}
//           </Box>

//           {/* =================================================
//               MAIN IMAGE
//           ================================================= */}

//           <Box
//             sx={{
//               mt: 3,
//               p: 2,
//               border:
//                 "1px solid #ddd",
//               borderRadius: 2,
//             }}
//           >
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//               }}
//             >
//               Main Product Image
//             </Typography>

//             {colors.length >
//               0 && (
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{
//                   mb: 1,
//                 }}
//               >
//                 This image belongs to
//                 the first selected color:
//                 <strong>
//                   {" "}
//                   {
//                     productColors.find(
//                       (
//                         color,
//                       ) =>
//                         color.id ===
//                         colors[0],
//                     )?.name
//                   }
//                 </strong>
//               </Typography>
//             )}

//             <Button
//               component="label"
//               variant="contained"
//               color="warning"
//               startIcon={
//                 <CloudUploadIcon />
//               }
//             >
//               Upload Main Image

//               <VisuallyHiddenInput
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp,image/jpg"
//                 onChange={
//                   handleSetImage
//                 }
//               />
//             </Button>

//             <Box
//               sx={{
//                 mt: 2,
//               }}
//             >
//               {signEditOrAdd ===
//                 "add" &&
//                 selectedImage && (
//                   <img
//                     src={
//                       selectedImage
//                     }
//                     alt="Selected product"
//                     style={{
//                       width: 150,
//                       height: 150,
//                       objectFit:
//                         "cover",
//                       borderRadius: 8,
//                     }}
//                   />
//                 )}

//               {signEditOrAdd ===
//                 "edit" &&
//                 selectedImage && (
//                   <img
//                     src={
//                       selectedImage
//                     }
//                     alt="New product"
//                     style={{
//                       width: 150,
//                       height: 150,
//                       objectFit:
//                         "cover",
//                       borderRadius: 8,
//                     }}
//                   />
//                 )}
// console.log(
//   "MAIN IMAGE ID:",
//   selectedProduct?.mainImage
// );

// console.log(
//   "MAIN IMAGE URL:",
//   selectedProduct?.mainImage
//     ? getProductImageUrl(selectedProduct.mainImage)
//     : ""
// );
//               {signEditOrAdd ===
//                 "edit" &&
//                 selectedProduct &&
//                 !selectedImage && (
//                   <img
//                 src={getProductImageUrl(selectedProduct.mainImage)}
//                     alt={
//                       selectedProduct.name
//                     }
//                     style={{
//                       width: 150,
//                       height: 150,
//                       objectFit:
//                         "cover",
//                       borderRadius: 8,
//                     }}
//                   />
//                 )}
//             </Box>

//             {signEditOrAdd ===
//               "add" &&
//               errors.mainImage && (
//                 <Typography
//                   color="error"
//                   sx={{
//                     mt: 1,
//                   }}
//                 >
//                   {
//                     errors
//                       .mainImage
//                       .message
//                   }
//                 </Typography>
//               )}
//           </Box>

//           {/* =================================================
//               GALLERY
//           ================================================= */}

//           <Box
//             sx={{
//               mt: 3,
//               p: 2,
//               border:
//                 "1px solid #ddd",
//               borderRadius: 2,
//             }}
//           >
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//               }}
//             >
//               Product Gallery
//             </Typography>

//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 mb: 2,
//               }}
//             >
//               Upload additional images
//               and select which product
//               color each image belongs to.
//             </Typography>

//             <Button
//               component="label"
//               variant="outlined"
//               startIcon={
//                 <CloudUploadIcon />
//               }
//               disabled={
//                 colors.length ===
//                 0
//               }
//             >
//               Upload Gallery Images

//               <VisuallyHiddenInput
//                 type="file"
//                 multiple
//                 accept="image/jpeg,image/png,image/webp,image/jpg"
//                 onChange={
//                   handleGalleryUpload
//                 }
//               />
//             </Button>

//             {colors.length ===
//               0 && (
//               <Typography
//                 variant="caption"
//                 color="error"
//                 sx={{
//                   display:
//                     "block",
//                   mt: 1,
//                 }}
//               >
//                 First select at least
//                 one product color.
//               </Typography>
//             )}

//             {galleryImages.length >
//               0 && (
//               <Box
//                 sx={{
//                   mt: 2,
//                   display:
//                     "flex",
//                   flexDirection:
//                     "column",
//                   gap: 2,
//                 }}
//               >
//                 {galleryImages.map(
//                   (image) => (
//                     <Box
//                       key={
//                         image.id
//                       }
//                       sx={{
//                         display:
//                           "flex",
//                         flexDirection:
//                           {
//                             xs: "column",
//                             sm: "row",
//                           },
//                         gap: 2,
//                         p: 1.5,
//                         border:
//                           "1px solid #ddd",
//                         borderRadius: 2,
//                       }}
//                     >
//                       <img
//                         src={
//                           image.preview
//                         }
//                         alt="Gallery"
//                         style={{
//                           width: 120,
//                           height: 120,
//                           objectFit:
//                             "cover",
//                           borderRadius:
//                             8,
//                           alignSelf:
//                             "flex-start",
//                         }}
//                       />

//                       <Box
//                         sx={{
//                           flex: 1,
//                           display:
//                             "flex",
//                           flexDirection:
//                             "column",
//                           gap: 1,
//                         }}
//                       >
//                         <FormControl
//                           fullWidth
//                           size="small"
//                           error={
//                             !image.colorId
//                           }
//                         >
//                           <InputLabel>
//                             Image Color
//                           </InputLabel>

//                           <Select
//                             value={
//                               image.colorId
//                             }
//                             label="Image Color"
//                             onChange={(
//                               event,
//                             ) =>
//                               handleGalleryColorChange(
//                                 image.id,
//                                 event
//                                   .target
//                                   .value,
//                               )
//                             }
//                           >
//                             <MenuItem value="">
//                               Select color
//                             </MenuItem>

//                             {colors.map(
//                               (
//                                 colorId,
//                               ) => {
//                                 const color =
//                                   productColors.find(
//                                     (
//                                       item,
//                                     ) =>
//                                       item.id ===
//                                       colorId,
//                                   );

//                                 if (
//                                   !color
//                                 ) {
//                                   return null;
//                                 }

//                                 return (
//                                   <MenuItem
//                                     key={
//                                       color.id
//                                     }
//                                     value={
//                                       color.id
//                                     }
//                                   >
//                                     <Box
//                                       sx={{
//                                         display:
//                                           "flex",
//                                         alignItems:
//                                           "center",
//                                         gap: 1,
//                                       }}
//                                     >
//                                       <Box
//                                         sx={{
//                                           width: 18,
//                                           height: 18,
//                                           borderRadius:
//                                             "50%",
//                                           backgroundColor:
//                                             color.hexCode,
//                                           border:
//                                             "1px solid #999",
//                                         }}
//                                       />

//                                       <span>
//                                         {
//                                           color.name
//                                         }
//                                       </span>

//                                       <Typography
//                                         variant="caption"
//                                         color="text.secondary"
//                                       >
//                                         {
//                                           color.hexCode
//                                         }
//                                       </Typography>
//                                     </Box>
//                                   </MenuItem>
//                                 );
//                               },
//                             )}
//                           </Select>

//                           {!image.colorId && (
//                             <Typography
//                               color="error"
//                               variant="caption"
//                               sx={{
//                                 mt: 0.5,
//                               }}
//                             >
//                               Select a color
//                               for this image.
//                             </Typography>
//                           )}
//                         </FormControl>

//                         <Button
//                           color="error"
//                           variant="outlined"
//                           startIcon={
//                             <DeleteIcon />
//                           }
//                           onClick={() =>
//                             handleDeleteGalleryImage(
//                               image.id,
//                             )
//                           }
//                         >
//                           Remove
//                         </Button>

//                         {image.existing && (
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                           >
//                             Existing image
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>
//                   ),
//                 )}
//               </Box>
//             )}
//           </Box>

//           {/* =================================================
//               STATUS
//           ================================================= */}

//           <Box
//             sx={{
//               mt: 2,
//               mb: 1,
//               display:
//                 "flex",
//               flexDirection:
//                 "column",
//             }}
//           >
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={
//                     isFeatured
//                   }
//                   onChange={(
//                     event,
//                   ) =>
//                     setValue(
//                       "isFeatured",
//                       event.target
//                         .checked,
//                       {
//                         shouldDirty:
//                           true,
//                         shouldValidate:
//                           true,
//                       },
//                     )
//                   }
//                 />
//               }
//               label="Featured Product"
//             />

//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={
//                     isBestSeller
//                   }
//                   onChange={(
//                     event,
//                   ) =>
//                     setValue(
//                       "isBestSeller",
//                       event.target
//                         .checked,
//                       {
//                         shouldDirty:
//                           true,
//                         shouldValidate:
//                           true,
//                       },
//                     )
//                   }
//                 />
//               }
//               label="Best Seller"
//             />
//           </Box>

//           {/* =================================================
//               SUBMIT
//           ================================================= */}

//           <Button
//             type="submit"
//             sx={{
//               margin:
//                 "10px 0px",
//             }}
//             variant="contained"
//             fullWidth
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

import * as React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  InputLabel,
  MenuItem,
  TextField,
  Checkbox,
  FormControl,
  Select,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";

import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import useBrandsQuery from "../hooks/useBrandsQuery";

import useCategoriesQuery, {
  type ICategoryType,
} from "@/features/category/hooks/useCategoriesQuery";

import useCategoryAttributesQuery from "../hooks/useCategoryAttributesQuery";

import useCreateProducts from "../hooks/useCreateProducts";
import useUpdateProducts from "../hooks/useUpdateProducts";

import type {
  ProductSchemaInputType,
  ProductSchemaType,
} from "../productsSchema/productSchema";
import { productSchema } from "../productsSchema/productSchema";

import type {
  IProductType,
  IProductColor,
  IProductAttribute,
} from "@/apis/productsApi";

import type { ICategoryAttribute } from "@/apis/categoryAttributesApi";
import { getProductImageUrl } from "@/constants/api";

// =====================================================
// PRODUCT COLORS
// =====================================================

const PRODUCT_COLORS = [
  {
    id: "black",
    name: "Black",
    hexCode: "#000000",
  },
  {
    id: "white",
    name: "White",
    hexCode: "#FFFFFF",
  },
  {
    id: "red",
    name: "Red",
    hexCode: "#F44336",
  },
  {
    id: "blue",
    name: "Blue",
    hexCode: "#2196F3",
  },
  {
    id: "green",
    name: "Green",
    hexCode: "#4CAF50",
  },
  {
    id: "yellow",
    name: "Yellow",
    hexCode: "#FFEB3B",
  },
  {
    id: "orange",
    name: "Orange",
    hexCode: "#FF9800",
  },
  {
    id: "purple",
    name: "Purple",
    hexCode: "#9C27B0",
  },
  {
    id: "pink",
    name: "Pink",
    hexCode: "#E91E63",
  },
  {
    id: "gray",
    name: "Gray",
    hexCode: "#9E9E9E",
  },

  // Additional colors
  {
    id: "deep-purple",
    name: "Deep Purple",
    hexCode: "#512DA8",
  },
  {
    id: "gold",
    name: "Gold",
    hexCode: "#D4AF37",
  },
  {
    id: "silver",
    name: "Silver",
    hexCode: "#C0C0C0",
  },
  {
    id: "titanium",
    name: "Titanium",
    hexCode: "#8A8D8F",
  },
  {
    id: "natural-titanium",
    name: "Natural Titanium",
    hexCode: "#A9A9A0",
  },
  {
    id: "desert-titanium",
    name: "Desert Titanium",
    hexCode: "#B7A58A",
  },
  {
    id: "blue-titanium",
    name: "Blue Titanium",
    hexCode: "#4F5965",
  },
  {
    id: "black-titanium",
    name: "Black Titanium",
    hexCode: "#3A3A3C",
  },
  {
    id: "space-gray",
    name: "Space Gray",
    hexCode: "#53565A",
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    hexCode: "#B76E79",
  },
];

// =====================================================
// MODAL STYLE
// =====================================================

const style = {
  position: "absolute" as const,

  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",

  width: {
    xs: "95%",
    sm: 600,
    md: 700,
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

  p: {
    xs: 2,
    sm: 3,
    md: 4,
  },
};

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

const sectionSx = {
  mt: 3,
  p: 2,
  border: "1px solid #e8e8e8",
  borderRadius: "12px",
  backgroundColor: "#fafafa",
};

const sectionTitleSx = {
  fontWeight: 700,
  mb: 1,
  fontFamily: "inherit",
  letterSpacing: "-0.2px",
  color: "#141011",
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

const outlinedBtnSx = {
  borderRadius: "10px",
  border: "1px solid #141011",
  color: "#141011",
  fontFamily: "inherit",
  fontWeight: 600,
  textTransform: "none",
  backgroundColor: "#ffffff",
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
  borderColor: "#d32f2f",
  color: "#d32f2f",
  backgroundColor: "#ffffff",
  "&:hover": {
    borderColor: "#d32f2f",
    backgroundColor: "rgba(211, 47, 47, 0.06)",
  },
};

const switchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#141011" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#141011",
  },
};

const checkboxSx = {
  color: "#9a9a9a",
  "&.Mui-checked": { color: "#141011" },
};

const switchLabelSx = {
  "& .MuiFormControlLabel-label": {
    fontFamily: "inherit",
    fontWeight: 500,
    color: "#141011",
  },
};

// =====================================================
// HIDDEN INPUT
// =====================================================

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

// =====================================================
// TYPES
// =====================================================

interface IProductModalProp {
  open: boolean;

  handleOpen: () => void;

  handleClose: () => void;

  selectedProduct: null | IProductType;

  signEditOrAdd: string | null;

  setSignEditOrAdd: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  selectedImage: string;

  setSelectedImage: React.Dispatch<
    React.SetStateAction<string>
  >;
}

// =====================================================
// GALLERY TYPE
// =====================================================

interface IGalleryImage {
  id: string;
  file?: File;
  preview: string;
  colorId: string;
  existing: boolean;
}

// =====================================================
// COMPONENT
// =====================================================

export default function ProductModal({
  selectedImage,
  setSelectedImage,
  setSignEditOrAdd,
  signEditOrAdd,
  selectedProduct,
  open,
  handleClose,
  handleOpen,
}: IProductModalProp) {
  // ===================================================
  // FORM
  // ===================================================

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,

    formState: {
      errors,
    },
  } = useForm<ProductSchemaInputType, any, ProductSchemaType>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: "",

      shortDescription: "",

      longDescription: "",

      price: undefined,

      quantity: undefined,

      categoryId: "",

      mainImage: "",

      isFeatured: false,

      isBestSeller: false,

      brand: "",

      colors: [],

      attributes: [],
    },
  });

  // ===================================================
  // STATE
  // ===================================================

  const [imageFile, setImageFile] =
    useState<File | string>("");

  const [galleryImages, setGalleryImages] =
    useState<IGalleryImage[]>([]);
    
const [deletedGalleryImageIds, setDeletedGalleryImageIds] =
  useState<string[]>([]);
  // ===================================================
  // MUTATIONS
  // ===================================================

  const createProducts =
    useCreateProducts(handleClose);

  const updateProducts =
    useUpdateProducts(handleClose);

  // ===================================================
  // WATCH
  // ===================================================

  const category = watch("categoryId");

  const brand = watch("brand");

  const colors = watch("colors") ?? [];

  const attributes =
    watch("attributes") ?? [];

  const isFeatured =
    watch("isFeatured");

  const isBestSeller =
    watch("isBestSeller");

  // ===================================================
  // CATEGORIES
  // ===================================================

  const {
    data: categoriesData,
  } = useCategoriesQuery();

  const categories =
    categoriesData?.data?.data ?? [];

  // ===================================================
  // BRANDS
  // ===================================================

  const {
    data: brandsData,
    isLoading: isBrandsLoading,
  } = useBrandsQuery(category);

  const brands = brandsData ?? [];

  // ===================================================
  // CATEGORY ATTRIBUTES
  // ===================================================

  const {
    data: categoryAttributesData,
    isLoading:
      isCategoryAttributesLoading,
  } = useCategoryAttributesQuery(
    category,
  );

  const categoryAttributes: ICategoryAttribute[] =
    categoryAttributesData?.data?.data ?? [];

  // ===================================================
  // COLORS
  // ===================================================

  const productColors = PRODUCT_COLORS;

  // ===================================================
  // HELPERS
  // ===================================================

  const revokeGalleryUrls = (
    images: IGalleryImage[],
  ) => {
    images.forEach((image) => {
      if (
        !image.existing &&
        image.preview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          image.preview,
        );
      }
    });
  };

  const getColorId = (
    color:
      | string
      | IProductColor,
  ): string => {
    if (typeof color === "string") {
      return color;
    }

    return (
      color._id ??
      color.id ??
      ""
    );
  };

  const getGalleryColorId = (
    colorId:
      | string
      | IProductColor,
  ): string => {
    if (typeof colorId === "string") {
      return colorId;
    }

    return (
      colorId._id ??
      colorId.id ??
      ""
    );
  };

  // ===================================================
  // CATEGORY CHANGE
  // ===================================================

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
  ) => {
    const newCategoryId =
      event.target.value;

    setValue(
      "categoryId",
      newCategoryId,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );

    setValue("brand", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("colors", [], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("attributes", [], {
      shouldValidate: true,
      shouldDirty: true,
    });

    revokeGalleryUrls(
      galleryImages,
    );

    setGalleryImages([]);
  };

  // ===================================================
  // BRAND CHANGE
  // ===================================================

  const handleBrandChange = (
    event: SelectChangeEvent<string>,
  ) => {
    const newBrandId =
      event.target.value;

    setValue(
      "brand",
      newBrandId,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );

    setValue("colors", [], {
      shouldValidate: true,
      shouldDirty: true,
    });

    revokeGalleryUrls(
      galleryImages,
    );

    setGalleryImages([]);
  };

  // ===================================================
  // COLOR CHANGE
  // ===================================================

 // ===================================================
// COLOR CHANGE
// ===================================================

const handleColorChange = (
  colorId: string,
  checked: boolean,
) => {
  const currentColors =
    colors ?? [];

  // ================================================
  // ADD COLOR
  // ================================================

  if (checked) {
    if (
      !currentColors.includes(colorId)
    ) {
      setValue(
        "colors",
        [
          ...currentColors,
          colorId,
        ],
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }

    return;
  }

  // ================================================
  // REMOVE COLOR
  // ================================================

  const newColors =
    currentColors.filter(
      (id) => id !== colorId,
    );

  setValue(
    "colors",
    newColors,
    {
      shouldValidate: true,
      shouldDirty: true,
    },
  );

  // عکس‌های مربوط به رنگ حذف‌شده هم حذف شوند
  setGalleryImages(
    (previous) => {
      const removedImages =
        previous.filter(
          (image) =>
            image.colorId === colorId,
        );

      removedImages.forEach(
        (image) => {
          if (
            !image.existing &&
            image.preview.startsWith(
              "blob:",
            )
          ) {
            URL.revokeObjectURL(
              image.preview,
            );
          }
        },
      );

      return previous.filter(
        (image) =>
          image.colorId !==
          colorId,
      );
    },
  );
};

  // ===================================================
  // ATTRIBUTE CHANGE
  // ===================================================

const handleAttributeChange = (
  attributeId: string,
  value: string
) => {
  const currentAttributes = attributes ?? [];

  const existingAttribute = currentAttributes.find(
    (item) => getAttributeId(item) === attributeId
  );

  if (existingAttribute) {
    setValue(
      "attributes",
      currentAttributes.map((item) =>
        getAttributeId(item) === attributeId
          ? { ...item, value }
          : item
      ),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );

    return;
  }

  setValue(
    "attributes",
    [
      ...currentAttributes,
      {
        attributeId,
        value,
      },
    ],
    {
      shouldValidate: true,
      shouldDirty: true,
    }
  );
};
  // ===================================================
  // GET ATTRIBUTE VALUE
  // ===================================================
const getAttributeId = (attribute: IProductAttribute): string => {
  if (typeof attribute.attributeId === "string") {
    return attribute.attributeId;
  }

  return attribute.attributeId?._id ?? "";
};
const getAttributeValue = (attributeId: string) => {
  const attribute = attributes.find(
    (item) => getAttributeId(item) === attributeId
  );

  return attribute?.value ?? "";
};

  // ===================================================
  // MAIN IMAGE
  // ===================================================

  const handleSetImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      selectedImage &&
      selectedImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        selectedImage,
      );
    }

    const objectUrl =
      URL.createObjectURL(file);

    setSelectedImage(objectUrl);

    setImageFile(file);

    setValue(
      "mainImage",
      objectUrl,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );

    event.target.value = "";
  };

  // ===================================================
  // GALLERY UPLOAD
  // ===================================================

// ===================================================
// GALLERY UPLOAD
// ===================================================

const handleGalleryUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const files = Array.from(
    event.target.files ?? [],
  );

  if (files.length === 0) {
    return;
  }

  // آخرین رنگ انتخاب‌شده
  // یعنی اگر کاربر رنگ دوم را انتخاب کرده باشد،
  // عکس جدید به رنگ دوم اختصاص داده می‌شود.
  const selectedGalleryColorId =
    colors[colors.length - 1] ?? "";

  // نباید بدون رنگ عکس اضافه شود
  if (!selectedGalleryColorId) {
    console.error(
      "Please select at least one product color first.",
    );

    event.target.value = "";
    return;
  }

  const newImages: IGalleryImage[] =
    files.map((file) => ({
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}`,

      file,

      preview: URL.createObjectURL(file),

      // مهم:
      // عکس به آخرین رنگ انتخاب‌شده متصل می‌شود
      colorId: selectedGalleryColorId,

      existing: false,
    }));

  setGalleryImages(
    (previous) => [
      ...previous,
      ...newImages,
    ],
  );

  event.target.value = "";
};
  // ===================================================
  // GALLERY COLOR CHANGE
  // ===================================================

  const handleGalleryColorChange = (
    imageId: string,
    colorId: string,
  ) => {
    setGalleryImages(
      (previous) =>
        previous.map(
          (image) =>
            image.id === imageId
              ? {
                  ...image,
                  colorId,
                }
              : image,
        ),
    );
  };

  // ===================================================
  // DELETE GALLERY IMAGE
  // ===================================================

const handleDeleteGalleryImage = (
  imageId: string,
) => {
  setGalleryImages((previous) => {
    const image = previous.find(
      (item) => item.id === imageId
    );

    if (!image) {
      return previous;
    }

    // اگر عکس از قبل در database بوده
    if (image.existing) {
      setDeletedGalleryImageIds((previousDeleted) => {
        if (previousDeleted.includes(imageId)) {
          return previousDeleted;
        }

        return [...previousDeleted, imageId];
      });
    }

    // اگر عکس جدید بوده، فقط blob را آزاد کن
    if (
      !image.existing &&
      image.preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(image.preview);
    }

    return previous.filter(
      (item) => item.id !== imageId
    );
  });
};

  // ===================================================
  // SUBMIT
  // ===================================================

  const onSubmit: SubmitHandler<
    ProductSchemaType
  > = (data) => {
    
    // =================================================
    // BRAND
    // =================================================

    if (!data.brand) {
      console.error(
        "Brand is required",
      );

      return;
    }

    // =================================================
    // COLORS
    // =================================================

    if (
      !data.colors ||
      data.colors.length === 0
    ) {
      console.error(
        "At least one color is required",
      );

      return;
    }

    // =================================================
    // MAIN COLOR
    // =================================================

    const mainImageColorId =
      data.colors[0];

    // =================================================
    // GALLERY VALIDATION
    // =================================================

    const galleryWithoutColor =
      galleryImages.filter(
        (image) =>
          !image.colorId,
      );

    if (
      galleryWithoutColor.length >
      0
    ) {
      console.error(
        "Every gallery image must have a color",
      );

      return;
    }

    // =================================================
    // ATTRIBUTES
    // =================================================

    const productAttributes =
      (
        data.attributes ?? []
      )
        .filter(
          (attribute) =>
            attribute.attributeId &&
            attribute.value
              .trim() !== "",
        )
        .map((attribute) => {
          const attributeId = attribute.attributeId as
            | string
            | { _id: string };

          return {
            attributeId:
              typeof attributeId === "string"
                ? attributeId
                : attributeId._id,
            value: attribute.value.trim(),
          };
        });

    // =================================================
    // FORM DATA
    // =================================================

    const formData =
      new FormData();

    // =================================================
    // BASIC
    // =================================================

    formData.append(
      "name",
      data.name,
    );

    formData.append(
      "shortDescription",
      data.shortDescription,
    );

    formData.append(
      "longDescription",
      data.longDescription,
    );

    formData.append(
      "price",
      String(data.price),
    );

    formData.append(
      "quantity",
      String(data.quantity),
    );

    // =================================================
    // CATEGORY
    // =================================================

    formData.append(
      "categoryId",
      data.categoryId,
    );

    // =================================================
    // BRAND
    // =================================================

    formData.append(
      "brand",
      data.brand,
    );

    // =================================================
    // STATUS
    // =================================================

    formData.append(
      "isFeatured",
      String(
        data.isFeatured,
      ),
    );

    formData.append(
      "isBestSeller",
      String(
        data.isBestSeller,
      ),
    );

    // =================================================
    // COLORS
    // =================================================

    formData.append(
      "colors",
      JSON.stringify(
        data.colors ?? [],
      ),
    );

    // =================================================
    // MAIN IMAGE COLOR
    // =================================================

    formData.append(
      "mainImageColorId",
      mainImageColorId,
    );

    // =================================================
    // MAIN IMAGE
    // =================================================

    if (
      imageFile instanceof File
    ) {
      formData.append(
        "mainImage",
        imageFile,
      );
    }

    // =================================================
    // ATTRIBUTES
    // =================================================

    formData.append(
      "attributes",
      JSON.stringify(
        productAttributes,
      ),
    );

    // =================================================
    // GALLERY METADATA
    // =================================================

  // =================================================
// GALLERY
// =================================================

// عکس‌های جدید

const newGalleryImages = galleryImages.filter(
  (image) =>
    !image.existing &&
    image.file
);

// metadata فقط برای عکس‌های جدید
const galleryMetadata = newGalleryImages.map(
  (image, index) => ({
    index,
    colorId: image.colorId,
  })
);

// عکس‌های موجود که هنوز نگه داشته شده‌اند
const existingGalleryMetadata = galleryImages
  .filter((image) => image.existing)
  .map((image) => ({
    id: image.id,
    colorId: image.colorId,
  }));

// عکس‌های جدید
formData.append(
  "gallery",
  JSON.stringify(galleryMetadata)
);

// عکس‌های موجود
formData.append(
  "existingGallery",
  JSON.stringify(existingGalleryMetadata)
);

// عکس‌های حذف‌شده
formData.append(
  "deletedGalleryImageIds",
  JSON.stringify(deletedGalleryImageIds)
);

// فایل‌های جدید
newGalleryImages.forEach((image) => {
  if (image.file) {
    formData.append(
      "galleryImages",
      image.file
    );
  }
});

 

    // =================================================
    // DEBUG
    // =================================================

    console.log(
      "========== PRODUCT SUBMIT ==========",
    );

    console.log(
      "PRODUCT DATA:",
      data,
    );

    console.log(
      "COLORS:",
      data.colors,
    );

    console.log(
      "MAIN COLOR:",
      mainImageColorId,
    );

    console.log(
      "ATTRIBUTES:",
      productAttributes,
    );

    console.log(
      "GALLERY:",
      galleryMetadata,
    );

    console.log(
      "========== FORMDATA ==========",
    );

    for (
      const [
        key,
        value,
      ] of formData.entries()
    ) {
      console.log(
        key,
        value,
      );
    }

    // =================================================
    // EDIT
    // =================================================

    if (
      signEditOrAdd === "edit" &&
      selectedProduct?._id
    ) {
      updateProducts.mutate({
        id: selectedProduct._id,
        formData,
      });

      return;
    }

    // =================================================
    // CREATE
    // =================================================

    if (
      signEditOrAdd === "add"
    ) {
      createProducts.mutate(
        formData,
      );
    }
  };

  // ===================================================
  // EDIT PRODUCT
  // ===================================================

  useEffect(() => {
    if (
      signEditOrAdd !== "edit" ||
      !selectedProduct
    ) {
      return;
    }

    // =================================================
    // BASIC
    // =================================================

    setValue(
      "name",
      selectedProduct.name,
    );

    setValue(
      "shortDescription",
      selectedProduct.shortDescription,
    );

    setValue(
      "longDescription",
      selectedProduct.longDescription,
    );

    setValue(
      "price",
      selectedProduct.price,
    );

    setValue(
      "quantity",
      selectedProduct.quantity,
    );

    setValue(
      "categoryId",
      selectedProduct.categoryId?._id ??
        "",
    );

    setValue(
      "brand",
      selectedProduct.brand?._id ??
        "",
    );

    setValue(
      "mainImage",
      selectedProduct.mainImage,
    );

    setValue(
      "isFeatured",
      selectedProduct.isFeatured ??
        false,
    );

    setValue(
      "isBestSeller",
      selectedProduct.isBestSeller ??
        false,
    );

    // =================================================
    // COLORS
    // =================================================

    const existingColors =
      selectedProduct.colors ??
      [];

    const existingColorIds =
      existingColors
        .map(getColorId)
        .filter(Boolean);

    setValue(
      "colors",
      existingColorIds,
      {
        shouldValidate: true,
        shouldDirty: false,
      },
    );

    // =================================================
    // ATTRIBUTES
    // =================================================

    const existingAttributes =
      selectedProduct.attributes ??
      [];

    const normalizedAttributes =
      existingAttributes
        .map(
          (attribute) => {
            const attributeId =
              typeof attribute.attributeId ===
              "string"
                ? attribute.attributeId
                : attribute
                    .attributeId
                    ?._id;

            return {
              attributeId:
                attributeId ??
                "",

              value:
                String(
                  attribute.value ??
                    "",
                ),
            };
          },
        )
        .filter(
          (attribute) =>
            Boolean(
              attribute.attributeId,
            ),
        );

    setValue(
      "attributes",
      normalizedAttributes,
      {
        shouldValidate: true,
        shouldDirty: false,
      },
    );

    // =================================================
    // RESET NEW MAIN IMAGE
    // =================================================

    setImageFile("");

    // =================================================
    // MAIN IMAGE PREVIEW
    // =================================================

    setSelectedImage("");

    // =================================================
    // EXISTING GALLERY
    // =================================================

    revokeGalleryUrls(
      galleryImages,
    );

    const existingGallery =
      selectedProduct.images ??
      [];

  const normalizedGallery: IGalleryImage[] =
  existingGallery
    .filter((image) => image._id)
    .map((image) => ({
      id: image._id!,
      preview: getProductImageUrl(image.url),
      colorId: getGalleryColorId(image.colorId),
      existing: true,
    }));

setGalleryImages(normalizedGallery);

// خیلی مهم
setDeletedGalleryImageIds([]);

    setGalleryImages(
      normalizedGallery,
    );
  }, [
    signEditOrAdd,
    selectedProduct,
    setValue,
    setSelectedImage,
  ]);

  // ===================================================
  // RESET ADD PRODUCT
  // ===================================================

  useEffect(() => {
    if (
      signEditOrAdd !== "add"
    ) {
      return;
    }

    revokeGalleryUrls(
      galleryImages,
    );

    reset({
      name: "",

      shortDescription: "",

      longDescription: "",

      price: undefined,

      quantity: undefined,

      categoryId: "",

      mainImage: "",

      isFeatured: false,

      isBestSeller: false,

      brand: "",

      colors: [],

      attributes: [],
    });

    setImageFile("");

    setGalleryImages([]);

    setSelectedImage("");
  }, [
    signEditOrAdd,
    reset,
    setSelectedImage,
  ]);

  // ===================================================
  // ADD PRODUCT
  // ===================================================

  const handleAddProduct = () => {
    setSignEditOrAdd("add");

    if (
      selectedImage &&
      selectedImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        selectedImage,
      );
    }

    setSelectedImage("");

    setImageFile("");

    revokeGalleryUrls(
      galleryImages,
    );

    setGalleryImages([]);

    reset({
      name: "",

      shortDescription: "",

      longDescription: "",

      price: undefined,

      quantity: undefined,

      categoryId: "",

      mainImage: "",

      isFeatured: false,

      isBestSeller: false,

      brand: "",

      colors: [],

      attributes: [],
    });

    handleOpen();
  };

  // ===================================================
  // CLEANUP
  // ===================================================

  useEffect(() => {
    return () => {
      if (
        selectedImage &&
        selectedImage.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          selectedImage,
        );
      }

      revokeGalleryUrls(
        galleryImages,
      );
    };
  }, []);

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div>
      {/* =================================================
          ADD PRODUCT BUTTON
      ================================================= */}

      <Button
        variant="contained"
        sx={{
          margin: "15px 5px",
          ...primaryBtnSx,
          px: 3,
          py: 1.25,
        }}
        onClick={
          handleAddProduct
        }
      >
        Add Product
      </Button>

      {/* =================================================
          MODAL
      ================================================= */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="product-modal-title"
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
          onSubmit={handleSubmit(
            onSubmit,
          )}
        >
          {/* =================================================
              TITLE
          ================================================= */}

          <Typography
            sx={{
              marginBottom: "20px",
              fontWeight: 700,
              fontFamily: "inherit",
              letterSpacing: "-0.5px",
              color: "#141011",
            }}
            id="product-modal-title"
            variant="h6"
            component="h2"
          >
            Product
          </Typography>

          {/* =================================================
              BASIC FIELDS
          ================================================= */}

          <Grid
            container
            spacing={2}
          >
            {/* NAME */}

            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                {...register(
                  "name",
                )}
                error={
                  !!errors.name
                }
                helperText={
                  errors.name
                    ?.message
                }
                label="Name"
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* SHORT DESCRIPTION */}

            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                {...register(
                  "shortDescription",
                )}
                error={
                  !!errors.shortDescription
                }
                helperText={
                  errors
                    .shortDescription
                    ?.message
                }
                label="Short Description"
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* PRICE */}

            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                {...register(
                  "price",
                  {
                    setValueAs:
                      (
                        value,
                      ) =>
                        value ===
                        ""
                          ? undefined
                          : Number(
                              value,
                            ),
                  },
                )}
                error={
                  !!errors.price
                }
                helperText={
                  errors.price
                    ?.message
                }
                label="Price"
                type="number"
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* QUANTITY */}

            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                {...register(
                  "quantity",
                  {
                    setValueAs:
                      (
                        value,
                      ) =>
                        value ===
                        ""
                          ? undefined
                          : Number(
                              value,
                            ),
                  },
                )}
                error={
                  !!errors.quantity
                }
                helperText={
                  errors.quantity
                    ?.message
                }
                label="Quantity"
                type="number"
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* LONG DESCRIPTION */}

            <Grid size={12}>
              <TextField
                {...register(
                  "longDescription",
                )}
                error={
                  !!errors.longDescription
                }
                helperText={
                  errors
                    .longDescription
                    ?.message
                }
                label="Long Description"
                multiline
                minRows={4}
                fullWidth
                sx={fieldSx}
              />
            </Grid>
          </Grid>

          {/* =================================================
              CATEGORY
          ================================================= */}

          <FormControl
            fullWidth
            sx={{
              mt: 2,
              ...fieldSx,
            }}
            error={
              !!errors.categoryId
            }
          >
            <InputLabel id="product-category-label">
              Category
            </InputLabel>

            <Select
              labelId="product-category-label"
              value={
                category
              }
              label="Category"
              onChange={
                handleCategoryChange
              }
              MenuProps={{ slotProps: { paper: { sx: menuPaperSx } } }}
            >
              <MenuItem value="">
                Select Category
              </MenuItem>

              {categories.map(
                (
                  categoryItem: ICategoryType,
                  index: number,
                ) => (
                  <MenuItem
                    key={
                      categoryItem._id ??
                      index
                    }
                    value={
                      categoryItem._id
                    }
                  >
                    {
                      categoryItem.name
                    }
                  </MenuItem>
                ),
              )}
            </Select>

            {errors.categoryId && (
              <Typography
                color="error"
                sx={{
                  mt: 1,
                  fontSize: 13,
                  fontFamily: "inherit",
                }}
              >
                {
                  errors
                    .categoryId
                    .message
                }
              </Typography>
            )}
          </FormControl>

          {/* =================================================
              CATEGORY ATTRIBUTES
          ================================================= */}

          {category && (
            <Box
              sx={sectionSx}
            >
              <Typography
                variant="subtitle1"
                sx={sectionTitleSx}
              >
                Specific Attributes
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontFamily: "inherit",
                }}
              >
                Enter the specifications
                for this product.
              </Typography>

              {isCategoryAttributesLoading && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Loading attributes...
                </Typography>
              )}

              {!isCategoryAttributesLoading &&
                categoryAttributes.length ===
                  0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    No specific attributes
                    have been configured
                    for this category.
                  </Typography>
                )}

              {!isCategoryAttributesLoading &&
                categoryAttributes.length >
                  0 && (
                  <Box
                    sx={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        {
                          xs: "1fr",
                          sm: "1fr 1fr",
                        },

                      gap: 2,
                    }}
                  >
                    {categoryAttributes
                      .slice()
                      .sort(
                        (
                          a,
                          b,
                        ) =>
                          a.order -
                          b.order,
                      )
                      .slice(
                        0,
                        7,
                      )
                      .map(
                        (
                          attribute,
                        ) => {
                          const value =
                            getAttributeValue(
                              attribute._id,
                            );

                          if (
                            attribute.type ===
                            "text"
                          ) {
                            return (
                              <TextField
                                key={
                                  attribute._id
                                }
                                label={
                                  attribute.name
                                }
                                value={
                                  value
                                }
                                onChange={(
                                  event,
                                ) =>
                                  handleAttributeChange(
                                    attribute._id,
                                    event
                                      .target
                                      .value,
                                  )
                                }
                                fullWidth
                                helperText={
                                  attribute.key
                                }
                                sx={fieldSx}
                              />
                            );
                          }

                          if (
                            attribute.type ===
                            "number"
                          ) {
                            return (
                              <TextField
                                key={
                                  attribute._id
                                }
                                label={
                                  attribute.name
                                }
                                type="number"
                                value={
                                  value
                                }
                                onChange={(
                                  event,
                                ) =>
                                  handleAttributeChange(
                                    attribute._id,
                                    event
                                      .target
                                      .value,
                                  )
                                }
                                fullWidth
                                helperText={
                                  attribute.key
                                }
                                sx={fieldSx}
                              />
                            );
                          }

                          if (
                            attribute.type ===
                            "select"
                          ) {
                            return (
                              <FormControl
                                key={
                                  attribute._id
                                }
                                fullWidth
                                sx={fieldSx}
                              >
                                <InputLabel>
                                  {
                                    attribute.name
                                  }
                                </InputLabel>

                                <Select
                                  value={
                                    value
                                  }
                                  label={
                                    attribute.name
                                  }
                                  onChange={(
                                    event,
                                  ) =>
                                    handleAttributeChange(
                                      attribute._id,
                                      event
                                        .target
                                        .value,
                                    )
                                  }
                                  MenuProps={{ slotProps: { paper: { sx: menuPaperSx } } }}
                                >
                                  <MenuItem value="">
                                    Select{" "}
                                    {
                                      attribute.name
                                    }
                                  </MenuItem>

                                  {(
                                    attribute.options ??
                                    []
                                  ).map(
                                    (
                                      option,
                                    ) => (
                                      <MenuItem
                                        key={
                                          option
                                        }
                                        value={
                                          option
                                        }
                                      >
                                        {
                                          option
                                        }
                                      </MenuItem>
                                    ),
                                  )}
                                </Select>
                              </FormControl>
                            );
                          }

                          if (
                            attribute.type ===
                            "boolean"
                          ) {
                            return (
                              <Box
                                key={
                                  attribute._id
                                }
                                sx={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  border:
                                    "1px solid #141011",
                                  borderRadius:
                                    "10px",
                                  backgroundColor:
                                    "#ffffff",
                                  px: 1,
                                  minHeight:
                                    56,
                                }}
                              >
                                <FormControlLabel
                                  sx={switchLabelSx}
                                  control={
                                    <Switch
                                      sx={switchSx}
                                      checked={
                                        value ===
                                        "true"
                                      }
                                      onChange={(
                                        event,
                                      ) =>
                                        handleAttributeChange(
                                          attribute._id,
                                          String(
                                            event
                                              .target
                                              .checked,
                                          ),
                                        )
                                      }
                                    />
                                  }
                                  label={
                                    attribute.name
                                  }
                                />
                              </Box>
                            );
                          }

                          return null;
                        },
                      )}
                  </Box>
                )}
            </Box>
          )}

          {/* =================================================
              BRAND
          ================================================= */}

          <FormControl
            fullWidth
            sx={{
              mt: 2,
              ...fieldSx,
            }}
            disabled={
              !category ||
              isBrandsLoading
            }
            error={
              !!errors.brand
            }
          >
            <InputLabel id="product-brand-label">
              Brand
            </InputLabel>

            <Select
              labelId="product-brand-label"
              value={brand}
              label="Brand"
              onChange={
                handleBrandChange
              }
              MenuProps={{ slotProps: { paper: { sx: menuPaperSx } } }}
            >
              {!category && (
                <MenuItem value="">
                  First select category
                </MenuItem>
              )}

              {category &&
                isBrandsLoading && (
                  <MenuItem value="">
                    Loading brands...
                  </MenuItem>
                )}

              {category &&
                !isBrandsLoading &&
                brands.length ===
                  0 && (
                  <MenuItem value="">
                    No brands found
                  </MenuItem>
                )}

              {brands.map(
                (
                  brandItem,
                ) => (
                  <MenuItem
                    key={
                      brandItem._id
                    }
                    value={
                      brandItem._id
                    }
                  >
                    {
                      brandItem.name
                    }
                  </MenuItem>
                ),
              )}
            </Select>

            {errors.brand && (
              <Typography
                color="error"
                sx={{
                  mt: 1,
                  fontSize: 13,
                  fontFamily: "inherit",
                }}
              >
                {
                  errors.brand
                    .message
                }
              </Typography>
            )}
          </FormControl>

          {/* =================================================
              COLORS
          ================================================= */}

          <Box
            sx={sectionSx}
          >
            <Typography
              variant="subtitle1"
              sx={sectionTitleSx}
            >
              Product Colors
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontFamily: "inherit",
              }}
            >
              Select one or more colors.
              The first selected color will
              be the main color.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                gap: 1,
              }}
            >
              {productColors.map(
                (color) => {
                  const checked =
                    colors.includes(
                      color.id,
                    );

                  const colorIndex =
                    colors.indexOf(
                      color.id,
                    );

                  return (
                    <Box
                      key={
                        color.id
                      }
                      sx={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        border:
                          checked
                            ? "2px solid"
                            : "1px solid #e0e0e0",
                        borderColor:
                          checked
                            ? "#141011"
                            : "#e0e0e0",
                        backgroundColor:
                          checked
                            ? "rgba(20, 16, 17, 0.04)"
                            : "#ffffff",
                        borderRadius: "10px",
                        transition:
                          "all 0.2s ease",
                        "&:hover": {
                          borderColor:
                            "#141011",
                        },
                        px: 1,
                        py: 1,
                        cursor:
                          "pointer",
                      }}
                      onClick={() =>
                        handleColorChange(
                          color.id,
                          !checked,
                        )
                      }
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius:
                            "50%",
                          backgroundColor:
                            color.hexCode,
                          border:
                            color.id ===
                            "white"
                              ? "1px solid #999"
                              : "1px solid transparent",
                          mr: 1,
                          flexShrink: 0,
                        }}
                      />

                      <Checkbox
                        sx={checkboxSx}
                        checked={
                          checked
                        }
                        onChange={(
                          event,
                        ) =>
                          handleColorChange(
                            color.id,
                            event
                              .target
                              .checked,
                          )
                        }
                        onClick={(
                          event,
                        ) =>
                          event.stopPropagation()
                        }
                      />

                      <Box
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          variant="body2"
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
                            color.name
                          }
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {
                            color.hexCode
                          }
                        </Typography>
                      </Box>

                      {checked &&
                        colorIndex ===
                          0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              ml: "auto",
                              px: 1,
                              py: 0.5,
                              borderRadius:
                                "6px",
                              bgcolor:
                                "#141011",
                              color:
                                "white",
                              fontWeight:
                                600,
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            Main
                          </Typography>
                        )}
                    </Box>
                  );
                },
              )}
            </Box>

            {colors.length >
              0 && (
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  bgcolor:
                    "rgba(20, 16, 17, 0.04)",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontFamily:
                      "inherit",
                    color: "#141011",
                  }}
                >
                  Selected colors:
                </Typography>

                {colors.map(
                  (
                    colorId,
                    index,
                  ) => {
                    const color =
                      productColors.find(
                        (
                          item,
                        ) =>
                          item.id ===
                          colorId,
                      );

                    return (
                      <Box
                        key={
                          colorId
                        }
                        sx={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius:
                              "50%",
                            backgroundColor:
                              color?.hexCode,
                            border:
                              "1px solid #999",
                          }}
                        />

                        <Typography
                          variant="body2"
                        >
                          {index +
                            1}
                          .{" "}
                          {
                            color?.name ??
                            colorId
                          }

                          {index ===
                            0 && (
                            <strong>
                              {" "}
                              — Main
                              Color
                            </strong>
                          )}
                        </Typography>
                      </Box>
                    );
                  },
                )}
              </Box>
            )}

            {errors.colors && (
              <Typography
                color="error"
                sx={{
                  mt: 1,
                  fontSize: 13,
                  fontFamily: "inherit",
                }}
              >
                {
                  errors.colors
                    .message
                }
              </Typography>
            )}
          </Box>

          {/* =================================================
              MAIN IMAGE
          ================================================= */}

          <Box
            sx={sectionSx}
          >
            <Typography
              variant="subtitle1"
              sx={sectionTitleSx}
            >
              Main Product Image
            </Typography>

            {colors.length >
              0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  fontFamily: "inherit",
                }}
              >
                This image belongs to
                the first selected color:
                <strong>
                  {" "}
                  {
                    productColors.find(
                      (
                        color,
                      ) =>
                        color.id ===
                        colors[0],
                    )?.name
                  }
                </strong>
              </Typography>
            )}

            <Button
              component="label"
              variant="contained"
              color="warning"
              startIcon={
                <CloudUploadIcon />
              }
              sx={{
                ...primaryBtnSx,
                fontSize: "0.95rem",
                px: 2.5,
                py: 1,
              }}
            >
              Upload Main Image

              <VisuallyHiddenInput
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={
                  handleSetImage
                }
              />
            </Button>

            <Box
              sx={{
                mt: 2,
              }}
            >
              {signEditOrAdd ===
                "add" &&
                selectedImage && (
                  <img
                    src={
                      selectedImage
                    }
                    alt="Selected product"
                    style={{
                      width: 150,
                      height: 150,
                      objectFit:
                        "cover",
                      borderRadius: 12,
                      border:
                        "1px solid #e8e8e8",
                    }}
                  />
                )}

              {signEditOrAdd ===
                "edit" &&
                selectedImage && (
                  <img
                    src={
                      selectedImage
                    }
                    alt="New product"
                    style={{
                      width: 150,
                      height: 150,
                      objectFit:
                        "cover",
                      borderRadius: 12,
                      border:
                        "1px solid #e8e8e8",
                    }}
                  />
                )}
console.log(
  "MAIN IMAGE ID:",
  selectedProduct?.mainImage
);

console.log(
  "MAIN IMAGE URL:",
  selectedProduct?.mainImage
    ? getProductImageUrl(selectedProduct.mainImage)
    : ""
);
              {signEditOrAdd ===
                "edit" &&
                selectedProduct &&
                !selectedImage && (
                  <img
                src={getProductImageUrl(selectedProduct.mainImage)}
                    alt={
                      selectedProduct.name
                    }
                    style={{
                      width: 150,
                      height: 150,
                      objectFit:
                        "cover",
                      borderRadius: 12,
                      border:
                        "1px solid #e8e8e8",
                    }}
                  />
                )}
            </Box>

            {signEditOrAdd ===
              "add" &&
              errors.mainImage && (
                <Typography
                  color="error"
                  sx={{
                    mt: 1,
                    fontFamily: "inherit",
                  }}
                >
                  {
                    errors
                      .mainImage
                      .message
                  }
                </Typography>
              )}
          </Box>

          {/* =================================================
              GALLERY
          ================================================= */}

          <Box
            sx={sectionSx}
          >
            <Typography
              variant="subtitle1"
              sx={sectionTitleSx}
            >
              Product Gallery
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontFamily: "inherit",
              }}
            >
              Upload additional images
              and select which product
              color each image belongs to.
            </Typography>

            <Button
              component="label"
              variant="outlined"
              startIcon={
                <CloudUploadIcon />
              }
              disabled={
                colors.length ===
                0
              }
              sx={{
                ...outlinedBtnSx,
                px: 2.5,
                py: 1,
              }}
            >
              Upload Gallery Images

              <VisuallyHiddenInput
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={
                  handleGalleryUpload
                }
              />
            </Button>

            {colors.length ===
              0 && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  display:
                    "block",
                  mt: 1,
                }}
              >
                First select at least
                one product color.
              </Typography>
            )}

            {galleryImages.length >
              0 && (
              <Box
                sx={{
                  mt: 2,
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  gap: 2,
                }}
              >
                {galleryImages.map(
                  (image) => (
                    <Box
                      key={
                        image.id
                      }
                      sx={{
                        display:
                          "flex",
                        flexDirection:
                          {
                            xs: "column",
                            sm: "row",
                          },
                        gap: 2,
                        p: 1.5,
                        border:
                          "1px solid #e8e8e8",
                        borderRadius: "12px",
                        backgroundColor:
                          "#ffffff",
                      }}
                    >
                      <img
                        src={
                          image.preview
                        }
                        alt="Gallery"
                        style={{
                          width: 120,
                          height: 120,
                          objectFit:
                            "cover",
                          borderRadius:
                            10,
                          alignSelf:
                            "flex-start",
                        }}
                      />

                      <Box
                        sx={{
                          flex: 1,
                          display:
                            "flex",
                          flexDirection:
                            "column",
                          gap: 1,
                        }}
                      >
                        <FormControl
                          fullWidth
                          size="small"
                          error={
                            !image.colorId
                          }
                          sx={fieldSx}
                        >
                          <InputLabel>
                            Image Color
                          </InputLabel>

                          <Select
                            value={
                              image.colorId
                            }
                            label="Image Color"
                            onChange={(
                              event,
                            ) =>
                              handleGalleryColorChange(
                                image.id,
                                event
                                  .target
                                  .value,
                              )
                            }
                            MenuProps={{ slotProps: { paper: { sx: menuPaperSx } } }}
                          >
                            <MenuItem value="">
                              Select color
                            </MenuItem>

                            {colors.map(
                              (
                                colorId,
                              ) => {
                                const color =
                                  productColors.find(
                                    (
                                      item,
                                    ) =>
                                      item.id ===
                                      colorId,
                                  );

                                if (
                                  !color
                                ) {
                                  return null;
                                }

                                return (
                                  <MenuItem
                                    key={
                                      color.id
                                    }
                                    value={
                                      color.id
                                    }
                                  >
                                    <Box
                                      sx={{
                                        display:
                                          "flex",
                                        alignItems:
                                          "center",
                                        gap: 1,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: 18,
                                          height: 18,
                                          borderRadius:
                                            "50%",
                                          backgroundColor:
                                            color.hexCode,
                                          border:
                                            "1px solid #999",
                                        }}
                                      />

                                      <span>
                                        {
                                          color.name
                                        }
                                      </span>

                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {
                                          color.hexCode
                                        }
                                      </Typography>
                                    </Box>
                                  </MenuItem>
                                );
                              },
                            )}
                          </Select>

                          {!image.colorId && (
                            <Typography
                              color="error"
                              variant="caption"
                              sx={{
                                mt: 0.5,
                              }}
                            >
                              Select a color
                              for this image.
                            </Typography>
                          )}
                        </FormControl>

                        <Button
                          color="error"
                          variant="outlined"
                          startIcon={
                            <DeleteIcon />
                          }
                          onClick={() =>
                            handleDeleteGalleryImage(
                              image.id,
                            )
                          }
                          sx={dangerBtnSx}
                        >
                          Remove
                        </Button>

                        {image.existing && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Existing image
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ),
                )}
              </Box>
            )}
          </Box>

          {/* =================================================
              STATUS
          ================================================= */}

          <Box
            sx={{
              mt: 2,
              mb: 1,
              display:
                "flex",
              flexDirection:
                "column",
            }}
          >
            <FormControlLabel
              sx={switchLabelSx}
              control={
                <Switch
                  sx={switchSx}
                  checked={
                    isFeatured
                  }
                  onChange={(
                    event,
                  ) =>
                    setValue(
                      "isFeatured",
                      event.target
                        .checked,
                      {
                        shouldDirty:
                          true,
                        shouldValidate:
                          true,
                      },
                    )
                  }
                />
              }
              label="Featured Product"
            />

            <FormControlLabel
              sx={switchLabelSx}
              control={
                <Switch
                  sx={switchSx}
                  checked={
                    isBestSeller
                  }
                  onChange={(
                    event,
                  ) =>
                    setValue(
                      "isBestSeller",
                      event.target
                        .checked,
                      {
                        shouldDirty:
                          true,
                        shouldValidate:
                          true,
                      },
                    )
                  }
                />
              }
              label="Best Seller"
            />
          </Box>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <Button
            type="submit"
            sx={{
              margin:
                "10px 0px",
              py: 1.5,
              ...primaryBtnSx,
            }}
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}