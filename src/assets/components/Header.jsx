function Header() {
  return (
    <header className="flex items-center justify-between p-4 gap-4">
      <a href="/">
        Free<span className="text-blue-400 bold">Scribe</span>
      </a>
      <a
        href="/"
        className="flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-blue-400 text-sm"
      >
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </a>
    </header>
  );
}

export default Header;
