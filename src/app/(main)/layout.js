import Header from "./_components/header";
import Footer from "./_components/footer";
export default function MainLayout({children}) {
  return (
    <div className=" w-screen h-screen flex flex-col">
      <Header />
     <main className="flex-1 flex flex-col"
     >{children}</main>
     <Footer/>
    </div>
  );
}
