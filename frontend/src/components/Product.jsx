import "./styles/Product.css";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Product (){


   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [err, setError] = useState("");

   useEffect(() => {
       axios.get("http://localhost:8080/products/get/featured-donation")
           .then((res) => {
               setProducts(res.data.slice(0,10)); //takes first 10
               setLoading(false);
           })
           .catch((error)=>{
               setError("An error occured")+(error.message ? error.message : "");
               setLoading(false);
           });
   }, []);
   if (loading) return <p>Loading</p>;
    if(err) return <p className="text-red-600">{err}</p>;

    return(
        <section className="donation-section">
            <h2 className="text-2xl font-bold text-black">Featured Products</h2>
            <p className="text-lg text-gray-800">Top 10 products with high donation precentage</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
              {products.map((p) => (
                  <Link
                      to={`/checkout/${p.id}`}
                      key={p.id}
                      className="btn btn-secondary w-100"
                  >
                      <img
                          src={p.images?.[0] || "/placeholder.png"}
                          alt={p.name}
                          className="w-full h-[120px] object-cover rounded-lg mb-2"
                      />
                      <h2 className="text-lg mb-2">{p.name}</h2>
                      <p className="text-sm text-gray-600">${p.price}</p>
                      {p.donationPercentage && (
                          <span className="text-xs text-red-600">
                              {p.donationPercentage}% للتبرع
                          </span>
                      )}
                  </Link>
              ))}
            </div>
        </section>
    );
}

export default Product