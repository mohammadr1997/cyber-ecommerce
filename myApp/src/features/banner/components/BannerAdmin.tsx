
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { getBannerImageUrl } from "@/constants/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import useGetBanner from "../hooks/useGetBanner";
import useDeleteBanner from "../hooks/useDeleteBanner";
import type { IBanner } from "@/apis/bannerApi";

export type { IBanner } from "@/apis/bannerApi";

interface IBannerAdminProps {
  signEditOrAdd: string | null;

  setSignEditOrAdd: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  handleOpen: () => void;
  handleClose: () => void;

  setSelectedBanner?: React.Dispatch<
    React.SetStateAction<IBanner | null>
  >;
}

export default function BannerAdmin({
  setSignEditOrAdd,
  handleOpen,
  setSelectedBanner,
}: IBannerAdminProps) {
  const deleteBanner = useDeleteBanner();

  const { data, isLoading, error } = useGetBanner();

  const banners: IBanner[] = data?.data ?? [];

  const handleDelete = (id: string) => {
    console.log("Delete banner id:", id);

    deleteBanner.mutate(id);
  };

  const handleEdit = (banner: IBanner) => {
    console.log("Banner for edit:", banner);

    // ذخیره Banner انتخاب‌شده
    if (setSelectedBanner) {
      setSelectedBanner(banner);
    }

    // حالت ویرایش
    setSignEditOrAdd("edit");

    // باز کردن Modal
    handleOpen();
  };

  const columns: GridColDef<IBanner>[] = [
    {
      field: "_id",
      headerName: "_ID",
      width: 220,
    },

    {
      field: "title",
      headerName: "Title",
      width: 180,
    },

    {
      field: "type",
      headerName: "Type",
      width: 120,
    },

    {
      field: "description",
      headerName: "Description",
      width: 250,
    },

    {
      field: "imageUrl",
      headerName: "Image",
      sortable: false,
      width: 120,

      renderCell: (params) => {
        const imageUrl = params.row.imageUrl;

        return (
          <img
        src={getBannerImageUrl(imageUrl)}
            alt={params.row.title}
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

    {
      field: "isActive",
      headerName: "Active",
      width: 100,

      renderCell: (params) => {
        return params.row.isActive ? "Yes" : "No";
      },
    },

    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,

      valueGetter: (value) => {
        if (!value) return "";

        return new Date(value).toLocaleDateString();
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 140,

      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              height: "100%",
            }}
          >
            <EditIcon
              onClick={() => handleEdit(params.row)}
              sx={{
                cursor: "pointer",
              }}
              color="warning"
            />

            <DeleteIcon
              onClick={() => handleDelete(params.row._id)}
              sx={{
                cursor: "pointer",
              }}
              color="error"
            />
          </Box>
        );
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading banners</div>;
  }

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
      }}
    >
      <DataGrid
        rows={banners.map((banner, index) => ({
          ...banner,
          id: banner._id || index,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
