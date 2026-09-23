import Image from "next/image";
export default function Footer() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[1440px] h-[755px] bg-black ">
        <div className="w-[1440px] h-[92px] bg-red-500 flex gap-8 justify-center items-center ">
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
        </div>
        <div className="flex">
          <div>
            <Image src="/trace.png" alt="trace" width={46} height={37} />
            <div className="flex flex-col">
              <div className="flex">
                <span className="font-bold text-white">Nom</span>
                <span className="font-bold text-red-500">Nom</span>
              </div>
              <p className="font-normal text-white">Swift delivery</p>
            </div>
          </div>
          <div>
            <p className="font-normal text-gray-400">NOMNOM</p>
            <p className="font-normal text-white">Home</p>
            <p className="font-normal text-white">Contact us</p>
            <p className="font-normal text-white">Delivery zone</p>
          </div>
          <div>
            <p className="font-normal text-gray-400">Menu</p>
            <p className="font-normal text-white">Appetizers</p>
            <p className="font-normal text-white">Salads</p>
            <p className="font-normal text-white">Pizzas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
