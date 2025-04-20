const FAQ = () => {
    const faqs = [
        { question: "Is CampusRecruit free?", answer: "Yes, students can use it for free." },
        { question: "How do I apply for jobs?", answer: "Simply create a profile and apply." },
        { question: "Are companies verified?", answer: "Yes, all recruiters are verified." }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-6 shadow-md rounded-md">
                            <h4 className="font-semibold">{faq.question}</h4>
                            <p className="text-gray-600 mt-2">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FAQ;
