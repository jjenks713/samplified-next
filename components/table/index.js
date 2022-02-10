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

function createData(name, BPM, key, user, download, listen) {
  return { name, BPM, key, user, download, listen };
}

const rows = [
  createData("Sound", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 1", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 2", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 3", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 4", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 5", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 6", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 7", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 8", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 9", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 10", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 11", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 12", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 13", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 14", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 15", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 16", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 17", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 18", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 19", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 20", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 21", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 22", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 23", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 24", 120, "F", "Jenkin79", "Link", "player"),
  createData("Sound 25", 120, "F", "Jenkin79", "Link", "player"),
];

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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

  const [search, setSearch] = React.useState('')

  function submitSearch(e) {
      e.preventDefault()
      console.log('A search was submitted: ' + search)
      setSearch('')
    if (!search) {
        alert("Please enter something")
    } else if (search === rows.name) {
        
    }
  }

  return (
    <Container maxWidth="lg" className="py-14">
        <div className="grid justify-center py-14">
        <form onSubmit={submitSearch} className="flex flex-wrap">
        <TextField 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        id="standard-basic" 
        label="Search" 
        variant="standard" />
        <button type="submit" value="Submit">Submit</button>
        </form>
{/*         <Search></Search>
 */}        </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">BPM</StyledTableCell>
            <StyledTableCell align="right">Key</StyledTableCell>
            <StyledTableCell align="right">User</StyledTableCell>
            <StyledTableCell align="right">Download</StyledTableCell>
            <StyledTableCell align="right">Listen/Download</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.BPM}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.key}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.user}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.download}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.listen}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
              colSpan={6}
              count={rows.length}
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
}
