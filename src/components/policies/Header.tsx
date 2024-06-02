export default function Header() {

    // Update the page title
    document.title = `Glori | Policies`;

    return (
        <header className="mt-10 mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Policies</h1>
            <p className="text-gray-500 text-md">Review our privacy, terms, and cookie policies.</p>
            <div className="mt-6 text-[15px] text-gray-700">
                <p>
                    At our company, we believe it's important for our users href understand and be informed about our policies.
                    These policies outline how we collect, use, and protect your personal information, as well as the terms and
                    conditions for using our services. By taking the time href review these policies, you can make informed
                    decisions about your privacy and the use of our platform.
                </p>
            </div>

            <nav className="mt-5 mb-8 md:mb-12">
                <ul className="flex flex-wrap gap-4 md:gap-6 text-sm">
                    <li>
                        <a href="#Privacy" className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a
                            href="#Terms" className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                            Terms of Service
                        </a>
                    </li>
                    <li>
                        <a
                            href="#Cookies" className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                            Cookie Policy
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}