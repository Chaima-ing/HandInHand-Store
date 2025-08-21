import "./styles/Product.css"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

function Product (){
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language || 'en');
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute('dir', language === "ar" ? 'rtl' : 'ltr');
    }, [language]);


   const cards = [
      { img: "/images/phone.jpg", title: "هاتف ذكي", description: "أحدث الهواتف الذكية بأسعار رائعة" },
      { img: "/images/book.jpg", title: "كتاب تعليمي", description: "تعلم البرمجة خطوة بخطوة" },
      { img: "/samsung-watch.png", title: "ساعة يد", description: "تصميم أنيق وعصري" },
      { img: "/images/gift.jpg", title: "هدية خاصة", description: "مناسبة لجميع المناسبات" },
       { img: "/images/phone.jpg", title: "هاتف ذكي", description: "أحدث الهواتف الذكية بأسعار رائعة" },
       { img: "/images/book.jpg", title: "كتاب تعليمي", description: "تعلم البرمجة خطوة بخطوة" },
       { img: "/samsung-watch.png", title: "ساعة يد", description: "تصميم أنيق وعصري" },
       { img: "/images/gift.jpg", title: "هدية خاصة", description: "مناسبة لجميع المناسبات" },
       { img: "/images/phone.jpg", title: "هاتف ذكي", description: "أحدث الهواتف الذكية بأسعار رائعة" },
       { img: "/images/book.jpg", title: "كتاب تعليمي", description: "تعلم البرمجة خطوة بخطوة" },
];
    return(
        <section className="donation-section">
            <h2 className="text-2xl font-bold text-black">{t("featured_products")}</h2>
            <div className="w-12 h-1 bg-green-600 mx-auto my-2"></div>
            <p className="text-lg text-gray-800">{t("featured_products_desc")}</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
              {cards.map((card, index) => (
                  <div
                      key={index}
                      className="bg-white rounded-xl p-5 w-[200px] m-2 text-center shadow-md"
                  >
                      <img
                          src={card.img}
                          alt={card.title}
                          className="w-full h-[120px] object-cover rounded-lg mb-2"
                      />
                      <h2 className="text-lg mb-2">{card.title}</h2>
                      <p className="text-sm text-gray-600">{card.description}</p>
                      <button
                          className="btn-green rounded-full mt-4 px-4 py-2"
                          onClick={() => navigate("/checkoutProduct")}
                      >
                          {t("display_details")}
                      </button>

                </div>
              ))}
            </div>

        </section>
    );
}

export default Product