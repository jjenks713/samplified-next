import * as React from "react";
import { useState } from 'react'
import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Search from '../search';
//import data from '../../data'
import Link from 'next/link'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';




function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};


export default function AllTable( props ) {
  //console.log(props.allSounds)

  if (props) {
    const sounds = props.allSounds.map(sound => ({...sound}))

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sounds.length) : 0;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 25));
      setPage(0);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14
      }
    }));

    const [genre, setGenre] = useState('')
    console.log(genre)
    const keys = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
    const genres = ["edm","rock","pop","house","bass-music","cinematic","hip-hop","global","live"]
    const instruments = ["fx","guitar","drums","percusion","vocals","bass","keys","string","synth"]

    const dubious = sounds.map(sound => {
      if (genre === sound.genre) {
        console.log("hooray")
      }
    })

    let searchArray = []
    function submitSearch(e) {
      setGenre(e.target.value, searchArray.push(genre))
      console.log('A search was submitted: ', searchArray)

/*         setSearch('')
      if (!search) {
          alert("Please enter something")
      } else if (search === sounds.name || search === sounds.BPM || search === sounds.key || search === sounds.user) {
          
      } */
    }
    


    return (
      <Container maxWidth="lg" className="py-14">
          <div className="grid justify-center py-14">
          <form onSubmit={submitSearch} className="flex flex-wrap">
{/*           <TextField 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          id="standard-basic" 
          label="Search" 
          variant="standard" />
          <button type="submit" value="Submit">Submit</button> */}
{/*           <FormGroup>
            {genres.map(genre => (
            <FormControlLabel 
            control={<Checkbox/>} 
            label={genre} 
            value={genre} 
            onChange={submitSearch}/>
            ))}
          </FormGroup> */}
            <select 
            value={genre} 
            placeholder="Genre" 
            className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            onChange={(e) => setGenre(e.target.value)}
            required
            >
                {
                    genres.map((genre) => (
                        <option key={genre}>
                            {genre}
                        </option>
                    ))
                }
            </select>
          </form>
        </div>
        
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">BPM</StyledTableCell>
                  <StyledTableCell align="right">Key</StyledTableCell>
                  <StyledTableCell align="right">Loop or Oneshot</StyledTableCell>
                  <StyledTableCell align="right">Instrument</StyledTableCell>
                  <StyledTableCell align="right">Genre</StyledTableCell>
                  <StyledTableCell align="right">User</StyledTableCell>
                  <StyledTableCell align="right">Download</StyledTableCell>
                  <StyledTableCell align="right">Listen/Download</StyledTableCell>
                </TableRow>
              </TableHead>

                  <TableBody>
                    
                    {(rowsPerPage > 0
                      ? sounds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : sounds
                    ).map((sound) => (
                      <TableRow key={sound.name}>
                      
                        <TableCell component="th" scope="sounds">
                          {sound.name}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {sound.bpm}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {sound.key}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {sound.loop}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {sound.instrument}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {sound.genre}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {sound.userName}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {sound.file}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {sound.listen}
                        </TableCell>
                        
                      </TableRow>

                    ))}
          
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={9} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[ 25, 50, 100, { label: "All", value: -1 }]}
                        colSpan={9}
                        count={sounds.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page"
                          },
                          native: true
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>

      </Container>

    ); 
  }  else {
    return <Link href="/sounds"></Link>
  }
}

