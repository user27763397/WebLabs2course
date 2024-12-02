import React from 'react';
import './Filters.css';
import Search from './Search/Search';
import Select from './Select';


function Filters({ onSortTypeChange, onSortFeatChange, onSortOrderChange, onSearch }) {

    const filterOptions = [
        { value: "none", label: "None" },
        { value: "motherboards", label: "Motherboards" },
        { value: "gpus", label: "Videocards" },
        { value: "cpus", label: "Processors" },
    ];

    const sortFeatOptions = [
        { value: "none", label: "None" },
        { value: "price", label: "Price" },
        { value: "name", label: "Name" },
    ];

    const sortOrderOptions = [
        { value: "descending", label: "Descending" },
        { value: "ascending", label: "Ascending" },
    ];

    return (
        <div className="filters">
            <div className="filters__select">
                <Select 
                    label="Filter:"
                    name="sortType"
                    options={filterOptions}
                    onChange={onSortTypeChange}
                />
                <Select 
                    label="Sort:"
                    name="sortFeat"
                    options={sortFeatOptions}
                    onChange={onSortFeatChange}
                />
                <Select 
                    label="Order:"
                    name="sortOrder"
                    options={sortOrderOptions}
                    onChange={onSortOrderChange}
                />
            </div>
            <Search onSearch={onSearch} />
        </div>
    );
}

export default Filters;