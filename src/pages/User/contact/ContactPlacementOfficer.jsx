import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactPlacementOfficer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        subject: false,
        message: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        AOS.init();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear error when typing
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: false
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: !formData.name.trim(),
            email: !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email),
            subject: !formData.subject.trim(),
            message: !formData.message.trim()
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }, 2000);
    };

    return (
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 min-h-screen flex items-center justify-center p-6">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-6 right-6 z-50 flex items-center px-6 py-4 text-sm font-medium text-white bg-green-600 rounded-lg shadow-lg transition transform duration-300 ease-in-out">
                    ✅ Message sent successfully!
                </div>
            )}

            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 glass rounded-3xl p-10 shadow-2xl text-white form-container" data-aos="fade-up">
                {/* Info Section */}
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold">Placement Officer</h1>
                    <p className="text-purple-100 text-lg">Reach out for campus placement, internship opportunities, or collaboration inquiries.</p>
                    <div className="space-y-3">
                        <p>👤 Mr. Arjun Verma</p>
                        <p>📧 placement@college.edu</p>
                        <p>📞 +91 98765 43210</p>
                        <p>📍 Room 102, T&P Cell</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-lg" data-aos="fade-left">
                    <h2 className="text-2xl font-semibold mb-6 text-purple-800">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* Full Name */}
                        <div className="floating-label">
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder=" "
                                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition`}
                            />
                            <label htmlFor="name">Full Name</label>
                            {errors.name && <p className="text-red-500 text-sm">Please enter your full name.</p>}
                        </div>

                        {/* Email */}
                        <div className="floating-label">
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder=" "
                                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition`}
                            />
                            <label htmlFor="email">Email</label>
                            {errors.email && <p className="text-red-500 text-sm">Please enter a valid email address.</p>}
                        </div>

                        {/* Subject */}
                        <div className="floating-label">
                            <input
                                type="text"
                                id="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                placeholder=" "
                                className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition`}
                            />
                            <label htmlFor="subject">Subject</label>
                            {errors.subject && <p className="text-red-500 text-sm">Please enter a subject.</p>}
                        </div>

                        {/* Message */}
                        <div className="floating-label">
                            <textarea
                                id="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                placeholder=" "
                                className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition`}
                            ></textarea>
                            <label htmlFor="message">Message</label>
                            {errors.message && <p className="text-red-500 text-sm">Please enter a message.</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg submit-btn"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {/* Spinner (Loading state) */}
                        {isSubmitting && (
                            <div className="flex justify-center items-center mt-4">
                                <div className="spinner"></div>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <style jsx>{`
        /* Glassmorphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #fff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Floating label style */
        .floating-label {
          position: relative;
          margin-top: 3rem;
          margin-bottom: 2rem;
        }

        .floating-label input,
        .floating-label textarea {
          padding-top: 1.5rem;
          transition: all 0.3s ease;
        }

        .floating-label input:focus ~ label,
        .floating-label textarea:focus ~ label,
        .floating-label input:not(:placeholder-shown) ~ label,
        .floating-label textarea:not(:placeholder-shown) ~ label {
          top: -1.5rem;
          font-size: 0.875rem;
          color: #6b21a8;
          font-weight: 600;
        }

        .floating-label label {
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          font-size: 1rem;
          transition: all 0.2s ease;
          color: #9ca3af;
        }

        /* Button styles */
        .submit-btn {
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: scale(1.05);
          background-color: #9b4dca;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .submit-btn:focus {
          outline: none;
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .form-container {
            padding: 2rem;
          }
        }
      `}</style>
        </div>
    );
};

export default ContactPlacementOfficer;