import * as React from "react";
import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";



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

const TableData = ({props}) => {
    const sounds = props.map(sound => ({...sound}))
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sounds.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      console.log(newPage)
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };


 
    return (
    <>
      <TableContainer component={Paper} className="flex w-full">
        <table aria-label="custom pagination table" className="w-full">
          <thead className="bg-gray-800 w-full">
            <tr>
              <TableCell className="text-white text-center">Sounds</TableCell>
{/*               <TableCell style={{color: "white!important"}} align="right">Genre</TableCell>
              <TableCell style={{color: "white!important"}} align="right">User</TableCell>
              <TableCell style={{color: "white!important"}} align="right">Download</TableCell>  */}
            </tr>
          </thead>
          <TableBody>
            {(rowsPerPage > 0
              ? sounds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sounds
            ).map((sound) => (
              <tr key={sound.createdAt} className="flex flex-wrap sm:flex-nowrap border-b-8 justify-center sm:justify-between">
              
                <TableCell component="th" scope="sounds" className="w-80 text-center sm:text-left sm:border-b-0">
                  <a className="text-lg">{sound.name}</a><br></br>
                  <small>{sound.bpm} bpm, Key {sound.key}, {sound.loop}, {sound.instrument}</small>
                </TableCell>
                <TableCell className=" sm:border-b-0">
                <a className="text-md">{sound.genre}</a>
                </TableCell>
                <TableCell className=" sm:border-b-0">
                <a className="text-md">{sound.userName}</a>
                </TableCell>
                <TableCell className="text-center sm:text-left sm:border-b-0">
                <audio preload="auto" controls>
                  <source src={sound.url} type="audio/mpeg"/>
                  <source src={sound.url} type="audio/wav"/>
                  <source src={sound.url} type="audio/ogg"/>
                  Your browser does not support HTML5 audio. Please update your browser to view this media content.
                </audio>
                </TableCell>
                
              </tr>
    
            ))}
    
            {emptyRows > 0 && (
              <tr style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </tr>
            )}
          </TableBody>
          <TableFooter className="text-sm">
            <tr>
              <TablePagination
                rowsPerPageOptions={[ 10, 25, 50, 100, { label: "All", value: -1 }]}
                colSpan={4}
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
            </tr>
          </TableFooter>
        </table>
      </TableContainer>
    </>
    )
}

export default TableData