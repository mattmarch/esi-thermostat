import config from "./config";
import type { User } from "./login";

const deviceTypes = ["02", "04", "10", "20", "23", "25"];

export type Device = {
  id: string;
  name: string;
  current_temperature: number;
  inside_temperature: number;
};

const parseDevice = (device: any): Device => ({
  id: device.device_id,
  name: device.device_name,
  current_temperature: Number(device.current_temprature) / 10,
  inside_temperature: Number(device.inside_temparature) / 10,
});

export const getDeviceList = async (user: User): Promise<Device[]> => {
  const payload = {
    device_type: deviceTypes.join(","),
    user_id: user.id,
    token: user.token,
  };
  const response = await fetch(`${config.baseUrl}/getDeviceList`, {
    method: "POST",
    body: new URLSearchParams(payload),
  });
  const responseJson = await response.json();
  return responseJson.devices.map(parseDevice);
};
