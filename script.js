// Uçuşan Kalpler Animasyonu
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    // Rastgele pozisyon
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    // Rastgele boyut
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    
    // Rastgele opaklık
    heart.style.opacity = Math.random() * 0.6 + 0.4;
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    // Animasyon bittikten sonra kalbi kaldır
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Belirli aralıklarla uçuşan kalpler oluştur
setInterval(createFloatingHeart, 800);

// Sayfa yüklendiğinde birkaç kalp oluştur
window.addEventListener('load', () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }
});

// Aşk Sözleri Slayt Animasyonu
class QuotesSlider {
    constructor() {
        this.quotes = document.querySelectorAll('.quote');
        this.currentQuote = 0;
        this.init();
    }
    
    init() {
        // İlk sözü göster
        this.showQuote(0);
        
        // Her 4 saniyede bir söz değiştir
        setInterval(() => {
            this.nextQuote();
        }, 4000);
    }
    
    showQuote(index) {
        // Tüm sözleri gizle
        this.quotes.forEach(quote => {
            quote.classList.remove('active');
        });
        
        // Seçilen sözü göster
        this.quotes[index].classList.add('active');
    }
    
    nextQuote() {
        this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
        this.showQuote(this.currentQuote);
    }
    
    previousQuote() {
        this.currentQuote = (this.currentQuote - 1 + this.quotes.length) % this.quotes.length;
        this.showQuote(this.currentQuote);
    }
}

// Sayfa yüklendiğinde slaytı başlat
document.addEventListener('DOMContentLoaded', () => {
    new QuotesSlider();
});

// Galeri hover efektleri için ek animasyonlar
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Hover olduğunda ekstra uçuşan kalp oluştur
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    createFloatingHeart();
                }, i * 100);
            }
        });
    });
});

// Sayfa scroll olduğunda ekstra kalpler oluştur
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        createFloatingHeart();
    }, 100);
});

// Klavye olayları - Aşk sözleri için manuel kontrol
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        // Sol ok tuşu - önceki söz
        if (window.quotesSlider) {
            window.quotesSlider.previousQuote();
        }
    } else if (e.key === 'ArrowRight') {
        // Sağ ok tuşu - sonraki söz
        if (window.quotesSlider) {
            window.quotesSlider.nextQuote();
        }
    }
});

// Dokunmatik cihazlar için swipe desteği
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Sola swipe - sonraki söz
        if (window.quotesSlider) {
            window.quotesSlider.nextQuote();
        }
    }
    if (touchEndX > touchStartX + 50) {
        // Sağa swipe - önceki söz
        if (window.quotesSlider) {
            window.quotesSlider.previousQuote();
        }
    }
}

// QuotesSlider'ı global yaparak klavye ve swipe kontrollerine erişim sağla
document.addEventListener('DOMContentLoaded', () => {
    window.quotesSlider = new QuotesSlider();
});

// Sayfa aktivitesi olduğunda ekstra kalpler oluştur
document.addEventListener('click', (e) => {
    // Sadece belirli elementlere tıklandığında kalp oluştur
    if (e.target.closest('.gallery-item') || e.target.closest('.hero-content')) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 150);
        }
    }
});

// Performans optimizasyonu - çok fazla kalp birikmesini önle
function cleanupHearts() {
    const hearts = document.querySelectorAll('.heart');
    if (hearts.length > 20) {
        // En eski 10 kalbi kaldır
        for (let i = 0; i < 10; i++) {
            if (hearts[i]) {
                hearts[i].remove();
            }
        }
    }
}

// Her 10 saniyede bir temizlik yap
setInterval(cleanupHearts, 10000);

// Tam Ekran Modal Fonksiyonları
class FullscreenModal {
    constructor() {
        this.modal = document.getElementById('fullscreenModal');
        this.modalImage = document.getElementById('modalImage');
        this.closeBtn = document.getElementById('closeModal');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.galleryImages = document.querySelectorAll('.gallery-item img');
        this.currentImageIndex = 0;
        
        this.init();
    }
    
    init() {
        // Galeri resimlerine tıklama olayı ekle
        this.galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                this.openModal(index);
            });
        });
        
        // Modal kapatma olayları
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Modal dışına tıklayınca kapat
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Navigasyon butonları
        this.prevBtn.addEventListener('click', () => {
            this.showPreviousImage();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.showNextImage();
        });
        
        // Klavye kontrolleri
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closeModal();
                } else if (e.key === 'ArrowLeft') {
                    this.showPreviousImage();
                } else if (e.key === 'ArrowRight') {
                    this.showNextImage();
                }
            }
        });
        
        // Dokunmatik swipe desteği
        this.initSwipeSupport();
    }
    
    openModal(index) {
        this.currentImageIndex = index;
        const image = this.galleryImages[index];
        this.modalImage.src = image.src;
        this.modalImage.alt = image.alt;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Scroll'u engelle
        
        // Modal açıldığında uçuşan kalpler oluştur
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Scroll'u tekrar aktif et
    }
    
    showPreviousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
        this.updateModalImage();
    }
    
    showNextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
        this.updateModalImage();
    }
    
    updateModalImage() {
        const image = this.galleryImages[this.currentImageIndex];
        this.modalImage.style.opacity = '0';
        
        setTimeout(() => {
            this.modalImage.src = image.src;
            this.modalImage.alt = image.alt;
            this.modalImage.style.opacity = '1';
        }, 150);
    }
    
    initSwipeSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Sola swipe - sonraki resim
                this.showNextImage();
            } else {
                // Sağa swipe - önceki resim
                this.showPreviousImage();
            }
        }
    }
}

// Sayfa yüklendiğinde modal'ı başlat
document.addEventListener('DOMContentLoaded', () => {
    window.fullscreenModal = new FullscreenModal();
    window.loveCounter = new LoveCounter();
});

// Aşk Gün Sayacı Sınıfı
class LoveCounter {
    constructor() {
        // İlk sevgili olma tarihi: 21 Ocak 2025
        this.startDate = new Date('2025-01-21T00:00:00');
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.messageElement = document.getElementById('loveMessage');
        
        this.loveMessages = [
            'Berkan ❤️ Ela',
            'Aşkımız büyüyor...',
            'Her gün daha da seviyorum',
            'Seninle zaman çok güzel geçiyor',
            'Kalbim seninle atıyor',
            'Berkan ve Ela - Sonsuza dek',
            'Aşkımız zamanla değil, kalplerle ölçülür'
        ];
        
        this.currentMessageIndex = 0;
        
        this.init();
    }
    
    init() {
        this.updateCounter();
        
        // Her saniye güncelle
        setInterval(() => {
            this.updateCounter();
        }, 1000);
        
        // Her 5 saniyede bir mesaj değiştir
        setInterval(() => {
            this.updateMessage();
        }, 5000);
        
        // İlk mesajı göster
        this.updateMessage();
    }
    
    updateCounter() {
        const now = new Date();
        const timeDiff = now - this.startDate;
        
        // Negatif olmasını engelle (tarih gelecekte ise)
        if (timeDiff < 0) {
            this.displayFutureDate();
            return;
        }
        
        // Zaman birimlerini hesapla
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        // DOM'u güncelle
        this.daysElement.textContent = this.formatNumber(days);
        this.hoursElement.textContent = this.formatNumber(hours);
        this.minutesElement.textContent = this.formatNumber(minutes);
        this.secondsElement.textContent = this.formatNumber(seconds);
        
        // Özel günler için mesaj
        this.checkSpecialDays(days);
    }
    
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    
    updateMessage() {
        this.messageElement.style.opacity = '0';
        
        setTimeout(() => {
            this.messageElement.textContent = this.loveMessages[this.currentMessageIndex];
            this.messageElement.style.opacity = '1';
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loveMessages.length;
        }, 300);
    }
    
    checkSpecialDays(days) {
        const originalMessage = this.messageElement.textContent;
        
        // Özel günler için mesajlar
        if (days === 0) {
            this.messageElement.textContent = 'İlk sevgili günümüz! 🎉';
        } else if (days === 1) {
            this.messageElement.textContent = 'İlk günümüz! 💕';
        } else if (days % 30 === 0 && days > 0) {
            this.messageElement.textContent = `${days / 30} ay oldu! 🌙`;
        } else if (days % 365 === 0 && days > 0) {
            this.messageElement.textContent = `${days / 365} yıl oldu! 🎂`;
        } else if (days === 100) {
            this.messageElement.textContent = '100 gün! 💯';
        } else if (days === 365) {
            this.messageElement.textContent = '1 yıl! 🎊';
        }
    }
    
    displayFutureDate() {
        const now = new Date();
        const timeDiff = this.startDate - now;
        
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.ceil((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
            this.daysElement.textContent = this.formatNumber(days);
            this.hoursElement.textContent = this.formatNumber(hours);
            this.minutesElement.textContent = '00';
            this.secondsElement.textContent = '00';
            this.messageElement.textContent = `İlk sevgili günümüze ${days} gün kaldı! 🗓️`;
        }
    }
}
