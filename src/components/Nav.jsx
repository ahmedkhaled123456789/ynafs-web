function Nav() {
  return (
    <div
      className="bg-[#0093e9] text-white px-6 py-6 shadow-md"
      style={{ direction: "rtl" }}
    >
      <div className="w-full flex justify-between flex-wrap items-center gap-4">
        {/* Logo */}
        <a href="/books">
          <img
            src="/books/images/android-chrome-512x512-removebg-preview.png"
            alt="Logo"
            className="w-24 h-24"
          />
        </a>
        {/* Title */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold leading-relaxed">
          الكتب الدراسية لعام 1447 هـ
        </h1>
        <div></div>
      </div>
    </div>
  );
}

export default Nav;
