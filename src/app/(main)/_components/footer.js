import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[1440px] h-[755px] bg-black pt-10">
        <div className="w-[1440px] h-[92px] bg-red-500 flex gap-8 justify-center items-center">
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
          <p className="font-bold text-white text-2xl">Fresh fast delivered</p>
        </div>
        <div className="flex px-20 pt-15">
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
          <div className="flex flex-col gap-8">
            <p className="font-normal text-gray-400">NOMNOM</p>
            <p className="font-normal text-white">Home</p>
            <p className="font-normal text-white">Contact us</p>
            <p className="font-normal text-white">Delivery zone</p>
          </div>
          <div className="flex flex-col gap-8">
            <p className="font-normal text-gray-400">Menu</p>
            <p className="font-normal text-white">Appetizers</p>
            <p className="font-normal text-white">Salads</p>
            <p className="font-normal text-white">Pizzas</p>
            <p className="font-normal text-white">Main dishes</p>
            <p className="font-normal text-white">Desserts</p>
          </div>
          <div className="flex flex-col gap-8">
            <p className="font-normal text-white">Side dish </p>
            <p className="font-normal text-white">Brunch </p>
            <p className="font-normal text-white">Desserts</p>
            <p className="font-normal text-white">Beverages</p>
            <p className="font-normal text-white">Fish & Sea foods</p>
          </div>
          <div className="flex flex-col">
            <div>
              <p className="font-normal text-gray-400">FOLLOW US</p>
            </div>
            <div className="flex">
              <span>
                <Image
                  src="/Instagram.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                />
              </span>

              <span>
                <Image
                  src="/Social icon.png"
                  alt="Social icon"
                  width={28}
                  height={28}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
