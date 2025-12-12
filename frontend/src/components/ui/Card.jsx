export default function Card({ icon: Icon, title, description, color = 'blue' }) {
  const iconBgClass = `bg-${color}-50`;
  const iconTextColorClass = `text-${color}-700`;
  const hoverBorderClass = `hover:border-${color}-100`;

  return (
    <div className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-100 ${hoverBorderClass} hover:shadow-md transition-all group`}>
      <div className={`w-12 h-12 ${iconBgClass} ${iconTextColorClass} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        {Icon && <Icon size={24} />}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}