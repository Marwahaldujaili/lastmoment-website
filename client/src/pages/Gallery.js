import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "../styles/Gallery.scss";
import Box from "@mui/material/Box";
import img2 from "../assets/images/gallery/img2.jpeg";
import img6 from "../assets/images/gallery/img6.jpeg";
import img12 from "../assets/images/gallery/img12.jpeg";
import img16 from "../assets/images/gallery/img16.jpeg";
import img33 from "../assets/images/gallery/img33.jpeg";
import img14 from "../assets/images/gallery/img14.jpeg";
import img30 from "../assets/images/gallery/img30.jpeg";
import img32 from "../assets/images/gallery/img32.jpeg";
import img27 from "../assets/images/gallery/img27.jpeg";
import img8 from "../assets/images/gallery/img8.jpeg";
import img11 from "../assets/images/gallery/img11.jpeg";
import img24 from "../assets/images/gallery/img24.jpeg";

export default function Gallery() {
  return (
    <ImageList
      sx={{ width: 300, height: "auto", margin: "auto" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <Box
            sx={{
              display: "block",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              "&:hover": {
                "& img": {
                  transform: "scale(1.3)",
                },
              },
              transition: "transform .3s ease-in-out",
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform .3s ease-in-out",
              }}
            />
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: img6,
    title: "Powdery",
    rows: 2,
    cols: 2,
  },
  {
    img: img2,
    title: "Vintage",
  },
  {
    img: img14,
    title: "Soft linen",
  },
  {
    img: img12,
    title: "Gift Set",
    cols: 2,
  },
  {
    img: img27,
    title: "Perfume Set",
    cols: 2,
  },
  {
    img: img32,
    title: "Sunshine",
    rows: 2,
    cols: 2,
  },
  {
    img: img8,
    title: "Soft linen",
  },
  {
    img: img11,
    title: "Soft linen",
  },
  {
    img: img24,
    title: "Soft linen",
    rows: 2,
    cols: 4,
  },
  {
    img: img16,
    title: "Soft linen",
  },
  {
    img: img11,
    title: "Soft linen",
  },
  {
    img: img30,
    title: "Soft linen",
  },
  {
    img: img33,
    title: "Soft linen",
  },
];
