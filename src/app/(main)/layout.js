import Header from "./_components/header";
import { CartProvider } from "./_components/cart-context";

export default function MainLayout({ children }) {
  return (
    <CartProvider>
      <div className="w-screen h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </CartProvider>
  );
}