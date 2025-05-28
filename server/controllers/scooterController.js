import Scooter from "../models/scooter.model.js";
import cloudinary from "../config/cloudinary.config.js";
import streamifier from "streamifier";
//get scooters data
export const getScooters = async (req, res) => {
  try {
    const query = {};

    // Price filter
    if (req.query.price_lte) {
      query.price = { ...query.price, $lte: parseInt(req.query.price_lte) };
    }
    if (req.query.price_gte) {
      query.price = { ...query.price, $gte: parseInt(req.query.price_gte) };
    }

    // Kms driven filter
    if (req.query.kms_lte) {
      query.kmsDriven = {
        ...query.kmsDriven,
        $lte: parseInt(req.query.kms_lte),
      };
    }
    if (req.query.kms_gte) {
      query.kmsDriven = {
        ...query.kmsDriven,
        $gte: parseInt(req.query.kms_gte),
      };
    }

    // Year filter
    if (req.query.year_lte) {
      query.year = { ...query.year, $lte: parseInt(req.query.year_lte) };
    }
    if (req.query.year_gte) {
      query.year = { ...query.year, $gte: parseInt(req.query.year_gte) };
    }

    // Color filter (case-insensitive)
    if (req.query.color) {
      query.color = { $regex: new RegExp(req.query.color, "i") };
    }

    // Owner filter
    if (req.query.owner) {
      query.owner = {
        $in: Array.isArray(req.query.owner)
          ? req.query.owner
          : [req.query.owner],
      };
    }

    // State filter (case-insensitive)
    if (req.query.state) {
      query.state = { $regex: new RegExp(req.query.state, "i") };
    }

    // City filter (case-insensitive)
    if (req.query.city) {
      query.city = { $regex: new RegExp(req.query.city, "i") };
    }

    // Distance filter
    if (req.query.distance_lte) {
      query.distanceDriven = {
        ...query.distanceDriven,
        $lte: parseInt(req.query.distance_lte),
      };
    }

    const sortOption = req.query.sort;
    const sort = {};

    if (sortOption === "price-asc") {
      sort.price = 1;
    } else if (sortOption === "price-desc") {
      sort.price = -1;
    } else if (sortOption === "year-asc") {
      sort.year = 1;
    } else if (sortOption === "year-desc") {
      sort.year = -1;
    } else if (sortOption === "price_low_high") {
      sort.price = 1;
    } else if (sortOption === "price_high_low") {
      sort.price = -1;
    } else if (sortOption === "year_new_old") {
      sort.year = -1;
    }

    const scooters = await Scooter.find(query).sort(sort);
    res.status(200).json(scooters);
  } catch (error) {
    console.error("getScooters - Error fetching scooters with filters:", error);
    res.status(500).json({ message: "Error fetching scooters" });
  }
};

// get a specific scooter
export const getScooterById = async (req, res) => {
  try {
    const scooter = await Scooter.findById(req.params.id);
    if (!scooter) {
      return res.status(404).json({ message: "Scooter not found" });
    }
    res.status(200).json(scooter);
  } catch (error) {
    console.error("Error fetching scooter by ID:", error);
    if (error.name == "CastError") {
      return res.status(400).json({ message: "Invalid scooter ID" });
    }
    res.status(500).json({ message: "Failed to fetch scooter" });
  }
};

// get a scooter by seller id
export const getScooterBySellerId = async (req, res) => {
  try {
    const userId = req.user._id;
    const scooters = await Scooter.find({ sellerId: userId });

    res.status(200).json(scooters);
  } catch (error) {
    console.error("Error fetching user scooters:", error);
    res.status(500).json({ message: "Failed to fetch user scooters" });
  }
};

//add a new scooter
 export const createScooter = async (req, res) => {
  try {
  const sellerId = req.user._id;
  const imageUrls = [];
  const publicImageIds = [];
  let rcFileResult = null;
  let purchaseBillFileResult = null;

  // Handle image uploads to Cloudinary
  if (req.files && req.files.images) {
  const uploadPromises = req.files.images.map(async (file) => {
  return new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream({ folder: 'scooter_images' }, (error, result) => {
  if (error) {
  reject(error);
  } else {
  imageUrls.push({ public_id: result.public_id, url: result.secure_url });
  publicImageIds.push(result.public_id);
  resolve(result);
  }
  });
  streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
  });
  await Promise.all(uploadPromises);
  console.log('Images uploaded to Cloudinary:', imageUrls);
  }

  // Handle RC file upload to Cloudinary
  if (req.files && req.files.rcFile && req.files.rcFile[0]) {
  try {
  const result = await new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream({
  folder: 'scooter_documents',
  resource_type: 'raw',
  }, (error, result) => {
  if (error) {
  reject(error);
  } else {
  resolve(result);
  }
  });
  streamifier.createReadStream(req.files.rcFile[0].buffer).pipe(uploadStream);
  });
  rcFileResult = { public_id: result.public_id, url: result.secure_url };
  console.log('RC file uploaded to Cloudinary:', rcFileResult);
  } catch (cloudinaryError) {
  console.error('Error uploading RC file to Cloudinary:', cloudinaryError);
  return res.status(500).json({ message: 'Failed to upload RC file to Cloudinary' });
  }
  }

  // Handle purchase bill file upload to Cloudinary
  if (req.files && req.files.purchaseBillFile && req.files.purchaseBillFile[0]) {
  try {
  const result = await new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream({
  folder: 'scooter_documents',
  resource_type: 'raw',
  }, (error, result) => {
  if (error) {
  reject(error);
  } else {
  resolve(result);
  }
  });
  streamifier.createReadStream(req.files.purchaseBillFile[0].buffer).pipe(uploadStream);
  });
  purchaseBillFileResult = { public_id: result.public_id, url: result.secure_url };
  console.log('Purchase bill uploaded to Cloudinary:', purchaseBillFileResult);
  } catch (cloudinaryError) {
  console.error('Error uploading purchase bill to Cloudinary:', cloudinaryError);
  return res.status(500).json({ message: 'Failed to upload purchase bill to Cloudinary' });
  }
  }

  const {
  price,
  location,
  owner,
  color,
  distance,
  model,
  year,
  kmsDriven,
  condition,
  description
  } = req.body;

  const newScooter = new Scooter({
  price,
  location,
  color,
  owner,
  distance,
  description,
  model,
  year,
  kmsDriven,
  condition,
  sellerId: sellerId,
  images: imageUrls,
  rcFile: rcFileResult,
  purchaseBillFile: purchaseBillFileResult,
  });

  const savedScooter = await newScooter.save();
  res.status(201).json(savedScooter);
  } catch (error) {
  console.error("Error creating scooter:", error);
  if (error.name == "ValidationError") {
  return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Failed to create scooter" });
  }
 };

// updating a scooter
export const updateScooter = async (req, res) => {
  try {
    const scooterId = req.params.id;
    const loggedInUserId = req.user._id;
    const loggedInUserRole = req.user.role;

    const scooter = await Scooter.findById(scooterId);

    if (!scooter) {
      return res.status(404).json({ message: "Scooter not found" });
    }

    if (
      scooter.sellerId.toString() == loggedInUserId.toString() ||
      loggedInUserRole == "admin"
    ) {
      const updatedScooter = await Scooter.findByIdAndUpdate(
        scooterId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedScooter);
    } else {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this scooter" });
    }
  } catch (error) {
    console.error("Error updating scooter:", error);
    res.status(500).json({ message: "Failed to update scooter" });
  }
};

// delete a scooter
export const deleteScooter = async (req, res) => {
  try {
    const scooterId = req.params.id;
    const loggedInUserId = req.user._id;
    const loggedInUserRole = req.user.role;

    const scooter = await Scooter.findById(scooterId);

    if (!scooter) {
      return res.status(404).json({ message: "Scooter not found" });
    }

    if (
      scooter.sellerId.toString() === loggedInUserId.toString() ||
      loggedInUserRole === "admin"
    ) {
      await Scooter.findByIdAndDelete(scooterId);
      res.status(204).send();
    } else {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this scooter" });
    }
  } catch (error) {
    console.error("Error deleting scooter:", error);
    res.status(500).json({ message: "Failed to delete scooter" });
  }
};
