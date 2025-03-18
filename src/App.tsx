import ProductCard from "./components/ProductCard";
import Moadl from "./components/ui/Modal";

const App = () => {
  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Moadl />
    </main>
  );
};

export default App;
