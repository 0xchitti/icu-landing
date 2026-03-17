export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={event.image || '/placeholder-event.jpg'} 
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{event.date}</span>
          <span>{event.attendance} attended</span>
        </div>
        <a 
          href={event.url}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Event
        </a>
      </div>
    </div>
  )
}