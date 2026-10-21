
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "@/constants/colors";

/* ---------- Tokens ---------- */

const ink = colors.charocal;
const muted = colors.charocal;
const line = `1px solid ${colors.charocal}`;
const font = "'Poppins', system-ui, sans-serif";

type Pair = [string, string];

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

const Boxes = ({ items }: { items: Pair[] }) => (
  <Box
    sx={{
      display: "grid",
      gap: 2,
      gridTemplateColumns:
        "repeat(auto-fit, minmax(240px, 1fr))",
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

const Steps = ({ items }: { items: string[] }) => (
  <Stack spacing={1.5}>
    {items.map((step, index) => (
      <Stack
        key={step}
        direction="row"
        spacing={2}
        sx={{
          alignItems: "flex-start",
          borderBottom: "1px solid #e3e3e3",
          pb: 1.5,
        }}
      >
        <Box
          sx={{
            flex: "none",
            width: 28,
            height: 28,
            borderRadius: "50%",
            bgcolor: ink,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontSize: 13,
            fontFamily: font,
          }}
        >
          {index + 1}
        </Box>

        <Typography
          sx={{
            fontFamily: font,
            color: muted,
            lineHeight: "28px",
          }}
        >
          {step}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

type BtnProps = React.ComponentProps<typeof Button> & {
  component?: typeof Link;
  to?: string;
};

const Btn = ({
  children,
  ...props
}: BtnProps) => (
  <Button
    variant="contained"
    disableElevation
    {...(props as React.ComponentProps<typeof Button>)}
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

/* ---------- Page ---------- */

export const ServiceContracts = () => (
  <Shell
    title="Service contracts"
    lead="Extended support for your devices after the standard warranty ends."
    cta={
      <Btn
        component={Link}
        to="/faq"
      >
        Learn more
      </Btn>
    }
  >
    <Section title="Benefits">
      <Boxes
        items={[
          [
            "Repairs covered",
            "Parts and labor at no extra cost.",
          ],
          [
            "Priority support",
            "Skip the queue with a dedicated line.",
          ],
          [
            "Replacement",
            "Get a replacement if repair isn’t possible.",
          ],
        ]}
      />
    </Section>

    <Section title="How to activate">
      <Steps
        items={[
          "Choose a contract when you add the product to your cart.",
          "Pay with your order.",
          "Your contract activates when the product is delivered.",
        ]}
      />
    </Section>
  </Shell>
);

export default ServiceContracts;
