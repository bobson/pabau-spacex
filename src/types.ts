export interface GetMissions {
  data: DataMissions;
}

export interface DataMissions {
  launchesPast: LaunchesPast[];
}

export interface LaunchesPast {
  mission_name: string;
  launch_date_local: Date;
  links: Links;
  rocket: LaunchesPastRocket;
}

export interface Links {
  flickr_images: string[];
}

export interface LaunchesPastRocket {
  rocket_name: RocketName;
  rocket: RocketRocket;
}

export interface RocketRocket {
  id: ID;
}

export enum ID {
  Falcon9 = "falcon9",
}

export enum RocketName {
  Falcon9 = "Falcon 9",
}

export interface GetRockets {
  rockets: DataRockets;
}

export interface DataRockets {
  rocket: Rocket;
}

export interface Rocket {
  first_flight: string;
  height: Height;
  mass: Mass;
  wikipedia: string;
  type: string;
  name: string;
  description: string;
  id: string;
}

export interface Type {
  type: string;
}

export interface Height {
  meters: number;
}

export interface Mass {
  kg: number;
}

export interface MissionsVars {
  limit: number;
}
