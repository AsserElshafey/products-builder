import Image from "./Image";

interface IProps {}

const ProductCard = ({}: IProps) => {
  return (
    <div className="border rounded-md p-2 flex flex-col">
      <Image
        imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Regera_%28light_gradient%29.png/1024px-Regera_%28light_gradient%29.png"
        alt="Car photo"
        className="w-full h-40 object-cover rounded-md"
      />

      <h3>Koenigsegg Regera</h3>
      <p>
        The Koenigsegg Regera is a limited production, plug-in hybrid grand
        touring sports car manufactured by Swedish automotive manufacturer
        Koenigsegg. It was unveiled at the March 2015 Geneva Motor Show. The
        name Regera is a Swedish verb, meaning "to reign" or "to rule".
        Koenigsegg produced 85 Regeras, most of which were sold upon unveiling.
      </p>

      <div className="flex items-center my-4 gap-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full" />
        <span className="w-5 h-5 bg-green-600 rounded-full" />
        <span className="w-5 h-5 bg-red-600 rounded-full" />
      </div>

      <div className="flex justify-between items-center">
        <span>$2,000,000</span>
        <Image
          imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Regera_%28light_gradient%29.png/1024px-Regera_%28light_gradient%29.png"
          alt="Car photo"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex gap-2">
        <button className="w-full bg-indigo-600 text-white rounded-md p-2 mt-2">
          Edit
        </button>
        <button className="w-full bg-red-600 text-white rounded-md p-2 mt-2">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
