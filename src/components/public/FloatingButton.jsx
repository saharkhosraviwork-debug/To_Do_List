export default function AddButton({ icon, onClick }) {
  const Icon = icon;

  return (

    <button
      onClick={onClick}
      className="absolute bottom-3 right-4 w-[42px] h-[42px] rounded-[50%] bg-blue text-white flex items-center justify-center cursor-pointer" >
   
      <Icon size={28} strokeWidth={2.5}/>
    </button>
  );
}
