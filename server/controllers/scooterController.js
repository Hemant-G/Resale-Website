import Scooter from "../models/scooter.model.js";

//get scooters data
export const getScooters = async (req, res) => {
  try {
    const scooters = await Scooter.find({});
    res.status(200).json(scooters);
  } catch (error) {
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

//add a new scooter
export const createScooter = async (req, res) => {
  try {
    const newScooter = new Scooter(req.body);
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
    const id = req.params.id;
    const updatedScooter = await Scooter.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!updatedScooter) {
      return res.status(404).json({ message: "Scooter not found" });
    }

    res.status(200).json(updatedScooter);
  } catch (error) {
    console.error("Error updating scooter:", error);
    if (error.name == "CastError") {
      return res.status(400).json({ message: "Invalid scooter ID" });
    }
    if (error.name == "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to update scooter" });
  }
};

// delete a scooter
export const deleteScooter = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedScooter = await Scooter.findByIdAndDelete(id);

    if (!deletedScooter) {
      return res.status(404).json({ message: "Scooter not found" });
    }

    res.status(200).json({ message: "Scooter deleted successfully" });
  } catch (error) {
    console.error("Error deleting scooter:", error);
    if (error.name == "CastError") {
      return res.status(400).json({ message: "Invalid scooter ID" });
    }
    res.status(500).json({ message: "Failed to delete scooter" });
  }
};
