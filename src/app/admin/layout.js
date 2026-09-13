"use client";
import Link from "next/link";

import Image from "next/image";

export default function AdminLayout({ children }) {

  return (
    <div className="flex h-full w-full ">
      <aside className="w-[204px]  flex  flex-col">
        <div className="flex gap-2 text-center p-6">
          <div>
            <Image src="/foodlogo.jpg" alt="foodlogo" width={40} height={40} />
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-black">NomNom</p>
            <p className="font-normal text-gray-400">Swift delivery</p>
          </div>
        </div>

        <nav className="p-6">
          <div className="w-[165px] h-[40px] rounded-full bg-black  flex justify-center items-center gap-4 ">
            <Image
              src="/vector.png"
              alt="dashboard"
              width={22}
              height={22}
              className=" object-cover"
            />
            <Link href="/admin/food-menu" className="text-white font-medium">
              {" "}
              Food-menu{" "}
            </Link>
          </div>
          <div className=" flex justify-center gap-4 p-6 ">
            <Image src="/orders.png" alt="orders" width={22} height={22} />
            <Link href="/admin/orders" className="font-medium">
              Orders
            </Link>
          </div>
          <div className="flex justify-center gap-4 p-6 "></div>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex justify-end items-center border-b border-gray-200 bg-white">
          <div className="w-18 h-18 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 ">
          {children}
        </main>
      </div>
    </div>
  );
}
