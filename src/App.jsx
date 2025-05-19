import { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

// Dummy data for features
const features = [
  {
    title: "Expense Tracking",
    description:
      "Easily track your daily expenses across multiple categories with just a few taps.",
    icon: "📊",
  },
  {
    title: "Budget Planning",
    description:
      "Create personalized budgets that fit your lifestyle and financial goals.",
    icon: "💰",
  },
  {
    title: "Financial Insights",
    description:
      "Get actionable insights about your spending habits and saving opportunities.",
    icon: "📈",
  },
  {
    title: "Bill Reminders",
    description:
      "Never miss a payment with smart notifications and bill due reminders.",
    icon: "🔔",
  },
  {
    title: "Goal Setting",
    description:
      "Set financial goals and track your progress toward achieving them.",
    icon: "🎯",
  },
  {
    title: "Secure Encryption",
    description:
      "Your financial data is protected with industry-standard encryption technology.",
    icon: "🔒",
  },
];

// Dummy data for screenshots
const screenshots = [
  {
    id: 1,
    url: "/hero-image.png",
    alt: "Home Page",
  },
  {
    id: 2,
    url: "/add-transaction.png",
    alt: "OCR Camera",
  },
  {
    id: 3,
    url: "/img-splash.png",
    alt: "Splash Screen",
  },
  {
    id: 4,
    url: "/img-analytics.png",
    alt: "Analytics Page",
  },
  {
    id: 5,
    url: "/img-result.png",
    alt: "Transaction Result Page",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle navigation menu on mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  // Close mobile menu when resizing to desktop
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
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-500">
                Seimbangin
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-4">
                <a
                  href="#home"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500"
                >
                  About
                </a>
                <a
                  href="#features"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500"
                >
                  Features
                </a>
                <a
                  href="#screenshots"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500"
                >
                  Screenshots
                </a>
                <a
                  href="#contact"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Download Button */}
            <div className="hidden md:flex items-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                Download
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              <a
                href="#home"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500"
              >
                About
              </a>
              <a
                href="#features"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500"
              >
                Features
              </a>
              <a
                href="#screenshots"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500"
              >
                Screenshots
              </a>
              <a
                href="#contact"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-500"
              >
                Contact
              </a>
              <button className="mt-1 w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium">
                Download
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-48 pb-40 md:pt-52 md:pb-44 bg-gradient-to-b from-white via-blue-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-14 md:mb-0">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Smart Money, <br />
                <span className="text-blue-500">Balanced Journey</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Take control of your finances with simple tracking, smart
                budgeting, and actionable insights to reach your financial
                goals.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium transition-colors duration-300">
                  Try Now
                </button>
                <button className="border border-gray-300 hover:border-blue-500 hover:text-blue-500 px-6 py-3 rounded-md text-base font-medium transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
              <img
                src="/hero-image.png"
                alt="Seimbangin App"
                className="w-full max-w-[36rem] object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              About Seimbangin
            </h2>
            <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="/seimbangin-mascot.png"
                  alt="About Seimbangin"
                  className="rounded-3xl w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-blue-600 border border-blue-100">
                  Your AI Finance Assistant
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Financial Companion
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                <strong className="text-blue-500">Seimbang.in</strong> is a
                smart money management app designed to help Indonesians manage
                their finances effortlessly using AI-powered insights and
                real-time tracking.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From scanning receipts using OCR, to delivering personalized
                budgeting tips, Seimbang.in helps build strong financial habits
                and empowers users to take control of their money — one
                transaction at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-white via-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Features</h2>
            <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the powerful tools that make Seimbangin the perfect
              financial companion for your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Optional gradient line for flair */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section
        id="screenshots"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              App Screenshots
            </h2>
            <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
              Take a look at Seimbangin's intuitive interface and powerful
              features.
            </p>
          </div>

          <div className="relative">
            {/* Screenshots Slider */}
            <div className="relative h-[30rem] overflow-hidden rounded-3xl shadow-xl bg-gray-900/5 backdrop-blur-md">
              {screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.id}
                  className={`absolute inset-0 transition-all duration-700 flex justify-center items-center ${
                    index === currentSlide
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                >
                  <img
                    src={screenshot.url}
                    alt={screenshot.alt}
                    className="h-full object-contain rounded-2xl"
                  />
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all duration-300"
            >
              <ChevronLeft size={28} className="text-blue-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-all duration-300"
            >
              <ChevronRight size={28} className="text-blue-600" />
            </button>

            {/* Slider Indicators */}
            <div className="absolute bottom-5 left-0 right-0">
              <div className="flex justify-center space-x-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-blue-500 shadow-md shadow-blue-400"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-b from-white via-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
            <div className="mt-2 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-10 items-start justify-center">
            {/* Contact Form */}
            <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-xl">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                    placeholder="Type your message..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Illustration Substitute */}
            <div className="w-full md:w-1/2 mt-12 md:mt-0">
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl shadow-md h-full flex flex-col justify-center text-center md:text-left">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Let's Talk!
                </h3>
                <p className="text-gray-600 mb-4">
                  Whether you're curious about features, a free trial, or even
                  press—we're ready to answer any and all questions.
                </p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Email us directly at:</p>
                  <p className="text-blue-600 font-medium">
                    support@seimbangin.app
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Follow us on:</p>
                  <div className="flex justify-center md:justify-start space-x-4 mt-2">
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1120] text-gray-300 py-16 mt-24 rounded-t-3xl shadow-inner">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Brand Info */}
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-white mb-4">Seimbangin</h3>
              <p className="text-gray-400">
                Smart money management for a balanced financial journey. Track,
                plan, and thrive with confidence.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Company
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#about" className="hover:text-blue-400 transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Support
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Connect
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-blue-400 transition"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">
              © {new Date().getFullYear()} Seimbangin. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["Facebook", "Instagram", "Twitter"].map((platform, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                  aria-label={platform}
                >
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
