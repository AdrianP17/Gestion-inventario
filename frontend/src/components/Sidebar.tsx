import { MdApi } from "react-icons/md";
import MenuItem from "./MenuItem";


function Sidebar() {
  return (
    <div className='min-h-screen max-w-[230px] p-6 bg-[#000814] text-white'>
        <div className="items-center flex gap-2 py-4 border-b border-b-text-100">
          <MdApi size={50}  className= "text-primary group-active:bg-primary"/>
          <h1 className="font-semibold">SISTEMA DE GESTIÓN DE INVENTARIO</h1>
        </div>
        <div className="py-5 flex flex-col gap-3">
          <MenuItem icon={<MdApi size={24} className="" />} name="inventario" href=""></MenuItem>
          <MenuItem icon={<MdApi size={24} className=""/> } name="productos" href="productos"></MenuItem>
          <MenuItem icon={<MdApi size={24} className=""/> } href="proveedores" name="proveedores"></MenuItem>
          <MenuItem icon={<MdApi size={24} className=""/> } href="kardex" name="kardex"></MenuItem>
          <MenuItem icon={<MdApi size={24} className=""/> } name="orden compra" href="ordenes-compra"></MenuItem>
          <MenuItem icon={<MdApi size={24} className=""/> } name="orden venta" href="ordenes-venta"></MenuItem>
          
        </div>
    </div>
)
}

export default Sidebar