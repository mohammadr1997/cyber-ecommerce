
import type { ReactNode } from "react";
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

type Pair = [string, string];



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

/* ---------- FAQ Data ---------- */

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

/* ---------- Page ---------- */

export const CreditPayment = () => (
  <Shell
    title="Credit and payment"
    lead="Pay now or split your purchase into monthly installments."
  >
    <Section title="Payment methods">
      <Boxes
        items={[
          [
            "Card",
            "Visa, Mastercard, American Express.",
          ],
          [
            "Installments",
            "Split into 3, 6 or 12 months.",
          ],
          [
            "Bank transfer",
            "Pay directly from your bank.",
          ],
        ]}
      />
    </Section>

    <Section title="How to pay on credit">
      <Steps
        items={[
          "Choose “Credit” at checkout.",
          "Select your installment plan.",
          "Confirm with your bank.",
        ]}
      />
    </Section>

    <Section title="Credit information">
      <Body>
        Credit is subject to approval. The total cost, interest
        rate and monthly amount are shown before you confirm.
      </Body>
    </Section>

    <Section title="Quick answers">
      <Faq items={faqShort} />
    </Section>
  </Shell>
);

export default CreditPayment;
