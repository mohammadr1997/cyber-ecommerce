
import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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
// Boxes
// ===============================

type Pair = [string, string];

const Boxes = ({ items }: { items: Pair[] }) => (
  <Box
    sx={{
      display: "grid",
      gap: 2,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 320px))",
      justifyContent: "start",
    }}
  >
    {items.map(([t, d]) => (
      <Box
        key={t}
        sx={{
          border: line,
          borderRadius: 2,
          p: 2.5,
          minHeight: 130,
          height: 130,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
          {t}
        </Typography>

        <Typography
          sx={{
            fontFamily: font,
            color: muted,
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {d}
        </Typography>
      </Box>
    ))}
  </Box>
);

// ===============================
// Button
// ===============================

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

// ===============================
// Field
// ===============================

const Field = (props: React.ComponentProps<typeof TextField>) => (
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

// ===============================
// Chip
// ===============================

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

// ===============================
// Blog
// ===============================

export const Blog = () => {
 const [cat, setCat] = useState("All");
const [search, setSearch] = useState("");

  const posts: Pair[] = [
    ["How to choose a laptop", "Guides"],
    ["New arrivals this month", "News"],
    ["Care tips for your headphones", "Guides"],
    ["Autumn sale picks", "News"],
  ];

  const noSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Shell title="Blog">
      {/* Featured Article */}
      <Box
     sx={{
    mt: 4,
    width: "100%",
    maxWidth: 900,
    mx: "auto",

    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "1.2fr 1fr",
    },

    border: line,
    borderRadius: 2,
    overflow: "hidden",
  justifyContent: "center",

    alignItems: "center",
  }}
      >
      <Box
  component="img"
   src="https://www.jd-link.com/uploadfiles/2025/03/20250310141635303.jpg"
  alt="Modern electronics and technology"
  loading="lazy"
  sx={{
    width: "100%",
    height: "100%",
    minHeight: 220,
    objectFit: "cover",
    display: "block",
  }}
/>

        <Box sx={{ p: 3.5 }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: font,
              fontWeight: 600,
              fontSize: 22,
              mb: 0,
              width: "100%",
              textAlign:'left',
              margin:'0 auto'
             
            }}
          >
            The smart way to buy electronics
          </Typography>

          <Typography sx={{ mt: 1.5 ,textAlign:'left',margin:'0 auto'}}>
            What to compare, what to ignore, and when to wait for a sale.
          </Typography>

          <Btn
            component={Link}
            to="/blog/featured"
            sx={{ mt: 2,width:'100%' }}
          >
            Read article
          </Btn>
        </Box>
      </Box>

      {/* All Articles */}
      <Section title="All articles">
        <Stack
          direction="row"
          useFlexGap
          sx={{
            flexWrap: "wrap",
            gap: 1.25,
            mb: 2.5,
            alignItems: "center",
          }}
        >
          {["All", "Guides", "News"].map((category) => (
            <Chip
              key={category}
              active={cat === category}
              onClick={() => setCat(category)}
            >
              {category}
            </Chip>
          ))}

<Field
  type="search"
  size="small"
  placeholder="Search articles"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  slotProps={{
    htmlInput: {
      "aria-label": "Search articles",
    },
  }}
  sx={{ width: 220 }}
/>
        </Stack>

     <Boxes
  items={posts.filter(([title, category]) => {
    const matchesCategory =
      cat === "All" || category === cat;

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  })}
/>
      </Section>

      
      <Section title="Newsletter">
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
            label="Email"
            type="email"
            required
          />

          <Btn type="submit">
            Subscribe
          </Btn>
        </Box>
      </Section>
    </Shell>
  );
};

export default Blog;
