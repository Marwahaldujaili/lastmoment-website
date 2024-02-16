import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Contact = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        color: "#8c3027",
      }}
    >
      <Card
        sx={{
          width: 200,
          maxWidth: 300,
          backgroundColor: "#f0f8ff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div" color="#8c3027">
            Instagram
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Follow us on Instagram
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="instagram"
            href="https://instagram.com/last.moment.per"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#8c3027",
              "&:hover": {
                color: "#f05b3f", // Darker shade on hover
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight white background on hover
              },
            }}
          >
            <InstagramIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </CardActions>
      </Card>
      <Card
        sx={{
          width: 200,
          maxWidth: 300,
          backgroundColor: "#f0f8ff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div" color="#8c3027">
            WhatsApp
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Message us on WhatsApp
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="whatsapp"
            href="https://wa.me/00971565644665"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#8c3027",
              "&:hover": {
                color: "#f05b3f", // Darker shade on hover
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight white background on hover
              },
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </CardActions>
      </Card>
      <Card
        sx={{
          width: 200,
          maxWidth: 300,
          backgroundColor: "#f0f8ff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div" color="#8c3027">
            Email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact us via email
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="email"
            href="mailto:Info@lastmomentper.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#8c3027",
              "&:hover": {
                color: "#f05b3f", // Darker shade on hover
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight white background on hover
              },
            }}
          >
            <EmailIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Contact;
