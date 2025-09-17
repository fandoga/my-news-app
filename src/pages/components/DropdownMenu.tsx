import Image from "next/image";
import { useState, type Dispatch, type SetStateAction } from "react";
type Props = {
    open : boolean,
    setOpen : Dispatch<SetStateAction<boolean>>,
}

export default function DropdownMenu({open, setOpen} : Props) {
    const [isRotating, setIsRotating] = useState(false);

    const handleClose = () => {
        setIsRotating(true);
        setTimeout(() => {
          setIsRotating(false);
        }, 300); // время совпадает с анимацией
      };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-2 w-full h-full bg-white transform transition-transform duration-300 
        ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex justify-end p-5">
        <button
        className="p-3"
      >
         <Image onClick={() => {
            handleClose()
            setOpen(!open)
         }}
              src={"/close.png"} alt="close"
              width={20}
              height={15}
              className={`${isRotating ? "animate-spin" : ""} transition-transform`}
            />
      </button>
        </div>

        <ul className="flex flex-col items-left px-5 uppercase gap-6 mt-10 text-xl font-semibold">
          <li>Science</li>
          <li>General</li>
          <li>Entertainment</li>
          <li>Technology</li>
          <li>Business</li>
          <li>Health</li>
          <li>Sports</li>
        </ul>
      </div>
    </>
  );
}
