export interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
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