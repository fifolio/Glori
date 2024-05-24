export default function HeroProducts() {
    return (
        <div className="relative sm:mx-auto mx-3 pt-[50px] pb-[100px] mt-10 rounded-xl text-white bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('images/pages/luxury.png')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-80 sm:bg-opacity-50 rounded-xl"></div> {/* Optional overlay for better text readability */}

            {/* Header section */}
            <div className="relative container text-center header py-5 mt-6 z-10">
                <h1 className="sm:text-9xl text-6xl my-16 font-bold">Luxury Classics</h1>
                <p className="w-[80%] mx-auto">Step into a realm where time stands still, and elegance reigns supreme. Our collection of Luxury Classics embodies the essence of sophistication and refinement, encapsulating the eternal allure of timeless fragrances. From the enchanting whispers of bygone eras to the majestic symphony of opulent notes, immerse yourself in a journey of unparalleled luxury where each scent tells a tale of grandeur and grace.</p>
            </div>
        </div>
    )
}