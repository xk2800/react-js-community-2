import axios from 'axios'
import { Repository } from '../../types/types'

// Base GitHub API URL
const API_BASE_URL = 'https://api.github.com'

// Function to fetch repositories by organization name
export const fetchRepositoriesByOrg = async (
  org: string = 'reactjs',
  page: number = 1,
  perPage: number = 30
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/orgs/${org}/repos`,
      {
        params: {
          page,
          per_page: perPage,
          sort: 'updated',
          direction: 'desc'
        }
      }
    )
    return response.data as Repository[]
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch repositories')
    }
    throw error
  }
}

// Function to search repositories
export const searchRepositoriesByName = async (
  query: string,
  page: number = 1,
  perPage: number = 30
) => {
  try {
    // Search repositories with the query in the name and owned by the React organization
    const response = await axios.get(
      `${API_BASE_URL}/search/repositories`,
      {
        params: {
          q: `${query} in:name org:reactjs`,
          page,
          per_page: perPage
        }
      }
    )
    return response.data.items as Repository[]
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search repositories')
    }
    throw error
  }
}

// To fetch a single repository by ID
export const fetchRepositoryById = async (id: number) => {
  try {
    // First, try to find the repo in the reactjs org
    const allRepos = await fetchRepositoriesByOrg('reactjs', 1, 100)
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
    throw error
  }
}