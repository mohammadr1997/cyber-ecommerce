import { Box, Stack } from "@mui/material";
import type { ComponentProps, ComponentType } from "react";
import type { IBanner } from "@/apis/bannerApi";
import Banner from "./Banner";
import CategoryPagination from "./CategoryPagination";
import useGetBanner from "../hooks/useGetBanner";
import ProductListUser from "./ProductListUser";
import Loading from "@/features/loading/loading";

import ErrorComp from "@/features/error/Error";

const StackWithExistingFlexWrap = Stack as ComponentType<
  ComponentProps<typeof Stack> & { flexWrap?: { md: string } }
>;

export default function ProductContainer() {
  
  const { data, isLoading, isError } = useGetBanner();

if (isLoading) {
  return <Loading variant="section" text="Loading banners..." />;
}
  
if (isError) {
  return (
    <ErrorComp
      variant="section"
      text="Failed to load banners."
      onRetry={() => window.location.reload()}
    />
  );
}


  const banners: IBanner[] = data?.data || [];

  const bigBanners = banners.filter((banner) => banner.type === "banner");
  const smallBanners = banners.filter((banner) => banner.type === "small");

  const firstBigBanner = bigBanners[0];
  const lastBigBanners = bigBanners.slice(1);
  

  return (
    <>
      {firstBigBanner && (
        <Banner
          key={firstBigBanner._id}
          type={firstBigBanner.type}
          imageUrl={firstBigBanner.imageUrl}
          description={firstBigBanner.description || ""}
          name={firstBigBanner.title}
        />
      )}

     
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          padding: "0px",
          gap: 4,
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
        }}
      >
  
        <StackWithExistingFlexWrap
          direction={{ xs: "column", md: "column" }}
          flexWrap={{ md: "wrap" }}
          useFlexGap
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            padding:'25px',
            width: { xs: "100%", md: "50%" },
          }}
        >
          {smallBanners.map((banner) => (
            <Banner
              key={banner._id}
              type={banner.type}
              imageUrl={banner.imageUrl}
              description={banner.description || ""}
              name={banner.title}
            />
          ))}
        </StackWithExistingFlexWrap>

     
        <Stack
          direction="column"
          spacing={4}
          sx={{
            width: { xs: "100%", md: "50%" },
            margin:'0'
          }}
        >
          {lastBigBanners.map((banner) => (
            <Banner
              key={banner._id}
              type={banner.type}
              imageUrl={banner.imageUrl}
              description={banner.description || ""}
              name={banner.title}
              lastOrFirst='last'
            />
          ))}
        </Stack>
      </Box>

      <CategoryPagination />

      <ProductListUser/>

      

    </>
  );
}