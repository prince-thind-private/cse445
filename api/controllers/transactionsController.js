const Transaction = require("../models/Transaction");
const Room = require("../models/Room");

exports.index = async function (req, res) {
  const user = req.user;
  const roomId = req.query.roomId;
  const transactions = await Transaction.find({ user: user.id, room: roomId })
    .populate("room")
    .lean();
  res.json({ data: { transactions } });
};
exports.detail = async function (req, res) {
  //const user = req.user;
  const transactionId = req.params.id;
  try {
    const transaction = await Transaction.findById(transactionId)
      .populate("room")
      .lean();
    res.json({ data: { transaction } });
  } catch (e) {
    console.error(e);
    res.json({ error: { code: 500, message: "unknown error" } });
  }
};
exports.create_post = async function (req, res) {
  const user = req.user;
  const room = await Room.findOne({ number: req.body.room, user });
  const moneyToOwner = req.body.moneyToOwner;
  const moneyFromOwner = req.body.moneyFromOwner;
  const previousBalance = room.balance;
  const remarks = req.body.remarks;

  room.balance += moneyFromOwner - moneyToOwner;
  await room.save();

  const transaction = new Transaction({
    moneyFromOwner,
    moneyToOwner,
    presentBalance: room.balance,
    previousBalance,
    user,
    remarks,
    room: room.id,
    date: new Date(),
  });

  try {
    await transaction.save();
    res.json({ data: { transaction } });
  } catch (e) {
    console.error(e);
    res.json({ error: { code: 500, message: "unknown error" } });
  }
};
