import Image from "next/image"
import DropdownMenu from "./DropdownMenu"
import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="grid grid-cols-3 items-center mb-5">
          <button onClick={() => setOpen(!open)} className="cursor-pointer">
            <Image src={"/hamburg.png"} alt="hamburger"
              width={20}
              height={15}
            />
          </button>
          <h1 className="text-center text-2xl font-bold">BESIDER</h1>
          <div></div>
          <DropdownMenu open={open} setOpen={setOpen}/>
        </header>
    )
}

export default Header