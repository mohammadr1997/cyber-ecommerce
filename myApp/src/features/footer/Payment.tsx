
import { type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "@/constants/colors";

const ink = colors.charocal;
const muted = colors.charocal;
const line = `1px solid ${colors.charocal}`;
const font = "'Poppins', system-ui, sans-serif";



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
// Payment
// ===============================

export const Payment= () => (
  <Shell
    title="Payment"
    lead="Pick the method that works for you. Every payment is encrypted."
  >
    <Section title="Payment methods">
      <Boxes
        items={[
          ["Cards", "Visa, Mastercard, American Express."],
          ["Digital wallets", "Apple Pay and Google Pay."],
          ["Bank transfer", "Pay by invoice."],
        ]}
      />
    </Section>

    <Section title="Payment security">
      <Body>
        We never store your full card number. Payments are processed over a
        secure connection with 3-D Secure verification.
      </Body>
    </Section>

    <Section title="Order and transaction status">
      <Body>
        Check your payment in your orders. Failed payments are refunded within
        5 business days.
      </Body>
    </Section>
  </Shell>
);

export default Payment;
