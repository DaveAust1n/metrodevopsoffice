import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  Menu, X, ChevronDown, ExternalLink, Phone,
  Globe, Smartphone, ShoppingCart, RefreshCw, Wrench, Search,
  Monitor, Palette, Zap, Shield, DollarSign, Code, Headphones,
  Camera, Sparkles, MessageCircle, Instagram, Linkedin,
  Github, ArrowUp, Send, CheckCircle, ArrowRight, Star, Clock,
  Users, Target, Lightbulb, Rocket, TestTube, HelpCircle, Music,
  AlertCircle
} from 'lucide-react';

// Hook for intersection observer animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-dark py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">
              Metro<span className="gradient-text">DEVOPS</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative group text-sm font-medium"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent-blue/20"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg font-medium text-sm text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 right-20 w-20 h-20 glass rounded-2xl flex items-center justify-center animate-float opacity-60 hidden lg:flex">
        <Code className="w-8 h-8 text-accent-blue" />
      </div>
      <div className="absolute bottom-40 left-20 w-16 h-16 glass rounded-xl flex items-center justify-center animate-float-delayed opacity-60 hidden lg:flex">
        <Globe className="w-6 h-6 text-accent-purple" />
      </div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 glass rounded-lg flex items-center justify-center animate-float opacity-50 hidden lg:flex">
        <Smartphone className="w-5 h-5 text-accent-cyan" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">Premium Web Development Agency</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Websites That Don't Just
            <br />
            <span className="gradient-text">Look Good</span>—They
            <br />
            <span>Grow Businesses.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            MetroDEVOPS builds modern websites, business landing pages, portfolios, and web applications that help brands attract customers and stand out online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="#projects"
              className="group px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-accent-blue/30 hover:shadow-accent-purple/30 flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 glass rounded-xl font-semibold text-lg hover:bg-white/10 transition-all border border-white/20 flex items-center gap-2"
            >
              Let's Build Your Website
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 scroll-indicator">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Image/Visual Side */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-3xl rotate-6" />
              <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                <div className="absolute inset-0 p-8">
                  {/* Code-inspired visual */}
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex gap-2">
                      <span className="text-accent-purple">const</span>
                      <span className="text-white">website</span>
                      <span className="text-gray-500">=</span>
                      <span className="text-accent-blue">{"{"}</span>
                    </div>
                    <div className="pl-4 space-y-2">
                      <div>
                        <span className="text-accent-cyan">design</span>
                        <span className="text-gray-500">:</span>
                        <span className="text-green-400"> "modern"</span>
                        <span className="text-gray-500">,</span>
                      </div>
                      <div>
                        <span className="text-accent-cyan">performance</span>
                        <span className="text-gray-500">:</span>
                        <span className="text-green-400"> "fast"</span>
                        <span className="text-gray-500">,</span>
                      </div>
                      <div>
                        <span className="text-accent-cyan">responsive</span>
                        <span className="text-gray-500">:</span>
                        <span className="text-orange-400"> true</span>
                        <span className="text-gray-500">,</span>
                      </div>
                      <div>
                        <span className="text-accent-cyan">seo</span>
                        <span className="text-gray-500">:</span>
                        <span className="text-orange-400"> "optimized"</span>
                      </div>
                    </div>
                    <div className="text-accent-blue">{"}"}</div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent-blue" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Users className="w-4 h-4 text-accent-blue" />
              <span className="text-sm text-gray-300">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              About <span className="gradient-text">MetroDEVOPS</span>
            </h2>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              At MetroDEVOPS, we create clean, modern, and high-performing websites tailored for businesses, creators, startups, and personal brands.
            </p>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Whether you need a business website, portfolio, landing page, or web application, our goal is simple: deliver websites that are fast, responsive, visually appealing, and built to convert visitors into customers.
            </p>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Every project is designed with user experience, performance, and scalability in mind.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass rounded-xl p-4 hover-glow transition-all">
                <div className="text-3xl font-bold gradient-text mb-1">50+</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div className="glass rounded-xl p-4 hover-glow transition-all">
                <div className="text-3xl font-bold gradient-text mb-1">40+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div className="glass rounded-xl p-4 hover-glow transition-all">
                <div className="text-3xl font-bold gradient-text mb-1">3+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="glass rounded-xl p-4 hover-glow transition-all">
                <div className="text-3xl font-bold gradient-text mb-1">100%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function Services() {
  const { ref, inView } = useInView();

  const services = [
    { icon: Globe, title: 'Business Websites', desc: 'Professional websites that establish your brand and drive growth' },
    { icon: Camera, title: 'Portfolio Websites', desc: 'Showcase your work with stunning portfolio designs' },
    { icon: Target, title: 'Landing Pages', desc: 'High-converting landing pages for campaigns and products' },
    { icon: ShoppingCart, title: 'E-commerce Websites', desc: 'Online stores that drive sales and customer engagement' },
    { icon: Code, title: 'Web Application Development', desc: 'Custom web apps tailored to your business needs' },
    { icon: RefreshCw, title: 'Website Redesign', desc: 'Transform outdated sites into modern experiences' },
    { icon: Wrench, title: 'Website Maintenance', desc: 'Keep your website secure, updated, and optimized' },
    { icon: Search, title: 'Performance & SEO', desc: 'Boost visibility and speed for better rankings' },
    { icon: Monitor, title: 'Responsive Design', desc: 'Beautiful experiences on every device and screen' },
    { icon: Palette, title: 'UI/UX Implementation', desc: 'Pixel-perfect designs that engage and convert' },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 relative bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Wrench className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">What We Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From concept to launch, we provide comprehensive web development services to bring your vision to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`glass gradient-border rounded-2xl p-6 hover-glow card-3d transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-accent-blue" />
              </div>
              <h3 className="font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function Projects() {
  const { ref, inView } = useInView();

  const projects = [
    {
      title: 'RickyLens Photography',
      desc: 'A modern photography portfolio designed to showcase professional photography with elegant galleries and a premium user experience.',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: 'https://rickylens.lovable.app',
      tags: ['React', 'Portfolio', 'Photography'],
    },
    {
      title: 'Sergio Vault',
      desc: 'A modern cryptocurrency platform interface with a sleek dashboard, responsive layouts, and fintech-inspired design.',
      image: 'https://images.pexels.com/photos/8370753/pexels-photo-8370753.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: 'https://sergio-vault-pro.lovable.app',
      tags: ['React', 'Crypto', 'Dashboard'],
    },
    {
      title: 'BeautyDaves Cosmetics',
      desc: 'A stylish beauty and cosmetics website featuring product showcases, elegant branding, and a user-friendly shopping experience.',
      image: 'https://images.pexels.com/photos/1596425/pexels-photo-1596425.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: 'https://beautydaves.lovable.app',
      tags: ['React', 'E-commerce', 'Beauty'],
    },
  ];

  return (
    <section id="projects" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Star className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">Our Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore some of our recent projects that showcase our expertise in modern web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group glass rounded-2xl overflow-hidden hover-glow transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-purple transition-colors font-medium text-sm group/link"
                >
                  Visit Live Site
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-y-[-2px] transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUs() {
  const { ref, inView } = useInView();

  const features = [
    { icon: Palette, title: 'Modern UI/UX', desc: 'Beautiful, intuitive designs that captivate users' },
    { icon: Smartphone, title: 'Mobile Responsive', desc: 'Perfect on every device and screen size' },
    { icon: Zap, title: 'Fast Performance', desc: 'Optimized for speed and smooth experience' },
    { icon: Search, title: 'SEO Ready', desc: 'Built to rank and be found online' },
    { icon: Shield, title: 'Secure Development', desc: 'Security-first approach in every project' },
    { icon: DollarSign, title: 'Affordable Solutions', desc: 'Quality services at competitive prices' },
    { icon: Code, title: 'Clean Code', desc: 'Maintainable, scalable, and well-documented' },
    { icon: Headphones, title: 'Ongoing Support', desc: 'Dedicated support and maintenance' },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-32 relative bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">Why Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Why Choose <span className="gradient-text">MetroDEVOPS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're committed to delivering excellence in every project we undertake.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center p-6 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform shadow-lg shadow-accent-blue/20">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function Process() {
  const { ref, inView } = useInView();

  const steps = [
    { icon: Lightbulb, title: 'Discovery', desc: 'Understanding your goals, audience, and requirements' },
    { icon: Target, title: 'Planning', desc: 'Creating a strategic roadmap for your project' },
    { icon: Palette, title: 'Design', desc: 'Crafting beautiful mockups and user interfaces' },
    { icon: Code, title: 'Development', desc: 'Building your website with modern technologies' },
    { icon: TestTube, title: 'Testing', desc: 'Rigorous testing for quality and performance' },
    { icon: Rocket, title: 'Launch', desc: 'Deploying your website to the world' },
    { icon: HelpCircle, title: 'Support', desc: 'Ongoing maintenance and support' },
  ];

  return (
    <section id="process" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Clock className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">Our Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Development <span className="gradient-text">Process</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our streamlined process ensures your project is delivered on time and exceeds expectations.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-accent-blue" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex flex-col lg:flex-row items-center gap-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Left Content (even) */}
                {index % 2 === 0 && <div className="lg:w-1/2 lg:pr-12 lg:text-right order-2 lg:order-1">
                  <div className="glass rounded-2xl p-6 hover-glow">
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </div>}

                {/* Center Icon */}
                <div className="relative z-10 order-1 lg:order-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/30">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 glass rounded-full text-xs font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Right Content (odd) */}
                {index % 2 !== 0 && <div className="lg:w-1/2 lg:pl-12 order-2 lg:order-3">
                  <div className="glass rounded-2xl p-6 hover-glow">
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </div>}

                {/* Mobile Content */}
                <div className="lg:hidden glass rounded-2xl p-6 w-full">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const { ref, inView } = useInView();

  const testimonials = [
    {
      name: 'Richard Okafor',
      initials: 'RO',
      role: 'Founder',
      company: 'RickyLens Photography',
      content: 'Working with MetroDEVOPS completely changed how people see my brand online. The website is clean, fast, and showcases my photography beautifully. I\'ve received several enquiries from people who first discovered my work through the website. The process was smooth from start to finish, and I\'d gladly recommend MetroDEVOPS to anyone looking for a professional website.',
    },
    {
      name: 'Samuel Adeyemi',
      initials: 'SA',
      role: 'Founder & CEO',
      company: 'Sergio Vault',
      content: 'MetroDEVOPS delivered a modern and professional platform that matched the vision I had for Sergio Vault. Communication was excellent, attention to detail was impressive, and every feature worked exactly as expected. The final result exceeded my expectations, and I look forward to working together again.',
    },
    {
      name: 'David Eze',
      initials: 'DE',
      role: 'Owner',
      company: 'BeautyDaves Cosmetics',
      content: 'I wanted a website that would make my cosmetics brand look trustworthy and premium, and MetroDEVOPS delivered exactly that. The design is elegant, responsive, and easy for customers to navigate. Since launching the website, my business has gained a stronger online presence and more customer enquiries.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 relative bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className={`glass rounded-2xl p-8 hover-glow transition-all duration-500 group hover:scale-[1.02] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic leading-relaxed">"{item.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform shadow-lg shadow-accent-blue/20">
                  {item.initials}
                </div>
                <div>
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.role}, {item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Technologies Section
function Technologies() {
  const { ref, inView } = useInView();

  const techs = [
    { name: 'HTML5', icon: '📄', color: 'from-orange-500 to-orange-600' },
    { name: 'CSS3', icon: '🎨', color: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-yellow-500' },
    { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-cyan-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-green-600' },
    { name: 'WordPress', icon: '📝', color: 'from-blue-600 to-blue-700' },
    { name: 'Git', icon: '🔀', color: 'from-orange-500 to-red-500' },
    { name: 'GitHub', icon: '🐙', color: 'from-gray-600 to-gray-700' },
  ];

  return (
    <section id="technologies" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Code className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Technologies <span className="gradient-text">We Use</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We leverage modern tools and technologies to build fast, secure, and scalable web solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {techs.map((tech, index) => (
            <div
              key={tech.name}
              className={`glass rounded-2xl p-6 text-center hover-glow transition-all duration-500 group cursor-pointer ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tech.icon}</div>
              <div className="text-sm font-medium text-gray-300">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  const { ref, inView } = useInView();
  const [formState, setFormState] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    } else if (formState.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formState.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formState.projectType) {
      errors.projectType = 'Please select a project type';
    }

    if (!formState.message.trim()) {
      errors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('business_name', formState.businessName || 'Not provided');
      formData.append('email', formState.email);
      formData.append('phone', formState.phone);
      formData.append('project_type', formState.projectType);
      formData.append('message', formState.message);
      formData.append('_subject', `New Project Inquiry from ${formState.name}${formState.businessName ? ` (${formState.businessName})` : ''}`);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/ajax/igweonyiachisom1@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();

      if (result.success === 'false' || result.success === false) {
        throw new Error(result.message || 'Failed to send message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      setSubmitError('Something went wrong while sending your message. Please try again or contact us directly via WhatsApp.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormState({ ...formState, [field]: value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: '' });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleTryAgain = () => {
    setSubmitError(null);
    setIsSubmitted(false);
  };

  const contactInfo = [
    { icon: Phone, label: 'WhatsApp', value: '09163197774', href: 'https://wa.me/2349163197774' },
    { icon: Instagram, label: 'Instagram', value: '@m6tr_0', href: 'https://instagram.com/m6tr_0' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Igweonyia Chisom', href: '#' },
    { icon: Music, label: 'TikTok', value: '@metrothedeveloper', href: 'https://tiktok.com/@metrothedeveloper' },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Send className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's turn your idea into a professional website that works for your business.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8 lg:p-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Thanks for reaching out!</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">Your message has been sent successfully. I'll get back to you soon.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Send Another Message
                </button>
              </div>
            ) : submitError ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{submitError}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleTryAgain}
                    className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Try Again
                  </button>
                  <a
                    href="https://wa.me/2349163197774"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 glass border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    Contact via WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-500 focus:border-accent-blue transition-colors ${formErrors.name ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
                    <input
                      type="text"
                      value={formState.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-accent-blue transition-colors"
                      placeholder="Acme Inc. (optional)"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-500 focus:border-accent-blue transition-colors ${formErrors.email ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-500 focus:border-accent-blue transition-colors ${formErrors.phone ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="+234 xxx xxx xxxx"
                    />
                    {formErrors.phone && <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type *</label>
                  <select
                    required
                    value={formState.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-xl text-white focus:border-accent-blue transition-colors ${formErrors.projectType ? 'border-red-500' : 'border-white/10'}`}
                  >
                    <option value="">Select a project type</option>
                    <option value="Business Website">Business Website</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Portfolio Website">Portfolio Website</option>
                    <option value="E-commerce Website">E-commerce Website</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Website Redesign">Website Redesign</option>
                    <option value="Not Sure Yet">Not Sure Yet</option>
                  </select>
                  {formErrors.projectType && <p className="mt-1 text-sm text-red-400">{formErrors.projectType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tell me about your project *</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-500 focus:border-accent-blue transition-colors resize-none ${formErrors.message ? 'border-red-500' : 'border-white/10'}`}
                    placeholder="Tell us about your project..."
                  />
                  {formErrors.message && <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-accent-blue/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                      <div className="text-white font-medium group-hover:text-accent-blue transition-colors">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                {[Instagram, Linkedin, Github, Music].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center hover:bg-gradient-to-br hover:from-accent-blue hover:to-accent-purple transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Response</h3>
              <p className="text-gray-400 text-sm">
                We typically respond within 24 hours. For urgent inquiries, reach out via WhatsApp for faster assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const quickLinks = ['Home', 'About', 'Services', 'Projects', 'Contact'];

  return (
    <footer className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Metro<span className="gradient-text">DEVOPS</span>
              </span>
            </a>
            <p className="text-gray-400 mb-6 max-w-md">
              Building Digital Experiences That Matter. We create modern, high-performing websites that help businesses succeed online.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Github, Music].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center hover:bg-gradient-to-br hover:from-accent-blue hover:to-accent-purple transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {['Business Websites', 'Portfolio Sites', 'E-commerce', 'Web Apps'].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MetroDEVOPS. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Built with passion for the web
          </p>
        </div>
      </div>
    </footer>
  );
}

// Scroll to Top Button
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/30 hover:scale-110 transition-transform"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-dark-900 flex flex-col items-center justify-center">
      <div className="mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center animate-pulse">
          <Code className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="w-48 h-1 bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="mt-4 text-gray-400 text-sm">Loading amazing content...</p>
    </div>
  );
}

// Main App
function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Projects />
            <WhyChooseUs />
            <Process />
            <Testimonials />
            <Technologies />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;
