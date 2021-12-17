const express = require('express')
const app = express()
const port = 3000

// Initialize
const multer = require('multer')
const path = require('path')

// Configuration Storage
const diskStorage = multer.diskStorage({
    // Storage Files and use Path.Join for ignore same directories when server got reload
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "/assets"))
    },
    // Filename using path.extname for make dynamic and unique file name
    fileName: (req, file, cb) => {
        const fileExt = file.mimetype.split()
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname) + '.jpg'
        )
    }
})

app.get('/', (req, res) => {
    res.send('Hello World !!')
})

// Implementation multer into each router
app.put(
    "/upload",
    multer({ storage: diskStorage }).single("photo"),
    (req, res) => {
      const filePath = req.file.path;
      const file = req.file.path;
        console.log('file', file)
      console.log(filePath);
      if (!file) {
        res.status(400).send({
          status: false,
          data: "No File is selected.",
        });
      }
      // menyimpan lokasi upload data contacts pada index yang diinginkan
    //   contacts[req.query.index].photo = req.file.path;
      res.send(`Upload file berhasil, silahkan cek => ${file}`);
    }
  );

app.listen(port, () => {
    console.log(`Server already running in port: ${port}`)
})