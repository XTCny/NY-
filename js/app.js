/**
 * 简易文件分享站 - 主要JavaScript文件
 * 用于动态生成文件列表和处理下载功能
 */

// 公告弹窗功能
function initAnnouncement() {
    const modal = document.getElementById('announcement-modal');
    const closeBtn = document.getElementById('close-announcement');
    
    // 每次都显示公告
    modal.style.display = 'flex';
    
    // 5秒后自动关闭
    setTimeout(() => {
        closeAnnouncement();
    }, 5000);
    
    // 关闭按钮事件
    closeBtn.addEventListener('click', closeAnnouncement);
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAnnouncement();
        }
    });
}

function closeAnnouncement() {
    const modal = document.getElementById('announcement-modal');
    modal.classList.add('fade-out');
    
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fade-out');
    }, 500);
}

// 获取每日一言
async function fetchDailyQuote() {
    const quoteElement = document.getElementById('daily-quote');
    
    try {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        const response = await fetch('http://api.corexwear.com/yan/index.php', requestOptions);
        const result = await response.text();
        const data = JSON.parse(result);
        
        if (data.status === 200 && data.yan) {
            quoteElement.textContent = data.yan;
            // 添加淡入动画效果
            quoteElement.style.opacity = '0';
            setTimeout(() => {
                quoteElement.style.transition = 'opacity 0.5s ease-in-out';
                quoteElement.style.opacity = '1';
            }, 100);
        }
    } catch (error) {
        console.error('获取每日一言失败:', error);
        // 保持默认文本
    }
}

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
            modifiedDate: "2025-7-31",
            fileCount: 21,
            files: [
            ],
            folders: [
                {
                    id: "XTCRootTools",
                    name: "root",
                    modifiedDate: "2025-7-31",
                    fileCount: 6,
                    files: [
                        {
                            id: 4,
                            name: "小天才全系列root工具.zip",
                            description: "sky小天才root工具",
                            type: "zip",
                            directLink: "https://panurl.cn/down.php/7047d500dded83b7f1eca8c772ac1de3.7z"
                        },
                        {
                            id: 5,
                            name: "【我就有QFIL】QPST.rar",
                            description: "高通刷工具",
                            type: "rar",
                            directLink: "https://vip.123pan.cn/1841432992/13562076"
                        },
                       {
                            id: 6,
                            name: "（需解压)安卓8.1使用EDXP",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/14063496"
                        },
                      {
                            id: 7,
                            name: "scrcpy投屏",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/14063612"
                        },
                      {
                            id: 8,
                            name: "驱动",
                            description: "root必装",
                            type: "zip",
                            directLink: "https://panurl.cn/down.php/8059f129926942dda29c3cc43212ec52.7z"
                        },
                        {
                            id: 8,
                            name: "D3工具箱1.0.2",
                            description: "兼容至Win7",
                            type: "zip",
                            directLink: "https://panurl.cn/down.php/6070b6ff105ef7703dbce1a522828ea4.zip"
                        }
                      
                    ]
                },
                {
                    id: "apks",
                    name: "应用",
                    modifiedDate: "2025-7-31",
                    fileCount: 6,
                    files: [
                        {
                            id: 6,
                            name: "逆叶box.apk",
                            description: "自制手表工具箱",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/14077845"
                        },
                      {
                            id: 5,
                            name: "解限_小天才智能输入法",
                            description: "",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/14276746"
                        },
                        {
                            id: 2,
                            name: "Xposed Edge Pro手势.apk",
                            description: "最强手势软件",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/13257824"
                        },
                      {
                            id: 6,
                            name: "弦应用商店2.2.6",
                            description: "",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/14276842"
                        },
                        {
                            id: 3,
                            name: "官方手表QQ.apk",
                            description: "隐藏root后不会封号，其实不隐藏封号概率也很小",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/13257823"
                        },
                      {
                            id: 5,
                            name: "adbWiFi5.1.6",
                            description: "远程连接软件",
                            type: "apk",
                            directLink: "https://vip.123pan.cn/1841432992/14063474"
                        }
                    ]
                },
                {
                    id: "modules",
                    name: "magisk模块",
                    modifiedDate: "2025-7-31",
                    fileCount: 9,
                    files: [
                        {
                            id: 1,
                            name: "伪装Z10模块-安卓8.1机型",
                            description: "获得Z10表盘等",
                            type: "zip",
                            directLink: "https://panurl.cn/down.php/6efd13ea27193b88ab4c1172bd8c201b.zip"
                        },
                        {
                            id: 2,
                            name: "NatureOS3-3.7-wear4100机型通刷-noversion",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/13562125",
                        },
                        {
                            id: 3,
                            name: "NatureOS3-1.4-wear4100机型附属模块1",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/13562124",
                        },
                        {
                            id: 4,
                            name: "【先解压】CaremeOSPro_2.7.0_Pre1",
                            description: "",
                            type: "zip",
                            directLink: "https://panurl.cn/down.php/71f5c9ce448cdde053f4a73827842f19.zip",
                        },
                      {
                            id: 6,
                            name: "全主题模块1.6.0fix",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/13921872"
                        },
                      {
                            id: 5,
                            name: "[Z8A_V1.6.7][建议立刻刷入]XTCPatch_additional",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/14063471"
                        },
                      {
                            id: 5,
                            name: "[Z9_3.6.5]XTCPatch_Additional",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/14063472"
                        },
                      {
                            id: 5,
                            name: "[DFB_2.8.5]XTCPatch_Additional",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/14063470"
                        },
                      {
                            id: 5,
                            name: "表Q消息接收修复-V2.1",
                            description: "",
                            type: "zip",
                            directLink: "https://vip.123pan.cn/1841432992/14063473"
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
    
    // 获取文件数量和修改日期
    const fileCount = folder.fileCount || (folder.files ? folder.files.length : 0);
    const modifiedDate = folder.modifiedDate || '未知';
    
    return `
        <div class="folder" id="${folder.id}">
            <div class="folder-header">
                <i class="fas fa-folder-open"></i>
                <div class="folder-info">
                    <span class="folder-name">${folder.name}</span>
                    <div class="folder-meta">
                        <span class="file-count">${fileCount} 个文件</span>
                        <span class="modified-date">修改于 ${modifiedDate}</span>
                    </div>
                </div>
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

/**
 * 专题功能相关代码
 */

// 专题内容数据
const topicData = {
    website: {
        title: '推荐网址',
        modifiedDate: '2025-7-31',
        content: `
            <h2>推荐的网址</h2>
            <p>总是有人问我教程和文件所以我整理了一下一些网址</p>
            <p>文字root教程：www.yuque.com/yuqueyonghul9lu5p/vl3v27/ta3g9zb23nd2rrvd?#，/n视频root教程：www.bilibili.com/video/BV1m1YLePEk1/，救砖视频：www.bilibili.com/video/BV1hFcmeGE7e/，/n解决验证异常离线ota视频https://www.bilibili.com/video/BV17wR8YxEyz/</p>
            <p>root文件全应用：https://www.123pan.com/s/SFpbVv-UDGQv.html</a></p>
            <p>WCG文件分享站：chksz.top/XTC</p>
            <p>我的文件分享站：nyweb.top</p>
        `
    },
    about: {
        title: '关于我们',
        modifiedDate: '2025-7-31',
        content: `
            <h2>关于本站</h2>
            <p>这是我做的一个的文件分享站，如果直链下载不可用，请使用网盘下载。</p>
            
            <div class="pan-download-info">
                <h3>网盘下载通道</h3>
                <p>主链接：<a href="https://www.123684.com/s/QtPDTd-oRl5v?" target="_blank" class="pan-link"><i class="fas fa-cloud-download-alt"></i> 点击下载</a></p>
                <p>备用链接：<a href="https://www.123865.com/s/QtPDTd-oRl5v?" target="_blank" class="pan-link"><i class="fas fa-cloud-download-alt"></i> 点击下载</a></p>
                <p>提取码：<span class="extract-code">zlVV</span></p>
            </div>
            
            <p>作者：逆叶</p>
            <p>QQ群：876331156，微信：vx3784446092</p>
            <p>bilibili：<a href="https://space.bilibili.com/3546773477919038?spm_id_from=333.788.0.0" target="_blank" class="bilibili-link"><i class="fab fa-bilibili"></i> 访问作者B站主页</a></p>
            <p>QQ群：876331156，微信：vx3784446092</p>
        `
    },
    donate: {
        title: '支持我们',
        modifiedDate: '2025-7-31',
        content: `
            <p>本站直链下载都需要123云盘的会员，域名也需要钱，所以需要你们的捐赠，捐赠者会在我开发的项目中和QQ群显示，1元以下不会展示。捐赠请备注展示的名字，捐赠大于等于5元可以找我激活逆叶box,apk</p>
            
            <h3>💰 支持方式</h3>
            <p><strong>加入QQ群后查看群公告的二维码</strong></p>
            
            
            <h3>🏆 捐赠名单</h3>
            <p>夕辞吖不常在线1元 \n1元琴家 20元\n 云控中 5元</p>

        `
    },
    upload: {
        title: '文件上传',
        modifiedDate: '2025-7-31',
        content: `
            <p>欢迎向本站提交优质文件资源，让更多用户受益！</p>          
            <h3>📝 上传方式</h3>
            

            <p>QQ或微信联系我，申请好友请备注文件上传，然后把文件发我就行</p>
        `
    },
    announcement: {
        title: '公告',
        modifiedDate: '2025-7-31',
        content: `
            <h2>📢 最新公告</h2>
             <div style="background: rgba(40, 167, 69, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #28a745;">
                <h3>域名更改 (2025-07-26)</h3>
                <p>域名已更改为nyweb.top，已开启强制使用https</p>
            </div>
            
            <div style="background: rgba(40, 167, 69, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #28a745;">
                <h3>🎉 网站功能大更新 (2025-06-01)</h3>
                <p>• 新增专题中心功能</p>
                <p>• 优化界面设计和用户体验</p>
                <p>• 修复已知问题</p>
                <p>• 新增主题切换功能</p>
            </div>

            
            <h3>📅 更新历史</h3>
            <p><strong>2025-05-24:</strong> 网站正式上线</p>
            <p><strong>2024-05-25:</strong> 增加文件搜索功能，文件夹，时间显示等</p>
            <p><strong>2024-06-01:</strong> 新增专题中心，主题切换等</p>
        `
    }
};

/**
 * 初始化导航功能
 */
function initNavigation() {
    const filesBtn = document.getElementById('files-btn');
    const toolsBtn = document.getElementById('tools-btn');
    const topicsBtn = document.getElementById('topics-btn');
    const filesPage = document.getElementById('files-page');
    const toolsPage = document.getElementById('tools-page');
    const topicsPage = document.getElementById('topics-page');
    const topicsGrid = document.querySelector('.topics-grid');
    const topicDetail = document.getElementById('topic-detail');
    const backBtn = document.getElementById('back-btn');
    const topicCards = document.querySelectorAll('.topic-card');
    const toolCards = document.querySelectorAll('.tool-card');
    
    // 导航按钮点击事件
    filesBtn.addEventListener('click', () => {
        switchPage('files');
    });
    
    toolsBtn.addEventListener('click', () => {
        switchPage('tools');
    });
    
    topicsBtn.addEventListener('click', () => {
        switchPage('topics');
    });
    
    // 专题卡片点击事件
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            const topicId = card.getAttribute('data-topic');
            showTopicDetail(topicId);
        });
    });
    
    // 工具卡片点击事件
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolUrl = card.getAttribute('data-url');
            if (toolUrl) {
                // 直接打开指定的URL
                window.open(toolUrl, '_blank');
            }
        });
    });
    
    // 返回按钮点击事件
    backBtn.addEventListener('click', () => {
        showTopicsGrid(); // 返回到专题网格
    });
}

/**
 * 切换页面
 * @param {string} page - 页面名称 ('files', 'tools' 或 'topics')
 */
function switchPage(page) {
    const filesBtn = document.getElementById('files-btn');
    const toolsBtn = document.getElementById('tools-btn');
    const topicsBtn = document.getElementById('topics-btn');
    const filesPage = document.getElementById('files-page');
    const toolsPage = document.getElementById('tools-page');
    const topicsPage = document.getElementById('topics-page');
    const searchContainer = document.querySelector('.search-container');
    
    // 重置所有按钮状态
    filesBtn.classList.remove('active');
    toolsBtn.classList.remove('active');
    topicsBtn.classList.remove('active');
    
    // 隐藏所有页面
    filesPage.classList.add('hidden');
    toolsPage.classList.add('hidden');
    topicsPage.classList.add('hidden');
    
    if (page === 'files') {
        // 切换到文件页面
        filesBtn.classList.add('active');
        filesPage.classList.remove('hidden');
        searchContainer.style.display = 'block'; // 显示搜索框
    } else if (page === 'tools') {
        // 切换到工具页面
        toolsBtn.classList.add('active');
        toolsPage.classList.remove('hidden');
        searchContainer.style.display = 'none'; // 隐藏搜索框
    } else if (page === 'topics') {
        // 切换到专题页面
        topicsBtn.classList.add('active');
        topicsPage.classList.remove('hidden');
        searchContainer.style.display = 'none'; // 隐藏搜索框
        
        // 立即确保显示专题网格，隐藏专题详情
        const topicsGrid = document.querySelector('.topics-grid');
        const topicDetail = document.getElementById('topic-detail');
        
        if (topicsGrid) {
            topicsGrid.classList.remove('hidden');
        }
        if (topicDetail) {
            topicDetail.classList.add('hidden');
        }
    }
}

/**
 * 显示专题详情
 * @param {string} topicId - 专题ID
 */
function showTopicDetail(topicId) {
    const topicsGrid = document.querySelector('.topics-grid');
    const topicDetail = document.getElementById('topic-detail');
    const topicTitle = document.getElementById('topic-title');
    const topicContent = document.getElementById('topic-content');
    const searchContainer = document.querySelector('.search-container');
    
    if (!topicsGrid || !topicDetail || !topicTitle || !topicContent) {
        console.error('专题详情元素未找到');
        return;
    }
    
    // 隐藏专题网格，显示专题详情
    topicsGrid.classList.add('hidden');
    topicDetail.classList.remove('hidden');
    
    // 确保隐藏搜索框
    if (searchContainer) {
        searchContainer.style.display = 'none';
        searchContainer.classList.add('hidden');
    }
    
    const topic = topicData[topicId];
    if (topic && topicTitle && topicContent) {
        topicTitle.textContent = topic.title;
        topicContent.innerHTML = topic.content;
    }
}

/**
 * 初始化专题卡片，添加修改日期
 */
function initTopicCards() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        const topicId = card.getAttribute('data-topic');
        const topic = topicData[topicId];
        
        if (topic && topic.modifiedDate) {
            // 查找卡片中的描述段落
            const description = card.querySelector('p');
            if (description) {
                // 在描述后添加修改日期
                const dateElement = document.createElement('div');
                dateElement.className = 'topic-date';
                dateElement.textContent = `修改于 ${topic.modifiedDate}`;
                card.appendChild(dateElement);
            }
        }
    });
}

/**
 * 显示专题网格
 */
function showTopicsGrid() {
    const topicsGrid = document.querySelector('.topics-grid');
    const topicDetail = document.getElementById('topic-detail');
    const searchContainer = document.querySelector('.search-container');
    
    if (!topicsGrid || !topicDetail) {
        console.error('专题元素未找到');
        return;
    }
    
    // 显示专题网格，隐藏专题详情
    topicsGrid.classList.remove('hidden');
    topicDetail.classList.add('hidden');
    
    // 确保隐藏搜索框
    if (searchContainer) {
        searchContainer.style.display = 'none';
        searchContainer.classList.add('hidden');
    }
}

/**
 * 初始化头像点击事件
 */
function initAvatarClick() {
    const avatarLink = document.querySelector('.avatar-link');
    
    if (avatarLink) {
        avatarLink.addEventListener('click', () => {
            // 打开个人博客网站
            window.open('https://nyweb.top/blog/', '_blank');
        });
        
        // 添加提示文本
        avatarLink.setAttribute('title', '点击打开个人网站');
    }
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

    // 初始化导航功能
    initNavigation();

    // 初始化时间显示
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // 获取每日一言
    fetchDailyQuote();

    // 初始化专题卡片修改日期
    initTopicCards();

    // 初始化公告弹窗
    initAnnouncement();

    // 初始化头像点击事件
    initAvatarClick();

    // 显示所有文件
    showAllFiles();
});
