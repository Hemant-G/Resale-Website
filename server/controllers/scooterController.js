import Scooter from "../models/scooter.model.js";

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
    const newScooter = new Scooter({
      ...req.body,
      sellerId: sellerId,
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
