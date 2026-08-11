// JS 2: Surprise Canvas Particles and Overlay Logic
document.addEventListener('DOMContentLoaded', () => {
    const surpriseOverlay = document.getElementById('surpriseOverlay');
    const surpriseBtn = document.getElementById('surpriseBtn');

    if (surpriseBtn && surpriseOverlay) {
        surpriseBtn.addEventListener('click', () => {
            surpriseOverlay.classList.remove('active');
            // Play ambient track on click
            setTimeout(() => {
                const audioWidget = document.getElementById('audioWidget');
                if (audioWidget) {
                    const audioStatus = audioWidget.querySelector('.audio-status');
                    if (audioStatus && audioStatus.textContent === 'MUTED') {
                        audioWidget.click();
                    }
                }
            }, 300);
        });

        // Unique Canvas Particle Animation (Non-horror, tech-glowing network nodes)
        const canvas = document.getElementById('surpriseCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particles = [];

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = (Math.random() - 0.5) * 0.6;
                    this.vy = (Math.random() - 0.5) * 0.6;
                    this.radius = Math.random() * 2 + 1.5;
                    this.alpha = Math.random() * 0.5 + 0.3;
                    this.color = Math.random() > 0.5 ? '#991b1b' : '#c5a880'; // Mix of Crimson and Gold
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                }
                draw() {
                    ctx.save();
                    ctx.beginPath();
                    ctx.globalAlpha = this.alpha;
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = this.color;
                    ctx.fill();
                    ctx.restore();
                }
            }

            for (let i = 0; i < 70; i++) {
                particles.push(new Particle());
            }

            function animateParticles() {
                if (surpriseOverlay.classList.contains('active')) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw connections between close particles for a neural/constellation web effect
                    for (let i = 0; i < particles.length; i++) {
                        particles[i].update();
                        particles[i].draw();

                        for (let j = i + 1; j < particles.length; j++) {
                            const dx = particles[i].x - particles[j].x;
                            const dy = particles[i].y - particles[j].y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < 100) {
                                ctx.beginPath();
                                ctx.strokeStyle = particles[i].color;
                                ctx.globalAlpha = (1 - (dist / 100)) * 0.15;
                                ctx.lineWidth = 0.5;
                                ctx.moveTo(particles[i].x, particles[i].y);
                                ctx.lineTo(particles[j].x, particles[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                }
                requestAnimationFrame(animateParticles);
            }
            animateParticles();
        }
    }
});
