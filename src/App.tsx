import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "./components/ui/Button";
import { productList, formInputsList, colors, categories } from "./data";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { ProductNameTypes } from "./components/types";

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
  const [productToEdit, setProductToEdit] = useState<IProduct>(deafultProduct);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  // ------------ Handler ------------
  const open = () => setIsOpen(true);
  const close = () => {
    setProduct(deafultProduct);
    setTempColors([]);
    setIsOpen(false);
  };
  const openEdit = () => setIsOpenEdit(true);
  const closeEdit = () => {
    setProductToEdit(deafultProduct);
    setTempColors([]);
    setIsOpenEdit(false);
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: "" }));
  };

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductToEdit((prev) => ({ ...prev, [name]: value }));
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
      colors: tempColors.join(","),
    });

    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasError) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);

    close();
  };

  const formEditHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors.join(","),
    });

    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasError) {
      setErrors(errors);
      return;
    }

    closeEdit();
  };

  /* -------------- RENDER -------------- */
  const renderProductList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEdit}
    />
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
        setErrors((errors) => ({ ...errors, colors: "" }));
      }}
    />
  ));
  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-500 hover:bg-indigo-700" onClick={open}>
        Add
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-2">
        {renderProductList}
      </div>

      {/* ------------ ADD PRODUCT MODAL ------------ */}
      <Modal isOpen={isOpen} close={close} title="Add New Product">
        <form className="space-y-2" onSubmit={formHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <h2 className="text-lg font-bold py-2 text-gray-800">
            Pick Product Colors
          </h2>
          <div className="flex items-center space-x-2 space-y-2 flex-wrap">
            {renderProductColors}
            <ErrorMessage msg={errors.colors} />
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
      </Modal>

      {/* ------------ EDIT PRODUCT MODAL ------------ */}
      <Modal isOpen={isOpenEdit} close={closeEdit} title="Edit Product">
        <form className="space-y-2" onSubmit={formEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <h2 className="text-lg font-bold py-2 text-gray-800">
            Pick Product Colors
          </h2>
          <div className="flex items-center space-x-2 space-y-2 flex-wrap">
            {renderProductColors}
            <ErrorMessage msg={errors.colors} />
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
      </Modal>
    </main>
  );
};

export default App;
