import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { MapPin } from "lucide-react";
import { ChevronRight } from 'lucide-react';
import { User } from 'lucide-react';
export default function Header() {
  return (
    <div className="flex justify-center">
      <div className="w-full h-[68px] bg-black">
        <div className="px-22 flex justify-between">
          <div className=" w-[146px] h-[44px] flex gap-1">
            <div>
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
          <div className=" w-[348px] h-[36px] flex gap-3 ">
            <div className="w-[251px] h-[36px] rounded-full bg-white flex gap-1 justify-center items-center">
              <MapPin size={16} />
              <p className="font-normal text-red-500">Delivery address </p>
              <p className="font-normal text-gray-400">Add location</p>
              <ChevronRight size={20}/>
            </div>
            <button className="w-[36px] h-[36px] rounded-full bg-white flex justify-center items-center">
              <ShoppingCart size={16} />
            </button>
            <button className="w-[36px] h-[36px] rounded-full  bg-red-500 flex justify-center items-center">
              <User size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
