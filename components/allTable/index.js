import * as React from "react";
import Container from '@mui/material/Container';
import TableData from '../tableData'



export default function AllTable( props ) {
  const filteredData = props.filteredData
  const searchData = props.searchData
  const sounds = props.allSounds.map(sound => ({...sound}))

  if (filteredData.length == 0 && searchData.length == 0) {
    return (
      <Container maxWidth="lg" className="py-14">
        <TableData props={sounds} />
      </Container>
    )
  } else {
    return (
      <Container maxWidth="lg" className="py-14">
        {filteredData.length > 0 ? 
          <TableData props={filteredData} />
          :
          <TableData props={searchData} />
        }
      </Container>
    ); 
  }
}

