import { useEffect, useState } from "react"
import {
 
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import  useUpdateMeMutation  from "../hooks/useUpdateMeMutation"

const DARK = "#171212"

type Props = {
  open: boolean
  onClose: () => void
  user: { firstName: string; lastName: string; email: string }
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": { borderColor: "#d1d5db" },
    "&:hover fieldset": { borderColor: DARK },
    "&.Mui-focused fieldset": { borderColor: DARK },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: DARK },
}

export default function EditProfileDialog({ open, onClose, user }: Props) {
  const { mutate, isPending,reset } = useUpdateMeMutation(onClose)

  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // هر بار که دیالوگ باز میشه، فرم با اطلاعات فعلی پر بشه
  useEffect(() => {
    if (open) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
      setErrors({})
      reset()
    }
  }, [open, user, reset])

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = "First name is required"
    if (!form.lastName.trim()) next.lastName = "Last name is required"
    if (!form.email.trim()) next.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    mutate(
      {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
      },
      { onSuccess: onClose }
    )
  }

  return (
   <Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="sm"
  slotProps={{
    paper: {
      sx: {
        borderRadius: "16px",
        border: "1px solid #e8e8e8",
      },
    },
  }}
>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogTitle sx={{ fontSize: 24, fontWeight: 600, color: DARK }}>
          Edit profile
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}
        >
          {/* {error && <Alert severity="error">{error}</Alert>} */}

          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              mt: 1,
            }}
          >
            <TextField
              label="First name"
              value={form.firstName}
              onChange={handleChange("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={fieldSx}
            />
            <TextField
              label="Last name"
              value={form.lastName}
              onChange={handleChange("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={fieldSx}
            />
          </Box>

          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            sx={fieldSx}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={isPending}
            variant="outlined"
            sx={{
              color: DARK,
              borderColor: DARK,
              borderRadius: "8px",
              px: 4,
              py: 1.2,
              fontWeight: 600,
              "&:hover": { borderColor: DARK, bgcolor: "#f3f4f6" },
            }}
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{
              bgcolor: DARK,
              color: "#fff",
              borderRadius: "8px",
              px: 4,
              py: 1.2,
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { bgcolor: DARK, opacity: 0.9, boxShadow: "none" },
            }}
          >
            {isPending ? "SAVING..." : "SAVE CHANGES"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}