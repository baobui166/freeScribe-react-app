function Header() {
  return (
    <header className="flex items-center justify-between p-4 gap-4">
      <h1>
        Free<span className="text-blue-400 bold">Scribe</span>
      </h1>
      <button className="flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-blue-400 text-sm">
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </button>
    </header>
  );
}

export default Header;
