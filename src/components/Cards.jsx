const Cards = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow p-3">
      <img
        src={product.image_url}   // ✅ IMPORTANT
        alt={product.name}
        className="w-full h-[300px] object-cover rounded-s"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300x400?text=No+Image";
        }}
      />

      <h3 className="mt-2 text-sm font-semibold uppercase">
        {product.name}
      </h3>

      <p className="text-sm mt-1">Rs. {product.price}</p>

      <button
        onClick={() => onAddToCart(product.product_id)}
        className="mt-3 w-full bg-black text-white py-2 rounded text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Cards;
