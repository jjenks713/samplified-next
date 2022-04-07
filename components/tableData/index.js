import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Link from "next/link"


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
    <Box sx={{ flexShrink: 0, ml: 2.5 }} className="text-white">
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon className="text-white" /> : <FirstPageIcon className="text-white" />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight className="text-white" />
        ) : (
          <KeyboardArrowLeft className="text-white" />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft className="text-white" />
        ) : (
          <KeyboardArrowRight className="text-white" />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon className="text-white" /> : <LastPageIcon className="text-white" />}
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
    console.log(sounds)
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sounds.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
      document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
                audios[i].pause();
            }
        }
      }, true);
    })
 
    return (

      <div className="grid text-white justify-center">

        <div aria-label="custom pagination table" className="">

            {(rowsPerPage > 0
              ? sounds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sounds
            ).map((sound) => (
              <div key={sound.createdAt} className="flex flex-wrap sm:flex-nowrap justify-between sm:justify-between rounded-lg table-div relative">
                <div className="absolute bottom-0 right-0 h-24">
                <img className="table-bg" src="/bg-image.svg"></img>

                </div>

                <div component="th" scope="sounds" className="pl-10 text-center sm:text-left sm:border-b-0 relative w-44">
                  <div className="absolute top-6">
                  <a className="text-lg">{sound.name}</a><br></br>
                  <Link href={`/publicuser/${encodeURIComponent(sound.createdBy)}`}><a className="text-sm hover:opacity-70 user-text">{sound.userName}</a></Link>
                  </div>
                  <div className="absolute bottom-6">
                    <p className="text-xs date-text">{sound.date}</p>
                  </div>
                </div>

                <div className="p-4 mt-10 grid justify-center sm:text-left sm:border-b-0">
                  <audio src={sound.url} controls>
                    Your browser does not support HTML5 audio. Please update your browser to view this media content.
                  </audio>
                </div>

                <div className="w-44 relative">
                  <div className="absolute top-6">
                    <ul className="text-xs flex flex-wrap justify-center pt-2 lowercase text-white">
                        <li><a className="bubble-text">{sound.bpm} bpm</a></li>
                        <li><a className="bubble-text">Key {sound.key}</a></li>
                        <li><a className="bubble-text">{sound.loop}</a></li>
                        <li><a className="bubble-text">{sound.instrument}</a></li>
                        <li><a className="bubble-text">{sound.genre}</a></li>

                      </ul>
                  </div>
                </div>

                <div>
                    <a href={sound.url} download={sound.fileName}><img className="mt-7 mr-10" src="/ic_download.svg" alt="Download" /></a>
                </div>
                
              </div>
    
            ))}

    
            {emptyRows > 0 && (
              <tr style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </tr>
            )}
          </div>
          <div className="text-sm table-footer">
            <div>
              <TablePagination
                className="text-white"
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
            </div>
          </div>
      </div>
    )
}

export default TableData