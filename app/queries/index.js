export const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX el: <http://data.europa.eu/eli/ontology#>
PREFIX aw: <https://data.vlaanderen.be/id/concept/AardWetgeving/>

SELECT DISTINCT * WHERE {
  ?article el:type_document aw:Decreet;
          el:is_realized_by ?published.

  ?published el:date_publication ?date;
                     el:title ?title.
 }
ORDER BY DESC(?date)
LIMIT 5`