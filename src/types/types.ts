import { ReactNode } from "react"

export interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string
  language: string | null
  created_at: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

export interface RepositoriesState {
  repositories: Repository[]
  selectedRepository: Repository | null
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
  searchTerm: string
}

export interface SelectedRepository {
  html_url: string;
  homepage?: string;
}

export interface RepoCardProps {
  repo: Repository
  counter: number
  onClick: () => void
}

export interface RepositoryStatCardProps {
  title: ReactNode | ((isHovered: boolean) => ReactNode)
  value: string | number
  className?: string
}