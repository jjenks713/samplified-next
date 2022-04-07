import * as React from "react";
import TableData from '../tableData'

export default function AllTable( props ) {

  if (props.slugSounds) {
    const sounds = props.slugSounds.map(sound => ({...sound}))
    return (
      <div className="py-14">
        <TableData props={sounds} />
      </div>
    )
  } else {
    const filteredData = props.filteredData
    const searchData = props.searchData
    const sounds = props.allSounds.map(sound => ({...sound}))
  
    if (filteredData.length == 0 && searchData.length == 0) {
      return (
        <div className="py-14">
          <TableData props={sounds} />
        </div>
      )
    } else {
      return (
        <div className="py-14">
          {filteredData.length > 0 ? 
            <TableData props={filteredData} />
            :
            <TableData props={searchData} />
          }
        </div>
      ); 
    }
  }
}

