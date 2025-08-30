import { useState } from "react";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("purchases");

    // Dummy user data (replace later with API)
    const user = {
        name: "Rana Megh",
        email: "rana@example.com",
        phone: "0987654321",
        joined: "Aug 2025",
        bio: "Helping hands for a better future 🌍",
        avatar: "https://i.pravatar.cc/150?img=12",
        stats: {
            purchases: 12,
            listings: 5,
            donations: 3,
            rating: 4.7,
        },
    };

    // Dummy products (simulate backend data)
    const purchases = [
        {
            id: 1,
            title: "Handmade Scarf",
            price: 25,
            category: "Clothing",
            image:
                "https://images.unsplash.com/photo-1585155774703-9b90e22fcf04?w=500&q=80",
        },
        {
            id: 2,
            title: "Wooden Bowl",
            price: 40,
            category: "Home Decor",
            image:
                "https://images.unsplash.com/photo-1564325722904-1ec7f09e6f65?w=500&q=80",
        },
    ];

    const listings = [
        {
            id: 3,
            title: "Handmade Necklace",
            price: 18,
            category: "Jewelry",
            image:
                "https://images.unsplash.com/photo-1617039470513-5f82e5400001?w=500&q=80",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-12">
            <div className="px-6 w-screen">
                {/* Profile Header */}
                <div className="bg-white shadow-lg  rounded-2xl p-6 flex items-center gap-6 relative">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-24 h-24 rounded-full border-4 border-green-600"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-green-800">{user.name}</h1>
                        <p className="text-gray-600">{user.bio}</p>
                        <p className="text-sm text-gray-500">Joined {user.joined}</p>
                        <div className="mt-2 text-sm text-gray-700">
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                        </div>
                    </div>
                    <button className="absolute right-6 top-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full text-sm">
                        Edit Profile
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    <div className="bg-white shadow-md rounded-2xl text-center p-4">
                        <h2 className="text-2xl font-bold text-green-700">
                            {user.stats.purchases}
                        </h2>
                        <p className="text-gray-600">Purchases</p>
                    </div>
                    <div className="bg-white shadow-md rounded-2xl text-center p-4">
                        <h2 className="text-2xl font-bold text-green-700">
                            {user.stats.listings}
                        </h2>
                        <p className="text-gray-600">Listings</p>
                    </div>
                    <div className="bg-white shadow-md rounded-2xl text-center p-4">
                        <h2 className="text-2xl font-bold text-green-700">
                            {user.stats.donations}
                        </h2>
                        <p className="text-gray-600">Donations</p>
                    </div>
                    <div className="bg-white shadow-md rounded-2xl text-center p-4">
                        <h2 className="text-2xl font-bold text-green-700">
                            ⭐ {user.stats.rating}
                        </h2>
                        <p className="text-gray-600">Rating</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-10 bg-white shadow-lg rounded-2xl p-6">
                    {/* Tab Buttons */}
                    <div className="flex space-x-4 border-b pb-2 mb-6">
                        {["purchases", "listings", "donations", "settings"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 px-4 font-medium transition-colors ${
                                    activeTab === tab
                                        ? "text-green-700 border-b-2 border-green-600"
                                        : "text-gray-600 hover:text-green-600"
                                }`}
                            >
                                {tab === "purchases" && "🛍 Purchases"}
                                {tab === "listings" && "📦 Listings"}
                                {tab === "donations" && "💝 Donations"}
                                {tab === "settings" && "⚙️ Settings"}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === "purchases" && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {purchases.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                                >
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-green-800">
                                            {p.title}
                                        </h3>
                                        <p className="text-gray-600">{p.category}</p>
                                        <p className="text-black font-semibold mt-2">
                                            ${p.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "listings" && (
                        <div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {listings.map((p) => (
                                    <div
                                        key={p.id}
                                        className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                                    >
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-green-700">
                                                {p.title}
                                            </h3>
                                            <p className="text-gray-600">{p.category}</p>
                                            <p className="text-black font-semibold mt-2">
                                                ${p.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full text-sm">
                                + Add New Product
                            </button>
                        </div>
                    )}

                    {activeTab === "donations" && (
                        <p className="text-gray-700">
                            Your donation history will appear here 🌱
                        </p>
                    )}

                    {activeTab === "settings" && (
                        <p className="text-gray-700">
                            Update your profile info, security, and preferences.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
