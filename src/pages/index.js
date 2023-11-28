import * as React from "react"
import Search from '../components/search'

const IndexPage = () => {
  return (
    <div class="grid grid-cols-3 grid-rows-3 place-items-center h-screen">
      <div class="col-start-2 row-start-2 ">
        <Search />
      </div>
    </div>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
