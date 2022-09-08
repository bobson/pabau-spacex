import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

import { GET_ROCKET } from "../graphql/queries";

import ResponsiveDrawer from "./ResponsiveDrawer";

import { DataRockets } from "../types";

const RocketPage = () => {
  const { rocketId } = useParams();

  const { data, loading } = useQuery<DataRockets>(GET_ROCKET, {
    variables: { rocketId },
  });

  if (loading) return <p>Loading...</p>;

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

  console.log(data);
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

            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item>
                <Table sx={{ m: 2 }}>
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
          </Grid>
        </Grid>
      </Box>
    </ResponsiveDrawer>
  );
};

export default RocketPage;
