document.addEventListener('DOMContentLoaded', function() {
    // 导航功能
    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.getAttribute('data-section');
            
            // 移除所有活动状态
            navBtns.forEach(b => b.classList.remove('active'));
            
            // 添加活动状态
            btn.classList.add('active');
            
            // 平滑滚动到目标区域
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 标签云点击效果
    const cloudTags = document.querySelectorAll('.cloud-tag');
    cloudTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // 随机改变标签颜色
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            tag.style.background = randomColor;
            
            // 添加点击动画
            tag.style.transform = 'scale(1.2)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 200);
        });
    });

    // 技能标签悬停效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.background = '#e74c3c';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.background = 'var(--primary-color)';
        });
    });

    // 项目卡片动画
    const projectCards = document.querySelectorAll('.project-card');
    
    // 使用 Intersection Observer 实现滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // 社交链接特殊处理
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(-3px) scale(1)';
        });
    });

    // 头像点击效果
    const avatar = document.querySelector('.avatar');
    avatar.addEventListener('click', () => {
        avatar.style.transform = 'scale(1.1) rotate(360deg)';
        setTimeout(() => {
            avatar.style.transform = 'scale(1.05)';
        }, 500);
    });

    // 添加打字机效果到标题
    const nameElement = document.querySelector('.name');
    const titleElement = document.querySelector('.title');
    
    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // 页面加载完成后执行打字机效果
    setTimeout(() => {
        typeWriter(nameElement, 'ny', 150);
        setTimeout(() => {
            typeWriter(titleElement, '小白开发者 & 小天才破解爱好者', 80);
        }, 1000);
    }, 500);

    // 添加粒子背景效果
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(52, 152, 219, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }

    // 每隔一段时间创建粒子
    setInterval(createParticle, 300);

    // 鼠标跟随效果
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 为项目卡片添加鼠标跟随光效
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(52, 152, 219, 0.1) 0%, transparent 50%), var(--background-color)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--background-color)';
        });
    });

    // 滚动到顶部功能
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    `;
    
    document.body.appendChild(scrollToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.transform = 'translateY(0)';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.transform = 'translateY(10px)';
        }
    });
    
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 添加键盘导航支持
    document.addEventListener('keydown', (e) => {
        const currentActive = document.querySelector('.nav-btn.active');
        const currentIndex = Array.from(navBtns).indexOf(currentActive);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            navBtns[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < navBtns.length - 1) {
            navBtns[currentIndex + 1].click();
        }
    });

    console.log('🎉 ny的个人博客已加载完成！');
    console.log('💡 提示：使用左右箭头键可以切换导航标签');
});