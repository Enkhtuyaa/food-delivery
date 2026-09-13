import Image from "next/image";
export default function AdminLayout() {
  return (
    <div className="flex h-full w-full ">
      <div className="w-[204px]  flex  flex-col">
        <div className="flex gap-2 text-center p-6">
          <div>
            <Image src="/foodlogo.jpg" alt="foodlogo" width={40} height={40} />
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-black">NomNom</p>
            <p className="font-normal text-gray-400">Swift delivery</p>
          </div>
        </div>
        <div className="p-6">
          <div className="w-[165px] h-[40px] rounded-full bg-black  flex justify-center items-center gap-4 ">
            <Image
              src="/vector.png"
              alt="dashboard"
              width={22}
              height={22}
              className=" object-cover"
            />
            <p className="text-white font-medium">Food menu</p>
          </div>
        </div>
        <div>
          <div className=" flex justify-center gap-4 ">
            <Image 
            src="/orders.png"
            alt = "orders"
            width={22}
            height={22}
            />
            <p className="font-medium">Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
