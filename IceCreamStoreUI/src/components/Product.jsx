import { SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import ProductService from "../service/ProductService";

function Product() {
  const [products, setProducts] = useState([]);
  const [priceInput, setPriceInput] = useState("");
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [selectedNewProduct, setSelectedNewProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDeleteProdut, setSelectedDeleteProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    n: 0,
    price: 0,
  });
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: 0,
  });

  const options = [
    { code: 1, name: "Copo" },
    { code: 2, name: "Picolé" },
    { code: 3, name: "Pote 1L" },
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleNewProduct = (e) => {
    setSelectedNewProduct(e);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct({
      id: product.id,
      n: product.n,
      name: product.name,
      price: product.price,
    });
    setPriceInput(product.price.toFixed(2));
  };

  const filteredItems = products
    .filter((item) => {
      const matchesSelect = filter ? item.name.includes(filter) : true;

      const matchesSearch =
        appliedFilter === ""
          ? true
          : item.name.toLowerCase().includes(appliedFilter.toLowerCase());
      return matchesSelect && matchesSearch;
    })
    .sort((a, b) => a.n - b.n);

  const addProduct = (e) => {
    e.preventDefault();
    ProductService.addProduct(newProduct)
      .then(() => {
        setSelectedNewProduct(null);
        setNewProduct({
          name: "",
          price: 0,
        });
        setPriceInput("");
        ProductService.getProduct().then((response) => {
          setProducts(response.data);
          setNewProduct((prev) => ({ ...prev, n: response.data.length + 1 }));
        }).catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProduct = (e) => {
    e.preventDefault();
    ProductService.updateProduct(editedProduct, editedProduct.id)
      .then((response) => {
        setSelectedProduct(null);
        setPriceInput("");
        setProducts(
          products.map((product) =>
            product.id === response.data.id ? response.data : product,
          ),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (e, id) => {
    e.preventDefault();
    ProductService.deleteProduct(id).then(() => {
      if (products) {
        setProducts((prevElement) => {
          return prevElement.filter((products) => products.id !== id);
        });
      }
    setSelectedDeleteProduct(null);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getProduct();
        setProducts(response.data);
        console.log(response.data.length);
        setNewProduct((prev) => ({ ...prev, n: response.data.length + 1 }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
            onKeyDown={(e) => {
              if(e.key === "Enter") setAppliedFilter(searchTerm);
            }}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(e.target.value);
              if (value === "") {
                setAppliedFilter("");
                setFilter("");
              } else setFilter("");
            }}
          />
          <button
            onClick={(e) => handleNewProduct(e)}
            className="bg-purple-options text-gray-300 rounded-sm shadow w-[15%] flex justify-center items-center cursor-pointer hover:scale-110"
          >
            Novo Produto
          </button>
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
                  <div className="px-4 py-2">{item.n}</div>
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
                      onClick={(e) => setSelectedDeleteProduct(e)}
                    >
                      <Trash />
                    </button>
                    {selectedDeleteProdut && (
                      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
                          <h2 className="font-bold text-lg opacity-85 py-3">
                            Tem certeza que deseja deletar esse produto?
                          </h2>
                          <p>
                            Se você deletar esse produto, você não conseguirá
                            recuperá-lo
                          </p>
                          <div className="flex justify-end gap-5">
                            <button onClick={() => setSelectedDeleteProduct(null)} className="mt-4 w-[20%] bg-purple-600 py-2 rounded cursor-pointer hover:scale-105">Cancelar</button>
                            <button
                              onClick={(e) => deleteProduct(e, item.id)}
                              className="mt-4 w-[20%] bg-red-500 py-2 rounded cursor-pointer hover:scale-105"
                            >
                              Deletar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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
                            priceInput.replace(",", "."),
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
                      <button
                        onClick={updateProduct}
                        className="bg-purple-800 text-gray-400 font-bold rounded-sm shadow px-5 flex justify-center items-center cursor-pointer hover:scale-110"
                      >
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
            {selectedNewProduct && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-purple-400 font-bold text-lg opacity-85">
                    Dados do Produto
                  </h2>
                  <ul className="space-y-2 py-5 flex flex-col gap-5">
                    <input
                      type="text"
                      className="text-white border-b border-gray-700 w-[40%] pl-2"
                      placeholder="Nome do Produto"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
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
                            priceInput.replace(",", "."),
                          );
                          const finalValue = isNaN(numericValue)
                            ? 0
                            : numericValue;
                          setNewProduct({
                            ...newProduct,
                            price: finalValue,
                          });
                          setPriceInput(finalValue.toFixed(2));
                        }}
                        placeholder="0,00"
                        className="text-white border-b border-gray-700 w-full pl-8 bg-transparent"
                      />
                    </div>
                    <div>
                      <button
                        onClick={addProduct}
                        className="bg-purple-800 text-gray-400 font-bold rounded-sm shadow px-5 flex justify-center items-center cursor-pointer hover:scale-110"
                      >
                        Cadastrar
                      </button>
                    </div>
                  </ul>
                  <button
                    onClick={() => setSelectedNewProduct(null)}
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
