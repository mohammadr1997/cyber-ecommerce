import type { IReviewUser } from "@/apis/reviewApi";
import { useGetUserById } from "../hooks/useGetUserById";
import { Box, Typography } from "@mui/material";

import { colors } from "@/constants/colors";
import ReviewRating from "./ReviewRating";
import Loading from "@/features/loading/loading";

interface IReviewItemType {
  comment: string;
  userId: string | IReviewUser | null;
  rating: number;
}

export default function ReviewItem({
  userId,
  rating,
  comment,
}: IReviewItemType) {
  console.log("USER ID:", userId);
    const userIdValue =
    typeof userId === "string"
      ? userId
      : userId?._id;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserById(userIdValue ||'');

  if (!userId || !comment) return null;




  const userReview = user?.data.data;

 if (isLoading) {
  return <Loading variant="inline" size={18} />;
}

  if (isError) return <>Error loading Comments</>;

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'10px',margin:{xs:'10px 0'},marginTop:{md:'172px'},marginBottom:{md:'100px'}}}>
      <Typography
        sx={{
          fontSize: { xs: "16px", md: "20px" },
          fontWeight: "600",
          color: `${colors.charocal}`,
          
        }}
      >
        {userReview &&
          `${userReview.firstName} ${userReview.lastName}`}
      </Typography>

      <Typography>
        {rating && <ReviewRating value={rating} />}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "14px", md: "18px" },
          color: `${colors.textBanner}`,
        }}
      >
        {comment}
      </Typography>
    </Box>
  );
}