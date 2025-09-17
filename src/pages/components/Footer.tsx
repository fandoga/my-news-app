import Image from "next/image"
import { forwardRef } from "react"

const Footer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((_props, ref) => {
    return (
        <footer className="bootom">
        <div ref={ref}></div>
        <div className="footer__links flex justify-around pb-6 pt-10">
          <a href="">Log In</a>
          <a href="">About Us</a>
          <a href="">Publishers</a>
          <a href="">Sitemap</a>
        </div>
        <div className="flex flex-col gap-2 items-center">
            <p>Powered by</p>
            <Image 
              src="/item-1.png"
              alt="img"
              width={84}
              height={24}
            />
        </div>
        <p className="text-center pb-10 pt-6">© 2025 Besider. Inspired by Insider</p>
      </footer>
    )
})

Footer.displayName = "Footer";

export default Footer