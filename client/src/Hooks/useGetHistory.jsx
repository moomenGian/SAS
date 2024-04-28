import axios from 'axios';
import * as React from 'react'


export async function useGetHistory(caseID) {
  try {
    // Make a GET request to fetch caseHistories based on caseID
    const response = await axios.get(`/getHistories?caseID=${caseID}`);
    return response.data
  } catch (error) {
    console.error(error)
  }

}