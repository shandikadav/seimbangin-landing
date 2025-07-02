import { useState, useEffect, useRef } from "react";
import ReactGA from "react-ga4"; // <-- 1. Impor ReactGA
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  TrendingDown,
  BrainCircuit,
  ScanText,
  PieChart,
  Target,
  Star,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// --- Custom Hook untuk Animasi Scroll ---
const useScrollAnimation = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const features = [
  {
    title: "AI Financial Advisor",
    description:
      "Dapatkan saran keuangan personal dan konsultasi langsung melalui chatbot AI untuk membantu Anda mengambil keputusan finansial yang lebih cerdas dan terarah.",
    icon: <BrainCircuit />,
  },
  {
    title: "Pencatatan Struk (OCR)",
    description:
      "Hemat waktu dengan mencatat transaksi secara otomatis. Cukup foto struk belanja Anda, dan biarkan teknologi OCR kami mengekstrak datanya untuk Anda.",
    icon: <ScanText />,
  },
  {
    title: "Analisis Keuangan Mendalam",
    description:
      "Pantau kesehatan finansial Anda melalui grafik pemasukan dan pengeluaran yang mudah dipahami dalam rentang waktu harian, mingguan, hingga bulanan.",
    icon: <PieChart />,
  },
  {
    title: "Perencanaan & Alokasi",
    description:
      "Bangun kebiasaan finansial yang sehat dengan merencanakan dan mengalokasikan dana Anda secara tepat untuk kebutuhan, keinginan, dan tabungan masa depan.",
    icon: <Target />,
  },
];

const faqData = [
  {
    question: "Di mana saya bisa mengunduh aplikasi Seimbang.in?",
    answer:
      "Saat ini, aplikasi Seimbang.in belum tersedia di Google Play Store. Untuk instalasi, Anda perlu mengunduh file aplikasi dari link yang kami sediakan dan mengizinkan instalasi dari 'sumber tidak dikenal' pada pengaturan perangkat Android Anda.",
  },
  {
    question: "Apakah Seimbang.in berfungsi seperti e-wallet?",
    answer:
      "Tidak. Seimbang.in adalah aplikasi manajemen dan pencatatan keuangan pribadi, bukan dompet digital (e-wallet). Anda tidak dapat menyimpan uang, melakukan transfer, atau bertransaksi langsung melalui aplikasi ini.",
  },
  {
    question: "Apakah aplikasi ini bisa digunakan tanpa koneksi internet?",
    answer:
      "Untuk saat ini, Seimbang.in memerlukan koneksi internet untuk dapat digunakan. Aplikasi belum mendukung mode offline, sehingga Anda perlu terhubung ke jaringan untuk mengakses dan menyimpan data transaksi.",
  },
  {
    question: "Mengapa fitur AI Advisor tidak muncul di akun saya?",
    answer:
      "Fitur AI Advisor akan aktif dan mulai memberikan saran setelah Anda melengkapi 'Financial Profile' saat pertama kali menggunakan aplikasi. Pastikan profil Anda terisi lengkap agar AI dapat memberikan saran yang relevan.",
  },
];

const testimonialsData = [
  {
    text: "Seimbang.in benar-benar mengubah cara saya melihat keuangan. Fitur tracking-nya simpel tapi sangat powerful. Akhirnya saya bisa tahu kemana perginya uang saya setiap bulan!",
    author: "Budi Santoso",
    title: "Freelance Designer",
    image: "https://i.pravatar.cc/150?u=budi",
  },
  {
    text: "Sebagai mahasiswa, mengatur uang saku itu tantangan. Berkat Seimbang.in, saya bisa membuat budget untuk jajan dan kebutuhan kuliah. Fitur pengingat tagihan juga penyelamat!",
    author: "Citra Lestari",
    title: "Mahasiswi",
    image: "https://i.pravatar.cc/150?u=citra",
  },
  {
    text: "Awalnya ragu, tapi fitur scan struknya luar biasa praktis. Tidak perlu lagi input manual satu per satu. Aplikasi ini wajib dicoba untuk siapa saja yang mau melek finansial.",
    author: "Agus Wijaya",
    title: "Wiraswasta",
    image: "https://i.pravatar.cc/150?u=agus",
  },
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <ChevronDown
          className={`transform transition-transform duration-300 text-blue-500 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={24}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ text, author, title, image, isVisible, delay }) => {
  return (
    <div
      className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-grow">
        <p className="text-gray-600 italic">"{text}"</p>
      </div>
      <div className="flex items-center mt-6">
        <img
          src={image}
          alt={author}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-blue-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

const AnimatedSection = ({ children, className, ...props }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);

  const [testimonialsRef, testimonialsVisible] = useScrollAnimation({ threshold: 0.1 });
  
  // --- 2. Inisialisasi Google Analytics ---
  useEffect(() => {
    // Ganti dengan ID Pengukuran GA4 Anda
    const measurementId = "G-RSVTER8JST"; 
    
    ReactGA.initialize(measurementId);
    
    // Melacak pageview pertama kali saat halaman dimuat
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    
    console.log("Google Analytics Initialized with ID:", measurementId);
  }, []);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleFaqToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  // --- 3. Fungsi untuk melacak event klik ---
  const handleDownloadClick = () => {
    ReactGA.event({
      category: "Tombol",
      action: "Klik",
      label: "Download"
    });
    console.log("Event 'Download' dikirim ke Google Analytics.");
    // Di sini Anda bisa menambahkan link unduhan jika ada
    // window.location.href = 'link-unduhan-anda';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white text-gray-800">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <a href="#home" className="text-xl font-bold text-blue-500">
                Seimbang.in
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              <a href="#home" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors">Home</a>
              <a href="#about" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors">Tentang</a>
              <a href="#video" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors">Video</a>
              <a href="#features" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors">Fitur</a>
              <a href="#harga" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors">Harga</a>
              <a href="#testimonials" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors">Testimoni</a>
              <a href="#faq" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors">FAQ</a>
              <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500 transition-colors">Kontak</a>
            </div>

            <div className="hidden md:flex items-center">
              {/* --- 4. Terapkan event handler pada tombol --- */}
              <button onClick={handleDownloadClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                Download
              </button>
            </div>
            
            <div className="flex items-center md:hidden">
              <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-500 hover:bg-gray-100 focus:outline-none">
                <span className="sr-only">Buka menu</span>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                <a href="#home" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500">Home</a>
                <a href="#about" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500">Tentang</a>
                <a href="#video" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500">Video</a>
                <a href="#features" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500">Fitur</a>
                <a href="#harga" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500">Harga</a>
                <a href="#testimonials" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500">Testimoni</a>
                <a href="#faq" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500">FAQ</a>
                <a href="#contact" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500">Kontak</a>
              <div className="pt-4 px-2">
                 {/* --- 4. Terapkan event handler pada tombol (versi mobile) --- */}
                 <button onClick={handleDownloadClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
        <section id="home" className="pt-48 pb-40 md:pt-52 md:pb-44 bg-gradient-to-b from-white via-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-14 md:mb-0">
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                  Smart Money, <br />
                  <span className="text-blue-500">Balanced Journey</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-xl">
                  Ambil alih kendali keuangan dengan pencatatan simpel, budget
                  cerdas, dan wawasan mendalam untuk mencapai tujuan finansial Anda.
                </p>
                <div className="flex items-center mb-10">
                  <div className="flex text-yellow-400">
                    <Star fill="currentColor" className="w-5 h-5" />
                    <Star fill="currentColor" className="w-5 h-5" />
                    <Star fill="currentColor" className="w-5 h-5" />
                    <Star fill="currentColor" className="w-5 h-5" />
                    <Star fill="currentColor" className="w-5 h-5" />
                  </div>
                  <p className="ml-3 text-sm font-semibold text-gray-600">
                    4.9 / 5.0 dari 1000+ pengguna
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium transition-colors duration-300">
                    Coba Sekarang
                  </button>
                  <button className="border border-gray-300 hover:border-blue-500 hover:text-blue-500 px-6 py-3 rounded-md text-base font-medium transition-colors duration-300">
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
                <img src="/hero-image.png" alt="Seimbang.in App" className="w-full max-w-[36rem] object-contain rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900">Tantangan Keuangan Generasi Muda</h2>
              <div className="mt-2 h-1 w-24 bg-red-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Berdasarkan survei OJK 2022, tingkat literasi keuangan Indonesia baru mencapai <b className="text-red-600">49,68%</b>. Khususnya bagi mahasiswa dan Gen Z, tantangan seperti gaya hidup impulsif dan kesulitan menabung menjadi masalah nyata.
              </p>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
               <AnimatedSection>
                    <div className="text-center md:text-left">
                        <span className="inline-flex items-center justify-center p-3 bg-red-100 rounded-xl mb-4">
                            <TrendingDown className="w-8 h-8 text-red-500" />
                        </span>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Perilaku Keuangan yang Menurun</h3>
                        <p className="text-gray-600 leading-relaxed">
                        Riset Katadata Insight Center (2021) menunjukkan mayoritas Gen Z jarang atau bahkan tidak pernah mengalokasikan tabungan di awal. Mereka cenderung mendahulukan keinginan daripada kebutuhan pokok, membuat kondisi keuangan tidak stabil.
                        </p>
                    </div>
                </AnimatedSection>
                <AnimatedSection>
                    <div className="flex justify-center">
                        <img src="/seimbangin-mascot.png" alt="Ilustrasi Masalah Keuangan" className="w-full max-w-sm rounded-2xl" />
                    </div>
                </AnimatedSection>
            </div>

             <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                <span className="text-blue-500">Seimbang.in:</span> Solusi Cerdas Finansial Anda
              </h2>
              <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Kami merancang Seimbang.in sebagai aplikasi mobile cerdas untuk membantu Anda mengelola keuangan pribadi dengan lebih mudah dan terarah.
              </p>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedSection>
                <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 h-full">
                  <span className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl mb-4">
                    <BrainCircuit className="w-8 h-8 text-blue-500" />
                  </span>
                  <h4 className="text-xl font-semibold mb-2">AI Financial Advisor</h4>
                  <p className="text-sm text-gray-600">
                    Dapatkan saran dan wawasan keuangan personal yang didukung AI untuk membantu Anda membuat keputusan finansial yang lebih baik.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection style={{ transitionDelay: '200ms' }}>
                <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 h-full">
                  <span className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl mb-4">
                    <ScanText className="w-8 h-8 text-blue-500" />
                  </span>
                  <h4 className="text-xl font-semibold mb-2">Pencatatan via OCR</h4>
                  <p className="text-sm text-gray-600">
                    Cukup foto struk belanja Anda, dan biarkan teknologi OCR kami mencatat semua transaksi secara otomatis, cepat, dan akurat.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection style={{ transitionDelay: '400ms' }}>
                <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 h-full">
                  <span className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl mb-4">
                    <PieChart className="w-8 h-8 text-blue-500" />
                  </span>
                  <h4 className="text-xl font-semibold mb-2">Analisis & Pelacakan</h4>
                  <p className="text-sm text-gray-600">
                    Pantau semua pemasukan dan pengeluaran Anda melalui grafik yang informatif untuk memahami kebiasaan belanja Anda.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section id="video" className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">Lihat Cara Kerja Seimbang.in</h2>
              <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Tonton video singkat ini untuk melihat betapa mudahnya mengelola keuangan dengan fitur-fitur andalan kami.
              </p>
            </AnimatedSection>
            <AnimatedSection className="relative aspect-video max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
              {playVideo ? (
                <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/G2LDOb59P4g?autoplay=1&rel=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              ) : (
                <>
                  <img src="https://img.youtube.com/vi/G2LDOb59P4g/maxresdefault.jpg" alt="Video Thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button onClick={() => setPlayVideo(true)} className="text-white hover:text-blue-300 transition-transform transform hover:scale-110" aria-label="Play Video">
                      <PlayCircle size={96} strokeWidth={1} />
                    </button>
                  </div>
                </>
              )}
            </AnimatedSection>
          </div>
        </section>

        <section id="features" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">Fitur Unggulan</h2>
              <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Temukan berbagai alat canggih yang menjadikan Seimbang.in teman terbaik dalam perjalanan finansial Anda.
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <AnimatedSection key={index} style={{ transitionDelay: `${index * 150}ms` }}>
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center h-full">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section id="harga" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">Penawaran Spesial Untuk Anda</h2>
                    <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Pilih plan yang paling sesuai dengan kebutuhan finansial Anda. Mulai gratis, kapan saja bisa upgrade.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <AnimatedSection style={{ transitionDelay: '0ms' }}>
                        <div className="border border-gray-200 rounded-2xl p-8 h-full flex flex-col">
                            <h3 className="text-2xl font-bold">Gratis</h3>
                            <p className="text-gray-500 mt-2">Untuk memulai kebiasaan baik.</p>
                            <p className="text-4xl font-bold mt-6">Rp 0</p>
                            <ul className="space-y-4 mt-8 text-gray-600 flex-grow">
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Pencatatan Transaksi Manual</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Scan Struk (10x/bulan)</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Hingga 5 Kategori Budget</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Saran Dasar dari AI</span></li>
                                <li className="flex items-center"><XCircle className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" /><span>Tanpa Iklan</span></li>
                            </ul>
                            <button className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg transition-colors">
                                Coba Gratis
                            </button>
                        </div>
                    </AnimatedSection>
                    
                    <AnimatedSection style={{ transitionDelay: '200ms' }}>
                        <div className="relative border-2 border-blue-500 rounded-2xl p-8 h-full flex flex-col shadow-2xl transform lg:scale-105">
                            <p className="absolute top-0 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">PALING POPULER</p>
                            <h3 className="text-2xl font-bold text-blue-600">Mahasiswa Pro</h3>
                            <p className="text-gray-500 mt-2">Untuk kontrol finansial penuh.</p>
                            <p className="text-4xl font-bold mt-6">Rp 19rb<span className="text-lg font-medium text-gray-500">/bulan</span></p>
                            <ul className="space-y-4 mt-8 text-gray-600 flex-grow">
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Semua di plan Gratis, plus:</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Scan Struk Tanpa Batas</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Kategori Budget Tanpa Batas</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>AI Advisor & Chatbot Canggih</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Analitik & Laporan Lanjutan</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Tanpa Iklan</span></li>
                            </ul>
                             <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors">
                                Pilih Plan
                            </button>
                        </div>
                    </AnimatedSection>

                     <AnimatedSection style={{ transitionDelay: '400ms' }}>
                        <div className="border border-gray-200 rounded-2xl p-8 h-full flex flex-col">
                            <h3 className="text-2xl font-bold">Sultan</h3>
                            <p className="text-gray-500 mt-2">Untuk para power-user.</p>
                            <p className="text-4xl font-bold mt-6">Rp 29rb<span className="text-lg font-medium text-gray-500">/bulan</span></p>
                             <ul className="space-y-4 mt-8 text-gray-600 flex-grow">
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Semua di plan Pro, plus:</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Export Data (CSV/PDF)</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Sinkronisasi Multi-Perangkat</span></li>
                                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /><span>Dukungan Prioritas</span></li>
                            </ul>
                            <button className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg transition-colors">
                                Pilih Plan
                            </button>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>

        <section id="testimonials" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">Kata Pengguna Kami</h2>
              <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Ribuan orang telah merasakan manfaat Seimbang.in dalam perjalanan finansial mereka.
              </p>
            </AnimatedSection>
            <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  text={testimonial.text}
                  author={testimonial.author}
                  title={testimonial.title}
                  image={testimonial.image}
                  isVisible={testimonialsVisible}
                  delay={index * 150}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600">
          <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative">
            <div className="absolute -inset-12 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mt-16 -mr-16"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/20 rounded-full -mb-24 -ml-24"></div>
            </div>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">
                Siap Mengambil Kendali Keuangan Anda?
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100">
                Mulai perjalanan finansial Anda yang lebih seimbang hari ini. Unduh Seimbang.in dan rasakan kemudahan mengelola uang di ujung jari Anda.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-8 py-3 rounded-lg transition-transform transform hover:scale-105 shadow-lg">
                  Unduh Sekarang
                </button>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section id="faq" className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
                Punya pertanyaan? Kami punya jawaban. Berikut adalah beberapa pertanyaan yang sering diajukan.
              </p>
            </AnimatedSection>
            <AnimatedSection className="space-y-2">
              {faqData.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} isOpen={openFaq === index} onClick={() => handleFaqToggle(index)} />
              ))}
            </AnimatedSection>
          </div>
        </section>

        <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
           <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-900">Hubungi Kami</h2>
                    <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Punya pertanyaan atau masukan? Kami akan senang mendengarnya dari Anda.
                    </p>
                     <p className="mt-2 text-sm text-gray-500">
                        Email kami langsung di <a href="mailto:support@seimbangin.app" className="font-medium text-blue-500 hover:underline">support@seimbangin.app</a>
                     </p>
                </div>
                
                <form className="space-y-6 max-w-xl mx-auto">
                    <div>
                        <label htmlFor="name" className="sr-only">Nama</label>
                        <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" placeholder="Nama Anda" />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" placeholder="Alamat email Anda" />
                    </div>
                    <div>
                        <label htmlFor="message" className="sr-only">Pesan</label>
                        <textarea id="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3" placeholder="Tulis pesan Anda..."></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md">
                        Kirim Pesan
                        </button>
                    </div>
                </form>
            </div>
          </AnimatedSection>
        </section>
      </main>

      <footer className="bg-[#0B1120] text-gray-300 py-16 mt-24 rounded-t-3xl shadow-inner">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-white mb-4">Seimbang.in</h3>
              <p className="text-gray-400">
                Manajemen uang cerdas untuk perjalanan finansial yang seimbang. Lacak, rencanakan, dan berkembang dengan percaya diri.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Perusahaan</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#about" className="hover:text-blue-400 transition">Tentang Kami</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition">Karir</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Dukungan</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-blue-400 transition">Pusat Bantuan</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition">Kebijakan Privasi</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition">Ketentuan Layanan</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Terhubung</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#contact" className="hover:text-blue-400 transition">Hubungi Kami</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition">Instagram</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">
              © {new Date().getFullYear()} Seimbang.in. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["Facebook", "Instagram", "Twitter"].map((platform, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-blue-400 transition" aria-label={platform}>
                  <i className={`fab fa-${platform.toLowerCase()} fa-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}