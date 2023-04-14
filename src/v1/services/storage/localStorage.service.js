const fs = require("fs");
const sharp = require("sharp");
const crypto = require("crypto");
const { server } = require("../../config/system");

module.exports.storeFile = async (file, title = "") => {
  let path = "";

  try {
    // Reading input file
    const readFile = Buffer.from(file.data, "base64");

    // Decide file's name on disk
    const diskName = title
      ? `${title}_${getCurrentDate()}`
      : crypto.randomUUID();

    // Get file's extenstion
    const nameParts = file.name.split(".");
    const extension = nameParts[nameParts.length - 1];

    // Writing file to local disk storage
    const name = filterName(`${diskName}.${extension}`);
    path = `/${name}`;
    fs.writeFileSync(`./uploads${path}`, readFile, "utf8");

    // Check if file is a photo and compress it
    if (server.SUPPORTED_PHOTO_EXTENSIONS.includes(extension)) {
      await this.compressPhoto(`./uploads${path}`);
    }

    // TODO: check if file is a video and compress it

    return { originalName: file.name, name, path };
  } catch (err) {
    // Delete stored file in case of error
    await this.deleteFile(path);

    throw err;
  }
};

module.exports.deleteFile = async (filePath) => {
  try {
    fs.unlink(`./uploads${filePath}`, (err) => {});
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.compressPhoto = async (path) => {
  try {
    // Get metadata of the photo
    // const metadata = await sharp(inputImage).metadata();

    // resize and compress the image using sharp
    sharp(path)
      .resize(200, 200) // set the maximum width to 200 pixels
      .jpeg({ quality: 40 }) // compress the image to 40% quality JPEG
      .toBuffer()
      .then((outputBuffer) => {
        // write the compressed image to a file
        fs.writeFileSync(path, outputBuffer);
      })
      .catch(async (err) => {
        await this.deleteFile(path);
      });
  } catch (err) {
    throw err;
  }
};

const getCurrentDate = () => {
  let strDate = new Date().toLocaleString();
  strDate = strDate.split(", ");
  let part1 = strDate[0];
  let part2 = strDate[1].split(" ");
  let part21 = part2[0].split(":").slice(0, 2).join(":");
  let part22 = part2[1];
  return `${part1}_${part21}_${part22}`;
};

const filterName = (name = "") => {
  return name.split(" ").join("_").split(":").join("_").split("/").join("_");
};
