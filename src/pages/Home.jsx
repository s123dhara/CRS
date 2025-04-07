import React from 'react'

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import JobCategories from "../components/JobCategories";
import HowItWorks from "../components/HowItWorks";
import Recruiters from "../components/Recruiters";

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