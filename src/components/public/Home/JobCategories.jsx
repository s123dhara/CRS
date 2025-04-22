const JobCategories = () => {
    const categories = [
        { title: "Software Development", icon: "💻" },
        { title: "Data Science", icon: "📊" },
        { title: "Marketing", icon: "📢" },
        { title: "Finance", icon: "💰" },
        { title: "Design", icon: "🎨" }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Explore Job Categories</h3>
                <div className="grid md:grid-cols-5 gap-6">
                    {categories.map((job, index) => (
                        <div key={index} className="p-6 bg-gray-100 rounded-md shadow-md">
                            <span className="text-4xl">{job.icon}</span>
                            <h4 className="text-xl font-semibold mt-2">{job.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JobCategories;
