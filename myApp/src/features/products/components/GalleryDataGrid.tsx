
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getProductImageUrl } from "@/constants/api";
import {
  DataGrid,
} from "@mui/x-data-grid";

import type {
  GridColDef,
} from "@mui/x-data-grid";

import type {
  IProductType,
  IProductColor,
} from "@/apis/productsApi";

import DeleteIcon from "@mui/icons-material/Delete";

import useDeleteImageGallery from "../hooks/useDeleteImageGallery";

// =====================================================
// TYPES
// =====================================================

interface IGalleryDataGridProps {
  product:
    | IProductType
    | undefined;

  productId: string;
}

// =====================================================
// COMPONENT
// =====================================================

export default function GalleryDataGrid({
  product,
  productId,
}: IGalleryDataGridProps) {
  // ===================================================
  // DELETE
  // ===================================================

  const deleteImageGalleryMutation =
    useDeleteImageGallery(
      productId,
    );

  // ===================================================
  // COLORS
  // ===================================================

  const colors =
    (product?.colors ?? []) as IProductColor[];

  // ===================================================
  // ROWS
  // ===================================================

  const rows =
    product?.images?.map(
      (image) => {
        const color =
          colors.find(
            (item) =>
              item._id ===
              image.colorId,
          );

        return {
          id: image._id,

          imageId:
            image._id,

          imageUrl:
            image.url,

          colorId:
            image.colorId,

          colorName:
            color?.name ??
            image.colorId,

          colorHex:
            color?.hexCode ??
            "",
        };
      },
    ) ?? [];

  // ===================================================
  // COLUMNS
  // ===================================================

  const columns: GridColDef[] = [
    // ================================================
    // IMAGE ID
    // ================================================

    {
      field: "imageId",

      headerName: "Image ID",

      minWidth: 250,

      flex: 1,
    },

    // ================================================
    // IMAGE
    // ================================================

    {
      field: "imageUrl",

      headerName: "Image",

      minWidth: 150,

      flex: 0.7,

      renderCell: (
        params,
      ) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
           src={getProductImageUrl(params.row.imageUrl)}
              alt="gallery"
              width={80}
              height={80}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          </Box>
        );
      },
    },

    // ================================================
    // COLOR
    // ================================================

    {
      field: "colorName",

      headerName: "Color",

      minWidth: 160,

      flex: 0.7,

      renderCell: (
        params,
      ) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "100%",
            }}
          >
            {params.row.colorHex && (
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius:
                    "50%",
                  backgroundColor:
                    params.row
                      .colorHex,
                  border:
                    "1px solid #999",
                  flexShrink: 0,
                }}
              />
            )}

            <Typography>
              {
                params.row
                  .colorName
              }
            </Typography>
          </Box>
        );
      },
    },

    // ================================================
    // COLOR ID
    // ================================================

    {
      field: "colorId",

      headerName: "Color ID",

      minWidth: 250,

      flex: 1,
    },

    // ================================================
    // ACTIONS
    // ================================================

    {
      field: "actions",

      headerName: "Actions",

      minWidth: 100,

      flex: 0.4,

      sortable: false,

      filterable: false,

      renderCell: (
        params,
      ) => {
        const handleDelete =
          () => {
            const imageId =
              params.row.imageId;

            if (
              productId === "1"
            ) {
              return;
            }

            console.log(
              "productId:",
              productId,
            );

            console.log(
              "imageId:",
              imageId,
            );

            deleteImageGalleryMutation.mutate(
              {
                productId,
                imageId,
              },
            );
          };

        return (
          <DeleteIcon
            onClick={
              handleDelete
            }
            sx={{
              cursor: "pointer",
            }}
            color="error"
          />
        );
      },
    },
  ];

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        mt: 4,
        mx: "auto",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) =>
          row.id
        }
        pageSizeOptions={[
          5,
          10,
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        disableRowSelectionOnClick
        rowHeight={100}
      />
    </Box>
  );
}