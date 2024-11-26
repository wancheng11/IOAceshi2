const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 生成JWT令牌
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// 添加新员工
const addEmployee = async (req, res) => {
  try {
    const { workId, name, department, position, phone, email, password } = req.body;

    const userExists = await User.findOne({ workId });
    if (userExists) {
      return res.status(400).json({ message: '该工号已存在' });
    }

    const user = await User.create({
      workId,
      name,
      department,
      position,
      phone,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: '员工添加成功',
      data: {
        workId: user.workId,
        name: user.name,
        department: user.department
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取所有员工
const getEmployees = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addEmployee,
  getEmployees
}; 