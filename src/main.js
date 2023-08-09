const express = require("express");
const fileUpload = require("express-fileupload");
const decompress = require("decompress");
const cors = require("cors");

const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");

const app = express();
const rimraf = require("rimraf").rimraf;
const path = require("path");

const cheerio = require("cheerio");
const fsPromises = require("fs/promises");

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./vue-doctor/dist/index.html"));
});

app.post(
  "/mex",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".mex"]),
  (req, res) => {
    const files = req.files;

    let name;

    Object.keys(files).forEach((key) => {
      name = files[key].name;
      const filepath = path.join(__dirname, ".", files[key].name);

      files[key].mv(filepath, () => {
        (async () => {
          try {
            // extract files for mex file.
            const files = await decompress(`src/${name}`, "files");

            // delete mex file
            await fsPromises.unlink(filepath);

            let xmlFile;

            await (async () => {
              files.forEach((file) => {
                const fileExtension = getFileExtension(file.path);
                if (fileExtension === "xml") {
                  xmlFile = file;
                }
              });
            })();

            const xmlData = await fsPromises.readFile(
              `./files/${xmlFile.path}`,
              "utf8"
            );

            // get the data from
            const xml = await (async () => {
              var $ = cheerio.load(xmlData);
              var design = $('[name="InDesignData"]').html();
              var removeEnds = design
              .replace("<!--[CDATA[", "")
              .replace("]]&gt;", "")
              .replace("]]-->", "");
              
              var designObject = await getValues(removeEnds);

            return designObject;
            })();

            // delete files folder
            await rimraf("files");

            return res.json({
              status: "Success",
              message: "View the details",
              fileInfo: xml,
            });
          } catch (error) {
            return res.status(500).json({
              status: "error",
              message: error,
            });
          }
        })();
      });
    });
  }
);

app.post(
  "/idml",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".idml"]),
  (req, res) => {
    const files = req.files;

    let name;

    Object.keys(files).forEach((key) => {
      name = files[key].name;
      const filepath = path.join(__dirname, ".", files[key].name);

      files[key].mv(filepath, () => {
        (async () => {
          try {
            // extract files for mex file.
            const extractedFiles = await decompress(`src/${name}`, "files");

            // delete idml file
            await fsPromises.unlink(filepath);

            let xmlFile;

            await (async () => {
              extractedFiles.forEach((file) => {
                if (file.path === "designmap.xml") {
                  xmlFile = file;
                }
              });
            })();

            const xmlData = await fsPromises.readFile(
              `./files/${xmlFile.path}`,
              "utf8"
            );

            const xml = await (async () => {
              var $ = cheerio.load(xmlData);
              const newValues = {};
              var variable = $('[key="MEGAEDITvariable"]').attr("value");
              var logic = $('[key="MEGAEDITlogic"]').attr("value");
              var form = $('[key="MEGAEDITforms"]').attr("value");
              var resource = $('[key="MEGAEDITresource"]').attr("value");

              newValues.form = await getValues(form);
              newValues.logic = await getValues(logic);
              newValues.variable = await getValues(variable);
              newValues.resource = await getValues(resource);

              return newValues;
            })();

            // delete files dir
            await rimraf("files");

            return res.json({
              status: "Success",
              message: "View the details",
              fileInfo: xml,
            });
          } catch (error) {
            return res.status(500).json({
              status: "error",
              message:
                "Something went wrong are you sure the you are using the right file?",
            });
          }
        })();
      });
    });
  }
);

async function getValues(value) {
  if (value) {
    try {
      return await JSON.parse(value);
    } catch {
      return "BROKEN";
    }
  } else {
    return "";
  }
}

// helper functions
function getFileExtension(path) {
  return path.split(".").pop();
}

app.listen(PORT, () => {
  console.log(`MESS (Mongo Event Sourcing) listening at http://localhost:3000`);
});
