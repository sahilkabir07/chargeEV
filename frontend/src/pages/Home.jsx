import React from 'react';

const Home = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        Powering the Future of EV Charging
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                        White-label, OCPP-compliant EV charging software tailored for your brand and business.
                    </p>
                    <span className="block text-sm text-green-200 font-light">
                        Smart. Scalable. Sustainable.
                    </span>
                </div>
            </section>

            {/* Platform Features */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-green-700">
                        Our All-in-One Charging Management Platform
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "White-Label Customization",
                                desc: "Fully customizable branding for mobile apps, web portals, and backend systems."
                            },
                            {
                                title: "OCPP Gateway",
                                desc: "Seamless integration with OCPP 1.6J and 2.0.1 compliant chargers."
                            },
                            {
                                title: "Payment Gateway Integration",
                                desc: "Supports Stripe, RazorPay, Braintree, and other local gateways."
                            },
                            {
                                title: "APIs & Integrations",
                                desc: "Robust APIs for ERP, CRM, billing, and third-party systems."
                            },
                            {
                                title: "EV Roaming (OCPI)",
                                desc: "OCPI interoperability for seamless EV roaming across networks."
                            },
                            {
                                title: "Energy & Load Balancing",
                                desc: "Smart algorithms for optimal load distribution and power management."
                            }
                        ].map(({ title, desc }, i) => (
                            <div key={i} className="bg-gray-100 p-6 rounded shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold mb-2 text-green-800">{title}</h3>
                                <p className="text-sm text-gray-700">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-800">About Evoltsoft</h2>
                    <p className="text-lg max-w-3xl mx-auto text-gray-700">
                        Founded in 2023 and based in Pune, Evoltsoft is redefining the e-mobility ecosystem with
                        its state-of-the-art, white-labeled EV charging solutions. Our mission is to help
                        enterprises and startups launch scalable, sustainable EV charging networks with ease.
                    </p>
                </div>
            </section>

            {/* Clients / Trusted Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-green-800">Trusted by Industry Leaders</h2>
                    <p className="text-lg mb-10 text-gray-700 max-w-2xl mx-auto">
                        Our solutions power charging stations across multiple sectors — from fleet operators and commercial hubs to residential communities and municipalities.
                    </p>

                </div>
            </section>
        </div>
    );
};

export default Home;
