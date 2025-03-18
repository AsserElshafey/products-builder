import ProductCard from "./components/ProductCard";
import Moadl from "./components/ui/Modal";
import { useState } from "react";
import Button from "./components/ui/Button";

const App = () => {
  // ------------ STATE ------------
  const [isOpen, setIsOpen] = useState(false);

  // ------------ Handler ------------
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  /* -------------- RENDER -------------- */
  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-500 hover:bg-indigo-700" onClick={open}>
        ِAdd
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Moadl isOpen={isOpen} close={close} title="Add New Product">
        <div className="flex itemsc-center space-x-4">
          <Button className="bg-red-500 hover:bg-red-700" onClick={close}>
            Cancel
          </Button>
          <Button className="bg-indigo-500 hover:bg-indigo-700">Submit</Button>
        </div>
      </Moadl>
    </main>
  );
};

export default App;
