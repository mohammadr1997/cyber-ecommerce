
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { colors } from "@/constants/colors";

/* ---------- Tokens ---------- */

const ink = colors.charocal;
const muted = colors.charocal;
const line = `1px solid ${colors.charocal}`;
const font = "'Poppins', system-ui, sans-serif";

const noSubmit = (e: FormEvent) => e.preventDefault();

/* ---------- Shared building blocks ---------- */

const Shell = ({
  title,
  lead,
  cta,
  children,
}: {
  title: string;
  lead?: string;
  cta?: ReactNode;
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
        borderBottom: line,
        pb: 4,
        mb: 1,
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontFamily: font,
          fontWeight: 600,
          fontSize: {
            xs: 30,
            md: 40,
          },
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
            mb: cta ? 2 : 0,
          }}
        >
          {lead}
        </Typography>
      )}

      {cta}
    </Box>

    {children}
  </Box>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <Box component="section">
    <Typography
      component="h2"
      sx={{
        fontFamily: font,
        fontWeight: 600,
        fontSize: 22,
        mt: 6,
        mb: 2,
      }}
    >
      {title}
    </Typography>

    {children}
  </Box>
);

const Field = (
  props: React.ComponentProps<typeof TextField>
) => (
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

const Btn = ({
  children,
  ...p
}: React.ComponentProps<typeof Button>) => (
  <Button
    variant="contained"
    disableElevation
    {...p}
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

      ...p.sx,
    }}
  >
    {children}
  </Button>
);

const Chip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <Button
    onClick={onClick}
    aria-pressed={active}
    disableElevation
    sx={{
      border: line,
      borderRadius: 2,
      px: 2.5,
      py: 1.25,
      fontFamily: font,
      textTransform: "none",

      color: active ? "#fff" : ink,
      bgcolor: active ? ink : "#fff",

      "&:hover": {
        bgcolor: active ? "#333" : "#f3f3f3",
      },
    }}
  >
    {children}
  </Button>
);

/* ---------- Page ---------- */

export const GiftCards = () => {
  const [amount, setAmount] = useState(50);
  const [design, setDesign] = useState("Classic");

  return (
    <Shell
      title="Gift cards"
      lead="Let them choose what they love. Delivered by email in minutes."
    >
      <Box
        sx={{
          display: "grid",
          gap: 6,
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
        }}
      >
        {/* Amount & Design */}

        <Box>
          <Section title="Choose an amount">
            <Stack
              direction="row"
              useFlexGap
              sx={{
                flexWrap: "wrap",
                gap: 1.25,
              }}
            >
              {[25, 50, 100, 200].map((a) => (
                <Chip
                  key={a}
                  active={amount === a}
                  onClick={() => setAmount(a)}
                >
                  {a} €
                </Chip>
              ))}
            </Stack>
          </Section>

          <Section title="Choose a design">
            <Stack
              direction="row"
              useFlexGap
              sx={{
                flexWrap: "wrap",
                gap: 1.25,
              }}
            >
              {["Classic", "Birthday", "Thank you"].map((d) => (
                <Chip
                  key={d}
                  active={design === d}
                  onClick={() => setDesign(d)}
                >
                  {d}
                </Chip>
              ))}
            </Stack>
          </Section>
        </Box>

        {/* Recipient Details */}

        <Box>
          <Section title="Recipient details">
            <Box
              component="form"
              onSubmit={noSubmit}
              sx={{
                display: "grid",
                gap: 2,
                maxWidth: 480,
              }}
            >
              <Field
                label="Recipient name"
                required
              />

              <Field
                label="Recipient email"
                type="email"
                required
              />

              <Field
                label="Message"
                multiline
                rows={3}
              />

              <Btn type="submit">
                Buy gift card · {amount} €
              </Btn>
            </Box>
          </Section>
        </Box>
      </Box>
    </Shell>
  );
};

export default GiftCards;
