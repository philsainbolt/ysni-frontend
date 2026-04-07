export default function FormInput({ type, placeholder, value, onChange, required, ...rest }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2.5 border border-[#3d2d2d] bg-[#0a0505] text-[#f0d0b0] placeholder-[#6b5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4953a] font-body"
      {...rest}
    />
  );
}
