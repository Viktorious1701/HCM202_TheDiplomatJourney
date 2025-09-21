interface TimelineEventDetailProps {
  event: {
    id: number
    year: string
    title: string
    description: string
    image: string
    detailContent: {
      context: string
      significance: string
      keyFigures: string[]
      outcomes: string[]
      historicalContext: string
    }
  }
}

export default function TimelineEventDetail({ event }: TimelineEventDetailProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Hero Image */}
      <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Year Badge */}
      <div className="flex justify-center">
        <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-lg font-medium">
          {event.year}
        </span>
      </div>
      
      {/* Description */}
      <div className="text-center">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      </div>
      
      {/* Detailed Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Context */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary">Bối Cảnh</h3>
          <p className="text-muted-foreground leading-relaxed">
            {event.detailContent.context}
          </p>
        </div>
        
        {/* Significance */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary">Ý Nghĩa</h3>
          <p className="text-muted-foreground leading-relaxed">
            {event.detailContent.significance}
          </p>
        </div>
      </div>
      
      {/* Key Figures */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Nhân Vật Chính</h3>
        <div className="flex flex-wrap gap-2">
          {event.detailContent.keyFigures.map((figure, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
            >
              {figure}
            </span>
          ))}
        </div>
      </div>
      
      {/* Outcomes */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Kết Quả Chính</h3>
        <ul className="space-y-2">
          {event.detailContent.outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-muted-foreground">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Historical Context */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">Bối Cảnh Lịch Sử</h3>
        <div className="bg-accent/50 rounded-lg p-4">
          <p className="text-muted-foreground leading-relaxed italic">
            {event.detailContent.historicalContext}
          </p>
        </div>
      </div>
    </div>
  )
}