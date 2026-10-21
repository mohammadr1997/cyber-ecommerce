
import { type ReactNode } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
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
// FAQ
// ===============================

type Pair = [string, string];

const Faq = ({ items }: { items: Pair[] }) => (
  <Box>
    {items.map(([question, answer]) => (
      <Accordion
        key={question}
        disableGutters
        elevation={0}
        square
        sx={{
          borderBottom: line,
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <Typography
              sx={{
                fontSize: 22,
                fontFamily: font,
              }}
            >
              +
            </Typography>
          }
          sx={{
            px: 0,
            "& .MuiAccordionSummary-content": {
              my: 2,
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: font,
              fontWeight: 500,
            }}
          >
            {question}
          </Typography>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            px: 0,
            pt: 0,
          }}
        >
          <Body>{answer}</Body>
        </AccordionDetails>
      </Accordion>
    ))}
  </Box>
);

// ===============================
// FAQ Data
// ===============================

const faqShort: Pair[] = [
  [
    "How long does delivery take?",
    "Most orders arrive in 2–5 business days.",
  ],
  [
    "Can I return an item?",
    "Yes, within 14 days if it is unused and in original packaging.",
  ],
  [
    "Is my payment secure?",
    "All payments are encrypted and processed by certified providers.",
  ],
];

// ===============================
// ExchangeReturns
// ===============================

export const ExchangeReturns = () => (
  <Shell
    title="Exchange and returns of goods"
    lead="Changed your mind? You have 14 days."
  >
    <Section title="Exchange conditions">
      <Body>
        Items can be exchanged for another size, color or model if they are
        unused and in original packaging.
      </Body>
    </Section>

    <Section title="Return conditions">
      <Body>
        Refunds go back to your original payment method within 7 days of us
        receiving the item.
      </Body>
    </Section>

    <Section title="How to request">
      <Steps
        items={[
          'Open your order and choose "Return or exchange".',
          "Print the prepaid label.",
          "Send the parcel and track the refund.",
        ]}
      />
    </Section>

    <Section title="Quick answers">
      <Faq items={faqShort} />
    </Section>
  </Shell>
);

export default ExchangeReturns;
