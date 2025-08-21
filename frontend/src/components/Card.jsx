import { FaHandHoldingUsd, FaHeart, FaShieldAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./styles/Card.css";

function Card() {
    const { t } = useTranslation();

    const cards = [
        {
            icon: <FaHeart className="card-icon" />,
            title: t("real_impact_title"),
            description: t("real_impact_desc"),
        },
        {
            icon: <FaShieldAlt className="card-icon" />,
            title: t("full_transparency_title"),
            description: t("full_transparency_desc"),
        },
        {
            icon: <FaHandHoldingUsd className="card-icon" />,
            title: t("percentage_title"),
            description: t("percentage_desc"),
        },
    ];

    return (
        <div className="flex flex-col items-center">
            {/* Text block */}
            <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-black">{t("how_it_works")}</h2>
                <div className="w-12 h-1 bg-green-600 mx-auto my-2"></div>
                <p className="text-lg text-gray-800">{t("how_it_works_desc")}</p>
            </div>

            {/* Cards block */}
            <div className="flex justify-center flex-wrap">
                {cards.map((card, index) => (
                    <div className="card" key={index}>
                        {card.icon}
                        <h2 className="card-title">{card.title}</h2>
                        <p className="card-description">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Card;
