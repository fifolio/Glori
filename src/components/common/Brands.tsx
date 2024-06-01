interface Brands {
    title?: string
}

export default function Brands({ title }: Brands) {

    return (
        <div className="rounded-xl">

            {/* Header section */}
            <div className="sm:container text-center header py-6 mt-3 sm:px-auto px-3" >
                <h2 className="text-2xl font-bold">
                    {title ? (<span className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900text-center mb-8">
                        Our Partners
                    </span>) : 'Luxury Brands We Love'}
                </h2>
                <p className={`${title ? 'hidden' : ''} "text-gray-500"`}>
                    Experience the finest perfumes from the world's most prestigious brands, curated just for you.
                </p>
            </div>

            {/* Brands section */}
            <div className="flex flex-wrap items-center justify-center pb-6">

                <div className="sm:w-[280px] w-[85%] sm:mb-1 mb-3 brand-card">

                    {/* Brand Details */}
                    <div className="brand my-1">

                        <img src="/images/brands/1.png" className="w-34" />

                    </div>

                </div>

                <div className="sm:w-[280px] w-[85%] sm:mb-1 mb-2 brand-card">

                    {/* Brand Details */}
                    <div className="brand my-1">

                        <img src="/images/brands/2.png" className="w-34" />

                    </div>

                </div>

                <div className="sm:w-[280px] w-[85%] sm:mb-1 mb-2 brand-card">

                    {/* Brand Details */}
                    <div className="brand my-1">

                        <img src="/images/brands/3.png" className="w-34" />

                    </div>

                </div>

                <div className="sm:w-[280px] w-[85%] sm:mb-1 mb-2 brand-card">

                    {/* Brand Details */}
                    <div className="brand my-1">

                        <img src="/images/brands/4.png" className="w-34" />

                    </div>

                </div>

                <div className="sm:w-[280px] w-[85%] sm:mb-1 mb-2 brand-card">

                    {/* Brand Details */}
                    <div className="brand my-1">

                        <img src="/images/brands/7.png" className="w-34" />

                    </div>

                </div>

                <div className="sm:w-[280px] w-[85%] sm:mb-1 mb-2 brand-card">

                    {/* Brand Details */}
                    <div className="brand my-1">

                        <img src="/images/brands/6.png" className="w-34" />

                    </div>

                </div>

                <div className="sm:w-[280px] w-[85%] sm:mb-1 mb-2 brand-card">

                    {/* Brand Details */}
                    <div className="brand my-1">

                        <img src="/images/brands/5.png" className="w-34" />

                    </div>

                </div>

                <div className="sm:w-[280px] w-[85%] sm:mb-1 mb-2 brand-card">

                    {/* Brand Details */}
                    <div className="brand my-1">

                        <img src="/images/brands/8.png" className="w-34" />

                    </div>

                </div>

            </div>

        </div>
    )
}
