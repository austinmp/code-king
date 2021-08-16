import styled from "styled-components";

const Table = ({ children }) => {
    return (
        <StyledTable>
            {children}
        </StyledTable>
    )
}

const StyledTable = styled.table`
    width:100%;
    border-collapse:separate; 
    border-spacing: 0 0.3em;

    thead {
        background: var(--title-primary);
        color: white;
    };

    tbody tr {
        :hover {
            cursor: pointer;
            transform: scale(1.02);
            box-shadow: 0px 0px 16px 0 rgba(0, 0, 0, 0.5);
        }
    }

    .edit-icon:hover {
        transform: scale(1.3);
        color: var(--hover-color);  
    }

    td, th {
        text-align: center;
        padding-bottom: 1em;
        padding-top: 1em;
    };
`;


export default Table;