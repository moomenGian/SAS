import { useState } from "react";
import * as React from 'react'
import axios from 'axios'
import { Input, Button } from 'antd'

const { Search } = Input

axios.defaults.baseURL = 'http://localhost:3000'


export function SearchComponent() {
  
  const [searchResults, setSearchResults] = useState([]);


  const onSearch = async ( value, _e, info) => {

    if(!value.trim()){ //prevent getting all the records if input is empty
      return
    }

    try {
      const response = await axios.get(`/search?query=${value}`);
      setSearchResults(response.data);
      console.log(searchResults);
      console.log(value);
    } catch (error) {
      console.error('Error searching:', error);
    }
  }

  return(
    <>
      <div>
        <Search
          placeholder="search violator, witness etc. "
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <Button type="link" >
                {result.violator} - {result.violation} - {result.sectionName}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}