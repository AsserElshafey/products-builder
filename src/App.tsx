import ProductCard from "./components/ProductCard";
import Moadl from "./components/ui/Modal";
import { useState, ChangeEvent } from "react";
import Button from "./components/ui/Button";
import { productList, formInputsList } from "./data";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";

const App = () => {
  // ------------ STATE ------------
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: { name: "", imageURL: "" },
  });
  const [isOpen, setIsOpen] = useState(false);

  // ------------ Handler ------------
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  /* -------------- RENDER -------------- */
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col">
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
    </div>
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
        <form className="space-y-2">
          {renderFormInputList}
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
