import React from 'react'

import Navbar from "../compon_2/Navbar";
import Hero from "../compon_2/Hero";
import Features from "../compon_2/Features";
import Testimonials from "../compon_2/Testimonials";
import Footer from "../compon_2/Footer";
import JobCategories from "../compon_2/JobCategories";
import HowItWorks from "../compon_2/HowItWorks";
import Recruiters from "../compon_2/Recruiters";

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