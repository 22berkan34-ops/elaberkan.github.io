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
// QuotesSlider daha sonra ana DOMContentLoaded event'inde başlatılacak

// Galeri hover efektleri için ek animasyonlar
// Hover efektleri daha sonra ana DOMContentLoaded event'inde eklenecek

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
// Global atama daha sonra ana DOMContentLoaded event'inde yapılacak

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
        
        // Elementlerin varlığını kontrol et
        if (!this.modal || !this.modalImage || !this.closeBtn || !this.prevBtn || !this.nextBtn) {
            console.error('FullscreenModal elementleri bulunamadı:');
            console.error('modal:', this.modal);
            console.error('modalImage:', this.modalImage);
            console.error('closeBtn:', this.closeBtn);
            console.error('prevBtn:', this.prevBtn);
            console.error('nextBtn:', this.nextBtn);
            return; // Elementler yoksa init'i çalıştırma
        }
        
        this.init();
    }
    
    init() {
        // Galeri resimlerine tıklama olayı ekle
        if (this.galleryImages && this.galleryImages.length > 0) {
            this.galleryImages.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    this.openModal(index);
                });
            });
        }
        
        // Modal kapatma olayları
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        // Modal dışına tıklayınca kapat
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Navigasyon butonları
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.showPreviousImage();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.showNextImage();
            });
        }
        
        // Klavye kontrolleri
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal.classList.contains('active')) {
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
        if (!this.galleryImages || this.galleryImages.length === 0) {
            console.warn('Galeri resimleri bulunamadı');
            return;
        }
        
        this.currentImageIndex = index;
        const image = this.galleryImages[index];
        if (this.modalImage && image) {
            this.modalImage.src = image.src;
            this.modalImage.alt = image.alt;
        }
        if (this.modal) {
            this.modal.classList.add('active');
        }
        document.body.style.overflow = 'hidden'; // Scroll'u engelle
        
        // Modal açıldığında uçuşan kalpler oluştur
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }
    
    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
        }
        document.body.style.overflow = 'auto'; // Scroll'u tekrar aktif et
    }
    
    showPreviousImage() {
        if (!this.galleryImages || this.galleryImages.length === 0) return;
        this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
        this.updateModalImage();
    }
    
    showNextImage() {
        if (!this.galleryImages || this.galleryImages.length === 0) return;
        this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
        this.updateModalImage();
    }
    
    updateModalImage() {
        if (!this.galleryImages || this.galleryImages.length === 0) return;
        const image = this.galleryImages[this.currentImageIndex];
        if (this.modalImage && image) {
            this.modalImage.src = image.src;
            this.modalImage.alt = image.alt;
        }
    }
    
    initSwipeSupport() {
        if (!this.modal) return;
        
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

// Scroll animasyonları sınıfı
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        // Intersection Observer oluştur
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Tüm animasyonlu elemanları gözlemle
        this.observeElements();
        
        // Widget'ların giriş animasyonları
        this.animateWidgets();
    }
    
    observeElements() {
        // Galeri elemanları
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            this.observer.observe(item);
        });
        
        // Bölüm başlıkları
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            this.observer.observe(title);
        });
        
        // Widget'lar
        const widgets = document.querySelectorAll('.love-counter-widget, .daily-quote-widget');
        widgets.forEach(widget => {
            this.observer.observe(widget);
        });
    }
    
    animateElement(element) {
        if (element.classList.contains('gallery-item')) {
            element.classList.add('visible');
        } else if (element.classList.contains('section-title')) {
            element.classList.add('fade-in');
        } else if (element.classList.contains('daily-quote-widget')) {
            element.classList.add('slide-in-right');
        }
    }
    
    animateWidgets() {
        // Daily Quote widget'ı gecikmeli göster
        setTimeout(() => {
            const quoteWidget = document.querySelector('.daily-quote-widget');
            if (quoteWidget && !quoteWidget.classList.contains('slide-in-right')) {
                quoteWidget.classList.add('slide-in-right');
            }
        }, 500);
    }
}

// Sayfa yüklendiğinde modal'ı başlat
// Tüm sınıflar daha sonra ana DOMContentLoaded event'inde başlatılacak

// Günün Aşk Sözü Sınıfı
class DailyQuote {
    constructor() {
        this.quotes = [
            { text: "Aşk, zamanla ölçülmez, kalplerle ölçülür.", author: "Mevlana" },
            { text: "Seni sevdim, seni seveceğim, seni sevdim...", author: "Cahit Zarifoğlu" },
            { text: "Aşk iki kişinin birbirine bakması değil, birlikte aynı yöne bakmasıdır.", author: "Antoine de Saint-Exupéry" },
            { text: "Seni sevmek, bir mevsim gibi doğdu içimde.", author: "Can Yücel" },
            { text: "Aşk, ruhun gıdasıdır.", author: "Platon" },
            { text: "Seni düşünmek, bahar gelmek gibi gelir içime.", author: "Nazım Hikmet" },
            { text: "Aşk, hayatın en güzel melodisidir.", author: "Victor Hugo" },
            { text: "Seninle her gün, ilk gün gibi heyecanlı.", author: "Berkan" },
            { text: "Aşkımız, zamanın ötesinde bir bağdır.", author: "Berkan" },
            { text: "Seni sevmek, nefes almak kadar doğal.", author: "William Shakespeare" },
            { text: "Kalbim seninle atıyor, zaman seninle akıyor.", author: "Berkan" },
            { text: "Aşk, iki kalbin tek vücut olmasıdır.", author: "Aristoteles" },
            { text: "Seninle olmak, cennette yaşamak gibi.", author: "Rumi" },
            { text: "Aşkımız, yıldızlar kadar parlak, okyanuslar kadar derin.", author: "Berkan" },
            { text: "Seni sevmek, bir şiir yazmak kadar güzel.", author: "Berkan" },
            { text: "Aşk, hayatın anlamıdır.", author: "Friedrich Nietzsche" },
            { text: "Seninle her an, bir hazine gibi değerli.", author: "Berkan" },
            { text: "Aşk, iki kişinin birbirini tamamlamasıdır.", author: "Confucius" },
            { text: "Seni düşünmek, en güzel düşüncemdir.", author: "Berkan" },
            { text: "Aşkımız, zamanla değil, sonsuzlukla ölçülür.", author: "Berkan" }
        ];
        
        this.currentQuoteIndex = 0;
        this.todayQuoteCount = 0;
        this.favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
        
        this.quoteDateElement = document.getElementById('quoteDate');
        this.quoteTextElement = document.getElementById('dailyQuote');
        this.quoteAuthorElement = document.getElementById('quoteAuthor');
        this.newQuoteBtn = document.getElementById('newQuoteBtn');
        this.favoriteBtn = document.getElementById('favoriteBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.todayQuoteNumberElement = document.getElementById('todayQuoteNumber');
        
        this.init();
    }
    
    init() {
        // Tarihi güncelle
        this.updateDate();
        
        // Bugünkü söz sayısını yükle
        this.loadTodayQuoteCount();
        
        // İlk sözü göster
        this.showRandomQuote();
        
        // Event listener'ları ekle
        this.addEventListeners();
        
        // Her gün otomatik yeni söz göster
        this.scheduleDailyQuote();
    }
    
    updateDate() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        this.quoteDateElement.textContent = now.toLocaleDateString('tr-TR', options);
    }
    
    loadTodayQuoteCount() {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem('lastQuoteDate');
        
        if (lastDate === today) {
            this.todayQuoteCount = parseInt(localStorage.getItem('todayQuoteCount')) || 0;
        } else {
            this.todayQuoteCount = 0;
            localStorage.setItem('lastQuoteDate', today);
        }
        
        this.updateQuoteCounter();
    }
    
    updateQuoteCounter() {
        this.todayQuoteNumberElement.textContent = this.todayQuoteCount + 1;
    }
    
    showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        this.showQuote(randomIndex);
    }
    
    showQuote(index) {
        const quote = this.quotes[index];
        this.currentQuoteIndex = index;
        
        // Animasyon için önce gizle
        this.quoteTextElement.style.opacity = '0';
        this.quoteAuthorElement.style.opacity = '0';
        
        setTimeout(() => {
            this.quoteTextElement.textContent = quote.text;
            this.quoteAuthorElement.textContent = `— ${quote.author}`;
            
            // Animasyonla göster
            this.quoteTextElement.style.opacity = '1';
            this.quoteAuthorElement.style.opacity = '1';
            
            // Söz sayacını güncelle
            this.todayQuoteCount++;
            this.updateQuoteCounter();
            localStorage.setItem('todayQuoteCount', this.todayQuoteCount);
            
            // Favori butonunu güncelle
            this.updateFavoriteButton();
        }, 300);
    }
    
    addEventListeners() {
        // Yeni söz butonu
        this.newQuoteBtn.addEventListener('click', () => {
            this.showRandomQuote();
            this.createFloatingHearts();
        });
        
        // Favori butonu
        this.favoriteBtn.addEventListener('click', () => {
            this.toggleFavorite();
        });
        
        // Paylaş butonu
        this.shareBtn.addEventListener('click', () => {
            this.shareQuote();
        });
    }
    
    toggleFavorite() {
        const currentQuote = this.quotes[this.currentQuoteIndex];
        const quoteString = JSON.stringify(currentQuote);
        
        const index = this.favoriteQuotes.findIndex(fav => JSON.stringify(fav) === quoteString);
        
        if (index > -1) {
            // Favorilerden çıkar
            this.favoriteQuotes.splice(index, 1);
            this.favoriteBtn.textContent = '⭐ Favori';
            this.favoriteBtn.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #d63384 100%)';
        } else {
            // Favorilere ekle
            this.favoriteQuotes.push(currentQuote);
            this.favoriteBtn.textContent = '❤️ Favorilerde';
            this.favoriteBtn.style.background = 'linear-gradient(135deg, #ff1744 0%, #d50000 100%)';
            this.createFloatingHearts();
        }
        
        localStorage.setItem('favoriteQuotes', JSON.stringify(this.favoriteQuotes));
    }
    
    updateFavoriteButton() {
        const currentQuote = this.quotes[this.currentQuoteIndex];
        const quoteString = JSON.stringify(currentQuote);
        
        const isFavorite = this.favoriteQuotes.some(fav => JSON.stringify(fav) === quoteString);
        
        if (isFavorite) {
            this.favoriteBtn.textContent = '❤️ Favorilerde';
            this.favoriteBtn.style.background = 'linear-gradient(135deg, #ff1744 0%, #d50000 100%)';
        } else {
            this.favoriteBtn.textContent = '⭐ Favori';
            this.favoriteBtn.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #d63384 100%)';
        }
    }
    
    shareQuote() {
        const quote = this.quotes[this.currentQuoteIndex];
        const shareText = `"${quote.text}" — ${quote.author}`;
        
        if (navigator.share) {
            // Web Share API destekliyorsa
            navigator.share({
                title: 'Günün Aşk Sözü',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Desteklemiyorsa panoya kopyala
            navigator.clipboard.writeText(shareText).then(() => {
                // Geçici olarak buton metnini değiştir
                const originalText = this.shareBtn.textContent;
                this.shareBtn.textContent = '✅ Kopyalandı!';
                this.shareBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)';
                
                setTimeout(() => {
                    this.shareBtn.textContent = originalText;
                    this.shareBtn.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #d63384 100%)';
                }, 2000);
            });
        }
    }
    
    createFloatingHearts() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }
    
    scheduleDailyQuote() {
        // Her gün gece yarısında yeni söz göster
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const timeUntilMidnight = tomorrow - now;
        
        setTimeout(() => {
            this.showRandomQuote();
            this.todayQuoteCount = 0;
            this.updateQuoteCounter();
            localStorage.setItem('todayQuoteCount', 0);
            
            // Her gün bu işlemi tekrarla
            setInterval(() => {
                this.showRandomQuote();
                this.todayQuoteCount = 0;
                this.updateQuoteCounter();
                localStorage.setItem('todayQuoteCount', 0);
            }, 24 * 60 * 60 * 1000); // 24 saat
        }, timeUntilMidnight);
    }
}

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
        this.previousValues = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        
        this.init();
    }
    
    init() {
        // Widget'ları animasyonlu göster
        this.animateWidgetEntry();
        
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
    
    animateWidgetEntry() {
        const widget = document.querySelector('.love-counter-widget');
        if (widget) {
            widget.classList.add('fade-in');
        }
        
        // Sayaç elemanlarını sırayla göster
        const counterItems = document.querySelectorAll('.counter-item');
        counterItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('slide-in-up');
            }, index * 150);
        });
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
        
        // Animasyonlu sayaç güncelleme
        this.animateCounter(this.daysElement, days, this.previousValues.days);
        this.animateCounter(this.hoursElement, hours, this.previousValues.hours);
        this.animateCounter(this.minutesElement, minutes, this.previousValues.minutes);
        this.animateCounter(this.secondsElement, seconds, this.previousValues.seconds);
        
        // Önceki değerleri güncelle
        this.previousValues.days = days;
        this.previousValues.hours = hours;
        this.previousValues.minutes = minutes;
        this.previousValues.seconds = seconds;
        
        // Özel günler için mesaj
        this.checkSpecialDays(days);
    }
    
    animateCounter(element, newValue, oldValue) {
        if (newValue !== oldValue) {
            // Animasyon sınıfını ekle
            element.classList.add('updating');
            
            // Değeri güncelle
            element.textContent = this.formatNumber(newValue);
            
            // Animasyon sınıfını kaldır
            setTimeout(() => {
                element.classList.remove('updating');
            }, 600);
            
            // Özel günlerde bounce animasyonu
            if (newValue % 100 === 0 || newValue % 50 === 0) {
                element.classList.add('bounce');
                setTimeout(() => {
                    element.classList.remove('bounce');
                }, 1000);
            }
        }
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

// Şifreli Hazine Sınıfı
class TreasureBox {
    constructor() {
        this.correctPassword = 'servis'; // İpucu: Seni ilk öptüğüm yer
        this.treasureLock = document.getElementById('treasureLock');
        this.treasureContent = document.getElementById('treasureContent');
        this.passwordInput = document.getElementById('treasurePassword');
        this.unlockBtn = document.getElementById('unlockTreasure');
        this.closeBtn = document.getElementById('closeTreasure');
        this.treasureTabs = document.querySelectorAll('.treasure-tab');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        
        this.init();
    }
    
    init() {
        // Event listener'ları ekle
        this.unlockBtn.addEventListener('click', () => this.unlockTreasure());
        this.closeBtn.addEventListener('click', () => this.closeTreasure());
        this.passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.unlockTreasure();
            }
        });
        
        // Tab değiştirme event listener'ları
        this.treasureTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });
        
        // Animasyon için widget'ı görünür yap
        setTimeout(() => {
            document.querySelector('.treasure-widget').classList.add('visible');
        }, 500);
    }
    
    unlockTreasure() {
        const enteredPassword = this.passwordInput.value.trim();
        
        if (enteredPassword === this.correctPassword) {
            this.showSuccess();
        } else {
            this.showError();
        }
    }
    
    showSuccess() {
        // Başarı animasyonu
        this.treasureLock.style.transform = 'scale(0.9)';
        this.treasureLock.style.opacity = '0';
        
        setTimeout(() => {
            this.treasureLock.style.display = 'none';
            this.treasureContent.style.display = 'block';
            this.treasureContent.style.opacity = '0';
            this.treasureContent.style.transform = 'scale(0.9)';
            
            // İçeriği animasyonla göster
            setTimeout(() => {
                this.treasureContent.style.opacity = '1';
                this.treasureContent.style.transform = 'scale(1)';
                this.createCelebration();
            }, 100);
        }, 300);
        
        // Şifre input'unu temizle
        this.passwordInput.value = '';
    }
    
    showError() {
        // Hata animasyonu
        this.passwordInput.classList.add('error');
        this.passwordInput.style.animation = 'shake 0.5s ease-in-out';
        
        // Kilit ikonunu kırmızı yap
        const lockIcon = document.querySelector('.lock-icon');
        lockIcon.style.color = '#e74c3c';
        lockIcon.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            this.passwordInput.classList.remove('error');
            this.passwordInput.style.animation = '';
            lockIcon.style.color = '';
            lockIcon.style.animation = '';
        }, 500);
        
        // Şifre input'unu temizle
        this.passwordInput.value = '';
        this.passwordInput.focus();
    }
    
    closeTreasure() {
        // Kapatma animasyonu
        this.treasureContent.style.opacity = '0';
        this.treasureContent.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            this.treasureContent.style.display = 'none';
            this.treasureLock.style.display = 'block';
            this.treasureLock.style.opacity = '1';
            this.treasureLock.style.transform = 'scale(1)';
        }, 300);
    }
    
    switchTab(clickedTab) {
        const targetTab = clickedTab.dataset.tab;
        
        // Aktif tab'ı güncelle
        this.treasureTabs.forEach(tab => tab.classList.remove('active'));
        clickedTab.classList.add('active');
        
        // İçerik panellerini güncelle
        this.tabPanes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === targetTab) {
                pane.classList.add('active');
            }
        });
    }
    
    createCelebration() {
        // Başarı kutlaması için uçuşan kalpler
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createCelebrationHeart();
            }, i * 100);
        }
    }
    
    createCelebrationHeart() {
        const heart = document.createElement('div');
        heart.className = 'celebration-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        document.querySelector('.treasure-widget').appendChild(heart);
        
        // Animasyon bittikten sonra kalbi kaldır
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

// Alfabetik Date Takvimi Sınıfı
class AlphabeticalDateCalendar {
    constructor() {
        this.alphabeticalDates = this.generateAlphabeticalDates();
        this.completedDates = JSON.parse(localStorage.getItem('completedDates')) || {};
        
        this.calendarGrid = document.getElementById('calendarGrid');
        this.currentMonthElement = document.getElementById('currentMonth'); // Opsiyonel
        this.completedCountElement = document.getElementById('completedCount');
        this.pendingCountElement = document.getElementById('pendingCount');
        this.totalCountElement = document.getElementById('totalCount');
        
        // Elementlerin varlığını kontrol et
        if (!this.calendarGrid) {
            console.error('calendarGrid elementi bulunamadı');
            return;
        }
        
        this.init();
    }
    
    init() {
        this.renderCalendar();
        this.updateStats();
        this.addEventListeners();
    }
    
    generateAlphabeticalDates() {
        const dates = [];
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // Her harf için bir date fikri
        const letterDates = [
            { letter: 'A', name: 'Araba Yıkamak 🚗', description: 'Birlikte araba yıkamak' },
            { letter: 'B', name: 'Bowling Oynamak ', description: 'Bowling oynamak' },
            { letter: 'C', name: 'Cilt bakımı yapmak ', description: 'Cilt bakımı yapmak' },
            { letter: 'Ç', name: 'Çarpışan Arabaya Binmek  ', description: 'Birlikte Çarpışan Arabaya Binmek' },
            { letter: 'D', name: 'Dondurma yemek', description: 'Birlikte Dondurma Yemek' },
            { letter: 'E', name: 'Eğlence Parkı 🎉', description: 'Lunaparkta eğlenmek' },
            { letter: 'F', name: 'Film İzlemek', description: 'Birlikte Film İzlemek' },
            { letter: 'G', name: 'Galataya Gitmek', description: 'Birlikte Galataya Gitmek' },
            { letter: 'H', name: 'Hamakta Sallanmak', description: 'Birlikte Hamakta Sallanmak' },
            { letter: 'I', name: 'Islak Saçlarımızı Taramak', description: 'Islak Saçlarımızı Taramak' },
            { letter: 'İ', name: 'ice Cream Macchiato İçmek', description: 'ice Cream Macchiato İçmek' },
            { letter: 'K', name: 'Kahvaltı', description: 'Birlikte Kahvaltı Yapmak' },
            { letter: 'L', name: 'Lego Yapmak', description: 'Birlikte Lego Yapmak' },
            { letter: 'M', name: 'Müzeye Gitmek', description: 'Birlikte Müzeye Gitmek' },
            { letter: 'N', name: 'Nehir Kenarında Dolaşmak', description: 'Birlikte Nehir Kenarında Dolaşmak' },
            { letter: 'O', name: 'Okey Oynamak ', description: 'Birlikte Okey Oynamak' },
            { letter: 'Ö', name: 'Özel Soslu Hatay Döneri Yemek', description: 'Birlikte Özel Soslu Hatay Döneri Yemek' },
            { letter: 'P', name: 'Piknik', description: 'Yeşillikte piknik yapmak' },
            { letter: 'R', name: 'Resim Yapmak', description: 'Birlikte Resim Yapmak' },
            { letter: 'S', name: 'Sinemaya Gitmek', description: 'Birlikte Sinemaya Gitmek' },
            { letter: 'Ş', name: 'Şehir Turu Yapmak', description: 'Birlikte Şehir Turu Yapmak' },
            { letter: 'T', name: 'Tavuklu Pilav Yemek ', description: 'Birlikte Tavuklu Pilav Yemek' },
            { letter: 'U', name: 'Uçurtma Uçurmak', description: 'Gökyüzünde uçurtma uçurmak' },
            { letter: 'Ü', name: 'Ünlü Bulmaca Çözmek', description: 'Birlikte Ünlü Bulmaca Çözmek' },
            { letter: 'V', name: 'Voleybol Oynamak', description: 'Birlikte Voleybol Oynamak' },
            { letter: 'Y', name: 'Yağmurda Islanmak', description: 'Birlikte Yağmurda Islanmak' },
            { letter: 'Z', name: 'Zeytinyağlı Yaprak Sarma Yemek', description: 'Birlikte Zeytinyağlı Yaprak Sarma Yemek' }
        ];
        
        letterDates.forEach((letterDate, index) => {
            dates.push({
                letter: letterDate.letter,
                name: letterDate.name,
                description: letterDate.description,
                id: `letter-${letterDate.letter}`,
                order: index
            });
        });
        
        return dates;
    }
    
    renderCalendar() {
        // Tüm harfleri göster (artık ay bazlı değil)
        if (this.currentMonthElement) {
            this.currentMonthElement.textContent = 'Alfabetik Date Listesi';
        }
        
        if (this.calendarGrid) {
            this.calendarGrid.innerHTML = '';
            
            this.alphabeticalDates.forEach(letterDate => {
                const dateElement = this.createDateElement(letterDate);
                this.calendarGrid.appendChild(dateElement);
            });
        }
    }
    createDateElement(dateObj) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'calendar-item';
        dateDiv.dataset.dateId = dateObj.id;
        
        const isCompleted = this.completedDates[dateObj.id];
        if (isCompleted) {
            dateDiv.classList.add('completed');
        }
        
        dateDiv.innerHTML = `
            <div class="date-label">Harf ${dateObj.letter}</div>
            <div class="date-status">${isCompleted ? '❤️' : '♡'}</div>
            <div class="date-name">${dateObj.name}</div>
            <div class="date-description">${dateObj.description}</div>
        `;
        
        dateDiv.addEventListener('click', () => this.toggleDateCompletion(dateObj.id));
        
        return dateDiv;
    }
    
    toggleDateCompletion(dateId) {
        this.completedDates[dateId] = !this.completedDates[dateId];
        
        // LocalStorage'a kaydet
        localStorage.setItem('completedDates', JSON.stringify(this.completedDates));
        
        // Takvimi yeniden render et
        this.renderCalendar();
        this.updateStats();
        
        // Animasyon için kalp oluştur
        if (this.completedDates[dateId]) {
            this.createCelebrationHearts(3);
        }
    }
    
    createCelebrationHearts(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }
    
    updateStats() {
        const totalDates = this.alphabeticalDates.length;
        const completedDates = Object.keys(this.completedDates).filter(key => this.completedDates[key]).length;
        const pendingDates = totalDates - completedDates;
        
        // Elementlerin varlığını kontrol et
        if (this.completedCountElement) {
            this.completedCountElement.textContent = completedDates;
            this.animateNumber(this.completedCountElement, completedDates);
        }
        
        if (this.pendingCountElement) {
            this.pendingCountElement.textContent = pendingDates;
            this.animateNumber(this.pendingCountElement, pendingDates);
        }
        
        if (this.totalCountElement) {
            this.totalCountElement.textContent = totalDates;
            this.animateNumber(this.totalCountElement, totalDates);
        }
    }
    
    animateNumber(element, targetNumber) {
        if (!element) return;
        
        const currentNumber = parseInt(element.textContent) || 0;
        const increment = targetNumber > currentNumber ? 1 : -1;
        const steps = Math.abs(targetNumber - currentNumber);
        
        if (steps === 0) return;
        
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const newNumber = currentNumber + (increment * step);
            element.textContent = newNumber;
            
            if (step >= steps) {
                clearInterval(timer);
                element.textContent = targetNumber;
            }
        }, 50);
    }
    
    addEventListeners() {
        // Harf bazlı takvimde ay navigasyonu gerekmiyor
        // Sadece click olayları createDateElement içinde handle ediliyor
    }
}

// Sayfa yüklendiğinde tüm sınıfları başlat
document.addEventListener('DOMContentLoaded', () => {
    const quotesSlider = new QuotesSlider();
    const dailyQuote = new DailyQuote();
    const fullscreenModal = new FullscreenModal();
    const loveCounter = new LoveCounter();
    const scrollAnimations = new ScrollAnimations();
    const treasureBox = new TreasureBox();
    const alphabeticalDateCalendar = new AlphabeticalDateCalendar();
    const alphabeticalFoodCalendar = new AlphabeticalFoodCalendar();
    
    // Global referanslar için
    window.quotesSlider = quotesSlider;
    window.fullscreenModal = fullscreenModal;
    window.loveCounter = loveCounter;
    window.dailyQuote = dailyQuote;
    
    // Galeri hover efektleri
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    createFloatingHeart();
                }, i * 100);
            }
        });
    });
});
// Alfabetik Yemek Yeme Takvimi Sınıfı
class AlphabeticalFoodCalendar {
    constructor() {
        this.foodItems = this.generateFoodItems();
        this.completedFoods = JSON.parse(localStorage.getItem('completedFoods')) || {};

        this.foodCalendarGrid = document.getElementById('foodCalendarGrid');
        this.foodCompletedCountElement = document.getElementById('foodCompletedCount');
        this.foodPendingCountElement = document.getElementById('foodPendingCount');
        this.foodTotalCountElement = document.getElementById('foodTotalCount');

        // Elementlerin varlığını kontrol et
        if (!this.foodCalendarGrid) {
            console.error('foodCalendarGrid elementi bulunamadı');
            return;
        }

        this.init();
    }

    init() {
        this.renderCalendar();
        this.updateStats();
        this.addEventListeners();
    }

    generateFoodItems() {
        const foods = [];

        // Türkçe alfabetik yemek listesi
        const foodList = [
            { letter: 'A', name: 'Adana Kebap', description: 'Acılı Adana kebap', image: '' },
            { letter: 'B', name: 'Börek', description: 'Börek', image: '' },
            { letter: 'C', name: 'Cips', description: 'Cips', image: '' },
            { letter: 'Ç', name: 'Çiğköfte', description: 'Çiğköfte', image: '' },
            { letter: 'D', name: 'Döner', description: 'Et döner', image: '' },
            { letter: 'E', name: 'Ekler', description: 'Ekler', image: '' },
            { letter: 'F', name: 'Fıstıklı Baklava ', description: 'Antep fıstığı baklava', image: '' },
            { letter: 'G', name: 'Gözleme', description: 'Gözleme', image: '' },
            { letter: 'H', name: 'Hamburger', description: ' hamburger', image: '.\12.jpg' },
            { letter: 'I', name: 'Izgara Köfte', description: 'Izgara Köfte', image: '' },
            { letter: 'K', name: 'Kokoreç', description: 'Kokoreç', image: '' },
            { letter: 'L', name: 'Lahmacun', description: ' lahmacun', image: '' },
            { letter: 'M', name: 'Mercimek Çorbası', description: ' Mercimek çorbası', image: '' },
            { letter: 'N', name: 'Nohut', description: 'Nohutlu pilav', image: '' },
            { letter: 'O', name: 'Omlet', description: 'Omlet', image: '' },
            { letter: 'P', name: 'Pizza', description: 'Pizza', image: '' },
            { letter: 'R', name: 'Ramazan Pidesi', description: 'Ramazan pidesi', image: '' },
            { letter: 'S', name: 'Sufle', description: 'Sufle', image: '' },
            { letter: 'T', name: 'Tavuk Şiş', description: 'Tavuk şiş', image: '' },
            { letter: 'U', name: 'Un Kurabiyesi', description: 'Un kurabiyesi', image: '' },
            { letter: 'V', name: 'Vanilyalı Muhallebi', description: 'Vanilyalı muhallebi', image: '' },
            { letter: 'Y', name: 'Yoğurtlu Mantı', description: 'Yoğurtlu mantı', image: '' },
            { letter: 'W', name: 'Waffle', description: 'Waffle', image: '' },
            { letter: 'Z', name: 'Zeytinyağlı Yaprak Sarma', description: 'Zeytinyağlı yaprak sarma', image: '' }
        ];

        foodList.forEach((food, index) => {
            foods.push({
                letter: food.letter,
                name: food.name,
                description: food.description,
                image: food.image,
                id: `food-${food.letter}`,
                order: index
            });
        });

        return foods;
    }

    renderCalendar() {
        if (this.foodCalendarGrid) {
            this.foodCalendarGrid.innerHTML = '';

            this.foodItems.forEach(foodItem => {
                const foodElement = this.createFoodElement(foodItem);
                this.foodCalendarGrid.appendChild(foodElement);
            });
        }
    }

    createFoodElement(foodObj) {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food-calendar-item';
        foodDiv.dataset.foodId = foodObj.id;

        const isCompleted = this.completedFoods[foodObj.id];
        if (isCompleted) {
            foodDiv.classList.add('completed');
        }

        foodDiv.innerHTML = `
            <div class="food-letter">Harf ${foodObj.letter}</div>
            <div class="food-status">${isCompleted ? '❤️' : '♡'}</div>
            <div class="food-name">${foodObj.name}</div>
            <div class="food-description">${foodObj.description}</div>
        `;

        foodDiv.addEventListener('click', () => {
            if (isCompleted) {
                // Tamamlanmış yemeğe tıklandığında resim göster
                this.showFoodImage(foodObj);
            } else {
                // Tamamlanmamış yemeği tamamla
                this.toggleFoodCompletion(foodObj.id);
            }
        });

        return foodDiv;
    }

    toggleFoodCompletion(foodId) {
        this.completedFoods[foodId] = !this.completedFoods[foodId];

        // LocalStorage'a kaydet
        localStorage.setItem('completedFoods', JSON.stringify(this.completedFoods));

        // Takvimi yeniden render et
        this.renderCalendar();
        this.updateStats();

        // Animasyon için kalp oluştur
        if (this.completedFoods[foodId]) {
            this.createCelebrationHearts(5);
        }
    }

    showFoodImage(foodObj) {
        // Yemek resmini modal'da göster (mevcut modal sistemini kullan)
        if (window.fullscreenModal) {
            // Geçici olarak mevcut modal'ı kullan (gerçek resim dosyası yoksa emoji göster)
            const modal = document.getElementById('fullscreenModal');
            const modalImage = document.getElementById('modalImage');

            if (modal && modalImage) {
                // Gerçek resim yoksa emoji göster
                modalImage.src = `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y="50" font-size="50" text-anchor="middle" dominant-baseline="middle"%3E🍽️%3C/text%3E%3C/svg%3E`;
                modalImage.alt = `${foodObj.name} - ${foodObj.description}`;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Modal açıldığında uçuşan kalpler oluştur
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createFloatingHeart();
                    }, i * 100);
                }
            }
        }
    }

    createCelebrationHearts(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }

    updateStats() {
        const totalFoods = this.foodItems.length;
        const completedFoods = Object.keys(this.completedFoods).filter(key => this.completedFoods[key]).length;
        const pendingFoods = totalFoods - completedFoods;

        // Elementlerin varlığını kontrol et
        if (this.foodCompletedCountElement) {
            this.foodCompletedCountElement.textContent = completedFoods;
            this.animateNumber(this.foodCompletedCountElement, completedFoods);
        }

        if (this.foodPendingCountElement) {
            this.foodPendingCountElement.textContent = pendingFoods;
            this.animateNumber(this.foodPendingCountElement, pendingFoods);
        }

        if (this.foodTotalCountElement) {
            this.foodTotalCountElement.textContent = totalFoods;
            this.animateNumber(this.foodTotalCountElement, totalFoods);
        }
    }

    animateNumber(element, targetNumber) {
        if (!element) return;

        const currentNumber = parseInt(element.textContent) || 0;
        const increment = targetNumber > currentNumber ? 1 : -1;
        const steps = Math.abs(targetNumber - currentNumber);

        if (steps === 0) return;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const newNumber = currentNumber + (increment * step);
            element.textContent = newNumber;

            if (step >= steps) {
                clearInterval(timer);
                element.textContent = targetNumber;
            }
        }, 50);
    }

    addEventListeners() {
        // Özel event listener'lar gerekli değil, click olayları createFoodElement içinde handle ediliyor
    }
}
