import House from "../model/House.js";

export const getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (e) {
    console.error(e);
  }
};
export const getHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    res.status(200).json(house);
  } catch (e) {
    console.error(e);
  }
};
export const updateHouse = async (req, res) => {
  try {
    const house = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(house);
  } catch (e) {
    console.error(e);
  }
};
export const deleteHouse = async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);
    res.json(deletedHouse);
  } catch (e) {
    console.error(e);
  }
};
export const createHouse = async (req, res) => {
  try {
    const newHouse = await House.create(req.body);
    res.status(200).json(newHouse);
  } catch (e) {
    console.error(e);
  }
};
export const getFeatured = async (req, res) => {
  try {
    const featured = await House.find({ featured: true });
    res.status(200).json(featured);
  } catch (e) {
    console.error(e);
  }
};
export const getByName = async (req, res) => {
  try {
    const city = req.params.city;
    const houses = await House.find({ city });
    res.status(200).json(houses);
  } catch (e) {}
};
