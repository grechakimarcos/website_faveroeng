class ImageCarousel {
    constructor(containerId, images, interval = 5000) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.images = images;
        this.interval = interval;
        this.currentIndex = 0;
        this.isPlaying = true;
        this.slides = [];
        this.dots = [];

        this.init();
    }

    init() {
        // Create UI elements
        this.container.innerHTML = '';
        this.container.className = 'group relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-900';

        // Slides Container
        this.slidesContainer = document.createElement('div');
        this.slidesContainer.className = 'relative w-full h-full';

        this.images.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = `absolute inset-0 w-full h-full transition-all duration-700 ease-in-out carousel-slide ${index === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`;

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1}`;
            img.className = 'object-cover w-full h-full';

            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent';

            slide.appendChild(img);
            slide.appendChild(overlay);
            this.slidesContainer.appendChild(slide);
            this.slides.push(slide);
        });

        this.container.appendChild(this.slidesContainer);

        // Arrows
        this.createArrow('prev', 'left-0', 'ChevronLeft');
        this.createArrow('next', 'right-0', 'ChevronRight');

        // Dots Container
        this.dotsContainer = document.createElement('div');
        this.dotsContainer.className = 'absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 z-10';

        this.images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `h-2 rounded-full transition-all duration-300 ${index === 0 ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`;
            dot.onclick = () => this.goToSlide(index);
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });

        // Play/Pause button
        const playBtn = document.createElement('button');
        playBtn.className = 'ml-2 rounded-full bg-black/30 p-1.5 text-white/80 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white';
        playBtn.innerHTML = this.isPlaying ? this.getIcon('Pause') : this.getIcon('Play');
        playBtn.onclick = () => this.togglePlay(playBtn);
        this.dotsContainer.appendChild(playBtn);

        this.container.appendChild(this.dotsContainer);

        // Auto play
        this.startTimer();
    }

    createArrow(direction, positionClass, iconName) {
        const btn = document.createElement('button');
        btn.className = `absolute top-1/2 -translate-y-1/2 ${positionClass} p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`;
        btn.innerHTML = `<div class="rounded-full bg-black/30 p-2 text-white/80 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white">${this.getIcon(iconName)}</div>`;
        btn.onclick = direction === 'prev' ? () => this.prev() : () => this.next();
        this.container.appendChild(btn);
    }

    getIcon(name) {
        // Simple SVG icons
        const icons = {
            ChevronLeft: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>',
            ChevronRight: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>',
            Play: '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
            Pause: '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
        };
        return icons[name] || '';
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.remove('opacity-0', 'scale-110');
                slide.classList.add('opacity-100', 'scale-100');
            } else {
                slide.classList.add('opacity-0', 'scale-110');
                slide.classList.remove('opacity-100', 'scale-100');
            }
        });

        this.dots.forEach((dot, index) => {
            dot.className = `h-2 rounded-full transition-all duration-300 ${index === this.currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`;
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateSlides();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateSlides();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
        this.resetTimer();
    }

    togglePlay(btn) {
        this.isPlaying = !this.isPlaying;
        btn.innerHTML = this.isPlaying ? this.getIcon('Pause') : this.getIcon('Play');
        if (this.isPlaying) this.startTimer();
        else this.stopTimer();
    }

    startTimer() {
        this.stopTimer();
        this.timer = setInterval(() => this.next(), this.interval);
    }

    stopTimer() {
        if (this.timer) clearInterval(this.timer);
    }

    resetTimer() {
        if (this.isPlaying) this.startTimer();
    }
}
