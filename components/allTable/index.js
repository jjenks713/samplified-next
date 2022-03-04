import * as React from "react";
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
import data from '../../data'
import Link from 'next/link'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
//import allSounds from '../search'
import filteredData from '../search'




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
  const filteredData = props.filteredData
  const searchData = props.searchData
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

  if (filteredData.length == 0 && searchData.length == 0) {
    return (
      <Container maxWidth="lg" className="py-14">

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Genre</StyledTableCell>
                <StyledTableCell align="right">User</StyledTableCell>
                <StyledTableCell align="right">Download</StyledTableCell>
                <StyledTableCell align="right">Listen/Download</StyledTableCell>
{/*                   <StyledTableCell align="right"><a onClick={setGenre(''), setInstrument(""), setLoop(""), setKey("")}>clear</a></StyledTableCell>
*/}
              </TableRow>
            </TableHead>
                <TableBody>
                  
                  {(rowsPerPage > 0
                    ? sounds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : sounds
                  ).map((sound) => (
                    <TableRow key={sound.createdAt}>
                    
                      <TableCell component="th" scope="sounds">
                        <a className="text-lg">{sound.name}</a><br></br>
                        <small>{sound.bpm} bpm, Key {sound.key}, {sound.loop}, {sound.instrument}</small>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                      <a className="text-md">{sound.genre}</a>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                      <a className="text-md">{sound.userName}</a>
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

    )
  } else {
    return (
      <Container maxWidth="lg" className="py-14">

        {filteredData.length > 0 ? 
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Genre</StyledTableCell>
                  <StyledTableCell align="right">User</StyledTableCell>
                  <StyledTableCell align="right">Download</StyledTableCell>
                  <StyledTableCell align="right">Listen/Download</StyledTableCell>
{/*                   <StyledTableCell align="right"><a onClick={setGenre(''), setInstrument(""), setLoop(""), setKey("")}>clear</a></StyledTableCell>
 */}
                </TableRow>
              </TableHead>
                  <TableBody>
                    
                    {(rowsPerPage > 0
                      ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : filteredData
                    ).map((sound) => (
                      <TableRow key={sound.createdAt}>
                    
                      <TableCell component="th" scope="sounds">
                        <a className="text-lg">{sound.name}</a><br></br>
                        <small>{sound.bpm} bpm, Key {sound.key}, {sound.loop}, {sound.instrument}</small>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                      <a className="text-md">{sound.genre}</a>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                      <a className="text-md">{sound.userName}</a>
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
                        count={filteredData.length}
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
        </div>

                  :

        <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                  <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Genre</StyledTableCell>
                        <StyledTableCell align="right">User</StyledTableCell>
                        <StyledTableCell align="right">Download</StyledTableCell>
                        <StyledTableCell align="right">Listen/Download</StyledTableCell>
      {/*                   <StyledTableCell align="right"><a onClick={setGenre(''), setInstrument(""), setLoop(""), setKey("")}>clear</a></StyledTableCell>
      */}
                      </TableRow>
                    </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? searchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : searchData
                    ).map((sound) => (
                      <TableRow key={sound.createdAt}>
                    
                      <TableCell component="th" scope="sounds">
                        <a className="text-lg">{sound.name}</a><br></br>
                        <small>{sound.bpm} bpm, Key {sound.key}, {sound.loop}, {sound.instrument}</small>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                      <a className="text-md">{sound.genre}</a>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                      <a className="text-md">{sound.userName}</a>
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
                        count={searchData.length}
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
        </div>
      }
      </Container>

    ); 
  }
}

