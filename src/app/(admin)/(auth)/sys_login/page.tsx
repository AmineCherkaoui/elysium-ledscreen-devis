import { LoginForm } from "./login-form";
import {Metadata} from "next";
import Image from "next/image";



export const metadata: Metadata = {
  title: "Login | Elysium",
};
export default function Page() {

  return (
    <div className="grid md:grid-cols-2 h-dvh">
        <div className="bg-primary-500 relative hidden md:block overflow-hidden">
        <Image
          fill
          src="/images/flexible.png"
          className="object-cover h-full opacity-30 grayscale-100"
          alt="Flexible Ledscreen image"
        />
      </div>
      <LoginForm className="px-6  md:px-12" />

    </div>
  );
}
