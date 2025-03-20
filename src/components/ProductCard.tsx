import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./ui/Button";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, price, colors, category } = product;

  const renderColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  return (
    <div className="max-w-sm md:max-w-lg mx-auto border rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt={title}
        className="w-full h-60 object-cover rounded-md"
      />

      <h3 className="text-2xl font-bold my-4">{title}</h3>
      <p className="text-sm text-gray-600">{textSlicer(description)}</p>

      <div className="flex items-center my-4 gap-2">{renderColors}</div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">${price}</span>
        <div className="flex items-center gap-2">
          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="text-sm font-bold">{category.name}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="bg-indigo-600">Edit</Button>
        <Button className="bg-red-600">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
