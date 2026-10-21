// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import type { GridColDef } from "@mui/x-data-grid";
// import { API_URL } from "@/constants/api";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// import type { IUserType } from "@/apis/userApi";

// import useUsersQuery from "../hooks/useUsersQuery";
// import useDeleteUserMutation from "@/features/products/hooks/useDeleteMutationUser";

// // =====================================================
// // PROPS
// // =====================================================

// interface IUserListAdminProps {
//   handleOpenConfirmModal: () => void;
//   handleCloseConfirmModal: () => void;

//   handleOpenEditModal: () => void;
//   handleCloseEditModal: () => void;

//   setSelectedUser: React.Dispatch<
//     React.SetStateAction<IUserType | null>
//   >;
// }

// // =====================================================
// // COMPONENT
// // =====================================================

// export default function UserListAdmin({
//   handleOpenEditModal,
//   setSelectedUser,
// }: IUserListAdminProps) {
//   // =====================================================
//   // USERS QUERY
//   // =====================================================

//   const {
//     data,
//     isLoading,
//     error,
//   } = useUsersQuery();

//   // =====================================================
//   // DELETE MUTATION
//   // =====================================================

//   const deleteMutation =
//     useDeleteUserMutation();

//   // =====================================================
//   // COLUMNS
//   // =====================================================

//   const columns: GridColDef<IUserType>[] = [
//     // ===================================================
//     // ID
//     // ===================================================

//     {
//       field: "_id",
//       headerName: "_ID",
//       width: 230,
//     },

//     // ===================================================
//     // AVATAR
//     // ===================================================

//     {
//       field: "avatar",
//       headerName: "Avatar",
//       width: 100,
//       sortable: false,

//       renderCell: (params) => {
//         const avatar = params.row.avatar;

//         if (!avatar) {
//           return (
//             <Box
//               sx={{
//                 width: 45,
//                 height: 45,
//                 borderRadius: "50%",
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: 600,
//                 fontSize: 18,
//               }}
//             >
//               {params.row.firstName?.charAt(0)}
//             </Box>
//           );
//         }

//         return (
//           <img
//             src={`${API_URL}${avatar}`}
//             alt={`${params.row.firstName} ${params.row.lastName}`}
//             style={{
//               width: 45,
//               height: 45,
//               objectFit: "cover",
//               borderRadius: "50%",
//             }}
//           />
//         );
//       },
//     },

//     // ===================================================
//     // FIRST NAME
//     // ===================================================

//     {
//       field: "firstName",
//       headerName: "First Name",
//       width: 150,
//     },

//     // ===================================================
//     // LAST NAME
//     // ===================================================

//     {
//       field: "lastName",
//       headerName: "Last Name",
//       width: 150,
//     },

//     // ===================================================
//     // EMAIL
//     // ===================================================

//     {
//       field: "email",
//       headerName: "Email",
//       width: 250,
//     },

//     // ===================================================
//     // ROLE
//     // ===================================================

//     {
//       field: "role",
//       headerName: "Role",
//       width: 130,

//       renderCell: (params) => {
//         const isAdmin =
//           params.value === "admin";

//         return (
//           <Box
//             sx={{
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               px: 1.5,
//               py: 0.5,
//               borderRadius: 2,
//               fontSize: 12,
//               fontWeight: 600,

//               backgroundColor: isAdmin
//                 ? "#ede7f6"
//                 : "#e3f2fd",

//               color: isAdmin
//                 ? "#6a1b9a"
//                 : "#1565c0",
//             }}
//           >
//             {isAdmin ? "Admin" : "User"}
//           </Box>
//         );
//       },
//     },

//     // ===================================================
//     // CREATED AT
//     // ===================================================

//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 180,

//       renderCell: (params) => {
//         if (!params.value) {
//           return "-";
//         }

//         return new Date(
//           params.value,
//         ).toLocaleDateString("en-US");
//       },
//     },

//     // ===================================================
//     // UPDATED AT
//     // ===================================================

//     {
//       field: "updatedAt",
//       headerName: "Updated At",
//       width: 180,

//       renderCell: (params) => {
//         if (!params.value) {
//           return "-";
//         }

//         return new Date(
//           params.value,
//         ).toLocaleDateString("en-US");
//       },
//     },

//     // ===================================================
//     // ACTIONS
//     // ===================================================

//     {
//       field: "actions",
//       headerName: "Actions",
//       sortable: false,
//       width: 170,

//       renderCell: (params) => {
//         const user =
//           params.row as IUserType;

//         // ---------------------------------------------
//         // VIEW
//         // ---------------------------------------------

//         const handleView = () => {
//           console.log(
//             "========== VIEW USER ==========",
//           );

//           console.log(
//             "USER:",
//             user,
//           );

//           console.log(
//             "USER ID:",
//             user._id,
//           );

//           setSelectedUser(user);
//         };

//         // ---------------------------------------------
//         // EDIT
//         // ---------------------------------------------

//         const handleEdit = () => {
//           console.log(
//             "========== EDIT USER ==========",
//           );

//           console.log(
//             "USER:",
//             user,
//           );

//           console.log(
//             "USER ID:",
//             user._id,
//           );

//           // اول کاربر را انتخاب می‌کنیم
//           setSelectedUser(user);

//           // سپس Modal را باز می‌کنیم
//           handleOpenEditModal();
//         };

//         // ---------------------------------------------
//         // DELETE
//         // ---------------------------------------------

//         const handleDelete = async () => {
//           console.log(
//             "========== DELETE USER ==========",
//           );

//           console.log(
//             "USER:",
//             user,
//           );

//           console.log(
//             "USER ID:",
//             user._id,
//           );

//           setSelectedUser(user);

//           try {
//             await deleteMutation.mutateAsync(
//               user._id,
//             );

//             console.log(
//               "User deleted successfully",
//             );
//           } catch (error) {
//             console.error(
//               "Delete user error:",
//               error,
//             );
//           }
//         };

//         return (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             {/* =====================================
//                 VIEW
//             ===================================== */}

//             <VisibilityIcon
//               onClick={handleView}
//               sx={{
//                 cursor: "pointer",
//               }}
//               color="info"
//             />

//             {/* =====================================
//                 EDIT
//             ===================================== */}

//             <EditIcon
//               onClick={handleEdit}
//               sx={{
//                 cursor: "pointer",
//               }}
//               color="warning"
//             />

//             {/* =====================================
//                 DELETE
//             ===================================== */}

//             <DeleteIcon
//               onClick={
//                 deleteMutation.isPending
//                   ? undefined
//                   : handleDelete
//               }
//               sx={{
//                 cursor:
//                   deleteMutation.isPending
//                     ? "not-allowed"
//                     : "pointer",

//                 opacity:
//                   deleteMutation.isPending
//                     ? 0.5
//                     : 1,
//               }}
//               color="error"
//             />
//           </Box>
//         );
//       },
//     },
//   ];

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // =====================================================
//   // ERROR
//   // =====================================================

//   if (error) {
//     return (
//       <div>
//         Error loading users
//       </div>
//     );
//   }

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <Box
//       sx={{
//         height: 600,
//         width: "100%",
//       }}
//     >
//       <DataGrid
//         rows={
//           data?.data?.data?.map(
//             (
//               user: IUserType,
//               index: number,
//             ) => ({
//               ...user,

//               id:
//                 user._id ??
//                 index,
//             }),
//           ) ?? []
//         }
//         columns={columns}
//         getRowHeight={() => "auto"}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 10,
//             },
//           },
//         }}
//         pageSizeOptions={[
//           5,
//           10,
//           20,
//         ]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { API_URL } from "@/constants/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import type { IUserType } from "@/apis/userApi";

import useUsersQuery from "../hooks/useUsersQuery";
import useDeleteUserMutation from "@/features/products/hooks/useDeleteMutationUser";

// =====================================================
// SHARED APPEARANCE STYLES (فقط ظاهر)
// =====================================================

const dataGridSx = {
  fontFamily: "inherit",
  color: "#141011",
  backgroundColor: "#ffffff",
  border: "1px solid #e8e8e8",
  borderRadius: "16px",
  boxShadow:
    "0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.08)",
  overflow: "hidden",

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#fafafa",
    borderBottom: "1px solid #e8e8e8",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#fafafa",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.2px",
    color: "#141011",
  },
  "& .MuiDataGrid-columnSeparator": {
    color: "#e8e8e8",
  },
  "& .MuiDataGrid-cell": {
    fontFamily: "inherit",
    fontSize: "0.9rem",
    borderBottom: "1px solid #f0f0f0",
    display: "flex",
    alignItems: "center",
    py: 1,
  },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-row": {
    transition: "background-color 0.2s ease",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "rgba(20, 16, 17, 0.03)",
  },
  "& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover": {
    backgroundColor: "rgba(20, 16, 17, 0.06)",
  },
  "& .MuiCheckbox-root": {
    color: "#9a9a9a",
  },
  "& .MuiCheckbox-root.Mui-checked, & .MuiCheckbox-root.MuiCheckbox-indeterminate": {
    color: "#141011",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #e8e8e8",
    backgroundColor: "#ffffff",
  },
  "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
    {
      fontFamily: "inherit",
      color: "#555",
    },
  "& .MuiIconButton-root": {
    color: "#141011",
  },
  "& .MuiIconButton-root.Mui-disabled": {
    color: "#c0c0c0",
  },
  "& .MuiDataGrid-menuIcon .MuiIconButton-root, & .MuiDataGrid-iconButtonContainer .MuiIconButton-root":
    {
      color: "#141011",
    },
};

const statusMessageStyle = {
  padding: "24px",
  fontFamily: "inherit",
  color: "#555",
};

const iconBaseSx = {
  transition: "transform 0.2s ease, color 0.2s ease",
  "&:hover": {
    transform: "scale(1.15)",
  },
};

// =====================================================
// PROPS
// =====================================================

interface IUserListAdminProps {
  handleOpenConfirmModal: () => void;
  handleCloseConfirmModal: () => void;

  handleOpenEditModal: () => void;
  handleCloseEditModal: () => void;

  setSelectedUser: React.Dispatch<
    React.SetStateAction<IUserType | null>
  >;
}

// =====================================================
// COMPONENT
// =====================================================

export default function UserListAdmin({
  handleOpenEditModal,
  setSelectedUser,
}: IUserListAdminProps) {
  // =====================================================
  // USERS QUERY
  // =====================================================

  const {
    data,
    isLoading,
    error,
  } = useUsersQuery();

  // =====================================================
  // DELETE MUTATION
  // =====================================================

  const deleteMutation =
    useDeleteUserMutation();

  // =====================================================
  // COLUMNS
  // =====================================================

  const columns: GridColDef<IUserType>[] = [
    // ===================================================
    // ID
    // ===================================================

    {
      field: "_id",
      headerName: "_ID",
      width: 230,
    },

    // ===================================================
    // AVATAR
    // ===================================================

    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      sortable: false,

      renderCell: (params) => {
        const avatar = params.row.avatar;

        if (!avatar) {
          return (
            <Box
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                backgroundColor: "#141011",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: 18,
                fontFamily: "inherit",
                textTransform: "uppercase",
              }}
            >
              {params.row.firstName?.charAt(0)}
            </Box>
          );
        }

        return (
          <img
            src={`${API_URL}${avatar}`}
            alt={`${params.row.firstName} ${params.row.lastName}`}
            style={{
              width: 45,
              height: 45,
              objectFit: "cover",
              borderRadius: "50%",
              border: "1px solid #e8e8e8",
            }}
          />
        );
      },
    },

    // ===================================================
    // FIRST NAME
    // ===================================================

    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
    },

    // ===================================================
    // LAST NAME
    // ===================================================

    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
    },

    // ===================================================
    // EMAIL
    // ===================================================

    {
      field: "email",
      headerName: "Email",
      width: 250,
    },

    // ===================================================
    // ROLE
    // ===================================================

    {
      field: "role",
      headerName: "Role",
      width: 130,

      renderCell: (params) => {
        const isAdmin =
          params.value === "admin";

        return (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "inherit",

              backgroundColor: isAdmin
                ? "#141011"
                : "#f0f0f0",

              color: isAdmin
                ? "#ffffff"
                : "#141011",

              border: isAdmin
                ? "1px solid #141011"
                : "1px solid #e0e0e0",
            }}
          >
            {isAdmin ? "Admin" : "User"}
          </Box>
        );
      },
    },

    // ===================================================
    // CREATED AT
    // ===================================================

    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,

      renderCell: (params) => {
        if (!params.value) {
          return "-";
        }

        return new Date(
          params.value,
        ).toLocaleDateString("en-US");
      },
    },

    // ===================================================
    // UPDATED AT
    // ===================================================

    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,

      renderCell: (params) => {
        if (!params.value) {
          return "-";
        }

        return new Date(
          params.value,
        ).toLocaleDateString("en-US");
      },
    },

    // ===================================================
    // ACTIONS
    // ===================================================

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,

      renderCell: (params) => {
        const user =
          params.row as IUserType;

        // ---------------------------------------------
        // VIEW
        // ---------------------------------------------

        const handleView = () => {
          console.log(
            "========== VIEW USER ==========",
          );

          console.log(
            "USER:",
            user,
          );

          console.log(
            "USER ID:",
            user._id,
          );

          setSelectedUser(user);
        };

        // ---------------------------------------------
        // EDIT
        // ---------------------------------------------

        const handleEdit = () => {
          console.log(
            "========== EDIT USER ==========",
          );

          console.log(
            "USER:",
            user,
          );

          console.log(
            "USER ID:",
            user._id,
          );

          // اول کاربر را انتخاب می‌کنیم
          setSelectedUser(user);

          // سپس Modal را باز می‌کنیم
          handleOpenEditModal();
        };

        // ---------------------------------------------
        // DELETE
        // ---------------------------------------------

        const handleDelete = async () => {
          console.log(
            "========== DELETE USER ==========",
          );

          console.log(
            "USER:",
            user,
          );

          console.log(
            "USER ID:",
            user._id,
          );

          setSelectedUser(user);

          try {
            await deleteMutation.mutateAsync(
              user._id,
            );

            console.log(
              "User deleted successfully",
            );
          } catch (error) {
            console.error(
              "Delete user error:",
              error,
            );
          }
        };

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* =====================================
                VIEW
            ===================================== */}

            <VisibilityIcon
              onClick={handleView}
              sx={{
                cursor: "pointer",
                ...iconBaseSx,
                color: "#555",
                "&:hover": {
                  transform: "scale(1.15)",
                  color: "#141011",
                },
              }}
              color="info"
            />

            {/* =====================================
                EDIT
            ===================================== */}

            <EditIcon
              onClick={handleEdit}
              sx={{
                cursor: "pointer",
                ...iconBaseSx,
                color: "#141011",
                "&:hover": {
                  transform: "scale(1.15)",
                  color: "#2b2527",
                },
              }}
              color="warning"
            />

            {/* =====================================
                DELETE
            ===================================== */}

            <DeleteIcon
              onClick={
                deleteMutation.isPending
                  ? undefined
                  : handleDelete
              }
              sx={{
                cursor:
                  deleteMutation.isPending
                    ? "not-allowed"
                    : "pointer",

                opacity:
                  deleteMutation.isPending
                    ? 0.5
                    : 1,

                ...iconBaseSx,
                color: "#d32f2f",
                "&:hover": {
                  transform: "scale(1.15)",
                  color: "#b71c1c",
                },
              }}
              color="error"
            />
          </Box>
        );
      },
    },
  ];

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return <div style={statusMessageStyle}>Loading...</div>;
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div
        style={{
          ...statusMessageStyle,
          color: "#d32f2f",
        }}
      >
        Error loading users
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
      }}
    >
      <DataGrid
        rows={
          data?.data?.data?.map(
            (
              user: IUserType,
              index: number,
            ) => ({
              ...user,

              id:
                user._id ??
                index,
            }),
          ) ?? []
        }
        columns={columns}
        getRowHeight={() => "auto"}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[
          5,
          10,
          20,
        ]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={dataGridSx}
      />
    </Box>
  );
}