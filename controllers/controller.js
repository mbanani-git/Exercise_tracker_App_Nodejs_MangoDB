const User = require("../models/user");

const getInfo = async (req, res) => {
  try {
    const _id = req.params._id;
    const { from, to, limit } = req.query;
    let getLimit = Number(limit) || 10;

    !from ? (getFrom = new Date("1970-01-01")) : new Date(from);
    !to ? (getTo = new Date("2100-01-01")) : new Date(to);

    let findID = await User.findOne({ _id });
    console.log(findID);
    if (findID) {
      let result = findID.log
        .filter((item) => new Date(item.date) > getFrom && new Date(item.date) < getTo)
        .slice(0, getLimit);
      let count = result.length;

      return res.status(201).json({ _id, username: findID.username, count, log: result });
    }
  } catch (error) {
    res.status(500).json({ error: "ID doesnt exist" });
  }
};
const postUsername = async (req, res) => {
  await User.deleteMany();
  try {
    let { username } = req.body;
    let findUser = await User.findOne({ username: username });
    if (!findUser) {
      let newUser = await User.create({ username: username });
      return res.status(201).json({ username: newUser.username, _id: newUser._id });
    } else {
      return res.status(201).json({ username: findUser.username, _id: findUser._id });
    }
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
const postExo = async (req, res) => {
  try {
    const _id = req.params._id;

    if (!req.body.date) {
      req.body.date = new Date().toDateString();
    }
    const log = {
      description: req.body.description,
      duration: req.body.duration,
      date: new Date(req.body.date).toDateString(),
    };
    let checkID = await User.findOne({ _id }).updateOne({ $push: { log } });
    let getUsername = await User.findOne({ _id });

    if (checkID) {
      return res.status(201).json({
        username: getUsername.username,
        description: log.description,
        duration: Number(log.duration),
        date: log.date,
        _id,
      });
    } else {
      return res.status(500).json({ error: "ID doesnt exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: "ID doesnt exist" });
  }
};
const getLogs = async (req, res) => {
  try {
    const _id = req.params._id;
    let findID = await User.findOne({ _id });
    if (findID) {
      let count = findID.log.length;
      return res.status(201).json({ _id, username: findID.username, count, log: findID.log });
    }
  } catch (error) {
    return res.status(500).json({ error: "ID doesnt exist" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const getAll = await User.find({}).select("_id username");
    res.status(201).json([...getAll]);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { getInfo, postUsername, postExo, getLogs, getAllUsers };
