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
    color: black;
  }

  .MuiPaginationItem-page:hover {
    background-color: var(--hover-color);
  }

  .MuiPaginationItem-page.Mui-selected {
    background-color: var(--primary);
  }

`;

export default BasicPagination;