
export default function TopSelling() {


    return (
        <div className="rounded-xl shadow-sm bg-[#f8f9fb]">

            {/* Header section */}
            <div className="sm:container text-center header py-12 mt-6" >
                <h2 className="text-2xl font-bold capitalize">Explorer Our Most Popular Fragrances Collections</h2>
                <p className="text-gray-500">
                    Here's what our customers can't get enough of
                </p>
            </div>


            {/* Featured Products section */}
            <section className="container mx-auto px-4 md:px-6 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <a href={`${window.location.origin}/collections/luxury`}>
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
                </a>

                <a href={`${window.location.origin}/collections/warm`}>
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
                </a>

                <a href={`${window.location.origin}/collections/florals`}>
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
                </a>

                <a href={`${window.location.origin}/collections/fresh`}>
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
                </a>

                <a href={`${window.location.origin}/collections/unisex`}>
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
                </a>

                <a href={`${window.location.origin}/collections/limited`}>
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
                </a>

            </section>

        </div>
    );
}