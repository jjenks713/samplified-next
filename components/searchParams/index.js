/* import { useState, useEffect, useContext } from 'react';
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";





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

const ALL = 'all';

const searchParams = () => {
    const [name, setName] = useState('');
    const [BPM, setBPM] = useState('');
    const [key, setKey] = useState('');
    const [user, setUser] = useState('');

    return (
        <div>
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
        </div>
    )
}

export default searchParams; */