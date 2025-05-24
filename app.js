/**
 * 简易文件分享站 - 主要JavaScript文件
 * 用于动态生成文件列表和处理下载功能
 */

// 文件数据（实际使用时可以从JSON文件或API获取）
const fileData = [
    {
        id: 1,
        name: "逆叶box.apk",
        description: "自制手表工具箱",
        type: "apk",
        directLink: "https://vip.123pan.cn/1841432992/13054668", // 替换为实际的123云盘直链
        shareLink: "https://www.123865.com/s/QtPDTd-nOl5v" // 替换为实际的网盘分享链接
    },
    {
        id: 2,
        name: "Xposed Edge Pro手势.apk",
        description: "最强手势软件",
        type: "apk",
        directLink: "https://vip.123pan.cn/1841432992/13257824",
        shareLink: "https://www.123865.com/s/QtPDTd-sOl5v"
    },
    {
        id: 3,
        name: "官方手表QQ.apk",
        description: "隐藏root后不会封号，其实不隐藏封号概率也很小",
        type: "apk",
        directLink: "https://vip.123pan.cn/1841432992/13257823",
        shareLink: "https://www.123865.com/s/QtPDTd-WOl5v"
    },
    {
        id: 4,
        name: "小天才全系列root工具.zip",
        description: "5月24日的还热乎呢，小天才root工具",
        type: "zip",
        directLink: "https://vip.123pan.cn/1841432992/13258069",
        shareLink: "https://www.123865.com/s/QtPDTd-COl5v"
    }
];

/**
 * 根据文件类型返回对应的图标类名
 * @param {string} fileType - 文件类型
 * @returns {string} - Font Awesome图标类名
 */
function getFileIcon(fileType) {
    switch(fileType.toLowerCase()) {
        case 'pdf':
            return 'fa-file-pdf';
        case 'zip':
        case 'rar':
        case '7z':
            return 'fa-file-archive';
        case 'doc':
        case 'docx':
        case 'word':
            return 'fa-file-word';
        case 'xls':
        case 'xlsx':
        case 'excel':
            return 'fa-file-excel';
        case 'ppt':
        case 'pptx':
        case 'powerpoint':
            return 'fa-file-powerpoint';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'image':
            return 'fa-file-image';
        case 'mp3':
        case 'wav':
        case 'audio':
            return 'fa-file-audio';
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'video':
            return 'fa-file-video';
        case 'txt':
        case 'text':
            return 'fa-file-alt';
        case 'html':
        case 'css':
        case 'js':
        case 'code':
            return 'fa-file-code';
        default:
            return 'fa-file';
    }
}

/**
 * 生成文件列表HTML
 */
function generateFileList() {
    const fileListElement = document.querySelector('.file-list');
    
    // 如果没有文件，显示提示信息
    if (fileData.length === 0) {
        fileListElement.innerHTML = '<div class="no-files">暂无文件</div>';
        return;
    }
    
    // 生成文件列表HTML
    let fileListHTML = '';
    
    fileData.forEach(file => {
        fileListHTML += `
            <div class="file-item" data-id="${file.id}">
                <div class="file-icon">
                    <i class="fas ${getFileIcon(file.type)}"></i>
                </div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-description">${file.description}</div>
                </div>
                <div class="file-actions">
                    <a href="${file.directLink}" class="download-btn" target="_blank">
                        <i class="fas fa-download"></i> 直链下载（推荐）
                    </a>
                    <a href="${file.shareLink}" class="alt-download-btn" target="_blank">
                        <i class="fas fa-cloud-download-alt"></i> 网盘下载
                    </a>
                </div>
            </div>
        `;
    });
    
    fileListElement.innerHTML = fileListHTML;
}

/**
 * 页面加载完成后初始化应用
 */
document.addEventListener('DOMContentLoaded', () => {
    // 生成文件列表
    generateFileList();
    
    // 可以在这里添加其他初始化代码
    console.log('文件分享站初始化完成');
});