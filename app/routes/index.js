import Route from '@ember/routing/route';
import { query } from '../queries';

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
  