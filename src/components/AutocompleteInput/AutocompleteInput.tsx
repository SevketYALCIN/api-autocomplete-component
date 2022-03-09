import React, { useState } from 'react';
import './AutocompleteInput.css';
import CityService, { GetCitiesByNameResponse } from '../../api/CityService';

function AutocompleteInput() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<GetCitiesByNameResponse>([]);
  const [apiError, setApiError] = useState<string>();

  const searchCity = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    try {
      const response = await CityService.getCitiesByName(inputValue);
      setSearchResult(response);
    } catch (e) {
      const error = e as Error;
      setApiError(error.message);
    }
  };

  return (
    <>
      <div className="input">
        <input type="text" value={searchTerm} onChange={searchCity} />
      </div>
      <div className="results">
        {searchResult.map((resultItem) => (
          <p key={resultItem.code}>{resultItem.nom}</p>
        ))}
      </div>
    </>
  );
}

export default AutocompleteInput;
