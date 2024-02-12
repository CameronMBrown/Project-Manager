import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [ projectsState, setProjectsState ] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  const handleAddTask = ( text ) => {
    setProjectsState((prev) => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prev.selectedProjectId,
        id: taskId
      }

      return {
        ...prev,
        selectedProjectId: prev.selectedProjectId,
        tasks: [...prev.tasks, newTask]
      }
    })
  }

  const handleDeleteTask = ( id ) => {
    setProjectsState((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter(task =>  task.id !== id)
      }
    })
  }


  const handleSelectProject = (id) => {
    setProjectsState((prev) => {
      return {
        ...prev, 
        selectedProjectId: id
      }
    })
  }

  const handleStartAddProject = () => {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null
      }
    })
  }

  const handleCancelAddProject = () => {
    setProjectsState((prev) => {
      return {
        ...prev, 
        selectedProjectId: undefined
      }
    })
  }

  const handleAddProject = (projectData) => {
    setProjectsState((prev) => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId
      }

      return {
        ...prev,
        projectId: undefined,
        projects: [...prev.projects, newProject]
      }
    })
  }

  const handleDeleteProject = () => {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter(project =>  project.id !== prev.selectedProjectId)
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)
  let content = (
    <SelectedProject 
      project={selectedProject} 
      onDelete={handleDeleteProject} 
      onAddTask={handleAddTask} 
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  )

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  } 

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
