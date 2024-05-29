import { useState, useEffect } from 'react';

interface HeroCollections {
    collectionID: string,
}

export default function HeroCollections({ collectionID }: HeroCollections) {

    // Set the page Title and Description
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    document.title = `Glori | ${title}`;

    useEffect(() => {
        switch (collectionID) {
            case 'luxury':
                setTitle('Luxury Classics');
                setDescription("Step into a realm where time stands still, and elegance reigns supreme. Our collection of Luxury Classics embodies the essence of sophistication and refinement, encapsulating the eternal allure of timeless fragrances. From the enchanting whispers of bygone eras to the majestic symphony of opulent notes, immerse yourself in a journey of unparalleled luxury where each scent tells a tale of grandeur and grace.")
                break;
            case 'fresh':
                setTitle('Fresh & Clean');
                setDescription("Embark on a journey to a pristine oasis, where the crisp breeze of rejuvenation dances through the air. Our Fresh & Clean fragrances evoke the purity of nature's embrace, refreshing the spirit and revitalizing the soul. With every spritz, experience the invigorating sensation of dew-kissed petals and sun-kissed citrus, transporting you to a realm of pure serenity and blissful tranquility.")
                break;
            case 'warm':
                setTitle('Warm & Spicy');
                setDescription("Ignite your senses with the tantalizing allure of our Warm & Spicy collection, where passion meets sophistication in a symphony of seduction. Envelop yourself in the velvety embrace of exotic spices and sensual woods, as each fragrance unfolds like a captivating tale of intrigue and allure. Let the warmth of amber and the intensity of cinnamon awaken your inner fire, leaving an indelible trail of mystique and fascination in your wake.")
                break;
            case 'unisex':
                setTitle('Unisex Delights');
                setDescription("Celebrate the beauty of individuality with our Unisex Delights, where boundaries blur and expressions flourish. Designed for the free-spirited souls who dare to defy convention, these alluring fragrances transcend gender and embrace diversity. From the ethereal whispers of crisp bergamot to the earthy depths of vetiver, discover a harmonious symphony of scents that speaks to the essence of inclusivity and unity.")
                break;
            case 'florals':
                setTitle('Sensual Florals');
                setDescription("Indulge in the intoxicating allure of our Sensual Florals, where romance blooms and passion ignites in a crescendo of floral splendor. Inspired by the timeless beauty of nature's most exquisite blooms, each fragrance is a love letter to the senses, weaving a tapestry of enchantment and desire. Lose yourself in the velvety petals of jasmine, the delicate embrace of rose, and the hypnotic allure of tuberose, as you surrender to the seductive charms of floral fantasy.")
                break;
            case 'limited':
                setTitle('Limited Editions');
                setDescription("Enter a realm of exclusivity and opulence with our Limited Editions, where luxury knows no bounds and rarity is revered. Crafted for the discerning connoisseur who seeks the epitome of refinement, these unique scents are a testament to the artistry of olfactory craftsmanship. From rare and precious ingredients to exquisite packaging that exudes sophistication, each Limited Edition fragrance is a collector's masterpiece, destined to grace only the most elite of vanities.")
                break;
            default:
                setTitle('Explore Our Collections');
                setDescription("")
                break;
        }
    }, [collectionID]);


    return (
        <div className="
        relative 
        sm:mx-auto 
        mx-3 
        pt-[50px] 
        pb-[100px] 
        mt-10 
        rounded-xl 
        text-white 
        bg-cover 
        bg-center 
        shadow-lg"
            style={{
                backgroundImage: `url(/images/pages/${collectionID}.png)`
            }}>
            <div className="absolute inset-0 bg-black bg-opacity-80 sm:bg-opacity-50 rounded-xl"></div> {/* Optional overlay for better text readability */}

            {/* Header section */}
            <div className="relative container text-center header py-5 mt-6 z-10">
                <h1 className="sm:text-9xl text-6xl my-16 font-bold capitalize">{title}</h1>
                <p className="w-[80%] mx-auto">{description}</p>
            </div>
        </div>
    )
}