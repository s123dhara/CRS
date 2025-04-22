const HowItWorks = () => {
    const steps = [
        { step: "Create Profile", desc: "Sign up and build your resume.", icon: "📝" },
        { step: "Apply for Jobs", desc: "Choose jobs that match your skills.", icon: "📩" },
        { step: "Give Assessment", desc: "Take skill-based tests to improve your chances.", icon: "📝" },
        { step: "Interview & Get Hired", desc: "Schedule interviews and get your dream job.", icon: "🎉" }
    ];

    return (
        <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h3>
                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="p-6 bg-white rounded-md shadow-md">
                            <span className="text-4xl">{step.icon}</span>
                            <h4 className="text-xl font-semibold mt-2">{step.step}</h4>
                            <p className="text-gray-600 mt-2">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
