import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import GaugeChart from "react-gauge-chart";
import { useMqttState, useSubscription } from "mqtt-react-hooks";

export default function App() {
  const { client } = useMqttState();
  const { message } = useSubscription(["Ameen123/feeds/statusToApp"]) as any;
  const { connectionStatus } = useMqttState();
  console.log(connectionStatus);

  const data = message?.message ? JSON.parse(message.message) : {};

  const switchData = {
    motor1: parseInt(data.motor1?.value) || 0,
    motor2: parseInt(data.motor2?.value) || 0,
    motor3: parseInt(data.motor3?.value) || 0,
    thottamLight1: parseInt(data.thottamLight1?.value) || 0,
    thottamBoxLight1: parseInt(data.thottamBoxLight1?.value) || 0,
    thottamBoxLightMode: parseInt(data.thottamBoxLightMode?.value) || 0,
    solenoidValve1: parseInt(data.solenoidValve1?.value) || 0,
    solenoidValve2: parseInt(data.solenoidValve2?.value) || 0,
    solenoidValve3: parseInt(data.solenoidValve3?.value) || 0,
    solenoidValve4: parseInt(data.solenoidValve4?.value) || 0,
    solenoidValve5: parseInt(data.solenoidValve5?.value) || 0,
    solenoidValve6: parseInt(data.solenoidValve6?.value) || 0,
  };

  const [buttonInfo, updateButtonInfo] = React.useState(switchData);

  if (JSON.stringify(buttonInfo) !== JSON.stringify(switchData)) {
    updateButtonInfo(switchData);
  }

  const buttonClick = (name: string) => {
    const newValue = (buttonInfo as any)[name] === 0 ? 1 : 0;
    updateButtonInfo({ ...buttonInfo, [name]: newValue });

    client?.publish(
      "Ameen123/feeds/commandsFromApp",
      `parameter->${name}:->${newValue}`
    );
  };

  return (
    <Box bgcolor="black">
      <Container>
        <Box sx={{ mb: 5, pt: 5 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            color="white"
            align="center"
          >
            <Box sx={{ fontWeight: "400", mb: 7 }}>AMEEN'S FARM</Box>
          </Typography>
          <Grid container display="flex" justifyContent="space-around">
            <Grid item>
              <Box
                sx={{ fontWeight: "bold", m: 1, mt: 3, mb: 5 }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                ENTRY PRESSURE
              </Box>
              <GaugeChart
                style={{width: "30vw"}}
                animate={false}
                id="ENTRY PRESSURE"
                nrOfLevels={20}
                percent={data.pressure1?.value}
              />
              <Box
                sx={{ fontWeight: "200", fontSize: "10px" }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                {new Date(
                  data.pressure1?.timestamp * 1000 || 0
                ).toLocaleTimeString()}
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{ fontWeight: "bold", m: 1, mt: 3, mb: 5 }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                EXIT PRESSURE
              </Box>
              <GaugeChart
                style={{width: "30vw"}}
                animate={false}
                id="EXIT PRESSURE"
                nrOfLevels={20}
                percent={data.pressure2?.value}
              />
              <Box
                sx={{ fontWeight: "200", fontSize: "10px" }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                {new Date(
                  data.pressure2?.timestamp * 1000 || 0
                ).toLocaleTimeString()}
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{ fontWeight: "bold", m: 1, mt: 3, mb: 5 }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                FLOW METER
              </Box>
              <GaugeChart
                animate={false}
                style={{width: "30vw"}}
                id="FLOW METER"
                nrOfLevels={20}
                percent={data.flowRate?.value}
              />
              <Box
                sx={{ fontWeight: "200", fontSize: "10px" }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                {new Date(
                  data.flowRate?.timestamp * 1000 || 0
                ).toLocaleTimeString()}
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{ fontWeight: "bold", m: 1, mt: 3, mb: 5 }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                MOTOR 1 POWER
              </Box>
              <GaugeChart
                animate={false}
                style={{width: "30vw"}}
                id="MOTOR 1 POWER"
                nrOfLevels={20}
                percent={data.motor1Power?.value}
              />
              <Box
                sx={{ fontWeight: "200", fontSize: "10px" }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                {new Date(
                  data.motor1Power?.timestamp * 1000 || 0
                ).toLocaleTimeString()}
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{ fontWeight: "bold", m: 1, mt: 3, mb: 5 }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                MOTOR 1 CURRENT
              </Box>
              <GaugeChart
                animate={false}
                style={{width: "30vw"}}
                id="MOTOR 1 CURRENT"
                nrOfLevels={20}
                percent={data.motor1Current?.value}
              />
              <Box
                sx={{ fontWeight: "200", fontSize: "10px" }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                {new Date(
                  data.motor1Current?.timestamp * 1000 || 0
                ).toLocaleTimeString()}
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{ fontWeight: "bold", m: 1, mt: 3, mb: 5 }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                MOTOR 1 VOLTAGE
              </Box>
              <GaugeChart
                animate={false}
                style={{width: "30vw"}}
                id="MOTOR 1 VOLTAGE"
                nrOfLevels={20}
                percent={data.motor1Voltage?.value}
              />
              <Box
                sx={{ fontWeight: "200", fontSize: "10px" }}
                color="white"
                display="flex"
                justifyContent="center"
              >
                {new Date(
                  data.motor1Voltage?.timestamp * 1000 || 0
                ).toLocaleTimeString()}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center">
          <Grid item>
            <Box
              sx={{ fontWeight: "bold", m: 1, mb: 5 }}
              color="white"
              display="flex"
              justifyContent="center"
            >
              MOISTURE
            </Box>
            <GaugeChart
              animate={false}
              style={{width: "30vw"}}
              id="MOISTURE"
              nrOfLevels={20}
              percent={data.moisture?.value}
            />
            <Box
              sx={{ fontWeight: "200", fontSize: "10px" }}
              color="white"
              display="flex"
              justifyContent="center"
            >
              {new Date(
                data.moisture?.timestamp * 1000 || 0
              ).toLocaleTimeString()}
            </Box>
          </Grid>
        </Box>
        <Box sx={{ mt: 7, mb: 10 }}>
          <Grid container display="flex" justifyContent="space-around">
            <Grid item>
              <Typography color="white" fontWeight={500}>
                MOTOR 1
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="primary"
                  checked={Boolean(buttonInfo.motor1)}
                  onClick={() => buttonClick("motor1")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="white" fontWeight={500}>
                MOTOR 2
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="secondary"
                  checked={Boolean(buttonInfo.motor2)}
                  onClick={() => buttonClick("motor2")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="white" fontWeight={500}>
                MOTOR 3
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="secondary"
                  checked={Boolean(buttonInfo.motor3)}
                  onClick={() => buttonClick("motor3")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: 10 }}>
          <Grid container display="flex" justifyContent="space-around">
            <Grid item>
              <Typography color="white" fontWeight={500}>
                MAIN LIGHT
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="primary"
                  checked={Boolean(buttonInfo.thottamLight1)}
                  onClick={() => buttonClick("thottamLight1")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="white" fontWeight={500}>
                CABIN 1
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="secondary"
                  checked={Boolean(buttonInfo.thottamBoxLight1)}
                  onClick={() => buttonClick("thottamBoxLight1")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="white" fontWeight={500}>
                CABIN 2
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="secondary"
                  checked={Boolean(buttonInfo.thottamBoxLightMode)}
                  onClick={() => buttonClick("thottamBoxLightMode")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 7, mb: 10 }}>
          <Grid container display="flex" justifyContent="space-around">
            <Grid item>
              <Typography color="white" fontWeight={500}>
                VALVE 1
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="primary"
                  checked={Boolean(buttonInfo.solenoidValve1)}
                  onClick={() => buttonClick("solenoidValve1")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="white" fontWeight={500}>
                VALVE 2
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="secondary"
                  checked={Boolean(buttonInfo.solenoidValve2)}
                  onClick={() => buttonClick("solenoidValve2")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="white" fontWeight={500}>
                VALVE 3
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="secondary"
                  checked={Boolean(buttonInfo.solenoidValve3)}
                  onClick={() => buttonClick("solenoidValve3")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container display="flex" justifyContent="space-around">
            <Grid item>
              <Typography color="white" fontWeight={500}>
                VALVE 4
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="primary"
                  checked={Boolean(buttonInfo.solenoidValve4)}
                  onClick={() => buttonClick("solenoidValve4")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="white" fontWeight={500}>
                VALVE 5
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="secondary"
                  checked={Boolean(buttonInfo.solenoidValve5)}
                  onClick={() => buttonClick("solenoidValve5")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography color="white" fontWeight={500}>
                VALVE 6
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="white" fontWeight={500}>
                  OFF
                </Typography>
                <Switch
                  color="secondary"
                  checked={Boolean(buttonInfo.solenoidValve6)}
                  onClick={() => buttonClick("solenoidValve6")}
                />
                <Typography color="white" fontWeight={500}>
                  ON
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 10 }}>
          <Typography variant="body2" color="white" align="center">
            {"Copyright © Ameen's Farm Powered by Varun"}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
