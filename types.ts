export enum DeviceType {
  LIGHT = 'LIGHT',
  AC = 'AC',
  CAMERA = 'CAMERA',
  THERMOSTAT = 'THERMOSTAT',
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  isOn: boolean;
  value?: number; // For thermostat temperature
  location: string;
}

export interface SecurityLog {
  id: string;
  event: string;
  timestamp: string;
  type: 'info' | 'warning' | 'alert';
}

export interface EnergyData {
  day: string;
  kwh: number;
}

export enum SceneType {
  AWAY = 'Away',
  SLEEP = 'Sleep',
  MOVIE = 'Movie Night',
  HOME = 'Home',
}