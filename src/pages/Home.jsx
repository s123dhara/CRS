import React from 'react'

import Navbar from "../components/User/Home/Navbar";
import Hero from "../components/User/Home/Hero";
import Features from "../components/User/Home/Features";
import Testimonials from "../components/User/Home/Testimonials";
import Footer from "../components/User/Home/Footer";
import JobCategories from "../components/User/Home/JobCategories";
import HowItWorks from "../components/User/Home/HowItWorks";
import Recruiters from "../components/User/Home/Recruiters";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <JobCategories />
            <HowItWorks />
            <Recruiters />
            <Testimonials />
            <Footer />
        </>
    );
}

export default Home