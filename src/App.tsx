import { Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MISSIONS } from "./graphql/queries";
import { useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MissionCard from "./components/MissionCard";
import RocketPage from "./components/RocketPage";
import { DataMissions } from "./types";

function App() {
  const [rocketId, setRocketId] = useState("");

  const { data, loading, error } = useQuery<DataMissions>(GET_MISSIONS);
  if (loading)
    return (
      <Container maxWidth="xl" sx={{ paddingTop: "100px" }}>
        <Grid container spacing={4} mb={4}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((mission, i) => (
            <Grid item xs={12} lg={4} xl={3} key={i}>
              <Box sx={{ margin: "auto", width: "30%" }}>
                <Skeleton variant="rectangular" width={300} height={118} />
                <Skeleton width={300} height={118} />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  if (error) return <p>Error :(</p>;
  console.log(rocketId);

  console.log(data);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container maxWidth="xl">
            <Typography
              mb={4}
              mt={6}
              textAlign="center"
              variant="h2"
              component="div"
            >
              Missions
            </Typography>
            <Grid container spacing={4} mb={4}>
              {data?.launchesPast.map((mission) => (
                <Grid
                  onClick={() => setRocketId(mission.rocket.rocket.id)}
                  item
                  xs={12}
                  lg={4}
                  xl={3}
                  key={mission.mission_name}
                >
                  <MissionCard mission={mission} />
                </Grid>
              ))}
            </Grid>
          </Container>
        }
      />
      <Route path=":rocketId" element={<RocketPage />} />
    </Routes>
  );
}

export default App;
