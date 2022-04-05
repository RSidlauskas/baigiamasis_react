import Pagination from 'react-js-pagination';
import { useContext } from 'react';
import Context from "../../context/context";
import "./Pagination.css"

const PaginationGlobal = ({ activePage, handlePageChange, totalCount }) => {

    const { defaultPerPageCount } = useContext(Context);


    return (
        <div className='d-flex justify-content-center'>
            <Pagination
                activePage={activePage === 0 ? 1 : activePage}
                itemsCountPerPage={defaultPerPageCount}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass='page-item'
                hideFirstLastPages={true}
                nextPageText='Sekantis >'
                prevPageText='< Buvęs'
                hideDisabled={true}
                linkClass="page-link"
            />
        </div>
    );
};

export default PaginationGlobal;
