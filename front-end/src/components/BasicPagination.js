import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import styled from "styled-components";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function BasicPagination({ pageCount, setPage }) {
  const classes = useStyles();

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={classes.root}>
      <StyledPagination count={pageCount} onChange={handleChange} />
    </div>
  );
}


const StyledPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    color: white;
  }

  .MuiPaginationItem-page:hover {
    background-color: #20232a;
  }

  .MuiPaginationItem-page.Mui-selected {
    background-color: #6568F4;
  }

`;

export default BasicPagination;