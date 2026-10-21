
import { type FormEvent, type ReactNode } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { colors } from "@/constants/colors";

// ===============================
// Design tokens
// ===============================

const ink = colors.charocal;
const muted = colors.charocal;
const line = `1px solid ${colors.charocal}`;
const font = "'Poppins', system-ui, sans-serif";

// ===============================
// Shared UI
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
        pb: 2,
        mb: 1,
      }}
    >
      <Typography
        component="h1"
        sx={{
          display: "block",
          fontFamily: font,
          fontWeight: 600,
          fontSize: { xs: 30, md: 40 },
          pb: 1,
          borderBottom: line,
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
            mt: 1.5,
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
// Info Boxes
// ===============================

const Boxes = ({ items }: { items: [string, string][] }) => (
  <Box
    sx={{
      display: "grid",
      gap: 2,
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
      },
    }}
  >
    {items.map(([title, description]) => (
      <Box
        key={title}
        sx={{
          border: line,
          borderRadius: 2,
          p: 2.5,
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontFamily: font,
            fontWeight: 600,
            fontSize: 16,
            mb: 0.75,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: font,
            color: muted,
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {description}
        </Typography>
      </Box>
    ))}
  </Box>
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
// Contact Form
// ===============================

const formSx = {
  display: "grid",
  gap: 2,
  width: "100%",
};

// ===============================
// Prevent submit
// ===============================

const noSubmit = (e: FormEvent) => {
  e.preventDefault();
};

// ===============================
// Contact
// ===============================

export const Contact = () => (
  <Shell
    title="Contact"
    lead="We reply within one business day."
  >
    {/* =================================
        Contact Content
    ================================= */}

    <Box
      sx={{
        mt: 4,
        display: "grid",
        gap: {
          xs: 5,
          md: 6,
        },
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
        },
        alignItems: "start",
      }}
    >
      {/* =================================
          Contact Form
      ================================= */}

      <Box
        component="form"
        onSubmit={noSubmit}
        sx={formSx}
      >
        <Field
          label="Name"
          required
        />

        <Field
          label="Email"
          type="email"
          required
        />

        <Field
          label="Message"
          multiline
          rows={5}
          required
        />

        <Btn
          type="submit"
          sx={{
            justifySelf: "start",
            width:'100%'
          }}
        >
          Send message
        </Btn>
      </Box>

      {/* =================================
          Contact Information
      ================================= */}

      <Boxes
        items={[
          ["Email", "support@cyber.com"],
          ["Phone", "+1 (503) 000-0000"],
          ["Address", "Portland, OR, USA"],
        ]}
      />
    </Box>

    {/* =================================
        Map
    ================================= */}

    <Box
      sx={{
        mt: {
          xs: 5,
          md: 6,
        },
        width: "100%",
        height: {
          xs: 280,
          md: 360,
        },
        border: line,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <iframe
        title="Store location in Portland"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-122.6865%2C45.5181%2C-122.6665%2C45.5281&layer=mapnik&marker=45.5231%2C-122.6765"
        style={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
        loading="lazy"
      />
    </Box>
  </Shell>
);

export default Contact;
