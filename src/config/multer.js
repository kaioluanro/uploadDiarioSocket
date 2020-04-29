const multer = require("multer");
const path = require("path");
const crypto = require("crypto");


module.exports = {
  dest: path.resolve(__dirname, "..", "..", "pdfs"),
    storage:multer.diskStorage( { destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "..", "..", "pdfs"))
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(4,(err,hash)=>{
        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null,file.key)
      })
    }}
  )
}
