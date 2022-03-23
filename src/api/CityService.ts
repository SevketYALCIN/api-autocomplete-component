export type GetCitiesByNameResponse = {
  nom: string;
  code: string;
}[];

export const getCitiesByName = async (searchTerm: string) => {
  if (searchTerm === '') return [];

  const response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${searchTerm}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    }
  );

  const json: GetCitiesByNameResponse = await response.json();

  if (response.ok) {
    return json ? json.slice(0, 10) : [];
  } else {
    const error = new Error('Une erreur est survenue avec le serveur.');
    return Promise.reject(error);
  }
};
