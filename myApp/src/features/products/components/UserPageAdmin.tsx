import type { IUserType } from "@/apis/userApi";

import UserListAdmin from "./UserListAdmin";

interface IUserPageAdminProps {
  handleOpenConfirmModal: () => void;
  handleCloseConfirmModal: () => void;
  handleOpenEditModal: () => void;
  handleCloseEditModal: () => void;

  setSelectedUser: React.Dispatch<
    React.SetStateAction<IUserType | null>
  >;
}

export default function UserPageAdmin({
  handleOpenConfirmModal,
  handleCloseConfirmModal,
  handleOpenEditModal,
  handleCloseEditModal,
  setSelectedUser,
}: IUserPageAdminProps) {
  return (
    <UserListAdmin
      handleOpenConfirmModal={
        handleOpenConfirmModal
      }
      handleCloseConfirmModal={
        handleCloseConfirmModal
      }
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
  );
}