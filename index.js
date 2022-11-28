#!/usr/bin/env node

import robot from "robotjs";
import { formatMilisecondsToDate, getTime } from "./utils.js";

// unidad de tiempo
const durationType = "min";

// cada cuánto tiempo se ejecuta, por defecto 3 minutos
const executionFrequency = process.argv[3] ? Number(process.argv[3]) : 3;

// durante cuánto tiempo se va a ejecutar el script, por defecto 60 minutos
const executionTime = process.argv[2] ? process.argv[2] : 60;

const intervalInMiliseconds = durationType === "sec" ? executionFrequency * 1000 : executionFrequency * 60000;

const removeInterval = durationType === "sec" ? executionTime * 1000 : executionTime * 60000;
const stopTime = new Date().getTime() + removeInterval;

const finalTime = formatMilisecondsToDate(stopTime);

const screenSize = robot.getScreenSize();
const screenCenter = {
  width: screenSize.width / 2,
  height: screenSize.height / 2,
};

console.log(`Iniciado a las ${getTime()} hasta las ${finalTime}`);
console.log(`Ejecución cada ${executionFrequency} ${durationType}`);

if (executionTime < executionFrequency) {
  process.exitCode = 1;
  throw new Error("El tiempo de expiración debe ser mayor al intervalo");
}
if (isNaN(executionFrequency)) {
  process.exitCode = 1;
  throw new Error("Duration value must be a number.");
}

let numberOfExecution = 0;

function moveCursor() {
  const { width, height } = screenCenter;
  const time = getTime();
  const position = robot.getMousePos();

  robot.moveMouseSmooth(numberOfExecution % 2 === 1 ? width + 100 : width, height);
  console.log("\x1b[35m%s\x1b[0m", `[${time}] ${JSON.stringify(position)} \n`);
  numberOfExecution += 1;
}

const magic = setInterval(moveCursor, intervalInMiliseconds);
setTimeout(function () {
  clearInterval(magic);
}, removeInterval);
