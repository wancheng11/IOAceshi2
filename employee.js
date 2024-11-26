document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态和权限
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        window.location.href = 'login.html';
        return;
    }

    const userData = JSON.parse(userInfo);
    const adminDepartments = ['总经办', '人力与组织中心'];
    if (!adminDepartments.includes(userData.department)) {
        alert('您没有权限访问此页面');
        history.back();
        return;
    }

    const employeeForm = document.getElementById('employeeForm');
    
    employeeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            workId: document.getElementById('workId').value,
            department: document.getElementById('department').value,
            position: document.getElementById('position').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            password: document.getElementById('initialPassword').value
        };

        try {
            // 调用添加员工API
            const response = await addEmployee(formData);
            
            if (response.success) {
                alert('员工添加成功！');
                // 更新本地存储的用户数据
                updateLocalUserData(formData);
                // 返回上一页
                history.back();
            } else {
                alert(response.message || '添加失败，请重试');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('系统错误，请稍后重试');
        }
    });
});

// API接口函数
async function addEmployee(employeeData) {
    // 这里是模拟的API调用，实际项目中需要替换为真实的API接口
    return new Promise((resolve) => {
        setTimeout(() => {
            // 模拟API响应
            const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
            
            // 检查工号是否已存在
            if (existingUsers[employeeData.workId]) {
                resolve({
                    success: false,
                    message: '工号已存在'
                });
                return;
            }

            // 添加新员工
            existingUsers[employeeData.workId] = {
                password: employeeData.password,
                name: employeeData.name,
                department: employeeData.department,
                position: employeeData.position,
                phone: employeeData.phone,
                email: employeeData.email
            };

            // 保存到localStorage（实际项目中应该保存到后端数据库）
            localStorage.setItem('users', JSON.stringify(existingUsers));

            resolve({
                success: true,
                message: '添加成功'
            });
        }, 500);
    });
}

// 更新本地用户数据
function updateLocalUserData(newEmployee) {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
    existingUsers[newEmployee.workId] = {
        password: newEmployee.password,
        name: newEmployee.name,
        department: newEmployee.department
    };
    localStorage.setItem('users', JSON.stringify(existingUsers));
} 