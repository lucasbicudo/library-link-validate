import fs from "fs";
import chalk from "chalk";

// Some erro happens call function
function treatError(err) {
  console.log(err);
  throw new Error(chalk.red(err.code, "arquuvo não encontrado"));
}

// function exports default get files on terminal
async function getFiles(wayFile) {
  const encoding = "utf-8";
  try {
    const text = await fs.promises.readFile(wayFile, encoding);
    return extractLinks(text);
  } catch (err) {
    treatError(err);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }
}

// function extractLinks from regular expressions
function extractLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  return resultados.length === 0
    ? "Não existem links nesse arquivo"
    : resultados;
}

export default getFiles;

//******** function of differents ways //
// function with catch
/*function getFiles(wayFile) {
  const encoding = "utf-8";
  fs.promises
    .readFile(wayFile, encoding)
    .then((text) => console.log(text))
    .catch(treatError);
}
*/

/* function getFiles(wayFile) {
  const encoding = "utf-8";
  fs.readFile(wayFile, encoding, (err, text) => {
    if (err) {
      treatError(err);
    }
    console.log(chalk.green(text));
  });
} */
