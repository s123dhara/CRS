const TestimonialCard = ({ name, feedback }) => (
    <div className="p-6 bg-white shadow-md rounded-md">
        <p className="text-gray-600 italic">"{feedback}"</p>
        <h4 className="text-blue-600 font-semibold mt-4">- {name}</h4>
    </div>
);

const Testimonials = () => {
    const testimonials = [
        { name: "Rahul S.", feedback: "This platform helped me land my dream job!" },
        { name: "Priya M.", feedback: "A game-changer for campus placements!" }
    ];

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">What Students Say</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((test, index) => (
                        <TestimonialCard key={index} {...test} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
