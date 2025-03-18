import Image from "./Image";
import Button from "./ui/Button";
import { textSlicer } from "../utils/functions";

interface IProps {}

const ProductCard = ({}: IProps) => {
  return (
    <div className="max-w-sm md:max-w-lg mx-auto border rounded-md p-2 flex flex-col">
      <Image
        imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Regera_%28light_gradient%29.png/1024px-Regera_%28light_gradient%29.png"
        alt="Car photo"
        className="w-full h-40 object-cover rounded-md"
      />

      <h3 className="text-2xl font-bold my-4">Koenigsegg Regera</h3>
      <p className="text-sm text-gray-600">
        {textSlicer(
          `The Koenigsegg Regera is a limited production, plug-in hybrid grand touring sports car manufactured by Swedish automotive manufacturer Koenigsegg. It was unveiled at the March 2015 Geneva Motor Show. The name Regera is a Swedish verb, meaning "to reign" or "to rule". Koenigsegg produced 85 Regeras, most of which were sold upon unveiling.`
        )}
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
        <Button className="bg-indigo-600">Edit</Button>
        <Button className="bg-red-600">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
