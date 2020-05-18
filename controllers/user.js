const path = require('path');
let User = require('../models/User');

// @route GET /users
// @desc Get Users
// @access Public
exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
};

// @route DELETE /users:id
// @desc Delete user
// @access Public

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

// @route PUT /users/:id
// @desc Update user
// @access Public

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

// @route PUT /users/:id/photo
// @desc Upload user photo
// @access Public

exports.userPhotoUpload = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
    });
  }

  // check for file
  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: 'please add file',
    });
  }

  // object that has the info we'll need
  const file = req.files.file;

  // Make sure the image is a photo
  // check mimetype field - with jpg/png/gif, it's always gonna be image/jpg|png|gif
  if (!file.mimetype.startsWith('image')) {
    return res.status(400).json({
      status: false,
      message: 'please upload image file',
    });
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({
      status: false,
      message: `please upload an image less than ${process.env.MAX_FILE_UPLOAD}file`,
    });
  }

  // Create custom filename
  // if someoen else uploads an image with the same name it will overwrite
  // so make unique, cutom file name here
  // use path (core node js module)
  // pass in orig file name and get the extension using path.parse
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  // function to move to a directory we want
  // .mv(upload path)... this is where it's going
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'problem with file upload',
      });
    }

    // insert the file name into the DB
    await User.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
};

// use public folder to be our static folder meaning we can go to whateer the domina is / whatever the image name is
// you might change whe bld front end, might want to upload to front end folders...
// i want to be able to access image in browser so...setting it up this way
