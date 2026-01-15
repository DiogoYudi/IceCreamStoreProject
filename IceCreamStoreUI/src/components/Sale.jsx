function Sale() {
  return (
    <div className="ml-0 md:ml-40 h-[calc(100vh-40px)] bg-purple-backgroundbody flex flex-col">
      <div className="bg-gray-backgroundbody h-[10%] flex items-center pl-5">
        <h1 className="text-purple-950 font-bold text-lg opacity-85">Vendas</h1>
      </div>
      <div className="flex flex-col items-center pt-7 gap-7 relative">
        <div className="flex w-[90%] h-10 justify-between">
          <button className="bg-purple-items border w-[10%] text-gray-300 rounded-md cursor-pointer">
            Pesquisar
          </button>
          <input
            type="text"
            placeholder="🔍 Pesquisar"
            className="bg-purple-items w-[50%] rounded-md mr-auto ml-5 pl-5 text-gray-400"
          />
          <button className="bg-purple-options text-gray-300 rounded-sm shadow w-[15%] cursor-pointer hover:scale-110">
            Nova Venda
          </button>
        </div>
        <div className="relative w-[90%] h-91 overflow-y-auto bg-purple-items shadow-lg rounded-xl">
          <div className="w-full max-h-91 overflow-auto">
            <div className="grid grid-cols-4 bg-purple-itemsheader text-white font-bold sticky top-0 z-10">
              <div className="px-4 py-2 border-r border-purple-border">
                Data e Hora
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Mesa
              </div>
              <div className="px-4 py-2 border-r border-purple-border">
                Itens
              </div>
              <div className="px-4 py-2 text-right">Valor Total</div>
            </div>
            <div className="grid grid-rows-auto">
              <div className="grid grid-cols-4 border-b border-purple-border text-white">
                <div className="px-4 py-2">11/11 19:00</div>
                <div className="px-4 py-2">1</div>
                <div className="px-4 py-2">Copinho 2 Bolas, Cascão 2 Bolas</div>
                <div className="px-4 py-2 text-right">R$ 17,00</div>
              </div>
              <div className="grid grid-cols-4 border-b border-purple-border text-white">
                <div className="px-4 py-2">15/11 19:00</div>
                <div className="px-4 py-2">5</div>
                <div className="px-4 py-2">Copinho 2 Bolas, Cascão 2 Bolas</div>
                <div className="px-4 py-2 text-right">R$ 17,00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;
