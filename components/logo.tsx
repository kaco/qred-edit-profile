import logo from "../public/img.png";
import Image from "next/image";

export const Logo = () => (
  <div className="logo-wrapper">
    <Image src={logo} height={100} width={100} />
  </div>
);
