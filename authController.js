const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 用户登录
const login = async (req, res) => {
  try {
    const { workId, password } = req.body;

    const user = await User.findOne({ workId });
    if (!user) {
      return res.status(401).json({ message: '工号或密码错误' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: '工号或密码错误' });
    }

    res.json({
      success: true,
      data: {
        workId: user.workId,
        name: user.name,
        department: user.department,
        avatar: user.avatar,
        token: generateToken(user._id),
        firstLogin: user.firstLogin
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 修改密码
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: '当前密码错误' });
    }

    user.password = newPassword;
    user.firstLogin = false;
    await user.save();

    res.json({ message: '密码修改成功' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  changePassword
}; 