import Route from '@ember/routing/route';

const query = `
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

export default class IndexRoute extends Route {
    async model() {
      const endpoint = `https://codex.opendata.api.vlaanderen.be:8888/sparql?query=${encodeURIComponent(query)}`;
      const response = await fetch(endpoint, { headers: { 'Accept': 'application/sparql-results+json'} } );
      const decisions = await response.json();
  
      let { 'results' : { bindings } } = decisions;
  
      return bindings.map(model => {
        let article = model.article;
        let date = model.date;
        let title = model.title;
        let published = model.published;
        title.value = decode(title.value);
        return { article, date, published, title };
      });
    }
  }
  
  function decode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  