import Header from "../components/Header";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Beneficiaries from "./Beneficiaries.jsx";
import Donates from "./Donates.jsx";

const HomePage = () => {
    return (
        <div className="bg-white">
            <Header />
            <Hero />
            <Card />
            <Product />
            <Donates />
            <Beneficiaries />
            <Footer />
        </div>
    );
};

export default HomePage;
