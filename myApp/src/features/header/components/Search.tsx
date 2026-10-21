
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import searchIcon from "@/assets/icons/Search.png";
import { colors } from "@/constants/colors";
import useSearchProducts from "../hooks/useSearchProducts";
import { getProductImageUrl } from "@/constants/api";

export default function Search() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading, isError } =
    useSearchProducts(debouncedSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const products = data?.data ?? [];

  return (
    <Grid sx={{ display: { xs: "none", md: "block" } }}>
      <div
        style={{
          position: "relative",
          width: "433px",
        }}
      >
        <img
          src={searchIcon}
          alt="Search"
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            zIndex: 1,
          }}
        />

        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          style={{
            backgroundColor: colors.backgroundSecondary,
            height: "56px",
            width: "100%",
            padding: "16px 16px 16px 48px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
          placeholder="Search"
        />

        {debouncedSearch.length >= 2 && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              width: "100%",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              zIndex: 20,
              overflow: "hidden",
              maxHeight: "360px",
              overflowY: "auto",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  padding: "16px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Searching...
              </div>
            ) : isError ? (
              <div
                style={{
                  padding: "16px",
                  color: "#d32f2f",
                  fontSize: "14px",
                }}
              >
                Failed to search products.
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => {
                    if (!product._id) return;

                    navigate(`/catalog/product/${product._id}`);
                    setSearchValue("");
                    setDebouncedSearch("");
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor =
                      "#f7f7f7";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = "#fff";
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f1f1f1",
                    backgroundColor: "#fff",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <img
                    src={getProductImageUrl(product.mainImage)}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#222",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#666",
                        marginTop: "4px",
                      }}
                    >
                      ${product.price}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "16px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                No products found.
              </div>
            )}
          </div>
        )}
      </div>
    </Grid>
  );
}
