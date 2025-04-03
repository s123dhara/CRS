import Button from "../ui/Button";

const SearchSection = () => {
    return (
        <section className="bg-white py-8 -mt-8">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-grow">
                            <input
                                type="text"
                                placeholder="Job title, keyword, or company"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:w-1/4">
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">All Categories</option>
                                <option value="technology">Technology</option>
                                <option value="business">Business</option>
                                <option value="engineering">Engineering</option>
                                <option value="marketing">Marketing</option>
                            </select>
                        </div>
                        <div>
                            <Button className="w-full md:w-auto py-3">Search Jobs</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchSection;