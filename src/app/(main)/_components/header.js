import Image from "next/image";
export default function Header() {
  return (
    <div className="flex justify-center">
      <div className="w-full h-[68px] bg-black">
        <div className="px-22 flex justify-between">
          <div className=" w-[146px] h-[44px] flex gap-2">
           
            <div >
              <Image src="/trace.png" alt="trace" width={46} height={37} />
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <span className="font-bold text-white">Nom</span>
                <span className="font-bold text-red-500">Nom</span>
              </div>
              <p className="font-normal text-white">Swift delivery</p>
            </div>
          </div>
          <div className="bg-white w-[146px] h-[44px]"></div>
        </div>
      </div>
    </div>
  );
}
