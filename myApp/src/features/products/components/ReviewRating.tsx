import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

 interface IReviewRatingType{
  value:number
 }
export default function ReviewRating({value}:IReviewRatingType) {
  

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center', justifyContent:'center'}}>
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
     
    </Box>
  );
}
