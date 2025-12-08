import { useEffect, useState } from "react"


function App() {

  const [query, setQuery] = useState("");
  const [hint, setHint] = useState([])

  useEffect(() => {
    if (!query.trim()) {
      setHint([]);
      return
    }

    fetch(`http://localhost:3333/products?search=${query}`)
      .then(res => res.json())
      .then(data => setHint(data))
      .catch(err => console.error(err))
  }, [query])

  console.log(hint)

  return (
    <>
      <div>
        <h1>EX Autocomplete</h1>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Cerca prodotto..."
        />
      </div>
      {hint.length > 0 && (
        <div className="dropdown">
          {hint.map((p) => (
            <p key={p.id}>{p.name}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default App
