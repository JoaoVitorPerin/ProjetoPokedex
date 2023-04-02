const pokemonName = document.querySelector('.pokemonName')
const pokemonNumber = document.querySelector('.pokemonNumber')
const pokemonImg = document.querySelector('.pokemonImg')

const form = document.querySelector('.form')
const inputSearch = document.querySelector('.inputSearch')
const buttonAnterior = document.querySelector('.buttonAnterior')
const buttonProximo = document.querySelector('.buttonProximo')

let searchPokemon = 1;

const fetchPokemon  = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data
    } 
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        searchPokemon = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    } else{
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :('
        pokemonNumber.innerHTML = '404';
    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
    inputSearch.value = '';
})

buttonAnterior.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
})

buttonProximo.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);