import React from 'react'

import Navbar from "../components/public/Home/Navbar";
import Hero from "../components/public/Home/Hero";
import Features from "../components/public/Home/Features";
import Testimonials from "../components/public/Home/Testimonials";
import Footer from "../components/public/Home/Footer";
import JobCategories from "../components/public/Home/JobCategories";
import HowItWorks from "../components/public/Home/HowItWorks";
import Recruiters from "../components/public/Home/Recruiters";

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