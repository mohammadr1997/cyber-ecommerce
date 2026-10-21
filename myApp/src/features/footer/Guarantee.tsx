
import { type ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
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
// Steps
// ===============================

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
// Guarantee
// ===============================

export const Guarantee = () => (
  <Shell
    title="Guarantee"
    lead="Every product comes with a 24-month manufacturer guarantee."
  >
    <Section title="Guarantee terms">
      <Body>
        The guarantee starts on the delivery date and covers defects that were
        present at purchase.
      </Body>
    </Section>

    <Section title="What is covered">
      <Boxes
        items={[
          ["Covered", "Manufacturing defects, faulty parts."],
          [
            "Not covered",
            "Drops, liquid damage, unauthorized repairs.",
          ],
        ]}
      />
    </Section>

    <Section title="How to file a claim">
      <Steps
        items={[
          'Open your order and choose "Guarantee claim".',
          "Describe the problem and upload photos.",
          "We reply within 2 business days.",
        ]}
      />
    </Section>
  </Shell>
);

export default Guarantee;
