import { Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MISSIONS } from "./graphql/queries";
import { useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import MissionCard from "./components/MissionCard";
import RocketPage from "./components/RocketPage";
import { DataMissions, MissionsVars } from "./types";

function App() {
  const [missionsToShow, setMissionsToShow] = useState("10");
  const [missionName, setMissionName] = useState("");

  const limit = Number(missionsToShow);

  const { data, loading, error } = useQuery<DataMissions, MissionsVars>(
    GET_MISSIONS,
    {
      variables: { limit },
    }
  );

  const handleChange = (event: SelectChangeEvent) => {
    setMissionsToShow(event.target.value as string);
  };

  const loadingElement = (
    <Container sx={{ paddingTop: "100px" }}>
      <Grid container spacing={4} mb={4}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((mission, i) => (
          <Grid item xs={12} lg={4} xl={3} key={i}>
            <Box sx={{ margin: "auto", pl: 3, pr: 3, width: 300 }}>
              <Skeleton variant="rectangular" height={118} />
              <Skeleton height={118} />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  if (error) return <p>Error :(</p>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container maxWidth="xl">
            {/* Header */}
            <Typography
              mb={10}
              mt={10}
              textAlign="center"
              variant="h2"
              component="div"
            >
              SpaceX Missions
            </Typography>

            {loading ? (
              loadingElement
            ) : (
              <>
                {/* Select Form */}
                <Box sx={{ minWidth: 120, width: 180, m: "auto", mb: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ top: "-18%" }} id="filter by rocket">
                      Missions to show
                    </InputLabel>
                    <Select
                      labelId="missions to show"
                      id="missions to show"
                      value={missionsToShow}
                      defaultValue={missionsToShow}
                      label="Missions to show"
                      onChange={handleChange}
                      sx={{ height: 40 }}
                    >
                      <MenuItem value="10">10</MenuItem>
                      <MenuItem value="20">20</MenuItem>
                      <MenuItem value="50">50</MenuItem>
                      <MenuItem value="80">80</MenuItem>
                      <MenuItem value="0">All</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Miisions Grid */}
                <Grid container spacing={4} mb={4}>
                  {data?.launchesPast.map((mission) => (
                    <Grid
                      key={mission.mission_name}
                      onClick={() => setMissionName(mission.mission_name)}
                      item
                      xs={12}
                      lg={4}
                      xl={3}
                    >
                      <MissionCard mission={mission} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Container>
        }
      />
      <Route
        path=":rocketId"
        element={<RocketPage missionName={missionName} />}
      />
    </Routes>
  );
}

export default App;
