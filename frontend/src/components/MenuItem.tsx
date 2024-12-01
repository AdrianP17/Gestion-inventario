"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
function MenuItem({ icon, name, href }: { icon: JSX.Element, name: string, href?: string }) {
    const currentPath = usePathname()

    const baseClasses = "w-full p-3 rounded-2xl flex gap-3 items-center transition-colors duration-300 hover:bg-gray-100/10 text-gray-500"
    const path = `/${href}`
    const isActive = name === "inventario" ? currentPath === path : currentPath.startsWith(path);
    return (
        <Link href={`/${href}`} className={`${baseClasses} ${isActive ? "text-primary" : ""}`}>
            <div className={`p-2 grid place-content-center  rounded-2xl  ${isActive ? "text-primary" : "text-gray-500"}`}>
                {icon}
            </div>
            <p className={`${isActive ? "text-primary" : "text-gray-500"} capitalize font-medium`}>{name}</p>
        </Link>
    )
}


export default MenuItem