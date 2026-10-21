
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";

import { useParams } from "react-router-dom";
import { useState } from "react";

import GalleryDataGrid from "./GalleryDataGrid";

import useGetProductById from "../hooks/useGetProductById";
import useAddImageGallery from "../hooks/useAddImageGallery";

import type { IProductType, IProductColor } from "@/apis/productsApi";

// =====================================================
// TYPES
// =====================================================

interface IGalleryUploadImage {
  id: string;
  file: File;
  preview: string;
  colorId: string;
}

// =====================================================
// COMPONENT
// =====================================================

export default function GalleryProducts() {
  const { productId } = useParams();

  // ===================================================
  // STATE
  // ===================================================

  const [galleryImages, setGalleryImages] =
    useState<IGalleryUploadImage[]>([]);

  // ===================================================
  // PRODUCT QUERY
  // ===================================================

  const { data, isLoading, error } =
    useGetProductById(productId as string);

  // ===================================================
  // ADD IMAGE MUTATION
  // ===================================================

  const addImageMutation =
    useAddImageGallery(
      productId ? productId : "1",
    );

  // ===================================================
  // PRODUCT
  // ===================================================

  const product =
    data?.data?.data as IProductType | undefined;

  // ===================================================
  // LOADING / ERROR
  // ===================================================

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // ===================================================
  // PRODUCT COLORS
  // ===================================================

  const productColors =
    (product.colors ?? []) as IProductColor[];

  // ===================================================
  // FILE SELECT
  // ===================================================

  const handleSetImages = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) {
      return;
    }

    const files =
      Array.from(event.target.files);

    if (files.length === 0) {
      return;
    }

    const newImages =
      files.map((file) => ({
        id:
          `${Date.now()}-${Math.random()}`,

        file,

        preview:
          URL.createObjectURL(file),

        colorId: "",
      }));

    setGalleryImages((previous) => [
      ...previous,
      ...newImages,
    ]);

    // Allow selecting same files again
    event.target.value = "";
  };

  // ===================================================
  // COLOR CHANGE
  // ===================================================

  const handleColorChange = (
    imageId: string,
    event: SelectChangeEvent<string>,
  ) => {
    const colorId =
      event.target.value;

    setGalleryImages((previous) =>
      previous.map((image) =>
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
  // DELETE NEW IMAGE
  // ===================================================

  const handleDeleteNewImage = (
    imageId: string,
  ) => {
    setGalleryImages((previous) => {
      const image =
        previous.find(
          (item) =>
            item.id === imageId,
        );

      if (image) {
        URL.revokeObjectURL(
          image.preview,
        );
      }

      return previous.filter(
        (item) =>
          item.id !== imageId,
      );
    });
  };

  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit = () => {
    if (!productId) {
      return;
    }

    if (galleryImages.length === 0) {
      console.error(
        "No gallery images selected",
      );

      return;
    }

    // ================================================
    // CHECK COLORS
    // ================================================

    const imagesWithoutColor =
      galleryImages.filter(
        (image) => !image.colorId,
      );

    if (
      imagesWithoutColor.length > 0
    ) {
      console.error(
        "Every image must have a color",
      );

      return;
    }

    // ================================================
    // FORM DATA
    // ================================================

    const formData =
      new FormData();

    // ================================================
    // FILES
    // ================================================

    galleryImages.forEach(
      (image) => {
        formData.append(
          "images",
          image.file,
        );
      },
    );

    // ================================================
    // COLOR IDS
    //
    // IMPORTANT:
    //
    // The order MUST be exactly the
    // same as the uploaded files.
    //
    // file[0] -> colorIds[0]
    // file[1] -> colorIds[1]
    // ================================================

    const colorIds =
      galleryImages.map(
        (image) =>
          image.colorId,
      );

    formData.append(
      "colorIds",
      JSON.stringify(colorIds),
    );

    // ================================================
    // DEBUG
    // ================================================

    console.log(
      "========== ADD GALLERY ==========",
    );

    console.log(
      "FILES:",
      galleryImages.map(
        (image) =>
          image.file.name,
      ),
    );

    console.log(
      "COLOR IDS:",
      colorIds,
    );

    // ================================================
    // SEND
    // ================================================

    addImageMutation.mutate({
      id: productId,
      data: formData,
    });

    // ================================================
    // CLEAN PREVIEWS
    // ================================================

    galleryImages.forEach(
      (image) => {
        URL.revokeObjectURL(
          image.preview,
        );
      },
    );

    setGalleryImages([]);
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* =============================================
          PRODUCT NAME
      ============================================= */}

      <Typography
        sx={{
          marginBottom: "20px",
        }}
        variant="h3"
      >
        Name: {product.name}
      </Typography>

      {/* =============================================
          UPLOAD
      ============================================= */}

      <Button
        component="label"
        variant="contained"
        disabled={
          productColors.length === 0
        }
      >
        Select Gallery Images

        <Input
          type="file"
          inputProps={{
            multiple: true,
            accept:
              "image/jpeg,image/png,image/webp,image/jpg",
          }}
          onChange={
            handleSetImages
          }
          sx={{
            display: "none",
          }}
        />
      </Button>

      {productColors.length ===
        0 && (
        <Typography
          color="error"
          variant="body2"
          sx={{
            mt: 1,
          }}
        >
          This product has no colors.
        </Typography>
      )}

      <Divider
        sx={{
          my: 2,
        }}
      />

      {/* =============================================
          NEW IMAGES
      ============================================= */}

      {galleryImages.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
          >
            New Images
          </Typography>

          {galleryImages.map(
            (image) => (
              <Box
                key={image.id}
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: 2,
                  p: 2,
                  border:
                    "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                {/* IMAGE */}

                <img
                  src={image.preview}
                  alt="Gallery preview"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />

                {/* CONTROLS */}

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: 1,
                  }}
                >
                  <FormControl
                    fullWidth
                    size="small"
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
                        handleColorChange(
                          image.id,
                          event,
                        )
                      }
                    >
                      <MenuItem value="">
                        Select color
                      </MenuItem>

                      {productColors.map(
                        (color) => (
                          <MenuItem
                            key={
                              color._id
                            }
                            value={
                              color._id
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
                        ),
                      )}
                    </Select>
                  </FormControl>

                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      handleDeleteNewImage(
                        image.id,
                      )
                    }
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ),
          )}

          {/* =========================================
              SUBMIT
          ========================================= */}

          <Button
            onClick={
              handleSubmit
            }
            variant="contained"
            disabled={
              addImageMutation.isPending
            }
            sx={{
              mt: 1,
            }}
          >
            {addImageMutation.isPending
              ? "Uploading..."
              : "Submit Gallery"}
          </Button>
        </Box>
      )}

      {/* =============================================
          EXISTING GALLERY
      ============================================= */}

      <GalleryDataGrid
        productId={
          productId
            ? productId
            : "1"
        }
        product={product}
      />
    </Box>
  );
}
