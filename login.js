document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // 更新用户数据
    const users = {
        '12001': { 
            password: '123456', 
            name: '姚家荣', 
            department: '总经办',
            avatar: 'https://s1.imagehub.cc/images/2024/11/08/517863d36cc7513386d28d457636008d.jpeg'
        },
        '12002': { 
            password: '123456', 
            name: '李四', 
            department: '人事部',
            avatar: './images/default-avatar.png'
        },
        '12003': { 
            password: '123456', 
            name: '王五', 
            department: '财务部',
            avatar: './images/default-avatar.png'
        },
        '12004': { 
            password: '123456', 
            name: '赵六', 
            department: '市场部',
            avatar: './images/default-avatar.png'
        }
    };

    loginForm.addEventListener('submit', function() {
        const workId = document.getElementById('workId').value;
        const password = document.getElementById('password').value;

        // 验证用户
        if (users[workId] && users[workId].password === password) {
            // 登录成功，保存用户信息到 localStorage
            const userData = {
                workId: workId,
                name: users[workId].name,
                department: users[workId].department,
                avatar: users[workId].avatar
            };
            localStorage.setItem('userInfo', JSON.stringify(userData));
            
            // 跳转到主页
            window.location.href = 'main.html';
        } else {
            errorMessage.textContent = '工号或密码错误';
        }
    });
}); 