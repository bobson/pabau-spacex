import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";

import { LaunchesPast } from "../types";

export default function MissionCard({ mission }: { mission: LaunchesPast }) {
  const { mission_name, launch_date_local, links } = mission;

  const cardImage =
    links.flickr_images[0] ||
    "https://live.staticflickr.com/65535/50617619668_d680d7319c_o.jpg";

  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "auto",
        height: "100%",
      }}
    >
      <Link
        to={`${mission.rocket.rocket.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={cardImage}
            alt="rocket"
          />

          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {mission_name}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              Rocket: {mission.rocket.rocket_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(launch_date_local).toDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
