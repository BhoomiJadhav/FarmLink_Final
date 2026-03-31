// // components/admin/StatCard.jsx
// export default function StatCard({ title, value }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-5 w-full">
//       <h3 className="text-gray-500 text-sm">{title}</h3>
//       <p className="text-2xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }


import React from "react";

export default function StatCard({ title, value, icon: IconComponent }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex justify-between items-center group hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col">
        {/* Title: Small, bold, uppercase tracking */}
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none mb-2">
          {title}
        </p>
        
        {/* Value: Large, high-contrast black */}
        <h2 className="text-3xl font-black text-slate-800 leading-none">
          {value || 0}
        </h2>
      </div>

      {/* Icon: Housed in a stylized container that reacts to hover */}
      {IconComponent && (
        <div className="bg-slate-50 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-inner">
          <IconComponent size={24} strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}