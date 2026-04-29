document.addEventListener('DOMContentLoaded', () => {

    // --- Splash Screen (ロード時の黄色いカーテン) ---
    const splash = document.getElementById('splash-screen');
    if (splash) {
        // ページ全体の画像などが読み込まれたら実行
        window.addEventListener('load', () => {
            setTimeout(() => {
                splash.classList.add('fade-out');
            }, 600); // さらにゆっくり見せるため0.6秒待機してから波紋開始
        });
        // 万が一ロードが遅すぎる場合のフェイルセーフ
        setTimeout(() => {
            splash.classList.add('fade-out');
        }, 5000);
    }
    // JSが有効な場合のみアニメーション用のクラスをbodyに追加
    document.body.classList.add('js-enabled');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Read More Toggle for Concept Section
    const readMoreBtn = document.getElementById('read-more-btn');
    const conceptMore = document.getElementById('concept-more');
    if(readMoreBtn && conceptMore) {
        readMoreBtn.addEventListener('click', () => {
            if(conceptMore.classList.contains('show')) {
                conceptMore.classList.remove('show');
                readMoreBtn.innerHTML = '続きを読む ▼';
            } else {
                conceptMore.classList.add('show');
                readMoreBtn.innerHTML = '閉じる ▲';
            }
        });
    }

    // Scroll Fade-in Animation
    const fadeElements = document.querySelectorAll('.section-title, .text-block, .feature-item, .member-row');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 要素が15%画面に入ったらアニメーション開始
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を解除（下から上へスクロールした際に何度もアニメーションさせたい場合はコメントアウトのままでOK）
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-target'); // CSSで初期状態を透明・下にずらす
        fadeObserver.observe(el);
    });

    // --- Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // リンクをクリックしたらメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Hero Scroll Parallax ---
    const heroContent = document.querySelector('.hero-content');
    const waveBottom = document.querySelector('.wave-bottom');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // パフォーマンス最適化：ヒーローセクションが見えている時だけ計算する
        if (scrollY < window.innerHeight + 500) {
            
            // ロゴとテキストのパララックス（沈む速度を遅く：0.2、消えるタイミングを遅く：1.2）
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 1.2));
            }

            // 波のパララックス（スピード0.4）
            if (waveBottom) {
                // スマホ画面（幅768px以下）の場合は波の移動量を最大150pxに制限、PCは350px
                const maxTranslate = window.innerWidth <= 768 ? 150 : 350;
                // 波が下へ行き過ぎて文字に被らないようにストップをかける
                const translateY = Math.min(scrollY * 0.4, maxTranslate);
                waveBottom.style.transform = `translateY(${translateY}px)`;
            }
        }
    });
});
