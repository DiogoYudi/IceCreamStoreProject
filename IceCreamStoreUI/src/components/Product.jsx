import { SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Product() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: 0,
  });
  const [priceInput, setPriceInput] = useState("");

  const options = [
    { code: 1, name: "Copo" },
    { code: 2, name: "Picolé" },
    { code: 3, name: "Pote 1L" },
  ];

  const products = [
    { id: 1, name: "Copo 1", price: 6.0 },
    { id: 2, name: "Copo 2", price: 11.0 },
    { id: 3, name: "Copo 3", price: 16.0 },
    { id: 4, name: "Picolé Água", price: 2.5 },
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct({
      name: product.name,
      price: product.price,
    });
    setPriceInput(product.price.toFixed(2));
  };

  const filteredItems = products.filter((item) => {
    const matchesSelect = filter ? item.name.includes(filter) : true;

    const matchesSearch =
      appliedFilter === ""
        ? true
        : item.name.toLowerCase().includes(appliedFilter.toLowerCase());
    return matchesSelect && matchesSearch;
  });

  return (
    <div className="ml-0 md:ml-40 h-[calc(100vh-40px)] bg-purple-backgroundbody flex flex-col">
      <div className="bg-gray-backgroundbody h-[10%] flex justify-between items-center px-5">
        <h1 className="text-purple-950 font-bold text-lg opacity-85">
          Produtos
        </h1>
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
            className="bg-purple-items border w-[10%] pl-2 ml-4 text-gray-300 rounded-md cursor-pointer"
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
            className="bg-purple-items w-[50%] rounded-md pl-5 mr-auto ml-4 text-gray-400"
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
          <NavLink
            to={"/NewProduct"}
            className="bg-purple-options text-gray-300 rounded-sm shadow w-[15%] flex justify-center items-center cursor-pointer hover:scale-110"
          >
            Novo Produto
          </NavLink>
        </div>
        <div className="relative w-[90%] h-91 overflow-y-auto bg-purple-items shadow-lg rounded-xl">
          <div className="w-full max-h-91 overflow-auto">
            <div className="grid grid-cols-4 bg-purple-itemsheader text-white font-bold sticky top-0 z-10">
              <div className="px-4 py-2 border-r border-purple-border">
                Código
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Nome
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Preço
              </div>
            </div>
            <div className="grid grid-rows-auto">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 border-b border-purple-border text-white"
                >
                  <div className="px-4 py-2">{item.id}</div>
                  <div className="px-4 py-2">{item.name}</div>
                  <div className="px-4 py-2">{formatCurrency(item.price)}</div>
                  <div className="px-4 py-2 flex gap-10 justify-center relative group">
                    <button
                      title="Editar"
                      onClick={() => handleSelectProduct(item)}
                      className="text-yellow-300 cursor-pointer hover:scale-110"
                    >
                      <SquarePen />
                    </button>
                    <button
                      title="Deletar"
                      className="text-red-600 cursor-pointer hover:scale-110"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {selectedProduct && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-purple-400 font-bold text-lg opacity-85">
                    Dados do Produto
                  </h2>
                  <ul className="space-y-2 py-5 flex flex-col gap-5">
                    <input
                      type="text"
                      className="text-white border-b border-gray-700 w-[40%] pl-2"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    <div className="relative w-[40%]">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        R$
                      </span>
                      <input
                        type="text"
                        value={priceInput}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.,]/g, "");
                          setPriceInput(value);
                        }}
                        onBlur={() => {
                          const numericValue = parseFloat(
                            priceInput.replace(",", ".")
                          );
                          const finalValue = isNaN(numericValue)
                            ? 0
                            : numericValue;
                          setEditedProduct({
                            ...editedProduct,
                            price: finalValue,
                          });
                          setPriceInput(finalValue.toFixed(2));
                        }}
                        placeholder="0,00"
                        className="text-white border-b border-gray-700 w-full pl-8 bg-transparent"
                      />
                    </div>
                    <div>
                      <button className="bg-purple-800 text-gray-400 font-bold rounded-sm shadow w-[15%] flex justify-center items-center cursor-pointer hover:scale-110">
                        Editar
                      </button>
                    </div>
                  </ul>
                  <button
                    onClick={() => setSelectedProduct(null)}
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

export default Product;
