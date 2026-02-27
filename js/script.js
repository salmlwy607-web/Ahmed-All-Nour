/* ----------------------------------------------------
    صيدلية أبو نور - JavaScript
    High-End Professional UI Interactions
------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------
    // 0. Mobile Menu Toggle (Global)
    // ------------------------------------------------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.main-nav');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileBtn.innerHTML = navMenu.classList.contains('active') ? '<i class="fa-solid fa-times"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
    }


    // ------------------------------------------------
    // 1. Dark Mode Toggle
    // ------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');

        // Check local storage for theme
        const savedTheme = localStorage.getItem('abunour_theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('abunour_theme', 'dark');
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('abunour_theme', 'light');
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // ------------------------------------------------
    // 2. Sticky Header & Scroll To Top
    // ------------------------------------------------
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scroll-top');
    const heroSection = document.querySelector('.hero-section');

    // Calculate when to make header sticky
    const stickyOffset = 150;

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (header) {
            if (window.scrollY > stickyOffset) {
                header.classList.add('is-sticky');
                document.body.style.paddingTop = `${header.offsetHeight}px`;
            } else {
                header.classList.remove('is-sticky');
                document.body.style.paddingTop = '0';
            }
        }

        // Scroll to top button visibility
        if (scrollTopBtn) {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    });

    // Scroll to top action
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ------------------------------------------------
    // 3. Cart Sidebar Interactions
    // ------------------------------------------------
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');

    const openCart = (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    };

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // ------------------------------------------------
    // 4. Swiper Initialization
    // ------------------------------------------------

    // Hero Swiper
    if (document.querySelector('.hero-swiper')) {
        new Swiper('.hero-swiper', {
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.hero-swiper .swiper-button-next',
                prevEl: '.hero-swiper .swiper-button-prev',
            },
        });
    }

    // Products Swiper (Flash Deals)
    if (document.querySelector('.product-swiper')) {
        new Swiper('.product-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.product-swiper .swiper-button-next',
                prevEl: '.product-swiper .swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 480px
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            }
        });
    }

    // Testimonials Swiper
    if (document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonial-swiper .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // ------------------------------------------------
    // 5. Flash Deals Countdown
    // ------------------------------------------------
    const countdownElement = document.getElementById('flash-countdown');
    if (countdownElement) {
        // Set end time 5 hours 45 mins from now
        const endTime = new Date().getTime() + (5 * 60 * 60 * 1000) + (45 * 60 * 1000);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update DOM structure based on HTML: 
            // <div class="time-box"><span>05</span><small>ساعات</small></div>
            const timeBoxes = countdownElement.querySelectorAll('span');
            if (timeBoxes.length === 3) {
                timeBoxes[0].textContent = hours < 10 ? '0' + hours : hours;
                timeBoxes[1].textContent = minutes < 10 ? '0' + minutes : minutes;
                timeBoxes[2].textContent = seconds < 10 ? '0' + seconds : seconds;
            }
        };

        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
    }

    // ------------------------------------------------
    // 6. Live Search Simulation
    // ------------------------------------------------
    const searchInput = document.getElementById('live-search');
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.querySelector('.search-container');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (val.length > 2) {
                searchContainer.classList.add('active');
                searchResults.innerHTML = `
                    <div style="padding: 1rem; border-bottom: 1px solid var(--clr-border-light);">
                        <a href="#" style="display: flex; align-items: center; gap: 1rem; color: var(--clr-heading);">
                            <div style="width: 40px; height: 40px; background: var(--clr-bg-light); border-radius: 5px;"></div>
                            <div>
                                <h4 style="font-size: 0.9rem; margin-bottom: 0;">${val} - النتيجة 1</h4>
                                <span style="font-size: 0.8rem; color: var(--clr-primary);">120 ج.م</span>
                            </div>
                        </a>
                    </div>
                    <div style="padding: 1rem;">
                        <a href="#" style="display: flex; align-items: center; gap: 1rem; color: var(--clr-heading);">
                            <div style="width: 40px; height: 40px; background: var(--clr-bg-light); border-radius: 5px;"></div>
                            <div>
                                <h4 style="font-size: 0.9rem; margin-bottom: 0;">${val} - النتيجة 2</h4>
                                <span style="font-size: 0.8rem; color: var(--clr-primary);">150 ج.م</span>
                            </div>
                        </a>
                    </div>
                `;
            } else {
                searchContainer.classList.remove('active');
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }

    // ------------------------------------------------
    // 7. Dynamic Product Loading from Admin
    // ------------------------------------------------
    const loadDynamicProducts = () => {
        const adminProducts = JSON.parse(localStorage.getItem('abunour_products')) || [];
        const grid = document.getElementById('home-dynamic-products');
        const swiperWrapper = document.getElementById('flash-deals-wrapper');

        if (adminProducts.length > 0) {
            if (grid) {
                grid.innerHTML = ''; // Clear placeholders
                // Show newest first
                [...adminProducts].reverse().forEach(p => {
                    const card = document.createElement('div');
                    card.className = 'product-card glass-effect hover-up';
                    card.innerHTML = `
                        <ul class="product-actions">
                            <li><a href="#" title="إضافة للمفضلة"><i class="fa-regular fa-heart"></i></a></li>
                            <li><a href="product_details.html?id=${p.id}" title="نظرة سريعة"><i class="fa-regular fa-eye"></i></a></li>
                        </ul>
                        <div class="product-badges"><span class="badge-new">جديد المخزن</span></div>
                        <div class="product-img" style="height: 200px; padding: 1rem;">
                            <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200?text=بدون+صورة'" style="width: 100%; height: 100%; object-fit: contain;">
                        </div>
                        <div class="product-content">
                            <div class="product-category">${p.category}</div>
                            <h3 class="product-title"><a href="product_details.html?id=${p.id}">${p.name}</a></h3>
                            <div class="product-price">
                                <span class="new-price">${p.price} ج.م</span>
                            </div>
                            <button class="btn btn-outline w-full add-to-cart-btn" onclick="window.location.href='product_details.html?id=${p.id}'">
                                <i class="fa-solid fa-cart-plus"></i> عرض التفاصيل
                            </button>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }

            // Also load into swiper (Flash deals simulation)
            if (swiperWrapper) {
                swiperWrapper.innerHTML = '';
                adminProducts.slice(0, 8).forEach(p => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    slide.innerHTML = `
                        <div class="product-card glass-effect">
                            <ul class="product-actions">
                                <li><a href="#" title="إضافة للمفضلة"><i class="fa-regular fa-heart"></i></a></li>
                                <li><a href="product_details.html?id=${p.id}" title="نظرة سريعة"><i class="fa-regular fa-eye"></i></a></li>
                            </ul>
                            ${p.price < 50 ? '<div class="product-badges"><span class="badge-discount">عرض خاص</span></div>' : ''}
                            <div class="product-img" style="height: 180px; padding: 1rem;">
                                <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200?text=بدون+صورة'" style="width: 100%; height: 100%; object-fit: contain;">
                            </div>
                            <div class="product-content">
                                <div class="product-category">${p.category}</div>
                                <h3 class="product-title"><a href="product_details.html?id=${p.id}">${p.name}</a></h3>
                                <div class="product-price">
                                    <span class="new-price">${p.price} ج.م</span>
                                </div>
                                <button class="btn btn-primary w-full add-to-cart-btn" onclick="window.location.href='product_details.html?id=${p.id}'">
                                    <i class="fa-solid fa-cart-shopping"></i> أضف للسلة
                                </button>
                            </div>
                        </div>
                    `;
                    swiperWrapper.appendChild(slide);
                });
            }
        }
    };

    // Call load function for homepage
    loadDynamicProducts();

    // ------------------------------------------------
    // 7.5 Load Video Ads from Admin
    // ------------------------------------------------
    const loadVideoAds = () => {
        const videoAds = JSON.parse(localStorage.getItem('abunour_video_ads')) || [];
        const container = document.getElementById('video-ads-container');
        const grid = document.getElementById('video-ads-grid');

        if (videoAds.length > 0 && container && grid) {
            container.style.display = 'block';
            grid.innerHTML = '';
            videoAds.forEach(ad => {
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card glass-effect hover-up';
                videoCard.style.padding = '1rem';
                videoCard.style.borderRadius = 'var(--radius-md)';

                // Improved URL detection for YouTube and others
                let videoHtml = '';
                const url = ad.url.toLowerCase();

                if (url.includes('youtube.com/embed/')) {
                    videoHtml = `<iframe width="100%" height="220" src="${ad.url}" frameborder="0" allowfullscreen style="border-radius:12px; border: 2px solid var(--clr-border);"></iframe>`;
                } else if (url.includes('youtube.com/watch?v=')) {
                    const videoId = ad.url.split('v=')[1].split('&')[0];
                    videoHtml = `<iframe width="100%" height="220" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style="border-radius:12px; border: 2px solid var(--clr-border);"></iframe>`;
                } else if (url.includes('youtu.be/')) {
                    const videoId = ad.url.split('youtu.be/')[1].split('?')[0];
                    videoHtml = `<iframe width="100%" height="220" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style="border-radius:12px; border: 2px solid var(--clr-border);"></iframe>`;
                } else {
                    videoHtml = `<video src="${ad.url}" controls width="100%" style="border-radius:12px; max-height:220px; border: 2px solid var(--clr-border); background: #000;"></video>`;
                }

                videoCard.innerHTML = `
                    <div class="video-wrapper mb-3">
                        ${videoHtml}
                    </div>
                    <h3 style="font-size: 1.1rem; margin: 0; text-align:center;">${ad.title}</h3>
                `;
                grid.appendChild(videoCard);
            });
        }
    };

    loadVideoAds();

    // ------------------------------------------------
    // 8. Global Chat Bot Logic
    // ------------------------------------------------
    const chatWindow = document.getElementById('chatWindow');
    const openChatBtn = document.getElementById('openChat');
    const closeChatBtn = document.getElementById('closeChat');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInputBar');
    const messagesBox = document.getElementById('chatMessages');

    if (chatWindow && openChatBtn) {
        openChatBtn.addEventListener('click', () => chatWindow.classList.toggle('active'));
        closeChatBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            // Append User msg
            messagesBox.innerHTML += `<div class="msg msg-user">${text}</div>`;
            chatInput.value = '';
            messagesBox.scrollTop = messagesBox.scrollHeight;

            // Bot Reply Simulation after delay
            setTimeout(() => {
                let reply = '';
                const searchLower = text.toLowerCase();

                if (searchLower.includes('امراض') || searchLower.includes('تعبان') || searchLower.includes('مريض') || searchLower.includes('كشف')) {
                    reply = "ألف سلامة عليك! أنا الدكتور أحمد. أنصحك بزيارة صفحة **الاستشارة الطبية الشاملة** لدينا للحصول على تشخيص أدق وبدائل للأدوية. <br><br> <a href='consultation.html' style='color:var(--clr-primary); font-weight:bold; text-decoration:underline;'>انتقل لصفحة الاستشارة من هنا</a>";
                } else if (searchLower.includes('صداع') || searchLower.includes('سخون') || searchLower.includes('كحة') || searchLower.includes('مغص')) {
                    reply = `بخصوص ${text}، نوفر مجموعة واسعة من الأدوية والبدائل. يمكنك تجربة أداة التشخيص الذكي للحصول على 5 بدائل فورية:<br><br> <a href='consultation.html' style='color:var(--clr-primary); font-weight:bold;'>ابدأ الاستشارة الآن من هنا</a>`;
                } else if (searchLower.includes('فيتامين') || searchLower.includes('مناعة')) {
                    reply = "لدينا تشكيلة رائعة من الفيتامينات لتقوية المناعة. يمكنك تصفح قسم الفيتامينات في المتجر أو سؤالنا هنا عن نوع محدد.";
                } else if (searchLower.includes('توصيل') || searchLower.includes('وقت')) {
                    reply = "نوفر خدمة التوصيل السريع داخل أبوكبير في أقل من 30 دقيقة! اطلب الآن وسنصلك أينما كنت.";
                } else {
                    reply = "متواجدين لخدمتك في صيدلية أبو نور! نوفر التوصيل السريع والدفع عند الاستلام داخل أبوكبير. هل تبحث عن استشارة طبية أم تريد الاستفسار عن منتج؟";
                }

                messagesBox.innerHTML += `<div class="msg msg-bot">${reply}</div>`;
                messagesBox.scrollTop = messagesBox.scrollHeight;

                // Save consultation for admin
                const consultations = JSON.parse(localStorage.getItem('abunour_consultations')) || [];
                const sessionId = localStorage.getItem('abunour_session_id') || 'SESS-' + Date.now();
                localStorage.setItem('abunour_session_id', sessionId);

                const existingIndex = consultations.findIndex(c => c.id === sessionId);
                if (existingIndex !== -1) {
                    consultations[existingIndex].lastMessage = text;
                    consultations[existingIndex].date = new Date().toLocaleString('ar-EG');
                } else {
                    consultations.push({
                        id: sessionId,
                        user: "زائر (من التطبيق)",
                        lastMessage: text,
                        date: new Date().toLocaleString('ar-EG')
                    });
                }
                localStorage.setItem('abunour_consultations', JSON.stringify(consultations));
            }, 1000);
        });
    }

    // ------------------------------------------------
    // 9. Auth Modal Logic (Clients Management)
    // ------------------------------------------------
    const authTrigger = document.getElementById('login-modal-trigger');
    const authModal = document.getElementById('authModal');
    const authOverlay = document.getElementById('authOverlay');
    const closeAuth = document.getElementById('closeAuth');
    const authTabs = document.querySelectorAll('.auth-tab');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const authTitle = document.getElementById('authTitle');

    if (authTrigger && authModal) {
        const toggleModal = (show) => {
            authModal.classList.toggle('active', show);
            authOverlay.style.display = show ? 'block' : 'none';
        };

        authTrigger.addEventListener('click', () => toggleModal(true));
        closeAuth.addEventListener('click', () => toggleModal(false));
        authOverlay.addEventListener('click', () => toggleModal(false));

        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const target = tab.dataset.tab;

                if (target === 'login') {
                    registerForm.style.display = 'none';
                    loginForm.style.display = 'block';
                    authTitle.textContent = 'تسجيل دخول';
                } else {
                    registerForm.style.display = 'block';
                    loginForm.style.display = 'none';
                    authTitle.textContent = 'تسجيل حساب جديد';
                }
            });
        });

        // Register Logic -> Save to Admin's Clients
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const phone = document.getElementById('regPhone').value;
            const pass = document.getElementById('regPass').value;

            const clients = JSON.parse(localStorage.getItem('abunour_clients')) || [];

            // Basic check if already exists
            if (clients.find(c => c.phone === phone)) {
                alert('هذا الرقم مسجل مسبقاً!');
                return;
            }

            const newClient = {
                id: 'CL' + Date.now(),
                name: name,
                phone: phone,
                password: pass,
                joinDate: new Date().toLocaleDateString('ar-EG'),
                orders: 0
            };

            clients.push(newClient);
            localStorage.setItem('abunour_clients', JSON.stringify(clients));

            alert('تم تسجيل حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
            authTabs[1].click(); // Switch to login
        });

        // Login Logic
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const phone = document.getElementById('loginPhone').value;
            const pass = document.getElementById('loginPass').value;

            const clients = JSON.parse(localStorage.getItem('abunour_clients')) || [];
            const user = clients.find(c => c.phone === phone && c.password === pass);

            if (user) {
                alert(`مرحباً بك يا ${user.name}!`);
                localStorage.setItem('abunour_logged_in', JSON.stringify(user));
                toggleModal(false);
                location.reload(); // Refresh to update UI
            } else {
                alert('عذراً، رقم الهاتف أو كلمة المرور غير صحيحة.');
            }
        });
    }

    // Check Login State for Header
    const loggedInUser = JSON.parse(localStorage.getItem('abunour_logged_in'));
    if (loggedInUser && authTrigger) {
        authTrigger.querySelector('.action-text').textContent = loggedInUser.name.split(' ')[0];
        authTrigger.querySelector('i').className = 'fa-solid fa-user-check';
        authTrigger.style.color = 'var(--clr-primary)';
    }

    // ------------------------------------------------
    // 10. Website Security Shield
    // ------------------------------------------------
    const activateSecurity = () => {
        // Disable Right Click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Disable Common DevTools Shortcuts
        document.addEventListener('keydown', (e) => {
            // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (View Source)
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
                (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's'))
            ) {
                e.preventDefault();
                return false;
            }
        });

        // Prevent Dragging Images
        document.addEventListener('dragstart', (e) => {
            if (e.target.nodeName === 'IMG') e.preventDefault();
        });
    };

    activateSecurity();
});
