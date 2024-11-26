document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        window.location.href = 'index.html';
        return;
    }

    // 激励话术数组
    const motivationalQuotes = [
        "今天也要加油哦！",
        "相信自己，你可以做得更好！",
        "每一天都是新的开始！",
        "保持微笑，保持热爱！",
        "工作也要开开心心的~",
        "今天也要元气满满！",
        "你的努力一定会有回报！",
        "让我们一起创造美好的一天！",
        "保持热情，保持专注！",
        "每个人都是自己人生的主角！",
        "积跬步以至千里！",
        "带着希望和梦想前进！",
        "用心工作，快乐生活！",
        "相信美好，相信自己！",
        "让每一天都充满意义！"
    ];

    // 填充用户信息
    const userData = JSON.parse(userInfo);
    
    // 更新头像
    const avatarImg = document.querySelector('.profile-avatar img');
    if (avatarImg && userData.avatar) {
        avatarImg.src = userData.avatar;
    }
    
    // 更新个人信息
    document.querySelector('.profile-name').textContent = userData.name;
    document.querySelector('.profile-department').textContent = userData.department;
    document.querySelector('.profile-work-id').textContent = `工号：${userData.workId}`;

    // 获取日期和星期
    function getDateString() {
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        const now = new Date();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const day = days[now.getDay()];
        return `今天是${month}月${date}日 星期${day}`;
    }

    // 更新个人信息卡片的日期和激励话术
    const profileMotto = document.querySelector('.profile-motto');
    
    // 设置固定的日期显示
    const dateString = getDateString();
    
    // 随机显示激励话术
    function updateMotivationalQuote() {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        profileMotto.style.opacity = 0;
        setTimeout(() => {
            profileMotto.textContent = dateString + '：' + motivationalQuotes[randomIndex];
            profileMotto.style.opacity = 1;
        }, 500);
    }

    // 初始显示一条激励话术
    updateMotivationalQuote();

    // 每30秒更新一次激励话术
    setInterval(updateMotivationalQuote, 30000);

    // 填充"我的"页面的个人信息
    document.querySelector('.profile-name').textContent = userData.name;
    document.querySelector('.profile-workId').textContent = userData.workId;
    document.querySelector('.profile-department').textContent = userData.department;

    // 添加登出功能
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('确定要退出登录吗？')) {
                localStorage.removeItem('userInfo');
                window.location.href = 'index.html';
            }
        });
    }

    // 原有的导航逻辑保持不变
    const navItems = document.querySelectorAll('.nav-item');
    const pageContents = document.querySelectorAll('.page-content');

    // 默认显示消息页面
    document.getElementById('messageContent').classList.add('active');

    // 导航切换
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            pageContents.forEach(page => page.classList.remove('active'));

            this.classList.add('active');
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });

    // 触摸事件处理保持不变...

    // 检查用户权限并显示/隐藏人事管理模块
    const adminDepartments = ['总经办', '人力与组织中心'];
    if (userData && adminDepartments.includes(userData.department)) {
        document.querySelector('.admin-only').style.display = 'block';
    }

    // 为工作台的每个功能项添加点击事件
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', function() {
            const functionName = this.querySelector('span:last-child').textContent;
            
            // 根据功能名称处理不同的操作
            switch(functionName) {
                case '打卡签到':
                    handleCheckIn();
                    break;
                case '请假申请':
                    handleLeaveApplication();
                    break;
                case '员工管理':
                    window.location.href = 'employee-add.html';
                    break;
                // 添加其他功能的处理...
            }
        });
    });

    // 打卡功能
    function handleCheckIn() {
        const now = new Date();
        const time = now.toLocaleTimeString();
        alert(`打卡成功！时间：${time}`);
        // 这里可以添加与后端的交互逻辑
    }

    // 请假申请功能
    function handleLeaveApplication() {
        // 这里可以添加跳转到请假申请页面或打开请假表单的逻辑
        alert('正在开发中...');
    }
}); 