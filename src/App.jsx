import { useEffect, useState } from "react"


function App() {

  const [query, setQuery] = useState("");
  const [hint, setHint] = useState([])

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setHint([]);
      return
    }

    try {
      const res = await fetch(`http://localhost:3333/products?search=${query}`)
      const data = await res.json();
      setHint(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts(query)
  }, [query])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="">
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
        </div>
      </div>
    </>
  )
}

export default App
