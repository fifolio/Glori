import { Link } from "react-router-dom";

export default function Browse() {

     // Update the page title
     document.title = `Glori | Perfume Collections`;

   // Scroll top when click on Link
   function scrollTopFunc() {
    window.scrollTo({
        top: -10,
        behavior: 'instant'
    });
}

    return (
        <div className="w-full">

            {/* Header */}
            <div className="relative sm:mx-auto mx-3 pt-[50px] pb-[100px] mt-10 rounded-xl  text-white bg-cover bg-center shadow-lg"
                style={{
                    backgroundImage: `url(https://media.king5.com/assets/KING/images/de6c3b83-166b-41a4-aaab-dcd5cfa37f4d/de6c3b83-166b-41a4-aaab-dcd5cfa37f4d_1920x1080.jpg)`
                }}>
                <div className="absolute inset-0 bg-black bg-opacity-80 sm:bg-opacity-70 rounded-xl"></div> {/* Optional overlay for better text readability */}

                {/* Header section */}
                <div className="relative container text-center header py-5 mt-6 z-10">
                    <h1 className="sm:text-5xl text-5xl my-16 font-bold capitalize">Explore Our Perfume Collections</h1>
                    <p className="w-[60%] mx-auto">Discover our curated selection of perfume collections, each crafted with the finest ingredients and
                        designed to evoke unique olfactory experiences.</p>
                </div>
            </div>

            <section className="container mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <Link to="luxury" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="/images/pages/luxury.png"
                            alt="Luxury Classics"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Luxury Classics</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Timeless fragrances that exude sophistication and elegance.
                            </p>
                        </div>
                    </div>
                </Link>

                <Link to="warm" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="/images/pages/warm.png"
                            alt="Warm & Spicy"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Warm & Spicy</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Captivating scents that evoke cozy, comforting aromas.
                            </p>
                        </div>
                    </div>
                </Link>

                <Link to="florals" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="/images/pages/florals.png"
                            alt="Sensual Florals"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Sensual Florals</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Captivating floral scents that evoke romance and allure.
                            </p>
                        </div>
                    </div>
                </Link>

                <Link to="fresh" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="/images/pages/fresh.png"
                            alt="Fresh & Clean"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Fresh & Clean</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Invigorating scents that capture the essence of purity and cleanliness.
                            </p>
                        </div>
                    </div>
                </Link>

                <Link to="unisex" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="/images/pages/unisex.png"
                            alt="Unisex Delights"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Unisex Delights</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Captivating scents that transcend gender boundaries.
                            </p>
                        </div>
                    </div>
                </Link>

                <Link to="limited" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="/images/pages/limited.png"
                            alt="Limited Editions"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Limited Editions</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Exclusive and rare fragrances that capture the essence of luxury.
                            </p>
                        </div>
                    </div>
                </Link>

            </section>
        </div>
    )
}