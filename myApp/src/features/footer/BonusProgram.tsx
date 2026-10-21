import type { ReactNode } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {colors} from "@/constants/colors";
/* ---------- Tokens ---------- */
const ink = colors.charocal;
const muted = colors.charocal;
const line = `1px solid ${colors.charocal}`;
const font = "'Poppins', system-ui, sans-serif";

type Pair = [string, string];

/* ---------- Shared building blocks ---------- */
const Shell = ({ title, lead, cta, children }: { title: string; lead?: string; cta?: ReactNode; children?: ReactNode }) => (
  <Box component="main" sx={{ fontFamily: font, color: ink, maxWidth: 1100, mx: "auto", px: 3, pt: 6, pb: 12 }}>
    <Box component="header" sx={{ borderBottom: line, pb: 4, mb: 1 }}>
      <Typography component="h1" sx={{ fontFamily: font, fontWeight: 600, fontSize: { xs: 30, md: 40 }, mb: 1.5 }}>
        {title}
      </Typography>
      {lead && <Typography sx={{ fontFamily: font, color: muted, lineHeight: 1.7, maxWidth: "68ch", mb: cta ? 2 : 0 }}>{lead}</Typography>}
      {cta}
    </Box>
    {children}
  </Box>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box component="section">
    <Typography component="h2" sx={{ fontFamily: font, fontWeight: 600, fontSize: 22, mt: 6, mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const Body = ({ children }: { children: ReactNode }) => (
  <Typography sx={{ fontFamily: font, color: muted, lineHeight: 1.7, maxWidth: "68ch" }}>{children}</Typography>
);

const Boxes = ({ items }: { items: Pair[] }) => (
  <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
    {items.map(([t, d]) => (
      <Box key={t} sx={{ border: line, borderRadius: 2, p: 2.5 }}>
        <Typography component="h3" sx={{ fontFamily: font, fontWeight: 600, fontSize: 16, mb: 0.75 }}>{t}</Typography>
        <Typography sx={{ fontFamily: font, color: muted, fontSize: 14, lineHeight: 1.7 }}>{d}</Typography>
      </Box>
    ))}
  </Box>
);

const Steps = ({ items }: { items: string[] }) => (
  <Stack spacing={1.5}>
    {items.map((s, i) => (
      <Stack key={s} direction="row" spacing={2} sx={{ alignItems: "flex-start", borderBottom: "1px solid #e3e3e3", pb: 1.5 }}>
        <Box sx={{ flex: "none", width: 28, height: 28, borderRadius: "50%", bgcolor: ink, color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontFamily: font }}>
          {i + 1}
        </Box>
        <Typography sx={{ fontFamily: font, color: muted, lineHeight: "28px" }}>{s}</Typography>
      </Stack>
    ))}
  </Stack>
);

const Btn = ({ children, ...p }: React.ComponentProps<typeof Button>) => (
  <Button
    variant="contained"
    disableElevation
    {...p}
    sx={{ bgcolor: ink, color: "#fff", borderRadius: 2, px: 4, py: 1.5, fontFamily: font, fontWeight: 500, fontSize: 16, textTransform: "none", "&:hover": { bgcolor: "#333" }, ...p.sx }}
  >
    {children}
  </Button>
);

/* ---------- Page ---------- */
export const BonusProgram = () => (
  <Shell title="Bonus program" lead="Earn points on every purchase and spend them on your next order." cta={<Btn>Get Bonus</Btn>}>
    <Section title="How the program works">
      <Body>Every 1 € you spend adds 1 point to your account. 100 points equal 1 € off.</Body>
    </Section>
    <Section title="How to earn points">
      <Boxes items={[["Purchases", "1 point per 1 € spent."], ["Reviews", "20 points for each product review."], ["Referrals", "100 points when a friend places a first order."]]} />
    </Section>
    <Section title="How to use your Bonus">
      <Steps items={["Add items to your cart.", "Open the cart and turn on “Use bonus points”.", "Choose how many points to apply, then check out."]} />
    </Section>
  </Shell>
);

export default BonusProgram;