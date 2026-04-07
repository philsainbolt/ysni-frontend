export default function NavBar({ children }) {
  return (
    <nav className="bg-[#1a1210] border-b border-[#3d2d2d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-display text-[#d4a843] tracking-wide">You Shall Not Inject</h1>
        {children && <div className="flex gap-4 items-center">{children}</div>}
      </div>
    </nav>
  );
}
