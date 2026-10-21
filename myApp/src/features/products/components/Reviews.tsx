import { useProductReviewsQuery } from "../hooks/useProductReviewsQuery";


import { Box,  Button,  Grid, Input, Typography, useMediaQuery, useTheme } from "@mui/material";
import { colors } from "@/constants/colors";
import ReviewItem from "./ReviewItem";

import ReviewRating from "./ReviewRating";
import ProgressBar from "./ProgressBar";
import { authApi } from "@/apis/authApi";
import { useState } from "react";
import {type IReviewType } from "@/apis/reviewApi";
import Loading from "@/features/loading/loading";
import { useNavigate } from "react-router-dom";
import { useAddReviewMutation } from "../hooks/useAddReviewMutation";
import {  useUpdateReviewMutation } from "../hooks/useUpdateReviewMutation";
const ratingLabels: Record<string, string> = {
  "5": "Excellent",
  "4": "Good",
  "3": "Average",
  "2": "Below Average",
  "1": " Poor",
};
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IReviewUser {
  _id: string;
  avatar: string;
}

// export interface IReviewType {
//   _id: string;
//   productId: string;
//   userId: IReviewUser;
//   rating: number;
//   comment: string;
//   createdAt: string;
//   updatedAt: string;
//   __v?: number;
// }

export type IReviews = IReviewType[];
export default function Reviews({id}:{id:string | undefined}) {
  const {data:productReview,isLoading:reviewLoading,isError:reviewError}=useProductReviewsQuery(id || '')
  const useAddReviewProduct=useAddReviewMutation()
  const UpdateReviewMutation=useUpdateReviewMutation()
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)

  const [rating, setRating] = useState(1);
  const [comment,setComment]=useState<string>('')
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
const canSubmit = !!comment.trim() && !loading;



const handleSubmitComment = async (
  e: React.SyntheticEvent | React.KeyboardEvent | React.MouseEvent,
) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/sign-in");
    return;
  }

  if (!id || !comment.trim() || rating < 1 || rating > 5) {
    return;
  }

  setLoading(true);

  try {
    const User = await authApi.getMe();
    const user: IUser = User.data.user;

    const reviews: IReviewType[] =
      productReview?.data.data.reviews ?? [];

    
    const existingReview = reviews.find(
      (review) => review.userId._id === user._id,
    );

    if (existingReview) {
      
      UpdateReviewMutation.mutate({
        id: existingReview._id,
       
        data: {
          rating,
          comment: comment.trim(),
        },
      });
    } else {
     
      useAddReviewProduct.mutate({
        productId: id,
        userId: user._id,
        rating,
        comment: comment.trim(),
      });
    }
  } catch (error) {
    console.error("Submit review error:", error);
  } finally {
    setLoading(false);
  }
};





  const totalReview=productReview?.data.data.totalReviews || ''
  const averageReview=productReview?.data.data.averageRating
  const ratingCount=productReview?.data.data.ratingCounts
 const reviews=productReview ? productReview.data.data.reviews : []
    console.log('check review',productReview)
if (reviewLoading) {
  return <Loading variant="section" text="Loading reviews..." />;
}

if (reviewError) {
  return <Typography color="error">Error loading reviews.</Typography>;
}
  return (
    <>
  
    <Box sx={{display:'flex',flexDirection:'column',gap:'16px',justifyContent:{xs:'center',md:'flex-start'},width:'100%',marginTop:{md:'-150px'},marginBottom:{xs:'60px'}}}>
     <Grid sx={{display:'flex',flexDirection:'column',gap:'10px',width:'100%'}}>   <Typography
  sx={{textAlign:'left',color:`${colors.charocal}`, fontSize: { xs: '18px', md: '24px' },
    width: '100%',
    fontWeight: '600',marginTop:{xs:'40px'},padding:{xs: "12px",
            md: "160px 112px"}}}
  variant="h4"
>
  Reviews
</Typography></Grid>
        <Grid   sx={{display:'flex',flexDirection:{xs:'column',md:'row'},justifyContent:'space-evenly',gap:'16px',width:'100%',marginTop:{md:'-135px',xs:'-5px'},padding:{xs: "12px"}}}>
              <Grid  sx={{width:{xs:'100%'}}} >     <Grid  sx={{display:'flex',flexDirection:'column',gap:'4px',justifyContent:'center',textAlign:'center',width:'100%',padding:{xs: "12px",
            md: "0 112px"}}}>
            <Typography sx={{fontSize:{xs:'44px',md:'56px',fontWeight:'600'}}}>{averageReview}</Typography>
            <Typography sx={{color:`${colors.textBanner}`,fontSize:{xs:'14px',md:'16px'},justifyContent:'flex-start',alignItems:'center',textAlign:'center',padding:'0'}}>of {totalReview} reviews </Typography>
        </Grid>
        <Grid sx={{display:'flex',justifyContent:'center',marginTop:{xs:'10px'}}}>{averageReview && <ReviewRating value={averageReview}/>}</Grid></Grid>
                <Grid   sx={{width:{xs:'100%'}}}>  <Grid sx={{display:'flex',flexDirection:'column',justifyContent:'center',padding:{xs: "12px",
            md: "0 112px"}}}>

        {ratingCount && Object.entries(ratingCount).reverse().map(([rating,count])=>{
           
            return <Box sx={{display:'flex',flexDirection:'row',gap:'16px',width:'100%',justifyContent:{md:'center'}}}>
                <Typography sx={{fontWeight:'500',fontSize:{xs:"16px",md:'18px',color:`${colors.charocal}`},width:{xs:'60%',md:'10%'},textAlign:'left',paddingRight:{md:'100px'}}}>{ratingLabels[rating]}</Typography>
           
                     <ProgressBar value={count}/>
               
            
            </Box>
        })}
    </Grid>
    </Grid>
    
    </Grid>
       
   <Grid
  sx={{
    width: { xs: "100%", md: "100%" },
    padding: {
      xs: "12px",
      md: "40px 112px",
    },
  
    display: "flex",
  
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    marginTop: { md: "-10px" },
  }}
>
  {/* Rating */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "4px",
      marginBottom: "12px",
      
    }}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <Box
        key={star}
        component="span"
        onClick={() => setRating(star)}
        sx={{
          fontSize: "24px",
          cursor: "pointer",
          color: star <= rating ? "#F5A623" : "#D9D9D9",
          lineHeight: 1,
        }}
      >
        ★
      </Box>
    ))}
  </Box>

  {/* Comment */}
  {/* <Input
  value={comment}
    onChange={(e) => {
      setComment(e.target.value);
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSubmitComment(e);
      }
    }}
    disableUnderline
    sx={{
      border: `1px solid ${colors.textBanner}`,
      width: "100%",
      padding: "16px 24px",
      borderRadius: "7px",

      "&:before": {
        borderBottom: "none",
      },

      "&:after": {
        borderBottom: "none",
      },

      "&:hover:not(.Mui-disabled, .Mui-error):before": {
        borderBottom: "none",
      },

      "&:focus-within": {
        borderColor: colors.textBanner,
      },
    }}
    placeholder="Leave Comment"
  /> */}
  <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "stretch", sm: "flex-end" },
    gap: { xs: 1.5, sm: 2 },
    width: "100%",

    
    
    
  }}
>
  <Input
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    onKeyDown={(e) => {
   
      if (!isMobile && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (canSubmit) handleSubmitComment(e);
      }
    }}
    multiline
    minRows={isMobile ? 3 : 2}
    maxRows={8}
    disableUnderline
    placeholder="Leave Comment"
    sx={{
      flex: 1,
      width: "100%",
      border: `1px solid ${colors.textBanner}`,
      padding: { xs: "12px 16px", sm: "16px 24px" },
      borderRadius: "7px",
      fontSize: { xs: 14, sm: 16 },

      "&:before": { borderBottom: "none" },
      "&:after": { borderBottom: "none" },
      "&:hover:not(.Mui-disabled, .Mui-error):before": {
        borderBottom: "none",
      },
      "&:focus-within": { borderColor: colors.textBanner },
    }}
  />

  <Button
   disabled={
    !canSubmit ||
    useAddReviewProduct.isPending ||
    UpdateReviewMutation.isPending
  }
    variant="contained"

    onClick={handleSubmitComment}
    sx={{
      bgcolor: "#1f1d21",
      color: "#fff",
      textTransform: "none",
      borderRadius: "7px",
      px: 4,
      py: { xs: 1.4, sm: 1.8 },
      width: { xs: "100%", sm: "auto" },
      "&:hover": { bgcolor: "#333" },
      "&.Mui-disabled": { bgcolor: "#d0d0d0", color: "#fff" },
    }}
  >
{UpdateReviewMutation.isPending || useAddReviewProduct.isPending
    ? "Saving..."
    : "Submit"}
  </Button>
</Box>
</Grid>
  
    </Box>
    <Box sx={{display:'flex',flexDirection:'column',gap:{xs:'24px',md:'48px'}}}>
        {reviews && reviews.map((review:IReviewType,index:number)=>{
       return  <Box sx={{padding:{xs: "12px",
            md: "0 112px"},display:'flex',flexDirection:'column',gap:'12px',justifyContent:'flex-start',marginTop:{md:'-215px',xs:'-20px'},marginBottom:{md:'-85px'}}} key={index}>

            <ReviewItem userId={review.userId} comment={review.comment} rating={review.rating}/>
            
        </Box>
    })}
    </Box>
  

    </>
  )
}
