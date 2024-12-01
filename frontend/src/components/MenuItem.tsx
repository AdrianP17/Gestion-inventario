"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
function MenuItem({ icon, name, href }: { icon: JSX.Element, name: string, href?: string }) {
    const currentPath = usePathname()

    const baseClasses = "w-full p-3 rounded-2xl flex gap-3 items-center transition-colors duration-300 hover:bg-gray-200/20 text-text-100"
    const path = `/${href}`
    const isActive = name === "inicio" ? currentPath === path : currentPath.startsWith(path);
    return (
        <Link href={`/${href}`} className={`${baseClasses} ${isActive ? "bg-white text-text-200 " : ""}`}>
            <div className={`p-2 grid place-content-center  rounded-2xl  ${isActive ? "bg-primary text-white " : "text-primary bg-white"}`}>
                {icon}
            </div>
            <p className=" capitalize font-semibold">{name}</p>
        </Link>
    )
}


export default MenuItem