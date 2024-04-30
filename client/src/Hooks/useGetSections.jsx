import * as React from 'react'
import axios from 'axios'

export const useGetSections = async (strand) => {
  try {
    const res = await axios.get(`/getSectionNames/${strand.replaceAll(' ', '')}`)

    if(res.status === 404) return 

    return res.data
  } catch (e) {
    console.error(e)
    return []
  }

}