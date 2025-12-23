// Example of how to modify the existing projects page to use database projects
// This shows the minimal changes needed to integrate the database system

// BEFORE (original projects page):
// import { useProjects } from '@/hooks/useProjects'

// AFTER (with database integration):
import { useProjectsEnhanced } from '@/hooks/useProjectsEnhanced'

// Option 1: Replace static projects with database projects
export function ProjectsPageWithDatabase() {
    // Simply change the hook - everything else stays the same!
    const { 
        projects, 
        stats, 
        isLoading, 
        error,
        updateFilter,
        clearFilters,
        // ... all other properties work exactly the same
    } = useProjectsEnhanced({ 
        source: 'database', // Use database projects
        enableCaching: true,
        refreshInterval: 5 * 60 * 1000 // Refresh every 5 minutes
    })

    // Rest of the component stays EXACTLY the same
    // ProjectCard, ProjectDetails, filtering, sorting - all work unchanged
    
    return (
        <div>
            {/* Add loading state for database */}
            {isLoading && <div>Loading projects from database...</div>}
            
            {/* Add error handling */}
            {error && <div>Error: {error} (falling back to static projects)</div>}
            
            {/* Existing project display code works unchanged */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={setSelectedProject}
                    />
                ))}
            </div>
        </div>
    )
}

// Option 2: Combine both static and database projects
export function ProjectsPageWithBoth() {
    const { projects, stats } = useProjectsEnhanced({ 
        source: 'both' // Shows both static and database projects
    })

    // Everything else identical to original
    return (
        <div>
            <p>Showing {stats.total} projects (static + database)</p>
            {/* ... rest of component unchanged ... */}
        </div>
    )
}

// Option 3: Keep original behavior but add database option
export function ProjectsPageWithToggle() {
    const [useDatabase, setUseDatabase] = useState(false)
    
    const { projects, stats } = useProjectsEnhanced({ 
        source: useDatabase ? 'database' : 'static'
    })

    return (
        <div>
            {/* Add toggle switch */}
            <button 
                onClick={() => setUseDatabase(!useDatabase)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                {useDatabase ? 'Switch to Static Projects' : 'Switch to Database Projects'}
            </button>
            
            {/* Rest unchanged */}
            {/* ... existing project display code ... */}
        </div>
    )
}

// Option 4: Backward compatibility - no changes needed
export function ExistingProjectsPage() {
    // The original hook still works exactly the same
    const { projects } = useProjects() // This still works!
    
    // Or you can use the new hook with static source (same result)
    const { projects: projectsNew } = useProjectsEnhanced({ source: 'static' })
    
    // Both return identical results
    return <div>{/* ... existing code unchanged ... */}</div>
}