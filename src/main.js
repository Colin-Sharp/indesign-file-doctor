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
  fileExtLimiter(['.mex']),
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
            })()

            const xmlData = await fsPromises.readFile(
              `./files/${xmlFile.path}`,
              "utf8"
            );

            // get the data from
            const xml = await (async () => {
              var $ = cheerio.load(xmlData);
              var design = $('[name="InDesignData"]').html().toString();
              var toAString = JSON.stringify(design);
              var removeEnds = toAString
                .replace("\x3C!--[CDATA[", "")
                .replace("]]&gt;", "");
              return JSON.parse(removeEnds);
            })();

            // delete files folder
            await rimraf("files");

            return res.json({
              status: "Success",
              message: "Life is good!",
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
  "/indd",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter(['.indd']),
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
                if (file.name === "designmap.xml") {
                  xmlFile = file;
                }
              });
            })()

            const xmlData = await fsPromises.readFile(
              `./files/${xmlFile.path}`,
              "utf8"
            );
            

            // get the data from
            // const xml = await (async () => {
            //   var $ = cheerio.load(xmlData);
            //   var design = $('[name="InDesignData"]').html().toString();
            //   var toAString = JSON.stringify(design);
            //   var removeEnds = toAString
            //     .replace("\x3C!--[CDATA[", "")
            //     .replace("]]&gt;", "");
            //   return JSON.parse(removeEnds);
            // })();

            console.log(xmlData);
            // delete files folder
            await rimraf("files");

            return res.json({
              status: "Success",
              message: "Life is good!"
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


// helper functions
function getFileExtension(path) {
  return path.split('.').pop();
};

app.listen(PORT, () => {
  console.log(`MESS (Mongo Event Sourcing) listening at http://localhost:3000`);
});
