import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sale() {
  const data = new Date();
  const [filter, setFilter] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);

  const items = [
    {
      id: 1,
      dateHour: data.toLocaleDateString() + " : " + data.toLocaleTimeString(),
      table: 1,
      itens: ["Copinho 1 Bola", "Cascão 2 Bolas"],
      totalPrice: 17.00,
      active: true,
    },
    {
      id: 2,
      dateHour: data.toLocaleDateString() + " : " + data.toLocaleTimeString(),
      table: 5,
      itens: ["Pote 2L", "Picolé Aguá"],
      totalPrice: 35.00,
      active: true,
    },
    {
      id: 3,
      dateHour: data.toLocaleDateString() + " : " + data.toLocaleTimeString(),
      table: 4,
      itens: ["Copinho 2 Bolas", "Cascão 1 Bola"],
      totalPrice: 18.0,
      active: false,
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      appliedFilter === "" ? true : item.table == appliedFilter;
    return matchesSearch;
  });

  return (
    <div className="ml-0 md:ml-40 h-[calc(100vh-40px)] bg-purple-backgroundbody flex flex-col">
      <div className="bg-gray-backgroundbody h-[10%] flex items-center pl-5">
        <h1 className="text-purple-950 font-bold text-lg opacity-85">Vendas</h1>
      </div>
      <div className="flex flex-col items-center pt-7 gap-7 relative">
        <div className="flex w-[90%] h-10 justify-between">
          <button
            onClick={() => setAppliedFilter(filter)}
            className="bg-purple-items border w-[10%] text-gray-300 rounded-md cursor-pointer"
          >
            Pesquisar
          </button>
          <input
            type="text"
            placeholder="🔍 Pesquisar"
            className="bg-purple-items w-[50%] rounded-md mr-auto ml-5 pl-5 text-gray-400"
            value={filter}
            onChange={(e) => {
              const value = e.target.value;
              setFilter(e.target.value);
              if (value === "") setAppliedFilter("");
            }}
          />
          <NavLink to={"/NewSale"} className="bg-purple-options text-gray-300 rounded-sm shadow w-[15%] flex justify-center items-center cursor-pointer hover:scale-110">
            Nova Venda
          </NavLink>
        </div>
        <div className="relative w-[90%] h-91 overflow-y-auto bg-purple-items shadow-lg rounded-xl">
          <div className="w-full max-h-91 overflow-auto">
            <div className="grid grid-cols-5 bg-purple-itemsheader text-white font-bold sticky top-0 z-10">
              <div className="px-4 py-2 border-r border-purple-border">
                Data e Hora
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Mesa
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Itens
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Valor Total
              </div>
              <div className="px-4 py-2"></div>
            </div>
            <div className="grid grid-rows-auto">
              {filteredItems.map((item) => {
                if (!item.active) return null;
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-5 border-b border-purple-border text-white"
                  >
                    <div className="px-4 py-2">{item.dateHour}</div>
                    <div className="px-4 py-2">{item.table}</div>
                    <div className="px-4 py-2">
                      <button
                        onClick={() => setSelectedSale(item)}
                        className="text-purple-400 underline cursor-pointer"
                      >
                        {item.itens.length} itens
                      </button>
                    </div>
                    <div className="px-4 py-2">
                      R$ {item.totalPrice}
                    </div>
                    <div className="px-4 py-2 text-center">
                      <div className="w-[10%]">
                        <NavLink to={"/SaleEdit"} className="cursor-pointer hover:scale-120 hover:text-green-500"><ArrowRight /></NavLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedSale && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-purple-400 font-bold text-lg opacity-85">Itens da venda</h2>
                  <ul className="space-y-2 py-5">
                    {selectedSale.itens.map((i, id) => (
                      <li key={id} className="flex justify-between">
                        <span className="text-white">{i}</span>
                        {/* FUTURAMENTE PUXAR O VALOR DO ITEM E MOSTRAR AQUI! */}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedSale(null)}
                    className="mt-4 w-full bg-purple-600 py-2 rounded cursor-pointer hover:scale-105"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;
