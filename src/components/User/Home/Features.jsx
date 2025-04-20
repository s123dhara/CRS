const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-6 shadow-lg rounded-md bg-white text-center">
        <span className="text-4xl">{icon}</span>
        <h4 className="text-xl font-semibold mt-4">{title}</h4>
        <p className="text-gray-600 mt-2">{desc}</p>
    </div>
);

const Features = () => {
    const features = [
        { title: "AI Matching", desc: "Best job recommendations with AI.", icon: "🤖" },
        { title: "One-Click Apply", desc: "Apply to multiple jobs instantly.", icon: "⚡" },
        { title: "Auto Interview Scheduling", desc: "Automated interview slots.", icon: "📅" }
    ];

    return (
        <section id="features" className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
