const Links = require('../models/Links');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.newLink = async (req, res, next) => {
   /* Check errors */
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }

   /* Create Link Object */
   const { original_name, name } = req.body;
   
   const link = new Links();
   link.url = shortid.generate();
   link.name = name;
   link.original_name = original_name;

   /* If user is authenticated */
   if (req.user) {
      const { password, downloads } = req.body;

      /* Set number of downloads to links */
      if (downloads) {
         link.downloads = downloads; 
      }

      /* Set password */
      if (password) {
         const salt = await bcrypt.genSalt(10);
         link.password = await bcrypt.hash(password, salt);
      }

      /* Set author */
      link.author = req.user.id;
   }

   /* Store data in DB */
   try {
      await link.save();
      res.json({ msg: `${link.url}` });
      return next();
   } catch (error) {
      console.log(error);
   }
}

/* Get a list of all links */
exports.allLinks = async (req, res) => {
   try {
      const links = await Links.find({}).select('url -_id');
      res.json({links});
   } catch (error) {
      console.log(error)
   }
}

/* Return if link has password */
exports.hasPassword = async (req, res, next) => {
   const { url } = req.params;

   /* If link does not exist (verify) */
   const link = await Links.findOne({url});

   if (!link) {
      res.status(404).json({ msg: 'That Link does not exist' });
      return next();
   }

   if (link.password) {
      return res.json({ password: true, link: link.url })
   }

   next();
}

/* Verify if password is correct */
exports.verifyPassword = async (req, res, next) => {
   const { url } = req.params;
   const { password } = req.body;

   /* Query link */
   const link = await Links.findOne({ url });

   /* Verify Password */
   if (bcrypt.compareSync(password, link.password)) {
      /* Allow download file */
      next();
   } else {
      return res.status(401).json({ msg: 'Wrong password' });
   }
}

/* Get Link */
exports.getLink = async (req, res, next) => {
   const { url } = req.params;

   console.log(url);

   /* If link does not exist (verify) */
   const link = await Links.findOne({url});

   if (!link) {
      res.status(404).json({ msg: 'That Link does not exist' });
      return next();
   }
 
   /* If link exists */
   res.json({ file: link.name, password: false });

   next();
}