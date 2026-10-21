
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { colors } from "@/constants/colors";

const ink = colors.charocal;
const muted = colors.charocal;
const line = `1px solid ${colors.charocal}`;
const font = "'Poppins', system-ui, sans-serif";

// ===============================
// Shell
// ===============================

const Shell = ({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: ReactNode;
}) => (
  <Box
    component="main"
    sx={{
      fontFamily: font,
      color: ink,
      maxWidth: 1100,
      mx: "auto",
      px: 3,
      pt: 6,
      pb: 12,
    }}
  >
<Box
  component="header"
  sx={{
    width: "fit-content",
    borderBottom: line,
    pb: 2,
    mb: 1,
  }}
>
      <Typography
        component="h1"
        sx={{
          fontFamily: font,
          fontWeight: 600,
          fontSize: { xs: 30, md: 40 },
          mb: 1.5,
        }}
      >
        {title}
      </Typography>

      {lead && (
        <Typography
          sx={{
            fontFamily: font,
            color: muted,
            lineHeight: 1.7,
            maxWidth: "68ch",
          }}
        >
          {lead}
        </Typography>
      )}
    </Box>

    {children}
  </Box>
);

// ===============================
// Field
// ===============================

const Field = (props: React.ComponentProps<typeof TextField>) => (
  <TextField
    fullWidth
    {...props}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        fontFamily: font,

        "& fieldset": {
          borderColor: ink,
        },

        "&:hover fieldset": {
          borderColor: ink,
        },

        "&.Mui-focused fieldset": {
          borderColor: ink,
        },
      },

      "& .MuiInputLabel-root": {
        fontFamily: font,
        color: muted,
      },

      "& .MuiInputLabel-root.Mui-focused": {
        color: ink,
      },

      ...props.sx,
    }}
  />
);

// ===============================
// Button
// ===============================

const Btn = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => (
  <Button
    variant="contained"
    disableElevation
    {...props}
    sx={{
      bgcolor: ink,
      color: "#fff",
      borderRadius: 2,
      px: 4,
      py: 1.5,
      fontFamily: font,
      fontWeight: 500,
      fontSize: 16,
      textTransform: "none",

      "&:hover": {
        bgcolor: "#333",
      },

      ...props.sx,
    }}
  >
    {children}
  </Button>
);

// ===============================
// FindOrder
// ===============================

export const FindOrder = () => {
  const [found, setFound] = useState(false);

  const stages = ["Placed", "Packed", "Shipped", "Delivered"];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFound(true);
  };

  return (
    <Shell
      title="Find an order"
      lead="Enter your order number and the email used at checkout."
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gap: 2,
          maxWidth: 480,
          mt: 4,
        }}
      >
        <Field
          label="Order ID"
          placeholder="e.g. CY-102934"
          required
        />

        <Field
          label="Email"
          type="email"
          required
        />

        <Btn type="submit">
          Track order
        </Btn>
      </Box>

      {found && (
        <Stack
          direction="row"
          aria-live="polite"
          sx={{
            mt: 3,
            maxWidth: 560,
          }}
        >
          {stages.map((stage, index) => (
            <Typography
              key={stage}
              sx={{
                flex: 1,
                textAlign: "center",
                fontSize: 13,
                fontFamily: font,
                pt: 1.5,
                borderTop: `4px solid ${
                  index <= 2 ? ink : "#ddd"
                }`,
                fontWeight: index <= 2 ? 600 : 400,
              }}
            >
              {stage}
            </Typography>
          ))}
        </Stack>
      )}
    </Shell>
  );
};

export default FindOrder;
