import Image from "next/image";

import { Button } from "@/components/ui/button"
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
      
      </Button>
    </div>
    </div>
  );
}
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const NAV_ITEMS = [
//   { href: "/admin/food-menu", label: "Food menu" },
//   { href: "/admin/orders", label: "Orders" },
//   { href: "/admin/settings", label: "Settings" },
// ];

// export default function AdminLayout({ children }) {
//   const pathname = usePathname();

//   return (
//     <div className="flex h-full w-full">
//       {/* SIDEBAR */}
//       <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col justify-between p-4">
//         <div>
//           <div className="flex items-center gap-2 mb-8 px-2">
//             <span className="text-xl">🍽️</span>
//             <div>
//               <p className="font-bold text-sm leading-none">NomNom</p>
//               <p className="text-[11px] text-gray-400 leading-none mt-0.5">
//                 Swift delivery
//               </p>
//             </div>
//           </div>

//           <nav className="space-y-1">
//             {NAV_ITEMS.map((item) => {
//               const isActive = pathname.startsWith(item.href);
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`block px-3 py-2 rounded-full text-sm font-medium transition-colors ${
//                     isActive
//                       ? "bg-gray-900 text-white"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//       </aside>

//       {/* MAIN AREA */}
//       <div className="flex-1 flex flex-col min-w-0">
//         <header className="flex justify-end items-center px-6 py-4 border-b border-gray-200 bg-white">
//           <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
//         </header>

//         <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
