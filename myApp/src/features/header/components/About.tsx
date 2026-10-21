
import {type ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
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

// ===============================
// About
// ===============================

export const About = () => (
  <Shell
    title="About us"
    lead="We make it easier to discover, compare and buy the technology you need."
  >
    <Section title="Who we are">
      <Body>
        We are an online electronics store focused on making technology
        shopping simple, transparent and convenient. From everyday devices
        to the latest products, we help customers find the right option
        without unnecessary complexity.
      </Body>
    </Section>

    <Section title="What we value">
      <Boxes
        items={[
          [
            "Quality",
            "We focus on reliable products from trusted brands.",
          ],
          [
            "Transparency",
            "Clear product information, pricing and purchase terms.",
          ],
          [
            "Customer first",
            "Helpful support before, during and after your purchase.",
          ],
        ]}
      />
    </Section>

    <Section title="Our approach">
      <Steps
        items={[
          "Help you understand the products and their key differences.",
          "Make product information and pricing easy to compare.",
          "Provide a simple and secure checkout experience.",
          "Support you after your order has been delivered.",
        ]}
      />
    </Section>

    <Section title="Our mission">
      <Body>
        Our mission is to create a straightforward shopping experience where
        customers can make informed decisions and feel confident about every
        purchase.
      </Body>
    </Section>
  </Shell>
);

export default About;
