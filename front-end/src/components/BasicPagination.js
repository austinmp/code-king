import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const BasicPagination = ({ pageCount, setPage }) => {
  const classes = useStyles();
  const count = ( !pageCount || isNaN(pageCount) ) ? 1 : pageCount;
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={classes.root}>
      <StyledPagination count={count} onChange={handleChange} />
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

  .MuiPaginationItem-page.Mui-selected, .MuiPaginationItem-page.Mui-selected:hover, .MuiPaginationItem-page.Mui-selected.Mui-focusVisible {
    background: var(--secondary);
    color: white;
  }

`;

export default BasicPagination;