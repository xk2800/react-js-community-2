import axios from 'axios'
import { Repository } from '../../types/types'

// Base GitHub API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.github.com'

// Organization name to fetch repositories from
const VITE_ORGANIZATION_NAME = import.meta.env.VITE_ORGANIZATION_NAME || 'default-org-name'


/**
 * Fetches repositories for a specified organization from GitHub API.
 * @param {string} org - Organization name to fetch repositories from (defaults to env variable)
 * @param {number} page - Page number for pagination (defaults to 1)
 * @param {number} perPage - Number of repositories per page (defaults to 30)
 * @returns {Promise<Repository[]>} Array of repository objects
 * @throws {Error} If API request fails
**/
export const fetchRepositoriesByOrg = async (
  org: string = VITE_ORGANIZATION_NAME,
  page: number = 1,
  perPage: number = 30
) => {
  try {
    // Make GET request to Github API to fetch repositories for the specified organization
    const response = await axios.get(
      `${API_BASE_URL}/orgs/${org}/repos`,
      {
        params: {
          page,               // Page number for pagination
          per_page: perPage,  // Number of items per page
          sort: 'updated',    // Sort by last updated
          direction: 'desc'   // Sort in descending order
        }
      }
    )
    return response.data as Repository[]
  } catch (error) {

    // Handle Axios errors and throw a custom error message
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch repositories')
    }

    // Re-throw any other errors
    throw error
  }
}

/**
 * Searches for repositories by name within a specific organization
 * @param {string} query - Search query to match against repository names
 * @param {number} page - Page number for pagination (defaults to 1)
 * @param {number} perPage - Number of repositories per page (defaults to 30)
 * @returns {Promise<Repository[]>} Array of repository objects matching the search criteria
 * @throws {Error} If API request fails
**/
export const searchRepositoriesByName = async (
  query: string,
  page: number = 1,
  perPage: number = 30
) => {
  try {
    // Search repositories with the query in the name and owned by the organization
    const response = await axios.get(
      `${API_BASE_URL}/search/repositories`,
      {
        params: {
          // The "in:name" syntax tells GitHub to search only in repository names
          q: `${query} in:name org:${VITE_ORGANIZATION_NAME}`,  // Search query
          page,
          per_page: perPage
        }
      }
    )

    // Github search API return results in the 'items' property
    return response.data.items as Repository[]
  } catch (error) {

    // Handle Axios errors and throw a custom error message
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search repositories')
    }
    throw error
  }
}

// To fetch a single repository by ID
export const fetchRepositoryById = async (id: number) => {
  try {
    // First, try to find the repo in the selected org
    const allRepos = await fetchRepositoriesByOrg(VITE_ORGANIZATION_NAME, 1, 100)
    const foundRepo = allRepos.find(repo => repo.id === id)

    if (foundRepo) {
      return foundRepo
    }

    // We'll throw an error if not found in the first 100
    throw new Error('Repository not found')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch repository')
    }

    // Re-throw any other errors
    throw error
  }
}