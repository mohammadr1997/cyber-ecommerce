import { useState } from "react";

import type { IUserType } from "@/apis/userApi";

import UserPageAdmin from "../components/UserPageAdmin";
import UserEditModal from "../components/UserEditModal";

export default function AdminUserPage() {
  const [selectedUser, setSelectedUser] =
    useState<IUserType | null>(null);

  const [openEditModal, setOpenEditModal] =
    useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div
      style={{
        marginLeft: "250px",
      }}
    >
      <UserPageAdmin
        handleOpenConfirmModal={() => {}}
        handleCloseConfirmModal={() => {}}
        handleOpenEditModal={
          handleOpenEditModal
        }
        handleCloseEditModal={
          handleCloseEditModal
        }
        setSelectedUser={
          setSelectedUser
        }
      />

      <UserEditModal
        open={openEditModal}
        handleClose={
          handleCloseEditModal
        }
        selectedUser={selectedUser}
      />
    </div>
  );
}