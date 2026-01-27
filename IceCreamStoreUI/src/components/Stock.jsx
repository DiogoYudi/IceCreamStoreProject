import { useState } from "react";

function Stock() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedNewStock, setSelectedNewStock] = useState(null);
  const [newType, setNewType] = useState("");
  const [newStock, setNewStock] = useState({
    type: "",
    flavour: "",
    quantity: "",
  });
  const options = [
    { code: 1, name: "Balde", isDisabled: false },
    { code: 2, name: "Pote 2L", isDisabled: false },
    { code: 3, name: "Pote 1L", isDisabled: false },
    { code: 4, name: "Palito", isDisabled: true },
  ];

  const items = [
    { id: 1, name: "Pote 2L", flavour: "Morango", quantity: 25 },
    { id: 2, name: "Pote 2L", flavour: "Chocolate", quantity: 30 },
    { id: 3, name: "Balde", flavour: "Morango", quantity: 5 },
    { id: 4, name: "Pote 1L", flavour: "Morango", quantity: 15 },
    { id: 5, name: "Palito", quantity: 15 },
  ];

  const filteredItems = items.filter((item) => {
    const matchesSelect = filter ? item.name === filter : true;

    const matchesSearch =
      appliedFilter === ""
        ? true
        : item.name.toLowerCase().includes(appliedFilter.toLowerCase()) ||
          item.flavour.toLowerCase().includes(appliedFilter.toLowerCase());

    return matchesSelect && matchesSearch;
  });

  const addStock = () => {};

  return (
    <div className="ml-0 md:ml-40 h-[calc(100vh-40px)] bg-purple-backgroundbody flex flex-col">
      <div className="bg-gray-backgroundbody h-[10%] flex justify-between items-center px-5">
        <h1 className="text-purple-950 font-bold text-lg opacity-85">
          Estoque
        </h1>
        <button
          onClick={(e) => {setSelectedNewStock(e); setSelectedOption(options[0])}}
          className="bg-purple-options text-gray-300 rounded-sm shadow w-[10%] h-[70%] cursor-pointer hover:scale-110"
        >
          Novo Estoque
        </button>
      </div>
      <div className="flex flex-col items-center pt-7 gap-7 relative">
        <div className="flex w-[90%] h-10 justify-between">
          <button
            onClick={() => setAppliedFilter(searchTerm)}
            className="bg-purple-items border w-[10%] text-gray-300 rounded-md cursor-pointer"
          >
            Pesquisar
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-purple-items border w-[10%] pl-2 text-gray-300 rounded-md"
          >
            <option value="">Todos</option>
            {options.map((o) => (
              <option key={o.code} value={o.name}>
                {o.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="🔍 Pesquisar"
            className="bg-purple-items w-[50%] rounded-md pl-5 text-gray-400"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(e.target.value);
              if (value === "") {
                setAppliedFilter("");
                setFilter("");
              } else setFilter("");
            }}
          />
          <button className="bg-purple-options text-gray-300 rounded-sm shadow w-[12%] cursor-pointer hover:scale-110">
            Entrada Estoque
          </button>
          <button className="bg-purple-options text-gray-300 rounded-sm shadow w-[12%] cursor-pointer hover:scale-110">
            Saida Estoque
          </button>
        </div>
        <div className="relative w-[90%] h-91 overflow-y-auto bg-purple-items shadow-lg rounded-xl">
          <div className="w-full max-h-91 overflow-auto">
            <div className="grid grid-cols-4 bg-purple-itemsheader text-white font-bold sticky top-0 z-10">
              <div className="px-4 py-2 border-r border-purple-border">
                Tipo
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Sabor
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Quantidade
              </div>
            </div>
            <div className="grid grid-rows-auto">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 border-b border-purple-border text-white"
                >
                  <div className="px-4 py-2">{item.name}</div>
                  <div className="px-4 py-2">{item.flavour}</div>
                  <div className="px-4 py-2">{item.quantity}</div>
                </div>
              ))}
            </div>
            {selectedNewStock && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-purple-400 font-bold text-lg opacity-85">
                    Dados do Estoque
                  </h2>
                  <ul className="space-y-2 py-5 flex flex-col gap-5">
                    <select
                      value={newType}
                      onChange={(e) => {
                        setNewType(e.target.value);
                        setSelectedOption(
                          options.find((o) => o.name === e.target.value),
                        );
                      }}
                      className="border-b w-[40%] pl-2 text-white focus:bg-gray-900"
                    >
                      {options.map((o) => (
                        <option key={o.code} value={o.name}>
                          {o.name}
                        </option>
                      ))}
                    </select>
                    {selectedOption && !selectedOption.isDisabled && (
                      <input
                        type="text"
                        className="text-white border-b border-gray-700 w-[40%] pl-2"
                        placeholder="Sabor"
                        value={newStock.flavour}
                        onChange={(e) => {
                          setNewStock({
                            ...newStock,
                            flavour: e.target.value,
                          });
                        }}
                      />
                    )}
                    <input
                      type="number"
                      className="text-white border-b border-gray-700 w-[40%] pl-2"
                      placeholder="Quantidade"
                      value={newStock.quantity}
                      onChange={(e) => {
                        setNewStock({
                          ...newStock,
                          quantity: e.target.value,
                        });
                      }}
                    />
                    <div>
                      <button
                        onClick={addStock}
                        className="bg-purple-800 text-gray-400 font-bold rounded-sm shadow px-5 flex justify-center items-center cursor-pointer hover:scale-110"
                      >
                        Cadastrar
                      </button>
                    </div>
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedNewStock(null);
                      setNewStock({
                        type: "",
                        flavour: "",
                        quantity: "",
                      });
                    }}
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

export default Stock;
