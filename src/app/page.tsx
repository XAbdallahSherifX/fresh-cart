import AllProducts from "./_Components/AllProducts/AllProducts";
import CategorySlider from "./_Components/CategorySlider/CategorySlider";
import MainSwiper from "./_Components/MainSwiper/MainSwiper";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-4 py-6">
        <MainSwiper />
        <CategorySlider />
        <AllProducts />
      </div>
    </>
  );
}
