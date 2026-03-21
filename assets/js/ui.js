/**
 * UI Components - Handles shared elements across all pages
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Inject Loading overlay
    injectLoader();
    // Inject Navbar
    injectNavbar();
    // Inject Footer
    injectFooter();
    // Inject UI Extras (Scroll progress, Mobile Bottom Nav)
    injectUIExtras();

    // Initialize DB and Seed data
    if (window.gelatoDB) {
        await window.gelatoDB.init();
        await window.gelatoDB.seedInitialData();
    }
    
    // Hide Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1000);

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            once: true,
            mirror: false
        });
    }

    // Scroll Progress logic
    initScrollProgress();
});


function injectLoader() {
    const loader = `
    <div id="loader" style="position:fixed; inset:0; z-index:10001; background: #fff; display:flex; flex-direction:column; align-items:center; justify-content:center; transition: opacity 0.5s ease;">
        <div class="animate-float" style="width: 100px; height: 100px; background: linear-gradient(45deg, #FF69B4, #87CEEB); border-radius: 50% 50% 10% 10%; margin-bottom: 20px;"></div>
        <h2 class="text-3xl font-black gradient-text">Gelatariya</h2>
    </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loader);
}

function injectUIExtras() {
    const extras = `
        <div id="scroll-progress"></div>
        
        <!-- Mobile Bottom Nav bar (Breathtaking App-like feel) -->
        <div class="md:hidden fixed bottom-6 left-6 right-6 z-[100] glass-nav rounded-[2.5rem] p-4 flex justify-around items-center border border-white/40 shadow-2xl backdrop-blur-3xl">
            <a href="index.html" id="nav-home" class="flex flex-col items-center gap-1 text-gray-400 hover:text-strawberry transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                <span class="text-[10px] font-bold uppercase">Home</span>
            </a>
            <a href="menu.html" id="nav-menu" class="flex flex-col items-center gap-1 text-gray-400 hover:text-strawberry transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                <span class="text-[10px] font-bold uppercase">Menu</span>
            </a>
            <a href="contact.html" id="nav-contact" class="flex flex-col items-center gap-1 text-gray-400 hover:text-strawberry transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                <span class="text-[10px] font-bold uppercase">Contatti</span>
            </a>
            <a href="admin.html" id="nav-admin" class="flex flex-col items-center gap-1 text-gray-400 hover:text-strawberry transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span class="text-[10px] font-bold uppercase">Gestione</span>
            </a>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', extras);

    // Dynamic Active Highlight
    const path = window.location.pathname.split("/").pop() || "index.html";
    if (path.includes("index")) document.getElementById('nav-home').classList.add('bottom-nav-active');
    if (path.includes("menu")) document.getElementById('nav-menu').classList.add('bottom-nav-active');
    if (path.includes("contact")) document.getElementById('nav-contact').classList.add('bottom-nav-active');
    if (path.includes("admin")) document.getElementById('nav-admin').classList.add('bottom-nav-active');
}




// No custom cursor used



function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById('scroll-progress');
        if (bar) bar.style.width = scrolled + "%";
    });
}


function injectNavbar() {
    const navbar = `
    <nav class="fixed top-0 w-full z-50 transition-all duration-500 glass-nav">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-24">
                <div class="flex-shrink-0 flex items-center">
                    <a href="index.html" class="text-3xl font-black gradient-text tracking-tighter">Gelatariya</a>
                </div>
                <div class="hidden md:flex space-x-12 items-center">
                    <a href="index.html" class="text-gray-900 hover:text-strawberry font-bold transition-all text-sm uppercase tracking-widest">Home</a>
                    <a href="menu.html" class="text-gray-900 hover:text-strawberry font-bold transition-all text-sm uppercase tracking-widest">Menu</a>
                    <a href="about.html" class="text-gray-900 hover:text-strawberry font-bold transition-all text-sm uppercase tracking-widest">Chi Siamo</a>
                    <a href="contact.html" class="text-gray-900 hover:text-strawberry font-bold transition-all text-sm uppercase tracking-widest">Contatti</a>
                    <div class="flex items-center space-x-6 border-l border-gray-200 pl-8 mr-6">
                        <a href="#" class="text-[#1877F2] hover:scale-110 transition-transform"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                        <a href="#" class="text-[#E4405F] hover:scale-110 transition-transform"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                    </div>
                    <a href="admin.html" class="hidden md:block text-gray-500 hover:text-strawberry transition-all mr-8">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </a>
                    <a href="https://wa.me/39061234567" target="_blank" class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-green-200">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        WhatsApp
                    </a>
                </div>
                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-btn" class="text-gray-900 focus:outline-none">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden bg-white/95 backdrop-blur-2xl border-b border-gray-100 p-8 shadow-2xl">
            <div class="flex flex-col space-y-6">
                <a href="index.html" class="text-2xl font-black text-gray-900">Home</a>
                <a href="menu.html" class="text-2xl font-black text-gray-900">Menu</a>
                <a href="about.html" class="text-2xl font-black text-gray-900">Chi Siamo</a>
                <a href="contact.html" class="text-2xl font-black text-gray-900">Contatti</a>
                <div class="flex space-x-6 pt-4 border-t border-gray-100">
                    <a href="#" class="text-gray-600">FB</a>
                    <a href="#" class="text-gray-600">IG</a>
                    <a href="#" class="text-gray-600">TK</a>
                </div>
            </div>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbar);

    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.onclick = () => mobileMenu.classList.toggle('hidden');
    }
}

function injectFooter() {
    const footer = `
    <footer class="bg-gray-900 text-white pt-32 pb-16 mt-32 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-20">
                <div class="space-y-8">
                    <h3 class="text-4xl font-black gradient-text italic">Gelatariya</h3>
                    <p class="text-gray-400 leading-relaxed">Produciamo il miglior gelato artigianale della città con ingredienti freschi e di prima qualità. Pura gioia in ogni pallina.</p>
                    <div class="flex space-x-6 items-center">
                        <a href="#" class="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all group shadow-lg">
                            <svg class="w-6 h-6 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="#" class="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#E4405F] hover:border-[#E4405F] transition-all group shadow-lg">
                            <svg class="w-6 h-6 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163v.002c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                        <a href="#" class="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center hover:bg-black hover:border-black transition-all group shadow-lg">
                            <svg class="w-6 h-6 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.03-1.2-2.28-1.51-3.41-4.44-2.49-7.02.53-1.61 1.81-2.95 3.41-3.44 1.05-.33 2.15-.31 3.21-.13V12.2c-.89-.24-1.85-.27-2.73-.01-1.41.34-2.52 1.54-2.77 2.97-.24 1.34.2 2.77 1.14 3.73.9.96 2.22 1.43 3.53 1.22 1.18-.12 2.25-.83 2.83-1.87.54-.83.69-1.84.66-2.82V.02z"/></svg>
                        </a>
                    </div>

                </div>
                <div>
                    <h4 class="text-lg font-bold mb-10 uppercase tracking-widest text-strawberry">Link Rapidi</h4>
                    <ul class="space-y-4 text-gray-400">
                        <li><a href="index.html" class="hover:text-strawberry transition-colors">Home</a></li>
                        <li><a href="menu.html" class="hover:text-strawberry transition-colors">Il Nostro Menu</a></li>
                        <li><a href="about.html" class="hover:text-strawberry transition-colors">Chi Siamo</a></li>
                        <li><a href="contact.html" class="hover:text-strawberry transition-colors">Contattaci</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-10 uppercase tracking-widest text-mint">Contattaci</h4>
                    <ul class="space-y-4 text-gray-400">
                        <li class="flex items-center gap-3">
                            <svg class="w-5 h-5 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            +39 06 123 4567
                        </li>
                        <li class="flex items-center gap-3">
                            <svg class="w-5 h-5 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            ciao@gelatariya.it
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-10 uppercase tracking-widest text-accent">Orari</h4>
                    <ul class="space-y-4 text-gray-400">
                        <li>Lun - Ven: 10:00 - 22:00</li>
                        <li>Sab - Dom: 09:00 - 00:00</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-24 pt-10 text-center text-gray-500">
                <p>&copy; 2026 Gelatariya Premium Ice Cream Shop. Tutti i diritti riservati.</p>
            </div>
        </div>
    </footer>
    `;


    document.body.insertAdjacentHTML('beforeend', footer);
}

// Utility to notify messages (Premium feeling)
window.showAlert = (msg, type = 'success') => {
    const alertBox = document.createElement('div');
    alertBox.className = `fixed top-24 right-8 z-[100] px-6 py-4 rounded-xl shadow-2xl glass-card border-none text-lg font-semibold animate-float ${type === 'success' ? 'text-green-600' : 'text-red-500'}`;
    alertBox.textContent = msg;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}
