// JavaScript for Astrayuga Studios - Portal Interactivity

document.addEventListener('DOMContentLoaded', () => {

    // 0. Cinematic Loading Screen Logic (Video Opening)
    const loader = document.getElementById('cinematicLoader');
    const video = document.getElementById('openingVideo');
    const skipBtn = document.getElementById('skipIntroBtn');

    function fadeOutLoader() {
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            if (video) {
                video.pause();
            }
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000); // Matches transition time
        }
    }

    // Trigger video autoplay immediately with sound ON
    if (video) {
        video.muted = false;
        video.play().catch(error => {
            console.log("Autoplay unmuted blocked by browser, falling back to muted autoplay: ", error);
            video.muted = true;
            video.play();
        });
    }

    if (video) {
        // Update overlay progress bar and status text synced with video playback
        const overlayProgress = document.querySelector('.overlay-progress-bar');
        const overlayStatus = document.querySelector('.overlay-status-text');
        
        const statuses = [
            'CONNECTING TO SERVER...',
            'LOADING VISUAL ENGINE...',
            'RENDERING ILLUSIONS...',
            'AWAKENING THE CURSE...'
        ];

        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const percent = (video.currentTime / video.duration) * 100;
                if (overlayProgress) {
                    overlayProgress.style.width = `${percent}%`;
                }
                
                if (overlayStatus) {
                    const statusIdx = Math.min(Math.floor((percent / 100) * statuses.length), statuses.length - 1);
                    overlayStatus.textContent = statuses[statusIdx];
                }
            }
        });

        // Fade out automatically when the opening video finishes playing
        video.addEventListener('ended', fadeOutLoader);
    }

    if (skipBtn) {
        // Allow skipping the intro
        skipBtn.addEventListener('click', fadeOutLoader);
    }

    // Safety fallback: if video fails to play or load, automatically transition after 10 seconds
    setTimeout(fadeOutLoader, 10000);

    // 1. Two-Year Milestone Countdown (Updates both top banner and Newswire clocks)
    let targetDateStr = localStorage.getItem('astrayuga_target_date');
    let startDateStr = localStorage.getItem('astrayuga_start_date');
    let targetDate, startDate;

    if (targetDateStr && startDateStr) {
        targetDate = new Date(targetDateStr);
        startDate = new Date(startDateStr);
    } else {
        targetDate = new Date();
        targetDate.setFullYear(targetDate.getFullYear() + 2); // 2 years from now
        startDate = new Date();
        localStorage.setItem('astrayuga_target_date', targetDate.toISOString());
        localStorage.setItem('astrayuga_start_date', startDate.toISOString());
    }

    function updateCountdown() {
        const now = new Date();
        const totalDuration = targetDate - startDate;
        const timeRemaining = targetDate - now;

        const elDays = document.getElementById('days');
        const elHours = document.getElementById('hours');
        const elMinutes = document.getElementById('minutes');
        const elSeconds = document.getElementById('seconds');
        const elProgress = document.getElementById('timerProgressFill');

        const elTopDays = document.getElementById('top-days');
        const elTopHours = document.getElementById('top-hours');
        const elTopMinutes = document.getElementById('top-minutes');
        const elTopSeconds = document.getElementById('top-seconds');

        const elHeroDays = document.getElementById('hero-days');
        const elHeroHours = document.getElementById('hero-hours');
        const elHeroMinutes = document.getElementById('hero-minutes');
        const elHeroSeconds = document.getElementById('hero-seconds');

        if (timeRemaining <= 0) {
            if (elDays) elDays.textContent = '000';
            if (elHours) elHours.textContent = '00';
            if (elMinutes) elMinutes.textContent = '00';
            if (elSeconds) elSeconds.textContent = '00';
            if (elProgress) elProgress.style.width = '100%';

            if (elTopDays) elTopDays.textContent = '000';
            if (elTopHours) elTopHours.textContent = '00';
            if (elTopMinutes) elTopMinutes.textContent = '00';
            if (elTopSeconds) elTopSeconds.textContent = '00';

            if (elHeroDays) elHeroDays.textContent = '000';
            if (elHeroHours) elHeroHours.textContent = '00';
            if (elHeroMinutes) elHeroMinutes.textContent = '00';
            if (elHeroSeconds) elHeroSeconds.textContent = '00';
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Helper to update elements with a 3D calendar page flip transition
        function updateWithFlip(element, newValue) {
            if (!element) return;
            const oldValue = element.textContent;
            if (oldValue !== newValue) {
                element.classList.remove('flip-animate');
                void element.offsetWidth; // Force reflow to re-trigger transition
                element.textContent = newValue;
                element.classList.add('flip-animate');
            }
        }

        // Update Newswire Card Clock if visible
        if (elDays) elDays.textContent = String(days).padStart(3, '0');
        if (elHours) elHours.textContent = String(hours).padStart(2, '0');
        if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
        if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');

        // Update Top Sticky Ticker
        if (elTopDays) elTopDays.textContent = String(days).padStart(3, '0');
        if (elTopHours) elTopHours.textContent = String(hours).padStart(2, '0');
        if (elTopMinutes) elTopMinutes.textContent = String(minutes).padStart(2, '0');
        if (elTopSeconds) elTopSeconds.textContent = String(seconds).padStart(2, '0');

        // Update Hero Center Ticker with 3D Calendar flips
        updateWithFlip(elHeroDays, String(days).padStart(3, '0'));
        updateWithFlip(elHeroHours, String(hours).padStart(2, '0'));
        updateWithFlip(elHeroMinutes, String(minutes).padStart(2, '0'));
        updateWithFlip(elHeroSeconds, String(seconds).padStart(2, '0'));

        // Update Progress Bar
        const elapsed = now - startDate;
        const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
        if (elProgress) elProgress.style.width = `${progressPercent}%`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 2. Audio Ambiance Controls
    const audioWidget = document.getElementById('audioWidget');
    const soundToggle = document.getElementById('soundToggle');
    const ambientTrack = document.getElementById('ambientTrack');
    const audioStatus = audioWidget.querySelector('.audio-status');
    const heroVideo = document.querySelector('.hero-video-bg');
    const bodyVideo = document.querySelector('.body-video-bg');
    let isMuted = true;

    ambientTrack.volume = 0.2;

    audioWidget.addEventListener('click', () => {
        if (isMuted) {
            isMuted = false;
            audioStatus.textContent = 'PLAYING';
            soundToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            audioWidget.style.borderColor = 'var(--primary-color)';

            // Unmute and play background video audio tracks
            if (heroVideo) {
                heroVideo.muted = false;
                heroVideo.volume = 0.6;
            }
            if (bodyVideo) {
                bodyVideo.muted = false;
                bodyVideo.volume = 0.6;
            }

            // Try playing ambient audio (fails gracefully if blocked)
            ambientTrack.play().catch(err => console.log("Ambient audio play blocked or failed:", err));
        } else {
            ambientTrack.pause();
            isMuted = true;
            audioStatus.textContent = 'MUTED';
            soundToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            audioWidget.style.borderColor = 'var(--border-color)';

            // Mute background videos
            if (heroVideo) {
                heroVideo.muted = true;
            }
            if (bodyVideo) {
                bodyVideo.muted = true;
            }
        }
    });

    // 3. Story Popup Control
    const btnExploreGame = document.getElementById('btnExploreGame');
    const cardAlexia = document.getElementById('cardAlexia');
    const storyPopup = document.getElementById('storyPopupOverlay');
    const btnExitStoryPopup = document.getElementById('btnExitStoryPopup');

    function openStoryPopup() {
        if (storyPopup) {
            storyPopup.classList.add('active');
        }
    }

    function closeStoryPopup() {
        if (storyPopup) {
            storyPopup.classList.remove('active');
        }
    }

    if (btnExploreGame) {
        btnExploreGame.addEventListener('click', () => {
            const gamesSection = document.getElementById('gamesSection');
            if (gamesSection) {
                gamesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    if (cardAlexia) cardAlexia.addEventListener('click', openStoryPopup);
    if (btnExitStoryPopup) btnExitStoryPopup.addEventListener('click', closeStoryPopup);

    // 4. Main Menu Overlay Simulator
    const btnPlayMenu = document.getElementById('btnPlayMenu');
    const mainMenuOverlay = document.getElementById('mainMenuOverlay');
    const btnCloseMenu = document.getElementById('btnCloseMenu');

    if (btnPlayMenu) {
        btnPlayMenu.addEventListener('click', () => {
            mainMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeMainMenu() {
        if (mainMenuOverlay) {
            mainMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (btnCloseMenu) btnCloseMenu.addEventListener('click', closeMainMenu);

    // Main Menu Options Simulator
    const btnNewGame = document.getElementById('btnNewGame');
    const btnLoadGame = document.getElementById('btnLoadGame');
    const btnSettings = document.getElementById('btnSettings');
    const btnCredits = document.getElementById('btnCredits');
    const btnQuit = document.getElementById('btnQuit');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const progressBarFill = document.getElementById('progressBarFill');

    if (btnNewGame) {
        btnNewGame.addEventListener('click', () => {
            if (isMuted) {
                soundToggle.click();
            }

            if (loadingOverlay) loadingOverlay.classList.add('active');
            let progress = 0;
            if (progressBarFill) progressBarFill.style.width = '0%';

            const loadTimer = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadTimer);

                    setTimeout(() => {
                        if (loadingOverlay) loadingOverlay.classList.remove('active');
                        closeMainMenu();
                        openStoryPopup();
                    }, 600);
                }
                if (progressBarFill) progressBarFill.style.width = `${progress}%`;
            }, 120);
        });
    }

    if (btnLoadGame) {
        btnLoadGame.addEventListener('click', () => {
            alert("Alexia holds your save files... 'Tum mere save file ke saath chhedchhad nahi kar sakti!'");
        });
    }

    if (btnSettings) {
        btnSettings.addEventListener('click', () => {
            alert("Settings Menu:\n- Volumetric Fog: Ultra Creepy\n- Heart Pulse Speed: Synchronized to fear\n- Sanity Level: Depleting");
        });
    }

    if (btnCredits) {
        btnCredits.addEventListener('click', () => {
            alert("Untold Story: Alexia\n\nDeveloper: Shoubhik Bhattacharya\nPublisher: Astrayuga Interactive\nCampus: VIT Bhopal");
        });
    }

    if (btnQuit) {
        btnQuit.addEventListener('click', () => {
            const exit = confirm("Quit game back to developer portal?");
            if (exit) {
                closeMainMenu();
            }
        });
    }

    // 5. Spotlight Accordions
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isActive = currentItem.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });

    // 6. Spotlight GDD Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.gdd-tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = document.getElementById(targetTab);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // 7. Navigation Highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('section, header.studio-hero');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        pageSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 120)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // 9. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    const revealItems = document.querySelectorAll('.game-card, .newswire-card, .about-content, .stat-card, .accordion-item');
    revealItems.forEach(item => {
        item.classList.add('reveal-item');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // Custom Horror Cursor Follower Logic
    const customCursor = document.getElementById('customHorrorCursor');
    if (customCursor) {
        let mouseX = 0;
        let mouseY = 0;
        let isHovering = false;
        let dripInterval = null;

        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mousedown', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(0.85)';
        });

        document.addEventListener('mouseup', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        function createBloodDrop(x, y) {
            const drop = document.createElement('div');
            drop.className = 'blood-drop';
            drop.style.left = `${x}px`;
            drop.style.top = `${y}px`;
            document.body.appendChild(drop);

            // Remove drop after animation completes
            setTimeout(() => {
                drop.remove();
            }, 800);
        }

        function startDripping() {
            if (dripInterval) return;
            // Instantly drip one drop
            createBloodDrop(mouseX, mouseY + 15);
            dripInterval = setInterval(() => {
                if (isHovering) {
                    createBloodDrop(mouseX, mouseY + 15);
                }
            }, 350);
        }

        function stopDripping() {
            if (dripInterval) {
                clearInterval(dripInterval);
                dripInterval = null;
            }
        }

        // Hover effect for interactive elements
        const updateInteractiveListeners = () => {
            const interactives = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .creepy-trigger, .accordion-header');
            interactives.forEach(el => {
                // Prevent duplicate listeners
                el.removeEventListener('mouseenter', addHoverClass);
                el.removeEventListener('mouseleave', removeHoverClass);
                el.addEventListener('mouseenter', addHoverClass);
                el.addEventListener('mouseleave', removeHoverClass);
            });
        };

        function addHoverClass() {
            customCursor.classList.add('cursor-hover');
            isHovering = true;
            startDripping();
        }

        function removeHoverClass() {
            customCursor.classList.remove('cursor-hover');
            isHovering = false;
            stopDripping();
        }

        updateInteractiveListeners();
        
        // Setup real-time counters via CounterAPI
        async function setupRealtimeCounters() {
            const visitorEl = document.getElementById('visitor-count');
            const heroVisitorEl = document.getElementById('hero-visitor-count');
            const subscriberEl = document.getElementById('subscriber-count');
            const heroSubscriberEl = document.getElementById('hero-subscriber-count');

            const namespace = 'astrayuga-interactive-official';

            function updateDisplays(visitors, subscribers) {
                const formattedV = Number(visitors).toLocaleString();
                const formattedS = Number(subscribers).toLocaleString();
                if (visitorEl) visitorEl.textContent = formattedV;
                if (heroVisitorEl) heroVisitorEl.textContent = formattedV;
                if (subscriberEl) subscriberEl.textContent = formattedS;
                if (heroSubscriberEl) heroSubscriberEl.textContent = formattedS;
            }

            try {
                // Increment visitor count on load
                const vRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/visitors/up`);
                const vData = await vRes.json();
                const visitorCount = vData.count || 0;

                // Fetch subscriber count
                let subscriberCount = 0;
                try {
                    const sRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/subscribers`);
                    if (sRes.ok) {
                        const sData = await sRes.json();
                        subscriberCount = sData.count || 0;
                    }
                } catch (err) {
                    console.log("Error loading subscribers:", err);
                }

                updateDisplays(visitorCount, subscriberCount);

            } catch (err) {
                console.log("Error loading counters:", err);
                // Fallback to local storage count if API is blocked
                let localV = localStorage.getItem('astrayuga_visitors') || 0;
                localV = parseInt(localV) + 1;
                localStorage.setItem('astrayuga_visitors', localV);
                
                let localS = JSON.parse(localStorage.getItem('astrayuga_subscribers') || '[]').length;
                updateDisplays(localV, localS);
            }
        }

        setupRealtimeCounters();

        // Subscribe overlay logic
        const btnSubscribe = document.getElementById('btnSubscribe');
        const subscribeOverlay = document.getElementById('subscribeOverlay');
        const btnCloseSubscribe = document.getElementById('btnCloseSubscribe');
        const subscribeForm = document.getElementById('subscribeForm');
        const subscribeSuccessMsg = document.getElementById('subscribeSuccessMsg');
        const subscribeEmail = document.getElementById('subscribeEmail');

        if (btnSubscribe && subscribeOverlay) {
            btnSubscribe.addEventListener('click', () => {
                subscribeOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                if (subscribeSuccessMsg) subscribeSuccessMsg.style.display = 'none';
                if (subscribeForm) {
                    subscribeForm.style.display = 'flex';
                    subscribeForm.reset();
                }
            });
        }

        if (btnCloseSubscribe && subscribeOverlay) {
            btnCloseSubscribe.addEventListener('click', () => {
                subscribeOverlay.style.display = 'none';
                document.body.style.overflow = '';
            });
        }

        if (subscribeForm) {
            subscribeForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = subscribeEmail.value.trim();
                if (email) {
                    // Save subscription in local storage
                    let subscribers = JSON.parse(localStorage.getItem('astrayuga_subscribers') || '[]');
                    if (!subscribers.includes(email)) {
                        subscribers.push(email);
                        localStorage.setItem('astrayuga_subscribers', JSON.stringify(subscribers));
                        
                        // Increment subscriber count in CounterAPI
                        try {
                            const namespace = 'astrayuga-interactive-official';
                            const sRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/subscribers/up`);
                            const sData = await sRes.json();
                            const newSubCount = sData.count || subscribers.length;
                            
                            const subscriberEl = document.getElementById('subscriber-count');
                            const heroSubscriberEl = document.getElementById('hero-subscriber-count');
                            if (subscriberEl) subscriberEl.textContent = Number(newSubCount).toLocaleString();
                            if (heroSubscriberEl) heroSubscriberEl.textContent = Number(newSubCount).toLocaleString();
                        } catch (err) {
                            console.log("Error updating subscriber count:", err);
                        }
                    }
                    
                    // Show custom notification
                    subscribeForm.style.display = 'none';
                    if (subscribeSuccessMsg) {
                        subscribeSuccessMsg.style.display = 'block';
                    }
                }
            });
        }

        // Re-run listener attachment if dynamic content is toggled (e.g. accordion clicks)
        document.addEventListener('click', () => {
            setTimeout(updateInteractiveListeners, 100);
        });
    }
});
