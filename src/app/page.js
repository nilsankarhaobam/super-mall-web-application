// app/page.jsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold">Global Reach for Local Shops</h1>
          <p className="py-6 text-lg">
            SuperMall allows merchants to advertise and sell products globally. 
            Empowering rural towns to showcase their commodities to the rest of the world 
            through a secure, mobile-friendly portal.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register" className="btn btn-primary lg:btn-lg">
              Get Started as Merchant
            </Link>
            <Link href="/auth/login" className="btn btn-outline lg:btn-lg">
              Explore Shops
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}