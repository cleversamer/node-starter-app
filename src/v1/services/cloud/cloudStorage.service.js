const { Storage } = require("@google-cloud/storage");
const path = require("path");
const server = require("../../config/system/server");
const localStorage = require("../storage/localStorage.service");

// Create an instance of Google Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, "../../config/system/service-account.json"),
  projectId: server.PROJECT_ID,
});

module.exports.uploadFile = async (file = { name: "", path: "" }) => {
  try {
    // Get the path of the file to upload
    const filePath = path.join(__dirname, `../../../../uploads${file.path}`);

    // Dedicde upload options
    const options = {
      destination: file.name,
      // preconditionOpts: {
      //   ifGenerationMatch: 0,
      // },
    };

    // Upload file to storage bucket
    const cloudFile = await storage
      .bucket(server.BUCKET_NAME)
      .upload(filePath, options);

    // Delete local file in case of error
    await localStorage.deleteFile(file.path);

    // Return file URL
    return cloudFile[1].mediaLink;
  } catch (err) {
    throw err;
  } finally {
    // Delete local file in case of error
    await localStorage.deleteFile(file.path);
  }
};

module.exports.deleteFile = async (fileURL) => {
  try {
    // Check file's URL
    if (!fileURL) {
      return;
    }

    // Parse file name from the URL
    const fileName = fileURL.split("/o/")[1].split("?")[0];

    // Delete file from the bucket
    await storage.bucket(server.BUCKET_NAME).file(fileName).delete();

    return true;
  } catch (err) {
    throw err;
  }
};
