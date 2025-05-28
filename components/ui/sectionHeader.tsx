interface SectionHeaderProps {
  title: string
  subtitle?: string
  accent?: string
  centered?: boolean
}

export default function SectionHeader({ title, subtitle, accent = "", centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${centered ? "text-center" : ""}`}>
      <h1 className="text-3xl lg:text-5xl font-bold mb-3">
        {title}
        {accent && <span className="block text-red-500">{accent}</span>}
      </h1>
      {subtitle && <p className="text-lg text-gray-300">{subtitle}</p>}
    </div>
  )
}
