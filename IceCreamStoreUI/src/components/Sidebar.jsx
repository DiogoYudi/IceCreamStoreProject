import { useState } from "react";

function Sidebar(){
    const [activeItem, setActiveItem] = useState('Vendas');

    const menuItems = [
        { name: 'Vendas', href:'/'},
        { name: 'Estoque', href:'/Stock'},
        { name: 'Produtos', href:'/Product'},
        { name: 'Relatorio', href:'/SaleReport'},
    ];
    return(
        <div className="fixed top-0 left-0 h-screen w-40 bg-black-changed transition-transform duration-300 ease-in-out z-50">
            <div className="h-10 flex justify-center items-center">
                <a href="/" className="font-bold text-white text-lg">Sorveteria Yuki's</a>
            </div>
            <div className="pt-20 flex flex-col gap-10 justify-center items-center">
                {menuItems.map((item) => (
                    <div className="font-semibold text-center content-center w-[80%] h-10">
                        <a href={item.href} onClick={() => setActiveItem(item.name)} className={`w-full flex items-center justify-center py-2.5 rounded-xl transition-all duration-200 group hover:bg-purple-optionshover ${activeItem === item.name ? 'bg-purple-options text-white text-md' : ' text-gray-400 text-md'}`}>{item.name}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar