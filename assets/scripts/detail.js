function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const content = document.getElementById('content');
const name = window.location.search.slice(6);
const urlBasic = 'https://pokeapi.co/api/v2/pokemon/' + name;
const urlFlavor = 'https://pokeapi.co/api/v2/pokemon-species/' + name;
let pokemon;

const fetchPokemon = async() => {
  pokemon = await fetch(urlBasic)
  .then(res => res.json());
}

const showPokemon = async() => {

  await fetchPokemon();

  const div1 = createNode('div'),
        span = createNode('span'),
        h2 = createNode('h2'),
        img = createNode('img'),
        div2 = createNode('div'),
        p = createNode('p'),
        pokemonId = pokemon.id,
        pokemonName = pokemon.name,
        pokemonTypes = pokemon.types.map(function(e) {
          return ' ' + e.type.name;
        });
  div1.setAttribute('id', 'card');
  span.innerHTML = pokemonId;
  h2.innerHTML = pokemonName;
  img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemonId +'.png';
  div2.setAttribute('id', 'details');
  p.innerHTML = '<b>Type:</b> ' + pokemonTypes.toString();
  append(div1, span);
  append(span, h2);
  append(div1, img);
  append(div2, p);
  append(content, div1);
  append(content, div2);
} 

const fetchPokemonFlavor = async() => {
  pokemonsFetched = await fetch(urlFlavor)
  .then(res => res.json())
  .then(function(data) {
    pokemonSpecies = data;
  });
} 

const showFlavor = async() => {

  await showPokemon();
  await fetchPokemonFlavor();

  const div2 = document.getElementById('details');
  const p = createNode('p'),
        pokemonFlavor = pokemonSpecies.flavor_text_entries.find(e => e.language.name == "en").flavor_text;
  p.innerHTML = pokemonFlavor;
  append(div2, p);
 
}

showFlavor();