import { ChevronLeft, GalleryHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Login() {
  return (
    <div className="w-screen h-screen  flex items-center p-25  ">
      <div className="flex gap-12" >
       <div className="bg-white w-[416px] h-[376px] flex gap-6 flex-col" >
         <span>
          <ChevronLeft />
        </span>
        <div>
          <p className="font-semibold text-2xl">Log in</p>
          <p className=" font-normal text-base  text-gray-400">
            {" "}
            Sign up to explore your favorite dishes.
          </p>
        </div>

        <Input
          id="input-demo-api-key"
          type="password"
          className={"w-[416px] h-[36px]"}
          placeholder="Enter your email address"
        />

        <Input
          id="input-demo-api-key"
          type="password"
          className={"w-[416px] h-[36px]"}
          placeholder="Password"
        />
        <div>
          <p className="font-normal text-sm">Forgot password?</p>
          <div className="w-[100px] h-[2px] bg-black border-none" />
        </div>
        <Button variant="outline" className={"bg-gray-400 w-[416px] h-[36px]"}>
          Let's go
        </Button>
        <div className="flex gap-3 justify-center">
          <p className="font-normal text-base text-gray-400">
            Don't have an account?{" "}
          </p>
          <p className="font-normal text-base text-blue-400">Sign up </p>
        </div>
       </div>
       
        <div>
          <Image
            src="/childpicture.jpg"
            alt="Child Picture"
            width={856}
            height={904}
           className="rounded-3xl"
          />
           
        </div>
      </div>
      {/* <div className="bg-black w-[400px] h-[350px]"></div> */}
    </div>
  );
}
