import { useState, FormEvent } from 'react';
import Swal from 'sweetalert2';

const CampusFeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comments: '',
        pre_placement: '',
        communication: '',
        interview: '',
        satisfaction: ''
    });

    const ratingFields = [
        { id: 'pre_placement', label: 'Pre-Placement Talk' },
        { id: 'communication', label: 'Registration & Communication' },
        { id: 'interview', label: 'Interview Process' },
        { id: 'satisfaction', label: 'Overall Experience' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingChange = (fieldId, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error = '';

        if (!formData.name.trim()) {
            error = 'Please enter your name.';
        } else if (!emailRegex.test(formData.email)) {
            error = 'Please enter a valid email address.';
        } else {
            for (const field of ratingFields) {
                if (!formData[field.id]) {
                    error = `Please rate: ${field.label}`;
                    break;
                }
            }
        }

        if (error) {
            Swal.fire({ icon: 'error', title: 'Oops!', text: error, confirmButtonColor: '#e3342f' });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Thank You!',
                text: 'Your feedback has been submitted.',
                confirmButtonColor: '#4f46e5'
            });
            // Reset form
            setFormData({
                name: '',
                email: '',
                comments: '',
                pre_placement: '',
                communication: '',
                interview: '',
                satisfaction: ''
            });
        }
    };

    return (
        <div className="bg-gradient-to-br from-violet-100 to-blue-100 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full border border-purple-100">
                <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-6 animate-pulse">
                    ✨ Campus Recruitment Feedback ✨
                </h1>
                <p className="text-center text-gray-500 mb-10 text-lg">
                    We value your thoughts and would love to hear your experience.
                </p>

                <form id="feedbackForm" className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-purple-600">
                            Rate the following (1 = Poor, 5 = Excellent)
                        </h2>

                        <div id="rating-section">
                            {ratingFields.map((field) => (
                                <div key={field.id} className="mb-6">
                                    <p className="font-medium text-gray-800 mb-2">
                                        {field.label} *
                                    </p>
                                    <div className="flex gap-3">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <label key={rating} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={field.id}
                                                    value={rating}
                                                    checked={formData[field.id] === rating.toString()}
                                                    onChange={() => handleRatingChange(field.id, rating.toString())}
                                                    className="hidden"
                                                />
                                                <span
                                                    className={`inline-block px-4 py-2 rounded-full font-semibold transition ${formData[field.id] === rating.toString()
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-gray-200 hover:bg-indigo-200 text-indigo-800'
                                                        }`}
                                                >
                                                    {rating}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Comments
                        </label>
                        <textarea
                            name="comments"
                            rows={4}
                            value={formData.comments}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-300"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-10 py-3 rounded-full text-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
                        >
                            Submit Feedback 🚀
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CampusFeedbackForm;