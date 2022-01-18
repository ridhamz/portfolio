import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import './pagination.css';

const Pagination = (props) => {
  const {
    itemsCount,
    pageSize,
    currentPage,
    onPageChange
  } = props
  const pageCount = Math.ceil(itemsCount / pageSize);
  if(pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <div className="pagination center">
      {pages.map(page => (
        <div
          href={null}
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'active' : 'page-item'}
        >
          {page}
        </div>
      ))}
    </div>
  )
}

Pagination.prototype = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
};

export default Pagination;