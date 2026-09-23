import Image from "next/image";
export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
       <Image
       src="/hero.png" alt="hero" width={1440} height={570}
       />
      </div>
    </div>
  );
}
