import { Brands } from "..";
import { Link } from 'react-router-dom'

export default function About() {

    // Update the page title
    document.title = `Glori | About`;

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    return (
        <div className="flex flex-col min-h-[100dvh]">

            {/* Header */}
            <header className="relative bg-[#F5F5F5] mt-10 py-20 md:py-32 lg:py-40 sm:rounded-lg overflow-hidden">
                <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
                    <source src="https://videos.pexels.com/video-files/4154241/4154241-hd_1366_720_50fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Glori</h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto">
                        Elevate your senses with our exquisite collection of luxury perfumes, crafted with the finest ingredients
                        and unparalleled attention to detail.
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5"></div> {/* Optional overlay for better text readability */}
            </header>

            {/* About Glori */}
            <section className="py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-5 mb-4">
                                About Glori
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                Glori is a luxury perfume brand that has been crafting exquisite fragrances for discerning individuals
                                since its inception. Our journey began with a deep passion for the art of perfumery, and a commitment to
                                creating scents that evoke emotion, inspire confidence, and transport the senses.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                At the heart of Glori is a dedication to quality, craftsmanship, and customer satisfaction. We source
                                the finest ingredients from around the world, and our team of expert perfumers meticulously blends each
                                fragrance to ensure a harmonious and captivating experience.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Our mission is to elevate the art of fragrance, and to provide our customers with a truly luxurious and
                                transformative experience. From the moment you discover a Glori fragrance, to the moment you wear it, we
                                strive to create a connection that transcends the senses and leaves a lasting impression.
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <img
                                src="/images/about.jpg"
                                alt="Glori Perfume"
                                className="rounded-lg shadow-lg w-[500px] object-fill"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Glori Difference */}
            <section className="bg-[#F5F5F5] rounded-lg py-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
                        The Glori Difference
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Authenticity Guaranteed</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                At Glori, we are committed to providing our customers with the highest quality, authentic luxury
                                perfumes. Each of our fragrances is meticulously crafted and rigorously tested to ensure the utmost
                                authenticity and purity.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exclusive Offers</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                As a Glori customer, you'll have access to exclusive offers, limited-edition releases, and personalized
                                fragrance recommendations. We believe in rewarding our loyal customers with exceptional value and a
                                truly bespoke experience.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Member Discounts</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Joining the Glori family comes with its own set of benefits. As a member, you'll enjoy exclusive
                                discounts on our entire range of luxury perfumes, ensuring that you can indulge in your favorite scents
                                without breaking the bank.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Our Customers Say */}
            <section className="py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        What Our Customers Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                "Glori's perfumes are truly exceptional. The quality and attention to detail are unparalleled. I've been
                                a loyal customer for years and I can't imagine using any other brand."
                            </p>
                            <div className="flex items-center">
                                <img src="/images/customer1.jpg" alt="Customer 1" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold">Emily Johnson</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Glori Customer</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                "Glori's perfumes are truly transformative. The scents are captivating and long-lasting, and I always
                                receive compliments whenever I wear them. I highly recommend Glori to anyone seeking a luxurious
                                fragrance experience."
                            </p>
                            <div className="flex items-center">
                                <img src="/images/customer2.jpg" alt="Customer 3" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold">Sophia Ramirez</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Glori Customer</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                "I've tried many luxury perfume brands, but Glori stands out for its exceptional quality and unique
                                scent profiles. The customer service is also top-notch, making the entire experience truly special."
                            </p>
                            <div className="flex items-center">
                                <img src="/images/customer3.jpg" alt="Customer 2" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold">Michael Chen</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Glori Customer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Partners */}
            <section className="bg-[#F5F5F5] py-16">
                <Brands title="Our Partners" />
            </section>

            {/* Discover the Glori Difference */}
            <section className="py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 ">
                        Discover the Glori Difference
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-8">
                        Explore our exquisite collection of luxury perfumes or contact us for personalized recommendations.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/" onClick={scrollTopFunc}
                            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/contact" onClick={scrollTopFunc}
                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}