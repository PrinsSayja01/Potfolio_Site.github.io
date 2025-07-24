import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Method 1: Using Formspree (Recommended)
      const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New contact form submission from ${formData.name}`,
        }),
      });

      if (formspreeResponse.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Fallback: Create mailto link with form data
      const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:contactprinssayja@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactItems = [
    {
      icon: Mail,
      color: 'bg-purple-600',
      title: 'Email',
      value: 'contactprinssayja@gmail.com',
      href: 'mailto:contactprinssayja@gmail.com?subject=Hello%20Prins&body=Hi%20Prins,%0A%0AI%20would%20like%20to%20connect%20with%20you%20regarding...',
      action: 'Send Email'
    },
    {
      icon: Phone,
      color: 'bg-green-600',
      title: 'Phone',
      value: '+49 17658692439',
      href: 'tel:+4917658692439',
      action: 'Call Now'
    },
    {
      icon: Linkedin,
      color: 'bg-blue-600',
      title: 'LinkedIn',
      value: 'connect-with-prins-sayja',
      href: 'https://www.linkedin.com/in/connect-with-prins-sayja/',
      action: 'Connect on LinkedIn'
    },
    {
      icon: Github,
      color: 'bg-gray-600',
      title: 'GitHub',
      value: 'prinssayja01',
      href: 'https://github.com/prinssayja01',
      action: 'View GitHub Profile'
    },
    {
      icon: MapPin,
      color: 'bg-indigo-600',
      title: 'Location',
      value: '🇩🇪 Erlangen, Germany',
      href: 'https://maps.google.com?q=Erlangen,Germany',
      action: 'View on Map'
    }
  ];

  return (
    <section id="contact" className={`py-12 sm:py-16 md:py-20 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              📞 Get In Touch
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Let's collaborate on your next AI project or discuss opportunities in data science and machine learning
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
              <div>
                <h3 className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  🤝 Let's Connect
                </h3>
                <p className={`mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  I'm always excited to discuss new AI projects, research opportunities, 
                  or potential collaborations. Whether you're looking to implement machine 
                  learning solutions or explore cutting-edge data science technologies, I'd love to hear from you.
                </p>
              </div>

              {/* Interactive Contact Items */}
              <div className="space-y-4 sm:space-y-6">
                {contactItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : '_self'}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-start sm:items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group ${
                        darkMode 
                          ? 'hover:bg-slate-700/50 hover:border-purple-500/30 border border-transparent' 
                          : 'hover:bg-purple-50 hover:border-purple-200 border border-transparent'
                      }`}
                    >
                      <div className={`${item.color} p-2 sm:p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="text-white" size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h4 className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {item.title}
                            </h4>
                            <p className={`text-sm sm:text-base break-all sm:break-normal ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {item.value}
                            </p>
                          </div>
                          <span className={`text-xs sm:text-sm mt-1 sm:mt-0 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            darkMode ? 'text-purple-400' : 'text-purple-600'
                          }`}>
                            {item.action} →
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <a
                  href="mailto:contactprinssayja@gmail.com?subject=Project%20Collaboration&body=Hi%20Prins,%0A%0AI'm%20interested%20in%20collaborating%20on%20a%20project..."
                  className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                    darkMode 
                      ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white' 
                      : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                  <Mail size={18} />
                  <span className="text-sm font-medium">Quick Email</span>
                </a>
                <a
                  href="https://calendly.com/your-calendly-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Schedule Call</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`order-1 lg:order-2 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border ${
              darkMode 
                ? 'bg-slate-900/50 border-purple-500/20' 
                : 'bg-white/70 border-purple-200'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Tell me about your project, collaboration idea, or opportunity..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:-translate-y-1'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={18} />
                      <span>✅ Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>🚀 Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {/* Form Instructions */}
              <div className={`mt-4 p-3 rounded-lg text-xs sm:text-sm ${
                darkMode ? 'bg-slate-800/50 text-gray-400' : 'bg-gray-50 text-gray-600'
              }`}>
                <p>💡 <strong>Pro tip:</strong> Include details about your project timeline, budget, and specific requirements for faster response.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
