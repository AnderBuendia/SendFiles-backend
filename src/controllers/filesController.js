const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Links = require('../models/Links');

exports.uploadFile = async (req, res, next) => {
    const multerConfig = {
        limits: { fileSize: req.user ? 1024*1024*10 : 1024*1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                // const extension = file.mimetype.split('/')[1];
                const extension = file.originalname.substring(file.originalname
                    .lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            },
            /* Disallow a specific format */
            // fileFilter: (req, file, cb) => {
            //     if (file.mimetype === 'application/pdf') {
            //         return cb(null, true);
            //     }
            // }
        })
    }

    const upload = multer(multerConfig).single('file');

    upload(req, res, async (error) => {
        if (!error) {
            res.json({ file: req.file.filename });
        } else {
            console.log(error);
            return next();
        }
    });
}

exports.deleteFile = async (req, res) => {
    try {
        fs.unlinkSync(__dirname+`/../uploads/${req.file}`)
    } catch (error) {
        console.log(error);
    }
}

/* Download a file */
exports.download = async (req, res, next) => {
    /* Get Link */
    const { file } = req.params;
    const link = await Links.findOne({ name: file });

    const downloadFile = `${__dirname}/../uploads/${file}`;
    res.download(downloadFile);

    /** Delete the file and data in DB
    *   If downloads = 1 / Delete data from DB and file */
   const { downloads, name } = link;

   if (downloads === 1) {
      /* Delete file (go to filesController) */
      req.file = name;

      /* Delete download data from DB */
      await Links.findOneAndRemove(link.id);
      next();
   } else {
      /* If downloads > 1 / Substract 1 */
      link.downloads--;
      await link.save();
   }
}