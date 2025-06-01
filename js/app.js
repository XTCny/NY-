/**
 * 简易文件分享站 - 主要JavaScript文件
 * 用于动态生成文件列表和处理下载功能
 */

// 更新日期时间显示
function updateDateTime() {
    const now = new Date();
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');

    // 格式化日期：yyyy年MM月dd日 星期x
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekDay = weekDays[now.getDay()];

    // 格式化时间：HH:mm:ss
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    dateElement.textContent = `${year}年${month}月${date}日 星期${weekDay}`;
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

/**
 * 主题切换功能
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // 从本地存储获取主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // 主题切换事件监听
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // 添加旋转动画
        themeToggle.classList.add('rotating');
        
        setTimeout(() => {
            setTheme(newTheme);
            themeToggle.classList.remove('rotating');
        }, 250);
        
        // 保存主题设置到本地存储
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * 设置主题
 * @param {string} theme - 主题名称 ('light' 或 'dark')
 */
function setTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

// 文件数据（实际使用时可以从JSON文件或API获取）
const fileData = {
    // 根目录文件
    files: [
    
    ],
    // 文件夹数据
    folders: [
        {
            id: "XTC",
            name: "小天才",
            files: [
            ],
            folders: [
                {
                    id: "XTCRootTools",
                    name: "root工具",
                    files: [
                        {
                            id: 4,
                            name: "小天才全系列root工具.zip",
                            description: "5月24日的还热乎呢，小天才root工具",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/13258069"
                        }
                    ]
                },
                {
                    id: "apks",
                    name: "应用",
                    files: [
                        {
                            id: 1,
                            name: "逆叶box.apk",
                            description: "自制手表工具箱",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/13054668"
                        },
                        {
                            id: 2,
                            name: "Xposed Edge Pro手势.apk",
                            description: "最强手势软件",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/13257824"
                        },
                        {
                            id: 3,
                            name: "官方手表QQ.apk",
                            description: "隐藏root后不会封号，其实不隐藏封号概率也很小",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/13257823"
                        }
                    ]
                }
            ]
        }
    ]
};

/**
 * 生成文件夹HTML
 * @param {Object} folder - 文件夹数据
 * @returns {string} - 文件夹HTML字符串
 */
function generateFolderHTML(folder) {
    // 生成文件HTML
    const filesHTML = folder.files ? folder.files.map(file => generateFileHTML(file)).join('') : '';
    
    // 生成子文件夹HTML
    const subFoldersHTML = folder.folders ? folder.folders.map(subFolder => generateFolderHTML(subFolder)).join('') : '';
    
    return `
        <div class="folder" id="${folder.id}">
            <div class="folder-header">
                <i class="fas fa-folder-open"></i>
                <span class="folder-name">${folder.name}</span>
                <button class="folder-toggle" onclick="toggleFolder('${folder.id}')">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <div class="folder-content">
                ${filesHTML}
                ${subFoldersHTML}
            </div>
        </div>
    `;
}

/**
 * 切换文件夹展开/收起
 * @param {string} folderId - 文件夹ID
 */
function toggleFolder(folderId) {
    const folder = document.getElementById(folderId);
    const content = folder.querySelector('.folder-content');
    const toggle = folder.querySelector('.folder-toggle i');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        toggle.className = 'fas fa-chevron-up';
    } else {
        content.style.display = 'none';
        toggle.className = 'fas fa-chevron-down';
    }
}

/**
 * 生成文件HTML
 * @param {Object} file - 文件数据
 * @returns {string} - 文件HTML字符串
 */
function generateFileHTML(file) {
    const iconClass = getFileIcon(file.type);
    return `
        <div class="file-item">
            <i class="${iconClass} file-icon"></i>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-description">${file.description}</div>
            </div>
            <div class="file-actions">
                <a href="${file.directLink}" class="download-btn" target="_blank">
                    <i class="fas fa-download"></i> 下载
                </a>
            </div>
        </div>
    `;
}

/**
 * 根据文件类型获取图标
 * @param {string} fileType - 文件类型
 * @returns {string} - Font Awesome图标类名
 */
function getFileIcon(fileType) {
    switch(fileType.toLowerCase()) {
        case 'apk':
            return 'fab fa-android';
        case 'pdf':
            return 'fas fa-file-pdf';
        case 'zip':
        case 'rar':
        case '7z':
            return 'fas fa-file-archive';
        case 'doc':
        case 'docx':
        case 'word':
            return 'fas fa-file-word';
        case 'xls':
        case 'xlsx':
        case 'excel':
            return 'fas fa-file-excel';
        case 'ppt':
        case 'pptx':
        case 'powerpoint':
            return 'fas fa-file-powerpoint';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'image':
            return 'fas fa-file-image';
        case 'mp3':
        case 'wav':
        case 'audio':
            return 'fas fa-file-audio';
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'video':
            return 'fas fa-file-video';
        case 'txt':
        case 'text':
            return 'fas fa-file-alt';
        default:
            return 'fas fa-file-code';
    }
}

/**
 * 搜索文件
 */
function searchFiles() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const fileList = document.querySelector('.file-list');
    
    // 清空文件列表
    fileList.innerHTML = '';
    
    // 搜索根目录文件
    const matchedRootFiles = fileData.files.filter(file => 
        file.name.toLowerCase().includes(searchTerm) || 
        file.description.toLowerCase().includes(searchTerm)
    );
    matchedRootFiles.forEach(file => {
        fileList.innerHTML += generateFileHTML(file);
    });
    
    // 搜索文件夹中的文件
    function searchInFolder(folder) {
        // 搜索当前文件夹的文件
        const matchedFiles = folder.files ? folder.files.filter(file =>
            file.name.toLowerCase().includes(searchTerm) ||
            file.description.toLowerCase().includes(searchTerm)
        ) : [];

        // 递归搜索子文件夹
        const matchedSubFolders = folder.folders ? folder.folders.map(subFolder => {
            const result = searchInFolder(subFolder);
            return {
                folder: subFolder,
                hasMatches: result.hasMatches,
                matchedFiles: result.matchedFiles
            };
        }).filter(result => result.hasMatches) : [];

        // 判断当前文件夹是否有匹配项
        const hasMatches = matchedFiles.length > 0 || 
                          matchedSubFolders.length > 0 || 
                          folder.name.toLowerCase().includes(searchTerm);

        return {
            hasMatches,
            matchedFiles,
            matchedSubFolders
        };
    }

    // 处理搜索结果显示
    fileData.folders.forEach(folder => {
        const searchResult = searchInFolder(folder);
        
        if (searchResult.hasMatches) {
            const folderElement = document.createElement('div');
            folderElement.className = 'folder';
            folderElement.id = folder.id;
            
            // 构建文件夹HTML内容（只显示匹配的项）
            let folderContent = '';
            if (searchResult.matchedFiles.length > 0) {
                folderContent += searchResult.matchedFiles.map(file => generateFileHTML(file)).join('');
            }
            if (searchResult.matchedSubFolders.length > 0) {
                folderContent += searchResult.matchedSubFolders.map(subResult => 
                    generateFolderHTML(subResult.folder)
                ).join('');
            }
            
            folderElement.innerHTML = `
                <div class="folder-header">
                    <i class="fas fa-folder-open"></i>
                    <span class="folder-name">${folder.name}</span>
                    <button class="folder-toggle" onclick="toggleFolder('${folder.id}')">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="folder-content" style="display: block;">
                    ${folderContent}
                </div>
            `;
            
            fileList.appendChild(folderElement);
        }
    });
    
    // 如果没有搜索结果
    if (fileList.children.length === 0) {
        fileList.innerHTML = '<div class="no-files">未找到匹配的文件</div>';
    }
}

/**
 * 显示所有文件
 */
function showAllFiles() {
    const fileList = document.querySelector('.file-list');
    fileList.innerHTML = '';
    
    // 显示根目录文件
    fileData.files.forEach(file => {
        fileList.innerHTML += generateFileHTML(file);
    });

    // 显示文件夹
    fileData.folders.forEach(folder => {
        fileList.innerHTML += generateFolderHTML(folder);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化搜索功能
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            showAllFiles();
        } else {
            searchFiles();
        }
    });

    // 初始化主题切换功能
    initThemeToggle();

    // 初始化时间显示
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // 显示所有文件
    showAllFiles();
});
