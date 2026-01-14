function Header(){
    const data = new Date();
    return(
        <div className="h-10 bg-black-changed ml-0 md:ml-25 w-full md:w-[calc(100%-6.25rem)] flex items-center px-4">
            <div className="ml-auto pr-4">
                <p className="text-white">{data.toLocaleDateString('pt-BR')}</p>
            </div>
        </div>
    )
}

export default Header