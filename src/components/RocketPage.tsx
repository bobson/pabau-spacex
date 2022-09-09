import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";

import { GET_ROCKET } from "../graphql/queries";

import ResponsiveDrawer from "./ResponsiveDrawer";

import { DataRockets } from "../types";

const RocketPage = () => {
  const { rocketId } = useParams();

  const { data, loading } = useQuery<DataRockets>(GET_ROCKET, {
    variables: { rocketId },
  });

  if (loading)
    return (
      <Container>
        <Grid
          container
          spacing={5}
          sx={{
            padding: "100px 10px 0 10px",
            // alignItems: "center",
            flexDirection: "column",
            // margin: "auto",
          }}
        >
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={60} />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Grid>

          <Grid item xs={12} md={6}>
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
          </Grid>
        </Grid>
      </Container>
    );

  const rows = [
    { label: "Engine Type", value: data?.rocket.type },
    { label: "First Flight", value: data?.rocket.first_flight },
    { label: "Height", value: `${data?.rocket.height.meters} m` },
    { label: "Mass", value: `${data?.rocket.mass.kg} kg` },
    {
      label: "Wikipedia",
      value: (
        <a href={data?.rocket.wikipedia} target="_blank" rel="noreferrer">
          Go To Link
        </a>
      ),
    },
  ];

  return (
    <ResponsiveDrawer>
      <Box
        sx={{
          padding: "1rem",
          maxWidth: "1000px",
          margin: "20px auto",
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              component="div"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              {data?.rocket.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              gutterBottom
              sx={{ textAlign: "center" }}
              mb={6}
            >
              <i>{data?.rocket.description}</i>
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Table>
              <TableBody>
                {rows.map(({ label, value }, i) => (
                  <TableRow key={i} hover>
                    <TableCell component="th" scope="row">
                      {label}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }} align="right">
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </ResponsiveDrawer>
  );
};

export default RocketPage;
