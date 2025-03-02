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