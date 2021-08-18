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
    border-spacing: 0 10px;
    min-width: 700px;
    overflow: auto;

    tbody {
        tr:nth-child(odd) {
            background-color: #FFFFFF;
        }
        
        tr:nth-child(even) {
            background-color: #f3f4f6; 
        }
    }

    thead {
        background: var(--title-primary);
        color: white;
    };

    tbody tr {
            background: white;
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
        padding-left: 0.5em;
        padding-right: 0.5em;
    };
`;


export default Table;