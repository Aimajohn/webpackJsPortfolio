import Template from './templates/Template.js'

import '@styles/main.css'

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();

console.log('johnny, la gente esta muy loca')