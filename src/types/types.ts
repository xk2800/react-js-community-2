import { ReactNode } from "react"

/**
 * Repository interface representing a GitHub repository.
 * Contains all the relevant properties returned from the GitHub API.
**/
export interface Repository {
  id: number                    // The Unique identifier for the repository
  name: string                  // Name of the repository
  description: string | null    // Description of the repository, could be null
  html_url: string              // URL to the repository on GitHub
  homepage: string              // URL to the repository's homepage
  language: string | null       // Primary programming language, could be null
  created_at: string            // Creation date in ISO format
  stargazers_count: number      // Number of stars
  forks_count: number           // Number of forks
  watchers_count: number        // Number of watchers
}

/**
 * State interface for the repositories slice for the store.
 * Contains all state related to repository listing, searching, and selection(user selected).
**/
export interface RepositoriesState {
  repositories: Repository[]              // List of repositories from API
  selectedRepository: Repository | null   // Currently selected repository for detailed view(/:repoId path)
  loading: boolean                        // Loading state for the async operations
  error: string | null                    // Error message if any API calls fail
  page: number                            // Current page for pagination
  hasMore: boolean                        // For indicating if more repositories can be loaded
  searchTerm: string                      // Current search term(if user is searching)
}

/**
 * Interface for a simplified version of repository data.
 * Used when only URL information is needed.
 * Used on ExternalLinksCard.tsx page.
**/
export interface SelectedRepository {
  html_url: string;       // URL to the repository on GitHub
  homepage?: string;      // Optional URL to the repository's homepage(optional as not all repositories have a homepage URL)
}

/**
 * Props interface for the Repository Card component.
**/
export interface RepoCardProps {
  repo: Repository          // Repository data to display
  counter: number           // Index or position in the list(for identification for the number of repositories shown)
  onClick: () => void       // Click handler for when the card is selected
}

/**
 * Props interface for the Repository Stat Card component.
 * Used to display individual statistics about a repository.
**/
export interface RepositoryStatCardProps {
  title: ReactNode | ((isHovered: boolean) => ReactNode)  // Title for the stat
  value: string | number                                  // The value to display(All stats are numbers except for Language)
  className?: string                                      // Optional styling using CSS classes
}