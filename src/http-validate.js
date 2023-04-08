import chalk from "chalk";

function getLinks(arrLinks) {
  return arrLinks.map((objectLink) => Object.values(objectLink).join());
}

async function checkStatus(arrUrls) {
  const arrStatus = await Promise.all(
    arrUrls.map(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        return `${res.status} - ${res.statusText}`;
      } catch (err) {
        return manageErr(err);
      }
    })
  );
  return arrStatus;
}

function manageErr(err) {
  if (err.cause.code === "ENOTFOUND") {
    return "Link não encontrado";
  } else {
    return "Houve um erro";
  }
}

async function listValidated(listLinks) {
  const links = getLinks(listLinks);
  const status = await checkStatus(links);

  return listLinks.map((object, index) => ({
    ...object,
    status: status[index],
  }));
}

export default listValidated;
