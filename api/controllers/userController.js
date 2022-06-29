const User = require("../models/User");
const { errorResponse } = require("../helpers/errorResponseHandler");

exports.getAll = async (req, res, next) => {
  try {
    const userId = req.auth.data._id;
    const users = await User.find({ _id: { $ne: userId } }).lean();
    for await (const _a of users) {
      const latestChat = await Chat.findOne({
        $or: [
          {
            sender: userId,
            receiver: _a._id,
          },
          {
            sender: _a._id,
            receiver: userId,
          },
        ],
      }).sort({ createdAt: -1 });
      _a.chat = latestChat;
    }

    return res.status(200).json({
      success: true,
      message: "Successfull",
      data: users,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
