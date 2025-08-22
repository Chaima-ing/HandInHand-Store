import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProductDetails() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState("/samsung-watch.png");

  const thumbnails = [
    "/images/watch-thumb1.png",
    "/images/watch-thumb2.png",
    "/images/watch-thumb3.png",
    "/images/watch-thumb4.png",
  ];

  return (
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        {/* Left: Product Info */}
        <div>
          <h1 className="text-xl font-bold mb-2 text-gray-900">
            {t("product.title")}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-600 font-semibold">{t("product.price")}</span>
            <span className="text-gray-500 line-through">{t("product.old_price")}</span>
            <span className="text-red-500 text-sm">{t("product.discount")}</span>
          </div>

          {/* Profit Box */}
          <div className="bg-green-50 border border-green-200 rounded p-3 mb-4 text-sm text-green-700">
            {t("product.profit_title")}
            <ul className="mt-2 list-disc list-inside">
              <li>{t("product.profit_item1")}</li>
              <li>{t("product.profit_item2")}</li>
            </ul>
          </div>

          {/* Description */}
          <h2 className="font-bold text-lg mb-2">{t("product.description_title")}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t("product.description_text")}
          </p>

          {/* Features */}
          <h3 className="font-bold text-lg mb-2">{t("product.features_title")}</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✅ {t("product.feature1")}</li>
            <li>✅ {t("product.feature2")}</li>
            <li>✅ {t("product.feature3")}</li>
            <li>✅ {t("product.feature4")}</li>
            <li>✅ {t("product.feature5")}</li>
            <li>✅ {t("product.feature6")}</li>
          </ul>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              {t("product.add_to_cart")}
            </button>
            <button className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800">
              {t("product.buy_now")}
            </button>
          </div>
        </div>

        {/* Right: Product Images */}
        <div>
          <div className="border rounded-lg overflow-hidden mb-4">
            <img
                src={selectedImage}
                alt={t("product.main_image_alt")}
                className="w-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            {thumbnails.map((img, i) => (
                <div
                    key={i}
                    className={`w-20 h-20 border rounded-lg cursor-pointer overflow-hidden ${
                        selectedImage === img ? "border-green-500" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                >
                  <img
                      src={img}
                      alt={t("product.thumbnail_alt")}
                      className="w-full h-full object-cover"
                  />
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
