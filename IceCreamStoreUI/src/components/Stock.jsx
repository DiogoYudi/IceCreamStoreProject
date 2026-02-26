import { X } from "lucide-react";
import { useEffect, useState } from "react";
import StockService from "../service/StockService";
import TypeService from "../service/TypeService";

function Stock() {
  const [stock, setStock] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedNewType, setSelectedNewType] = useState(null);
  const [selectedNewStock, setSelectedNewStock] = useState(null);
  const [selectedAddStock, setSelectedAddStock] = useState(null);
  const [selectedRemoveStock, setSelectedRemoveStock] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [newType, setNewType] = useState("");

  const [options, setOptions] = useState([
    { code: 1, name: "Balde", isDisabled: false },
    { code: 2, name: "Pote 2L", isDisabled: false },
    { code: 3, name: "Pote 1L", isDisabled: false },
    { code: 4, name: "Palito", isDisabled: true },
  ]);

  const [newStock, setNewStock] = useState({
    type: options[0].name,
    flavour: "",
    quantity: "",
  });

  // Separando os itens com e sem sabor
  const itemsWithFlavour = stock.filter((item) => item.flavour);
  const itemsWithoutFlavour = stock.filter((item) => !item.flavour);

  // Aplicando filtros
  const filteredWithFlavour = itemsWithFlavour
    .filter((item) => {
      const matchesSelect = filter ? item.type === filter : true;
      const matchesSearch =
        appliedFilter === ""
          ? true
          : item.type.toLowerCase().includes(appliedFilter.toLowerCase()) ||
            item.flavour.toLowerCase().includes(appliedFilter.toLowerCase());
      return matchesSelect && matchesSearch;
    })
    .sort((a, b) => a.type.localeCompare(b.type));

  const filteredWithoutFlavour = itemsWithoutFlavour
    .filter((item) => {
      return filter ? item.type === filter : true;
    })
    .sort((a, b) => a.type.localeCompare(b.type));

  // Adicionar nova categoria dos items
  const addNewType = (e) => {
    e.preventDefault();
    TypeService.addType(newType)
      .then(() => {
        setSelectedNewType(null);
        TypeService.getType()
          .then((response) => {
            setOptions(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  // Adicionar novo item do estoque
  const addNewStock = (e) => {
    e.preventDefault();
    StockService.addStock(newStock)
      .then(() => {
        setSelectedNewStock(null);
        setNewStock({
          type: "",
          flavour: "",
          quantity: "",
        });
        StockService.getStock()
          .then((response) => {
            setStock(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  // Alterar a quantidade do estoque
  const updateStockQuantity = (e, operation) => {
    e.preventDefault();

    if (!selectedItem || !newQuantity) return; // proteção

    const updatedStock = {
      id: selectedItem.id,
      type: selectedItem.type,
      flavour: selectedItem.flavour,
      quantity:
        operation === "add"
          ? selectedItem.quantity + Number(newQuantity)
          : selectedItem.quantity - Number(newQuantity),
    };

    StockService.updateStock(updatedStock, updatedStock.id).then((response) => {
      // Limpa seleção e input
      if (operation === "add") setSelectedAddStock(null);
      else setSelectedRemoveStock(null);

      setNewQuantity("");

      // Atualiza o array de estoque
      setStock(
        stock.map((s) => (s.id === response.data.id ? response.data : s)),
      );
    });
  };

  // Get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StockService.getStock();
        setStock(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="ml-0 md:ml-40 h-[calc(100vh-40px)] bg-purple-backgroundbody flex flex-col">
      {/* Header */}
      <div className="bg-gray-backgroundbody h-[10%] flex justify-between items-center px-5">
        <h1 className="text-purple-950 font-bold text-lg opacity-85">
          Estoque
        </h1>
        <div className="flex gap-3 w-[30%]">
          {/* Botão secundário: Nova Categoria */}
          <button
            onClick={(e) => {
              setSelectedNewType(e);
            }}
            className="bg-[#5b4b8a] text-white rounded-md px-4 py-2 hover:bg-[#6d5ca3] transition cursor-pointer hover:scale-110"
          >
            Nova Categoria
          </button>

          {/* Botão principal: Novo Estoque */}
          <button
            onClick={(e) => {
              setSelectedNewStock(e);
              setSelectedOption(options[0]);
            }}
            className="bg-purple-options text-white rounded-md px-4 py-2 shadow-md cursor-pointer hover:scale-110 transition"
          >
            Novo Estoque
          </button>
        </div>
      </div>

      {/* Filtros */}
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
              setSearchTerm(value);
              if (value === "") {
                setAppliedFilter("");
                setFilter("");
              } else setFilter("");
            }}
          />

          {/* Botão de entrada e saída */}
          <button
            onClick={(e) => {
              setSelectedAddStock(e);
              setSelectedOption(options[0]);
            }}
            className="bg-[#5b4b8a] text-white rounded-md px-4 py-2 hover:bg-[#6d5ca3] transition cursor-pointer hover:scale-110"
          >
            Entrada Estoque
          </button>
          <button
            onClick={(e) => {
              setSelectedRemoveStock(e);
              setSelectedOption(options[0]);
            }}
            className="bg-[#5b4b8a] text-white rounded-md px-4 py-2 hover:bg-[#6d5ca3] transition cursor-pointer hover:scale-110"
          >
            Saida Estoque
          </button>
        </div>

        {/* Header */}
        <div className="relative w-[90%] h-91 overflow-y-auto flex gap-4">
          <div className="flex-1 bg-purple-items shadow-lg rounded-xl overflow-auto">
            {filteredWithFlavour.length > 0 && (
              <>
                <div className="grid grid-cols-3 bg-purple-itemsheader text-white font-bold sticky top-0 z-10">
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

                {/* Lista do estoque com sabor */}
                {filteredWithFlavour.map((stock) => (
                  <div
                    key={stock.id}
                    className="grid grid-cols-3 border-b border-purple-border text-white"
                  >
                    <div className="px-4 py-2">{stock.type}</div>
                    <div className="px-4 py-2">{stock.flavour}</div>
                    <div className="px-4 py-2">{stock.quantity}</div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex-1 bg-purple-items shadow-lg rounded-xl overflow-auto">
            {/* Lista do estoque sem sabor */}
            {filteredWithoutFlavour.length > 0 && (
              <>
                <div className="grid grid-cols-2 bg-purple-itemsheader text-white font-bold sticky top-0 z-10">
                  <div className="px-4 py-2 border-r border-purple-border">
                    Tipo
                  </div>
                  <div className="px-4 py-2 border-r border-purple-border">
                    Quantidade
                  </div>
                </div>
                {filteredWithoutFlavour.map((stock) => (
                  <div
                    key={stock.id}
                    className="grid grid-cols-2 border-b border-purple-border text-white"
                  >
                    <div className="px-4 py-2">{stock.type}</div>
                    <div className="px-4 py-2">{stock.quantity}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Nova categoria */}
        {selectedNewType && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-purple-400 font-bold text-lg opacity-85">
                Nova Categoria
              </h2>
              <ul className="space-y-2 py-5 flex flex-col gap-5">
                <input
                  type="text"
                  className="text-white border-b border-gray-700 w-[40%] pl-2"
                  placeholder="Nova Categoria"
                  onChange={(e) => setNewType(e.target.value)}
                />
                <div>
                  <button
                    onClick={addNewType}
                    className="bg-purple-800 text-gray-400 font-bold rounded-sm shadow px-5 flex justify-center items-center cursor-pointer hover:scale-110"
                  >
                    Cadastrar
                  </button>
                </div>
              </ul>
              <button
                onClick={() => {
                  setSelectedNewType(null);
                }}
                className="mt-4 w-full bg-purple-600 py-2 rounded cursor-pointer hover:scale-105"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Novo estoque */}
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
                    setNewStock({ ...newStock, type: e.target.value });
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
                    onChange={(e) =>
                      setNewStock({ ...newStock, flavour: e.target.value })
                    }
                  />
                )}
                <input
                  type="number"
                  className="text-white border-b border-gray-700 w-[40%] pl-2"
                  placeholder="Quantidade"
                  value={newStock.quantity}
                  onChange={(e) =>
                    setNewStock({ ...newStock, quantity: e.target.value })
                  }
                />
                <div>
                  <button
                    onClick={addNewStock}
                    className="bg-purple-800 text-gray-400 font-bold rounded-sm shadow px-5 flex justify-center items-center cursor-pointer hover:scale-110"
                  >
                    Cadastrar
                  </button>
                </div>
              </ul>
              <button
                onClick={() => {
                  setSelectedNewStock(null);
                  setNewStock({ type: "", flavour: "", quantity: "" });
                }}
                className="mt-4 w-full bg-purple-600 py-2 rounded cursor-pointer hover:scale-105"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Entrada */}
        {selectedAddStock && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-5 rounded-lg w-full max-w-md max-h-[70vh] overflow-auto">
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-white font-bold text-lg">
                  Selecione o Produto
                </h2>
                {/* IMPLEMENTAR UM FILTRO PARA FACILITAR A BUSCA DO ESTOQUE*/}
                <button
                  onClick={() => {
                    setSelectedAddStock(false);
                    setSelectedItem(null);
                    setNewQuantity("");
                  }}
                  className="text-white hover:bg-red-600"
                >
                  <X />
                </button>
              </div>

              <div className="max-h-48 overflow-auto mb-4">
                {stock.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3 mb-2 rounded cursor-pointer ${
                      selectedItem?.id === item.id
                        ? "bg-purple-600"
                        : "bg-gray-800"
                    }`}
                  >
                    <div className="text-gray-200">{item.name}</div>
                    <div className="text-sm text-gray-300">
                      {item.type} {item.flavour || ""}
                    </div>
                    <div className="text-xs text-gray-400">
                      Quantidade atual: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selecionar item */}
              {selectedItem && (
                <>
                  <label className="text-white block mb-2">
                    Quantidade a adicionar:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="w-full p-2 rounded bg-gray-800 text-white mb-4"
                  />
                  <button
                    onClick={(e) => updateStockQuantity(e, "add")}
                    className="w-full text-gray-300 bg-gray-700 py-2 rounded hover:scale-105 transition-transform"
                  >
                    Adicionar Estoque
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Saida */}
        {selectedRemoveStock && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-5 rounded-lg w-full max-w-md max-h-[70vh] overflow-auto">
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-white font-bold text-lg">
                  Selecione o Produto
                </h2>
                {/* IMPLEMENTAR UM FILTRO PARA FACILITAR A BUSCA DO ESTOQUE*/}
                <button
                  onClick={() => {
                    setSelectedRemoveStock(null);
                    setSelectedItem(null);
                    setNewQuantity("");
                  }}
                  className="text-white hover:bg-red-600"
                >
                  <X />
                </button>
              </div>

              <div className="max-h-48 overflow-auto mb-4">
                {stock.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3 mb-2 rounded cursor-pointer ${
                      selectedItem?.id === item.id
                        ? "bg-purple-600"
                        : "bg-gray-800"
                    }`}
                  >
                    <div className="text-gray-200">{item.name}</div>
                    <div className="text-sm text-gray-300">
                      {item.type} {item.flavour || ""}
                    </div>
                    <div className="text-xs text-gray-400">
                      Quantidade atual: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {selectedItem && (
                <>
                  <label className="text-white block mb-2">
                    Quantidade da saída:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="w-full p-2 rounded bg-gray-800 text-white mb-4"
                  />
                  <button
                    onClick={(e) => updateStockQuantity(e, "remove")}
                    className="w-full text-gray-300 bg-gray-700 py-2 rounded hover:scale-105 transition-transform"
                  >
                    Saida do Estoque
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stock;
