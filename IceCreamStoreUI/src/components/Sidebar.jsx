import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Vendas", href: "/" },
    { name: "Estoque", href: "/Stock" },
    { name: "Produtos", href: "/Product" },
    { name: "Relatorio", href: "/SaleReport" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-40 bg-black-changed z-50">
      <div className="h-10 flex justify-center items-center">
        <NavLink to="/" className="font-bold text-white text-lg">
          Sorveteria Yuki's
        </NavLink>
      </div>

      <div className="pt-20 flex flex-col gap-10 items-center">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `w-[80%] h-10 flex items-center justify-center rounded-xl transition-all duration-200
              ${
                isActive
                  ? "bg-purple-options text-white"
                  : "text-gray-400 hover:bg-purple-optionshover"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
