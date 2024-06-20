import { login } from "./login";
import config from "./config.ts";
import { getDeviceList } from "./getDevices.ts";

const user = await login(config.email, config.password);

console.log(`Hello ${user.name}!`);

const devices = await getDeviceList(user);
const thermostat = devices[0];

console.log(
  `Your thermostat (${thermostat.name}) is set to ${thermostat.current_temperature} degrees. It is currently ${thermostat.inside_temperature} degrees in your home.`
);
