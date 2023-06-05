
import React from "react";
import PropTypes from "prop-types";
import './App.css';
import pokemon from "./pokemon.json"

const PokemonRow = ({ pokemon, onClick }) => (
  <>
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(",")}</td>
      <td>
        <button onClick={() => onClick(pokemon)}>More Information</button>
      </td>
    </tr>
  </>
);

const PokemonType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
    japanese: PropTypes.string.isRequired,
    chinese: PropTypes.string.isRequired,
    french: PropTypes.string.isRequired,
  }),
  type: PropTypes.arrayOf(PropTypes.string.isRequired),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
});

const PokemonInfo = ({ name: { english }, base }) => (
  <div>
    <h2>{english}</h2>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = PokemonType;

function App() {

  const [filter, filterSet] = React.useState("");
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  return <div
    style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}
  >

    <h1 className='title'>Pokemon Search</h1>

    <input
      type="text"
      value={filter}
      onChange={(evt) => filterSet(evt.target.value)}
    />

    <div style={{
      display: "grid",
      gridTemplateColumns: "80% 20%",
      gridColumnGap: "1rem",
    }}
    >
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemon
            .filter(({ name: { english } }) =>
              english
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
            )
            .slice(0, 20)
            .map(pokemon => (
              <PokemonRow
                    pokemon={pokemon}
                    onClick={(pokemon) => selectedPokemonSet(pokemon)}
                  />
            ))}
        </tbody>
      </table>
    </div>
    {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
  </div>
}

export default App;
