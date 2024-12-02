import React, { useState, useEffect } from 'react';
import './CatalogCards.css'; 
import cardsData from '../../../api/Cards.json';
import CardItem from '../../../components/card_item/CardItem';
import Filters from '../Filters/Filters';
import Search from '../Filters/Search/Search';

function CatalogCards() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('none');
    const [sortFeat, setSortFeat] = useState('none');
    const [sortOrder, setSortOrder] = useState('descending');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortTypeChange = (event) => {
        setSortType(event.target.value);
    };

    const handleSortFeatChange = (event) => {
        setSortFeat(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const cardsWithIndex = cardsData.map((card, index) => ({ ...card, originalIndex: index }));

    const filteredCards = cardsWithIndex
        .filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(card => sortType === 'none' || card.type === sortType)
        .sort((a, b) => {
            if (sortFeat === 'none') return 0;

            if (sortFeat === 'price') {
                return sortOrder === 'descending' ? b.price - a.price : a.price - b.price;
            }

            if (sortFeat === 'name') {
                return sortOrder === 'descending' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
            }

           return 0;
        });

    return (
        <div>
            <Filters 
                onSortTypeChange={handleSortTypeChange}
                onSortFeatChange={handleSortFeatChange} 
                onSortOrderChange={handleSortOrderChange}
                onSearch={handleSearch}
            />
            <div className='home__cards'>
                {filteredCards.map((card) => {
                    const imageSrc = require(`../../../${card.imgpath}`);
                    return (
                        <CardItem 
                            key={card.originalIndex} 
                            {...card} 
                            index={card.originalIndex} 
                            imageSrc={imageSrc} 
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CatalogCards;