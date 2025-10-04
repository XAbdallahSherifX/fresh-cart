import Image from "next/image";
import error404 from "../../public/images/404 Error-pana.svg";
export default function NotFound() {
  return (
    <div className="flex items-center flex-col">
      <Image src={error404} alt="Page Not Found" priority />
      <h6 className="text-emerald-500 text-6xl font-extrabold">
        Page Not Found
      </h6>
    </div>
  );
}