import React, { useState } from 'react';
import './AutocompleteInput.css';
import CityService, { GetCitiesByNameResponse } from '../../api/CityService';

function AutocompleteInput() {
  // state de notre composant (recherche, résultats, erreurs, affichage)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<GetCitiesByNameResponse>([]);
  const [apiError, setApiError] = useState<string>();
  const [showResults, setShowResults] = useState(false);

  // fonction de recherche au changement de la valeur de notre input
  const searchCity = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowResults(true);
    setApiError(undefined);
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

  // fonction de recherche au changement de la valeur de notre input
  const selectCity = (name: string) => {
    setShowResults(false);
    setSearchTerm(name);
    setSearchResult([]);
  };

  // rendering du résultat
  const results =
    searchResult.length > 0 ? (
      searchResult.map((resultItem) => (
        <p key={resultItem.code} onClick={() => selectCity(resultItem.nom)}>
          {resultItem.nom}
        </p>
      ))
    ) : (
      <span>Aucun résultat</span>
    );

  return (
    <>
      <div className="input">
        <input type="text" value={searchTerm} onChange={searchCity} />
      </div>
      {showResults && (
        <div className="results">
          {apiError ? <span className="error">{apiError}</span> : results}
        </div>
      )}
    </>
  );
}

export default AutocompleteInput;
