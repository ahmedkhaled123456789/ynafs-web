function Nav() {
  return (
    <div
      className="bg-[#0093e9] text-white px-6 py-6 shadow-md"
      style={{ direction: "rtl" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        {/* Logo */}
        <a href="/books">
          <img
            src="/books/images/android-chrome-512x512-removebg-preview.png"
            alt="Logo"
            className="w-14 h-14 sm:w-20 sm:h-20 rounded"
          />
        </a>
        {/* Title */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold leading-relaxed w-full">
          الكتب الدراسية لعام 1447 هـ
        </h1>
      </div>
    </div>
  );
}

export default Nav;
