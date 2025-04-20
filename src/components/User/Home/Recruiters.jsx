const Recruiters = () => {
    const companies = [
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
        { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg" },
        { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg" },
        { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
    ];

    return (
        <section className="py-16 bg-white text-center">
            <div className="container mx-auto px-6">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Top Recruiters</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {companies.map((company, index) => (
                        <div key={index} className="p-6 bg-gray-100 rounded-md shadow-md flex flex-col items-center">
                            <img src={company.logo} alt={company.name} className="w-20 h-20 mb-3" />
                            <span className="text-lg font-semibold">{company.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recruiters;
