"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Zap,
  Heart,
  Bell,
  Moon,
  Sun,
  Activity,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Custom hook to check if an element is in the viewport
function useInView(
  options: IntersectionObserverInit,
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, inView];
}

// Main App Component for the Hush landing page
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [approachRef, approachInView] = useInView({ threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ threshold: 0.1 });
  const [numbersRef, numbersInView] = useInView({ threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1 });

  // Effect to manage dark mode state and persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Derive background pattern from isDarkMode state for cleaner logic
  const bgPattern = isDarkMode ? 'bg-pattern-dark' : 'bg-pattern-1';

  // NOTE: This component assumes the "Inter" font is available,
  // similar to the reference design. You would typically load this in your main HTML file.
  return (
    <div
      className="font-sans text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-200 antialiased"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Modal for alerts */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-sm w-full text-center">
            <p className="text-lg font-medium mb-6 dark:text-white">
              {modalMessage}
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <nav className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white italic">
              Hush.
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-8 text-sm font-medium">
              <a
                href="#approach"
                onClick={handleNavClick}
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Approach
              </a>
              <a
                href="#team"
                onClick={handleNavClick}
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Our Team
              </a>
              <a
                href="#numbers"
                onClick={handleNavClick}
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Technology
              </a>
              <a
                href="#testimonials"
                onClick={handleNavClick}
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Testimonials
              </a>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef as React.RefObject<HTMLDivElement>}
        className="relative w-full min-h-screen flex items-center bg-gray-50 dark:bg-gray-800"
        style={{
          backgroundImage: `url("/assets/img/${bgPattern}.png")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fillOpacity: 0.4,
        }}
      >
        <div
          className={`container mx-auto px-6 text-center z-10 py-32 transition-all duration-1000 transform ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <img
            className="text-center mx-auto mb-4"
            src="/assets/img/hero-emoji-2.png"
            width="600"
            height="100"
            alt={'Hush Logo'}
          />
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 max-w-4xl mx-auto leading-14">
            Peace of mind for parents.{' '}
            <span className="text-emerald-600 dark:text-emerald-500">
              Powered by smartcare.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
            Introducing Hush, the smart baby monitor that gives you real-time
            insights and alerts, so you can focus on your little one.
          </p>
        </div>
      </section>

      {/* Key Features Section & App Preview */}
      <section className="py-24 md:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold dark:text-white">
                      Real-time Vitals
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Monitor heart rate, oxygen levels, and skin temperature
                      with clinical accuracy, right from your phone.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                      <Bell className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold dark:text-white">
                      Smart Alerts
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Receive instant notifications for any changes, so you can
                      respond quickly and have total peace of mind.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                      <Moon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold dark:text-white">
                      Sleep Tracking
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Understand sleep patterns, duration, and quality to help
                      build healthy sleep habits from day one.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold dark:text-white">
                      AI Cry Analysis
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Our smart algorithm helps you understand what your baby’s
                      cries mean, from hunger to discomfort.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
                App Preview
              </h2>
              <img
                src="/assets/img/example-ui.png"
                alt="App Screenshot 1"
                width="2000"
                height="1000"
                className="rounded-3xl shadow-2xl max-w-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* A Detailed Approach Section */}
      <section
        id="approach"
        ref={approachRef as React.RefObject<HTMLDivElement>}
        className={`w-full bg-white dark:bg-gray-900 py-24 md:py-32 transition-all duration-1000 transform ${approachInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="container mx-auto px-6 lg:px-8 w-full">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              How Hush Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
              A simple, four-step process from sensors to sweet dreams.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Dashed arrows for desktop view - FIXED */}
            <div className="absolute inset-0 hidden md:block pointer-events-none">
              {/* Arrow 1: Top-Left to Top-Right */}
              <img
                src="/assets/img/arrow-right.svg"
                alt="Arrow pointing right, connecting step 1 to 2"
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              {/* Arrow 2: Top-Right to Bottom-Right */}
              <img
                src="/assets/img/arrow-down.svg"
                alt="Arrow pointing down, connecting step 2 to 4"
                className="absolute top-1/2 right-[25%] -translate-y-1/2 translate-x-1/2"
              />
              {/* Arrow 3: Bottom-Right to Bottom-Left */}
              <img
                src="/assets/img/arrow-left.svg"
                alt="Arrow pointing left, connecting step 4 to 3"
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2"
              />
              {/* Arrow 4: Bottom-Left to Top-Left */}
              <img
                src="/assets/img/arrow-up.svg"
                alt="Arrow pointing up, connecting step 3 to 1"
                className="absolute top-1/2 left-[25%] -translate-y-1/2 -translate-x-1/2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center z-10">
                <div className="w-64 h-64 mb-4">
                  <DotLottieReact
                    src="/assets/lottie/hush-how-1.lottie"
                    loop
                    autoplay
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Sensor Gathers Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400 pb-4">
                  A soft, medical-grade sensor collects vitals like heart rate
                  and oxygen levels.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center z-10">
                <div className="w-64 h-64 mb-4">
                  <DotLottieReact
                    src="/assets/lottie/hush-how-2.lottie"
                    loop
                    autoplay
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  AI Analyzes Realtime Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our smart AI analyzes the data streams to detect patterns and
                  changes.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center z-10 order-last md:order-none">
                <div className="w-64 h-64 mb-4">
                  <DotLottieReact
                    src="/assets/lottie/hush-how-4.lottie"
                    loop
                    autoplay
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Pattern and Insight
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand sleep patterns and get insights to build healthy
                  habits.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center z-10">
                <div className="w-64 h-64 mb-4">
                  <DotLottieReact
                    src="/assets/lottie/hush-how-3.lottie"
                    loop
                    autoplay
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Smart Alert and Dashboard
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive instant alerts and view trends on your phone for total
                  peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section
        id="numbers"
        ref={numbersRef as React.RefObject<HTMLDivElement>}
        className={`w-full bg-white dark:bg-gray-900 py-24 md:py-32 transition-all duration-1000 transform ${numbersInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Help make parenting feel easier.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-3xl">
              We build smart, reliable technology so you can have more peace of
              mind.
            </p>
          </div>

          {/* Hero Block */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
              <div className="p-8 lg:p-12">
                <Sparkles className="w-10 h-10 text-emerald-500 dark:text-emerald-400 mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Engineered for calm days and quiet nights.
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Hush integrates our most advanced sensors, AI, and security
                  features into a simple, reliable monitor. It's smart
                  technology designed to fade into the background, so you can be
                  more present.
                </p>
              </div>
              <div className="p-8 lg:p-12">
                <img
                  src="/assets/img/product-preview.png"
                  alt="A sleek baby monitor on a clean surface"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700">
              <Zap className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Power-Efficient Design
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Days of monitoring on a single charge means less worrying about
                battery life and more focusing on your baby.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700">
              <Cpu className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Smarter with On-Device AI
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Instant, private analysis of sounds and patterns without needing
                the cloud. Faster alerts, better privacy.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700">
              <ShieldCheck className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Unbreakable Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Using a secure, independent network and end-to-end encryption,
                your family's data stays private. Period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={testimonialsRef as React.RefObject<HTMLDivElement>}
        className={`bg-white dark:bg-gray-900 py-24 md:py-32 transition-all duration-1000 transform ${testimonialsInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16">
            What Parents Are Saying.
          </h2>
          <div className="space-y-12">
            <div className="border-l-4 border-green-500 dark:border-green-400 pl-8">
              <p className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 mb-4">
                "Hush has been a game-changer. I finally feel confident and
                relaxed, knowing I'll be alerted to what my baby needs. It
                truly gives me peace of mind."
              </p>
              <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                - Sarah P., First-Time Parent
              </p>
            </div>
            <div className="border-l-4 border-green-500 dark:border-green-400 pl-8">
              <p className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 mb-4">
                "The crying analysis is spot on. It's helped me understand my
                newborn's different cries and respond much faster. This is an
                essential for any new family."
              </p>
              <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                - David T., Father of Two
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section
        id="team"
        ref={teamRef as React.RefObject<HTMLDivElement>}
        className={`bg-gray-50 dark:bg-gray-800 py-24 md:py-32 transition-all duration-1000 transform ${teamInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
              The passionate minds behind the technology designed to give you
              peace of mind.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://placehold.co/400x400/1F2937/4ADE80?text=Alex"
                alt="Alex Chen"
                className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Alex Chen
              </h3>
              <p className="text-gray-500 dark:text-gray-400">Lead Engineer</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://placehold.co/400x400/1F2937/4ADE80?text=Brenda"
                alt="Brenda Smith"
                className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Brenda Smith
              </h3>
              <p className="text-gray-500 dark:text-gray-400">Head of Product</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://placehold.co/400x400/1F2937/4ADE80?text=Carlos"
                alt="Carlos Gomez"
                className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Carlos Gomez
              </h3>
              <p className="text-gray-500 dark:text-gray-400">UX/UI Designer</p>
            </div>
            {/* Team Member 4 */}
            <div className="text-center">
              <img
                src="https://placehold.co/400x400/1F2937/4ADE80?text=Diana"
                alt="Diana Miller"
                className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Diana Miller
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Hardware Specialist
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Hush
          </p>
          <div className="flex justify-center space-x-6 text-sm mb-8">
            <a
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Contact Us
            </a>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hush. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}