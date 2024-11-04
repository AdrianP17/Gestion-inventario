import { MdApi } from "react-icons/md";
import Link from "next/link"
import MenuItem from "./MenuItem";


function Sidebar() {
  return (
    <div className='h-full max-w-[230px]'>
        <div className="items-center flex gap-2 py-4 border-b border-b-text-100">
          <MdApi size={50} color="#48332D" className= "group-active:bg-primary"/>
          <h1 className="font-semibold text-text-200">SISTEMA DE GESTIÓN DE INVENTARIO</h1>
        </div>
        <div className="py-5 flex flex-col gap-3">
          <MenuItem icon={<MdApi size={24} className="" />} name="inicio" href="inicio"></MenuItem>
          <MenuItem icon={<MdApi size={24} className=""/> } name="productos" href="productos"></MenuItem>
          <MenuItem icon={<MdApi size={24} className=""/> } href="proveedores" name="proveedores"></MenuItem>
          <MenuItem icon={<MdApi size={24} className=""/> } name="orden compra" href="ordenes-compra"></MenuItem>
          <MenuItem icon={<MdApi size={24} className="" href="ordenes-venta"/> } name="orden venta"></MenuItem>
        </div>
        <Link href='/'>Home</Link>
        <Link href='/productos'>Productos</Link>
        <Link href='/contact'>Contact</Link>
        <div className="bg-primary text-white rounded-2xl p-4">
          <h2 className="text-2xl">SISTEMA DE GESTIÓN DE INVENTARIO</h2>
        </div>
    </div>
)
}

export default Sidebar