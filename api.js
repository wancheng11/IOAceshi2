const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  // 登录
  login: async (workId, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workId, password })
    });
    return await response.json();
  },

  // 添加员工
  addEmployee: async (employeeData, token) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(employeeData)
    });
    return await response.json();
  },

  // 修改密码
  changePassword: async (passwords, token) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(passwords)
    });
    return await response.json();
  }
};

export default api; 