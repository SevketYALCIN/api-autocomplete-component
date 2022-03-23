import React, { useEffect, useMemo, useState } from 'react';
import './AutocompleteInput.css';
import {
  getCitiesByName,
  GetCitiesByNameResponse,
} from '../../api/CityService';
import debounce from 'lodash.debounce';

function AutocompleteInput() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<GetCitiesByNameResponse>([]);
  const [showResults, setShowResults] = useState(false);

  const searchCities = async (value: string) =>
    setSearchResult(await getCitiesByName(value));
  const debouncedSearchCities = useMemo(() => debounce(searchCities, 500), []);

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowResults(event.target.value !== '');
    setSearchTerm(event.target.value);
    debouncedSearchCities(event.target.value);
  };

  const selectCity = (name: string) => {
    setShowResults(false);
    setSearchTerm(name);
    setSearchResult([]);
  };

  const results = searchResult.map((resultItem) => (
    <p key={resultItem.code} onClick={() => selectCity(resultItem.nom)}>
      {resultItem.nom}
    </p>
  ));

  useEffect(() => {
    return () => {
      debouncedSearchCities.cancel();
    };
  }, []);

  return (
    <>
      <div className="input">
        <input type="text" value={searchTerm} onChange={onInputValueChange} />
      </div>
      {showResults && <div className="results">{results}</div>}
    </>
  );
}

export default AutocompleteInput;
