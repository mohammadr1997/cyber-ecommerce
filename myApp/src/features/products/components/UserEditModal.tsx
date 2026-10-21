// import { useEffect, useState } from "react";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";

// import type { IUserType } from "@/apis/userApi";

// import useUpdateMutation from "@/features/products/hooks/useUpdateMutationUser";

// interface IUserEditModalProps {
//   open: boolean;
//   handleClose: () => void;
//   selectedUser: IUserType | null;
// }

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",

//   width: {
//     xs: "90%",
//     sm: 500,
//   },

//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: 24,
//   p: 4,
// };

// export default function UserEditModal({
//   open,
//   handleClose,
//   selectedUser,
// }: IUserEditModalProps) {
//   // =====================================================
//   // STATE
//   // =====================================================

//   const [firstName, setFirstName] =
//     useState("");

//   const [lastName, setLastName] =
//     useState("");

//   const [email, setEmail] =
//     useState("");

//   // =====================================================
//   // UPDATE MUTATION
//   // =====================================================

//   const updateMutation =
//     useUpdateMutation();

//   // =====================================================
//   // LOAD USER DATA
//   // =====================================================

//   useEffect(() => {
//     if (!selectedUser) {
//       return;
//     }

//     setFirstName(
//       selectedUser.firstName ?? "",
//     );

//     setLastName(
//       selectedUser.lastName ?? "",
//     );

//     setEmail(
//       selectedUser.email ?? "",
//     );
//   }, [selectedUser]);

//   // =====================================================
//   // SUBMIT
//   // =====================================================

//   const handleSubmit = async (
//     event: React.FormEvent,
//   ) => {
//     event.preventDefault();

//     if (!selectedUser?._id) {
//       console.error(
//         "Selected user not found",
//       );

//       return;
//     }

//     try {
//       await updateMutation.mutateAsync({
//         id: selectedUser._id,

//         data: {
//           firstName: firstName.trim(),
//           lastName: lastName.trim(),
//           email: email.trim(),
//         },
//       });

//       console.log(
//         "========== USER UPDATED ==========",
//       );

//       console.log(
//         "USER ID:",
//         selectedUser._id,
//       );

//       handleClose();
//     } catch (error) {
//       console.error(
//         "Update user error:",
//         error,
//       );
//     }
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="edit-user-modal"
//     >
//       <Box
//         sx={style}
//         component="form"
//         onSubmit={handleSubmit}
//       >
//         {/* =============================================
//             TITLE
//         ============================================= */}

//         <Typography
//           id="edit-user-modal"
//           variant="h6"
//           sx={{
//             mb: 3,
//             fontWeight: 600,
//           }}
//         >
//           Edit User
//         </Typography>

//         {/* =============================================
//             FIRST NAME
//         ============================================= */}

//         <TextField
//           label="First Name"
//           value={firstName}
//           onChange={(event) =>
//             setFirstName(
//               event.target.value,
//             )
//           }
//           fullWidth
//           sx={{ mb: 2 }}
//         />

//         {/* =============================================
//             LAST NAME
//         ============================================= */}

//         <TextField
//           label="Last Name"
//           value={lastName}
//           onChange={(event) =>
//             setLastName(
//               event.target.value,
//             )
//           }
//           fullWidth
//           sx={{ mb: 2 }}
//         />

//         {/* =============================================
//             EMAIL
//         ============================================= */}

//         <TextField
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(event) =>
//             setEmail(
//               event.target.value,
//             )
//           }
//           fullWidth
//           sx={{ mb: 3 }}
//         />

//         {/* =============================================
//             BUTTONS
//         ============================================= */}

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//           }}
//         >
//           <Button
//             type="button"
//             variant="outlined"
//             fullWidth
//             onClick={handleClose}
//             disabled={
//               updateMutation.isPending
//             }
//           >
//             Cancel
//           </Button>

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             disabled={
//               updateMutation.isPending
//             }
//           >
//             {updateMutation.isPending
//               ? "Updating..."
//               : "Update User"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import type { IUserType } from "@/apis/userApi";

import useUpdateMutation from "@/features/products/hooks/useUpdateMutationUser";

interface IUserEditModalProps {
  open: boolean;
  handleClose: () => void;
  selectedUser: IUserType | null;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: {
    xs: "90%",
    sm: 500,
  },

  bgcolor: "background.paper",
  border: "1px solid #e8e8e8",
  borderRadius: "16px",
  boxShadow:
    "0px 4px 12px rgba(20, 16, 17, 0.04), 0px 20px 40px -8px rgba(20, 16, 17, 0.10)",
  outline: "none",
  fontFamily: "inherit",
  p: 4,
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

const primaryBtnSx = {
  borderRadius: "10px",
  backgroundColor: "#141011",
  color: "#ffffff",
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "none",
  py: 1.5,
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
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  backgroundColor: "#ffffff",
  py: 1.5,
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

export default function UserEditModal({
  open,
  handleClose,
  selectedUser,
}: IUserEditModalProps) {
  // =====================================================
  // STATE
  // =====================================================

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  // =====================================================
  // UPDATE MUTATION
  // =====================================================

  const updateMutation =
    useUpdateMutation();

  // =====================================================
  // LOAD USER DATA
  // =====================================================

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setFirstName(
      selectedUser.firstName ?? "",
    );

    setLastName(
      selectedUser.lastName ?? "",
    );

    setEmail(
      selectedUser.email ?? "",
    );
  }, [selectedUser]);

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!selectedUser?._id) {
      console.error(
        "Selected user not found",
      );

      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: selectedUser._id,

        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        },
      });

      console.log(
        "========== USER UPDATED ==========",
      );

      console.log(
        "USER ID:",
        selectedUser._id,
      );

      handleClose();
    } catch (error) {
      console.error(
        "Update user error:",
        error,
      );
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-user-modal"
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
        onSubmit={handleSubmit}
      >
        {/* =============================================
            TITLE
        ============================================= */}

        <Typography
          id="edit-user-modal"
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            fontFamily: "inherit",
            letterSpacing: "-0.5px",
            color: "#141011",
          }}
        >
          Edit User
        </Typography>

        {/* =============================================
            FIRST NAME
        ============================================= */}

        <TextField
          label="First Name"
          value={firstName}
          onChange={(event) =>
            setFirstName(
              event.target.value,
            )
          }
          fullWidth
          sx={{ mb: 2.5, ...fieldSx }}
        />

        {/* =============================================
            LAST NAME
        ============================================= */}

        <TextField
          label="Last Name"
          value={lastName}
          onChange={(event) =>
            setLastName(
              event.target.value,
            )
          }
          fullWidth
          sx={{ mb: 2.5, ...fieldSx }}
        />

        {/* =============================================
            EMAIL
        ============================================= */}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(
              event.target.value,
            )
          }
          fullWidth
          sx={{ mb: 3, ...fieldSx }}
        />

        {/* =============================================
            BUTTONS
        ============================================= */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleClose}
            disabled={
              updateMutation.isPending
            }
            sx={outlinedBtnSx}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              updateMutation.isPending
            }
            sx={primaryBtnSx}
          >
            {updateMutation.isPending
              ? "Updating..."
              : "Update User"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}