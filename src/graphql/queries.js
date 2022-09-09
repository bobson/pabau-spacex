import { gql } from "@apollo/client";

export const GET_MISSIONS = gql`
  query GetMissions($limit: Int!) {
    launchesPast(limit: $limit) {
      mission_name
      launch_date_local
      links {
        flickr_images
      }
      rocket {
        rocket_name
        rocket {
          id
        }
      }
    }
  }
`;

export const GET_ROCKET = gql`
  query GetRocket($rocketId: ID!) {
    rocket(id: $rocketId) {
      description
      first_flight
      height {
        meters
      }
      id
      mass {
        kg
      }
      name
      type
      wikipedia
    }
  }
`;
