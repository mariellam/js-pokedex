function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const pokeList = document.getElementById('pokedex');
const searchBox = document.getElementById('searchbox');
const url = "https://pokeapi.co/api/v2/pokemon/?limit=150";
let pokemons;
let searchTerm = '';

const fetchPokemons = async() => {
  pokemonsFetched = await fetch(url)
  .then(res => res.json())
  .then(function(data) {
    pokemons = data.results;
  });
}

const showPokemons = async() => {
  pokeList.innerHTML = '';

  await fetchPokemons();

  pokemons
  .filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) 
  .forEach((pokemon, i) => {
    const li = createNode('li'),
          a = createNode('a'),
          div = createNode('div'),
          h2 = createNode('h2'),
          img = createNode('img'),
          pokemonId = pokemon.url.slice(34, -1);
          pokemonName = pokemon.name;
    a.href = 'detail.html' + '?' + 'name=' + pokemonName;
    div.innerHTML = '<span>'+ pokemonId + '</span>';
    h2.innerHTML = pokemonName;
    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemonId +'.png';
    append(li, a);
    append(a, div);
    append(a, img);
    append(div, h2);
    append(pokeList, li);
  });
}

showPokemons();

searchBox.addEventListener('input', e => {
  searchTerm = e.target.value;
  showPokemons();
});