export const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX eli: <http://data.europa.eu/eli/ontology#>
PREFIX aw: <https://data.vlaanderen.be/id/concept/AardWetgeving/>

SELECT DISTINCT * WHERE {
  ?article eli:type_document aw:Decreet;
          eli:is_realized_by ?published.

  ?published eli:date_publication ?date;
                   eli:id_local ?itemid;
                       eli:title ?title.
 }
ORDER BY DESC(?date)
LIMIT 5`