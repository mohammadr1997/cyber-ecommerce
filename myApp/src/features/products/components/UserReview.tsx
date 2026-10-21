

import { useState } from "react";

import type { IUserType } from "@/apis/userApi";

import ReviewListAdmin from "./ReviewListAdmin";
import ReviewModal from "./ReviewModal";

export default function UserReview() {
  const [selectedUser, setSelectedUser] =
    useState<IUserType | null>(null);

  const [openReviewModal, setOpenReviewModal] =
    useState(false);

  const handleOpenReviewModal = () => {
    setOpenReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);
    setSelectedUser(null);
  };

  return (
    <div
      style={{
        marginLeft: "250px",
      }}
    >
      <ReviewListAdmin
        setSelectedUser={setSelectedUser}
        handleOpenReviewModal={handleOpenReviewModal}
      />

      <ReviewModal
        open={openReviewModal}
        handleClose={handleCloseReviewModal}
        selectedUser={selectedUser}
      />
    </div>
  );
}