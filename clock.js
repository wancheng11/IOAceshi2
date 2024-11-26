document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        window.location.href = 'index.html';
        return;
    }

    const userData = JSON.parse(userInfo);

    // 填充用户信息
    const avatarImg = document.getElementById('userAvatar');
    if (avatarImg) {
        avatarImg.src = userData.avatar;
        // 添加错误处理
        avatarImg.onerror = function() {
            this.src = './images/default-avatar.png';
        };
    }
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userDepartment').textContent = userData.department;
    document.getElementById('userWorkId').textContent = `工号：${userData.workId}`;

    // 更新时间显示
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
        const dateString = now.toLocaleDateString('zh-CN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            weekday: 'long' 
        });

        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('currentDate').textContent = dateString;
    }

    // 初始更新时间
    updateTime();
    // 每秒更新时间
    setInterval(updateTime, 1000);

    // 修改激励语数组
    const motivationalMessages = [
        "打卡成功！今天也要元气满满哦~ ✨",
        "新的一天，新的开始！加油！💪",
        "打卡成功！今天也要保持好心情！😊",
        "又是活力满满的一天呢！冲鸭！🚀",
        "打卡成功！愿今天遇见美好！🌈"
    ];

    const endDayMessages = [
        "辛苦啦！今天也是超棒的一天！✨",
        "完美收工！享受悠闲的夜晚吧！🌙",
        "今天也是很有成就的一天呢！👏",
        "打卡成功！快回家享受美好时光吧~🏃‍♂️",
        "充实的一天结束啦！明天见哦！👋"
    ];

    // 获取随机消息
    function getRandomMessage(messages) {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // 显示打卡成功弹窗
    function showClockModal(type, message) {
        const modal = document.getElementById('clockModal');
        const userClockInfo = modal.querySelector('.user-clock-info');
        const clockMotivation = modal.querySelector('.clock-motivation');
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });

        userClockInfo.innerHTML = `
            亲爱的 ${userData.name}：<br>
            工号：${userData.workId}<br>
            部门：${userData.department}<br>
            您已${type}打卡成功<br>
            打卡时间：${timeString}
        `;
        
        clockMotivation.textContent = message;
        modal.style.display = 'flex';
    }

    // 关闭弹窗
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('clockModal').style.display = 'none';
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('clockModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 更新打卡记录显示
    function updateClockRecord(type, time) {
        const now = new Date();
        const dateString = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
        
        let recordList = document.getElementById('recordList');
        let todayRecord = recordList.querySelector('.record-date');
        
        if (!todayRecord || todayRecord.textContent !== dateString) {
            // 创建新的日期记录
            const newDayRecord = document.createElement('div');
            newDayRecord.innerHTML = `
                <div class="record-date">${dateString}</div>
                <div class="record-item">
                    <div class="record-info">
                        <span class="record-type">上班打卡</span>
                        <span class="record-time">--:--</span>
                    </div>
                    <div class="record-info">
                        <span class="record-type">下班打卡</span>
                        <span class="record-time">--:--</span>
                    </div>
                </div>
            `;
            recordList.prepend(newDayRecord);
            todayRecord = newDayRecord;
        }

        // 更新对应的打卡时间
        const recordItem = todayRecord.querySelector('.record-item');
        const timeSpan = type === '上班' ? 
            recordItem.querySelector('.record-info:first-child .record-time') :
            recordItem.querySelector('.record-info:last-child .record-time');
        timeSpan.textContent = time;
    }

    // 修改打卡按钮事件处理
    document.getElementById('clockInBtn').addEventListener('click', function() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        
        updateClockRecord('上班', timeString);
        showClockModal('上班', getRandomMessage(motivationalMessages));
    });

    document.getElementById('clockOutBtn').addEventListener('click', function() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        
        updateClockRecord('下班', timeString);
        showClockModal('下班', getRandomMessage(endDayMessages));
    });

    // 添加手势返回功能
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
    }, false);

    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].clientX;
        handleGesture();
    }, false);

    function handleGesture() {
        if (touchStartX - touchEndX > -100) return; // 需要滑动距离大于100px
        if (touchStartX < 50) { // 从屏幕左边缘开始滑动
            history.back();
        }
    }

    // 补卡功能
    const makeupBtn = document.getElementById('makeupBtn');
    const makeupModal = document.getElementById('makeupModal');
    const closeMakeupModal = document.getElementById('closeMakeupModal');
    const makeupForm = document.getElementById('makeupForm');

    // 在现有代码中添加生成申请编号的函数
    function generateApplicationId() {
        // 生成7位随机数字
        const randomNum = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
        return `BKSQ${randomNum}`;
    }

    // 修改打开补卡弹窗的事件处理
    makeupBtn.addEventListener('click', function() {
        makeupModal.style.display = 'flex';
        
        // 生成并填充申请编号
        document.getElementById('applicationId').value = generateApplicationId();
        
        // 填充申请人信息
        document.getElementById('applicantName').value = userData.name;
        document.getElementById('applicantWorkId').value = userData.workId;
        document.getElementById('applicantDepartment').value = userData.department;
        
        // 设置默认日期为今天
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('makeupDate').value = today;
    });

    // 关闭补卡弹窗
    closeMakeupModal.addEventListener('click', function() {
        makeupModal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === makeupModal) {
            makeupModal.style.display = 'none';
        }
    });

    // 修改补卡表���提交处理
    makeupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const applicationId = document.getElementById('applicationId').value;
        const name = document.getElementById('applicantName').value;
        const workId = document.getElementById('applicantWorkId').value;
        const department = document.getElementById('applicantDepartment').value;
        const makeupType = document.querySelector('input[name="makeupType"]:checked').value;
        const date = document.getElementById('makeupDate').value;
        const time = document.getElementById('makeupTime').value;
        const reason = document.getElementById('makeupReason').value;

        // 格式化日期显示
        const formatDate = new Date(date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // 关闭补卡申请弹窗
        makeupModal.style.display = 'none';

        // 显示提交成功弹窗
        const successModal = document.getElementById('makeupSuccessModal');
        const successInfo = successModal.querySelector('.makeup-success-info');
        successInfo.innerHTML = `
            <div>补卡申请信息：</div>
            <div>申请编号：${applicationId}</div>
            <div>申请人：${name}</div>
            <div>工号：${workId}</div>
            <div>部门：${department}</div>
            <div>补卡类型：${makeupType}</div>
            <div>申请日期：${formatDate}</div>
            <div>申请时间：${time}</div>
            <div>申请原因：${reason}</div>
        `;
        successModal.style.display = 'flex';

        // 创建补卡记录
        const recordItem = document.createElement('div');
        recordItem.className = 'record-item';
        recordItem.innerHTML = `
            <div class="record-info">
                <span class="record-type">${makeupType}</span>
                <span class="record-time">${time}</span>
            </div>
        `;
        document.getElementById('recordList').prepend(recordItem);

        // 重置表单
        document.getElementById('makeupDate').value = '';
        document.getElementById('makeupTime').value = '';
        document.getElementById('makeupReason').value = '';
    });

    // 添加确认按钮事件
    document.getElementById('confirmMakeupBtn').addEventListener('click', function() {
        document.getElementById('makeupSuccessModal').style.display = 'none';
    });

    // 添加关闭按钮事件
    document.getElementById('closeMakeupSuccessModal').addEventListener('click', function() {
        document.getElementById('makeupSuccessModal').style.display = 'none';
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        const successModal = document.getElementById('makeupSuccessModal');
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });
}); 