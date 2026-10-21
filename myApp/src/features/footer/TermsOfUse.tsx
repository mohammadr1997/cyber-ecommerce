
import {type  ReactNode } from "react";
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
// TermsOfUse
// ===============================

export const TermsOfUse = () => {
  const sections: [string, string][] = [
    [
      "Site rules",
      "By using this site you agree to use it lawfully and not to interfere with its operation.",
    ],
    [
      "Purchase rules",
      "Prices and availability can change. A contract is formed when we confirm your order.",
    ],
    [
      "User account",
      "Keep your sign-in details private. You are responsible for activity under your account.",
    ],
    [
      "Payment and orders",
      "Payment is taken at checkout. We may cancel orders we cannot fulfill and will refund you in full.",
    ],
  ];

  return (
    <Shell
      title="Terms of the use of site"
      lead="Last updated: October 2026"
    >
      {sections.map(([title, description]) => (
        <Section key={title} title={title}>
          <Body>{description}</Body>
        </Section>
      ))}
    </Shell>
  );
};

export default TermsOfUse;
