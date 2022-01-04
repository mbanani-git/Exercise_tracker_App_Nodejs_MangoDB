const User = require("../models/user");

const getInfo = async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    let getLimit = Number(limit) || 10;
    let getFrom = new Date(from);
    let getTo = new Date(to);

    let findID = await User.findOne({ _id });

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
  try {
    let { username } = req.body;
    console.log(username);

    let findUser = await User.findOne({ username: username });
    if (!findUser) {
      let newUser = await User.create({ username: username });
      return res.status(201).json({ id: newUser._id, username: newUser.username });
    } else {
      return res.status(201).json({ id: findUser._id, username: findUser.username });
    }
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
const postExo = async (req, res) => {
  try {
    const { _id } = req.body;

    const log = {
      description: req.body.desc,
      duration: req.body.duration,
      date: new Date(req.body.date).toDateString(),
    };

    let checkID = await User.findOne({ _id });

    if (checkID) {
      await User.updateOne({ $push: { log } });
      return res.status(201).json({
        _id,
        username: checkID.username,
        date: log.date,
        duration: Number(log.duration),
        description: log.description,
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
    const { _id } = req.body;
    let findID = await User.findOne({ _id });
    if (findID) {
      let count = findID.log.length;
      return res.status(201).json({ _id, username: findID.username, count, log: findID.log });
    }
  } catch (error) {
    return res.status(500).json({ error: "ID doesnt exist" });
  }
};
module.exports = { getInfo, postUsername, postExo, getLogs };
