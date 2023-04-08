#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs";
import listValidated from "./http-validate.js";
import getFiles from "./index.js";

//get way digited on terminal
const way = process.argv;

async function printList(valid, result, nameArchive) {
  if (valid) {
    console.log(
      chalk.yellow(`Lista Validada = ${nameArchive}`),
      await listValidated(result)
    );
  } else {
    console.log(chalk.yellow(`Lista de Links = ${nameArchive}`), result);
  }
}
async function processText(args) {
  const way = args[2];
  const valid = args[3] === "--valida";
  try {
    fs.lstatSync(way);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Arquivo / Diretório não existe");
      return;
    }
  }
  if (fs.lstatSync(way).isFile()) {
    const getNameFile = way.split("/");
    const result = await getFiles(args[2]);
    printList(valid, result, getNameFile[2]);
  } else if (fs.lstatSync(way).isDirectory()) {
    const archives = await fs.promises.readdir(way);
    archives.forEach(async (nameArchive) => {
      const list = await getFiles(`${way}/${nameArchive}`);
      printList(valid, list, nameArchive);
    });
  }
}
processText(way);
