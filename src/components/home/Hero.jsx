import Button from "../ui/Button";

const Hero = () => {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Launch Your Career with Top Employers</h1>
                        <p className="text-xl mb-8">Connect with leading companies looking for talented students like you. Your next opportunity starts here.</p>
                        <div className="flex space-x-4">
                            <Button variant="outline" className="bg-white text-blue-700 hover:bg-gray-100 cursor-pointer">Find Jobs</Button>
                            <Button variant="outline" className="border-white text-white hover:bg-blue-700 cursor-pointer">For Employers</Button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="bg-white rounded-lg p-4 shadow-lg w-full md:w-4/5">
                            <img src="https://placehold.co/600x400.png" alt="Campus recruitment" className="rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;