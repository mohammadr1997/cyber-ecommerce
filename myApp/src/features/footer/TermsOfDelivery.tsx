
import { type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
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
        pb: 2,
        mb: 1,
      }}
    >
      <Typography
        component="h1"
        sx={{
          display: "inline-block",
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
// Section
// ===============================

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

// ===============================
// Body
// ===============================

const Body = ({ children }: { children: ReactNode }) => (
  <Typography
    sx={{
      fontFamily: font,
      color: muted,
      lineHeight: 1.7,
      maxWidth: "68ch",
    }}
  >
    {children}
  </Typography>
);

// ===============================
// Boxes
// ===============================

type Pair = [string, string];

const Boxes = ({ items }: { items: Pair[] }) => (
  <Box
    sx={{
      display: "grid",
      gap: 2,
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
// TermsOfDelivery
// ===============================

export const TermsOfDelivery = () => (
  <Shell
    title="Terms of delivery"
    lead="How and when your order reaches you."
  >
    <Section title="Shipping methods">
      <Boxes
        items={[
          ["Courier", "Delivered to your door."],
          ["Pickup point", "Collect at a nearby location."],
          ["Express", "Next-day delivery in major cities."],
        ]}
      />
    </Section>

    <Section title="Delivery time and cost">
      <Boxes
        items={[
          ["Standard", "2–5 business days · 4.90 €"],
          ["Express", "1 business day · 9.90 €"],
          ["Free shipping", "On orders over 100 €"],
        ]}
      />
    </Section>

    <Section title="Delivery conditions">
      <Body>
        Check the package in front of the courier. If it is damaged, tell us
        within 48 hours.
      </Body>
    </Section>
  </Shell>
);

export default TermsOfDelivery;
