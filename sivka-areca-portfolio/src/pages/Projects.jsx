import { projects } from '../data/projects'

export default function Projects() {
  return (
    <div>
      <h2>Projects</h2>
      <p className="mt-2 text-gray-700">Showcase of executed works from SKA 15P.</p>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((pr) => (
          <div key={pr.slug} className="border rounded-lg p-4">
            <div className="h-32 bg-gray-100 rounded mb-3 grid place-content-center text-gray-500">Image</div>
            <h3 className="font-semibold">{pr.title}</h3>
            <p className="text-sm text-gray-600">{pr.description}</p>
            {/* Optional View Details button could link to a future route */}
          </div>
        ))}
      </div>
    </div>
  )
}