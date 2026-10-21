import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
 
  Typography,
} from "@mui/material"
import { useGetMeQuery } from "@/hooks/useGetMeQuery"
import EditProfileDialog from "./EditProfile"
import ProductSkeleton from "@/features/loading/productSkeleton"

const DARK = "#171212"

const cardSx = {
  border: `1px solid ${DARK}`,
  borderRadius: "12px",
  p: 4,
}

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-"

function InfoItem({ label, value }: { label: string; value?: string }) {
   
  return (
    <Box sx={{ py: 2, borderBottom: "1px solid #e5e7eb" }}>
      <Typography sx={{ fontSize: 14, color: "#6b7280", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography
        sx={{ fontSize: 16, fontWeight: 500, color: DARK, wordBreak: "break-all" }}
      >
        {value || "-"}
      </Typography>
   
    </Box>
  )
}



export default function Profile() {
    const [editOpen,setEditOpen]=useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const { data, isLoading, isError } = useGetMeQuery()
  const user = data?.data?.user

  useEffect(() => {
    if (!token) navigate("/sign-in")
  }, [token, navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/sign-in")
  }

  if (isLoading) return <ProductSkeleton count={3} />

  if (isError || !user) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 600, color: DARK }}>
          Something went wrong
        </Typography>
        <Typography sx={{ color: "#6b7280" }}>
          We couldn't load your profile.
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{
            bgcolor: DARK,
            color: "#fff",
            borderRadius: "8px",
            px: 4,
            py: 1.5,
            fontWeight: 600,
            "&:hover": { bgcolor: DARK, opacity: 0.9 },
          }}
        >
          TRY AGAIN
        </Button>
  
      </Container>
    )
  }

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography sx={{ fontSize: 36, fontWeight: 600, color: DARK }}>
        My Profile
      </Typography>
      <Divider sx={{ mt: 2, mb: 4, borderColor: DARK }} />

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", lg: "340px 1fr" },
        }}
      >
        {/* Left card */}
        <Box
          component="aside"
          sx={{
            ...cardSx,
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            src={user.avatar || undefined}
            alt={user.firstName}
            sx={{
              width: 112,
              height: 112,
              bgcolor: DARK,
              color: "#fff",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>

          <Typography
            sx={{
              mt: 2.5,
              fontSize: 24,
              fontWeight: 600,
              color: DARK,
              textTransform: "capitalize",
            }}
          >
            {user.firstName} {user.lastName}
          </Typography>
          <Typography
            sx={{ mt: 0.5, fontSize: 14, color: "#6b7280", wordBreak: "break-all" }}
          >
            {user.email}
          </Typography>

          <Chip
            label={user.role}
            sx={{
              mt: 2,
              bgcolor: "#f3f4f6",
              color: DARK,
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          />

          <Box
            sx={{
              mt: 4,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Button
            onClick={()=>setEditOpen(true)}
              fullWidth
              variant="contained"
              sx={{
                bgcolor: DARK,
                color: "#fff",
                borderRadius: "8px",
                py: 1.5,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { bgcolor: DARK, opacity: 0.9, boxShadow: "none" },
              }}
            >
              EDIT PROFILE
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: DARK,
                borderColor: DARK,
                borderRadius: "8px",
                py: 1.5,
                fontWeight: 600,
                "&:hover": { borderColor: DARK, bgcolor: "#f3f4f6" },
              }}
            >
              LOG OUT
              
            </Button>
          </Box>
          
        </Box>

        {/* Right column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={cardSx}>
            <Typography sx={{ fontSize: 20, fontWeight: 600, color: DARK }}>
              Personal information
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "grid",
                columnGap: 5,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              }}
            >
              <InfoItem label="First name" value={user.firstName} />
              <InfoItem label="Last name" value={user.lastName} />
              <InfoItem label="Email" value={user.email} />
              <InfoItem label="Role" value={user.role} />
            </Box>
          </Box>

          <Box sx={cardSx}>
            <Typography sx={{ fontSize: 20, fontWeight: 600, color: DARK }}>
              Account details
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "grid",
                columnGap: 5,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              }}
            >
              <InfoItem label="Member since" value={formatDate(user.createdAt)} />
              <InfoItem label="Last updated" value={formatDate(user.updatedAt)} />
              <InfoItem label="User ID" value={user._id} />
            </Box>
          </Box>
        </Box>

      </Box>
 <EditProfileDialog open={editOpen} onClose={()=>setEditOpen(false)} user={{
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email
 }}/>
    </Container>
  )
}