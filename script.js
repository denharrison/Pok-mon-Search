let searchInput = document.querySelector(".search-input");
let searchButton = document.querySelector(".search-button");
let pokemonList = document.querySelector('.pokemon-list')
let valueInput = ''

searchInput.addEventListener('input', (event) =>  valueInput = event.target.value )

searchButton.addEventListener('click', async (event) => {

    event.preventDefault()

    try {

        if (valueInput === '') {
            throw new Error('Поле ввода пустое')
        }

        let pokemon = await getPokemon();
        let name = await pokemon.name;
        let weight = await pokemon.weight;
        let height = await pokemon.height;
        let id = await pokemon.id;
        let type = await pokemon.types[0].type.name;
        let image = await pokemon.sprites.front_default;

    pokemonList.innerHTML = `<section class="pokemon-card">
            <h2 class="pokemon-name">${name}</h2>
            <div class="image-container">
                <img src=${image} alt="${name}" class="pokemon-img">
            </div>
            
            <div class="info-grid">
                <div class="info-item">
                    <h3>Характеристики</h3>
                    <p><span>Вес:</span> ${weight} кг</p>
                    <p><span>Рост:</span> ${height} </p>
                    <p><span>ID:</span> #${id}</p>
                </div>
                
                <div class="info-item">
                    <h4>Типы</h4>
                    <div class="types-list">
                        <span class="type-badge">${type}</span>
                    </div>
                </div>
            </div>
        </section>`;

        
    } catch (error) {
       
        pokemonList.innerHTML = ` <section class="error-container">
            <div class="error-content">
                <h2 class="error-title">Покемон не найден!</h2>
                <p class="error-message">К сожалению, мы не смогли найти покемона с таким именем. Попробуйте проверить правильность написания или введите другой запрос.</p>
            </div>
        </section>`;

    }


})

let getPokemon = async () => {

   let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${valueInput}`);

   let pokemon = await response.json();

   return pokemon

};


