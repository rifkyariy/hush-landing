"use client";

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Heart, Bell, Moon, Activity, ShieldCheck, Cpu } from 'lucide-react';

// Custom hook to check if an element is in the viewport
function useInView(options) {
  const ref = useRef(null);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [approachRef, approachInView] = useInView({ threshold: 0.1 });
  const [numbersRef, numbersInView] = useInView({ threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1 });

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // NOTE: This component assumes the "Inter" font is available, 
  // similar to the reference design. You would typically load this in your main HTML file.
  return (
    <div className="relative font-sans text-gray-800 bg-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Modal for alerts */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center">
            <p className="text-lg font-medium mb-6">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm">
        <nav className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">Hush</span>
          </div>
          <div className="hidden sm:flex items-center space-x-8 text-sm font-medium">
            <a href="#approach" className="text-gray-600 hover:text-green-600 transition-colors">Approach</a>
            <a href="#numbers" className="text-gray-600 hover:text-green-600 transition-colors">By the Numbers</a>
            <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">Testimonials</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        className="relative w-full min-h-screen flex items-center bg-gray-50"
        // style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1fae5' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}
        style={{ backgroundImage: `url("/assets/img/bg-pattern-1.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', fillOpacity: 0.4 }}
      >
        <div className="container mx-auto px-6 text-center z-10 py-32">
           <img
            className="text-center mx-auto mb-4"
            src="/assets/img/hero-emoji-2.png"
            width="600"
            height="100"
            alt={'Hush Logo'}
           />
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-14">
            Peace of mind for parents. <span className="text-emerald-600">Powered by smartcare.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-4 max-w-2xl mx-auto">
            Introducing Hush, the smart baby monitor that gives you real-time insights and alerts, so you can focus on your little one.
          </p>
        </div>
      </section>

      {/* Key Features Section & App Preview */}
     <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div>
                    <h2 className="text-3xl font-bold mb-10 text-gray-900">Key Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                    <Heart className="w-6 h-6"/>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-bold">Real-time Vitals</h3>
                                <p className="text-gray-600 mt-1">Monitor heart rate, oxygen levels, and skin temperature with clinical accuracy, right from your phone.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                    <Bell className="w-6 h-6"/>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-bold">Smart Alerts</h3>
                                <p className="text-gray-600 mt-1">Receive instant notifications for any changes, so you can respond quickly and have total peace of mind.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                    <Moon className="w-6 h-6"/>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-bold">Sleep Tracking</h3>
                                <p className="text-gray-600 mt-1">Understand sleep patterns, duration, and quality to help build healthy sleep habits from day one.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                    <Activity className="w-6 h-6"/>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-bold">AI Cry Analysis</h3>
                                <p className="text-gray-600 mt-1">Our smart algorithm helps you understand what your baby’s cries mean, from hunger to discomfort.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start">
                    <h2 className="text-3xl font-bold mb-10 text-gray-900">App Preview</h2>
                    <img 
                        src="/assets/img/example-ui.png" 
                        alt="App Screenshot 1" 
                        width="2000" 
                        height="1000" 
                        className="rounded-3xl shadow-2xl max-w-lg border border-gray-200"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* A Detailed Approach Section */}
      <section 
        id="approach"
        ref={approachRef}
        className={`w-full bg-white py-24 md:py-32 transition-all duration-1000 transform relative ${
          approachInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8 w-full relative">
          <img
            src="/assets/img/how-its-works.png"
            width="2200"
            height="600"
            alt={'How it works diagram'} 
            className="w-full h-auto max-w-6xl mx-auto"
            />
          <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How Hush Works
              <br />
              from sensors to sweet dreams
            </h2>
            <p className="text-xl text-emerald-600">Simple way to keep your newborn safe and comfy everyday.</p>
          </div>
        </div>
      </section>

       {/* Technology Section */}
      <section 
        id="numbers"
        ref={numbersRef}
        className={`w-full bg-gray-50 py-24 md:py-32 transition-all duration-1000 transform ${
          numbersInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
            <div className="text-left mb-16">
                 <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Help make parenting feel easier.</h2>
                 <p className="text-lg text-gray-600 mt-4 max-w-3xl">We build smart, reliable technology so you can have more peace of mind.</p>
            </div>
            
            {/* Hero Block */}
            <div className="bg-white rounded-2xl border border-gray-200 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                    <div className="p-8 lg:p-12">
                        <Sparkles className="w-10 h-10 text-emerald-500 mb-4" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Engineered for calm days and quiet nights.</h3>
                        <p className="text-gray-600">Hush integrates our most advanced sensors, AI, and security features into a simple, reliable monitor. It's smart technology designed to fade into the background, so you can be more present.</p>
                    </div>
                    <div className="p-8 lg:p-12">
                      <img src="/assets/img/product-preview.png" alt="A sleek baby monitor on a clean surface" className="w-full h-auto rounded-lg"/>
                    </div>
                </div>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200">
                <Zap className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Power-Efficient Design</h3>
                <p className="text-gray-600">Days of monitoring on a single charge means less worrying about battery life and more focusing on your baby.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200">
                <Cpu className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smarter with On-Device AI</h3>
                <p className="text-gray-600">Instant, private analysis of sounds and patterns without needing the cloud. Faster alerts, better privacy.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200">
                <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Unbreakable Security</h3>
                <p className="text-gray-600">Using a secure, independent network and end-to-end encryption, your family's data stays private. Period.</p>
              </div>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials"
        ref={testimonialsRef}
        className={`bg-white py-24 md:py-32 transition-all duration-1000 transform ${
          testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">What Parents Are Saying.</h2>
          <div className="space-y-12">
            <div className="border-l-4 border-green-500 pl-8">
              <p className="text-xl md:text-2xl font-light text-gray-700 mb-4">
                "Hush has been a game-changer. I finally feel confident and relaxed, knowing I'll be alerted to what my baby needs. It truly gives me peace of mind."
              </p>
              <p className="text-base font-semibold text-gray-800">- Sarah P., First-Time Parent</p>
            </div>
            <div className="border-l-4 border-green-500 pl-8">
              <p className="text-xl md:text-2xl font-light text-gray-700 mb-4">
                "The crying analysis is spot on. It's helped me understand my newborn's different cries and respond much faster. This is an essential for any new family."
              </p>
              <p className="text-base font-semibold text-gray-800">- David T., Father of Two</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-gray-50 text-gray-600">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-lg font-bold text-gray-900 mb-6">Hush</p>
          <div className="flex justify-center space-x-6 text-sm mb-8">
            <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-600 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-green-600 transition-colors">Contact Us</a>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Hush. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

