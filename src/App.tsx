import ProductCard from "./components/ProductCard";
import Moadl from "./components/ui/Modal";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "./components/ui/Button";
import { productList, formInputsList, colors } from "./data";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";

const App = () => {
  const deafultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: { name: "", imageURL: "" },
  };
  // ------------ STATE ------------
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(deafultProduct);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // ------------ Handler ------------
  const open = () => setIsOpen(true);
  const close = () => {
    setProduct(deafultProduct);
    setTempColors([]);
    setIsOpen(false);
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: "" }));
  };

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasError) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors },
      ...prev,
    ]);

    close();
  };

  /* -------------- RENDER -------------- */
  const renderProductList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="text-md font-bold text-gray-800">
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((c) => c !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-500 hover:bg-indigo-700" onClick={open}>
        Add
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-2">
        {renderProductList}
      </div>
      <Moadl isOpen={isOpen} close={close} title="Add New Product">
        <form className="space-y-2" onSubmit={formHandler}>
          {renderFormInputList}
          <div className="flex items-center space-x-2 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex items-center justify-start space-x-2 flex-wrap">
            {tempColors.map((color) => (
              <span
                key={color}
                className="py-0.5 px-1 text-white rounded-md my-2"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex itemsc-center space-x-4">
            <Button className="bg-red-500 hover:bg-red-700" onClick={close}>
              Cancel
            </Button>
            <Button className="bg-indigo-500 hover:bg-indigo-700">
              Submit
            </Button>
          </div>
        </form>
      </Moadl>
    </main>
  );
};

export default App;
