import { useState } from 'react'
import './App.css'

const initialProducts = [
  { id: 1, title: 'T-shirt', category: 'Clothing', price: 19.99 },
  { id: 2, title: 'Jeans', category: 'Clothing', price: 49.99 },
  { id: 3, title: 'Headphones', category: 'Electronics', price: 89.99 },
  { id: 4, title: 'Novel', category: 'Books', price: 14.99 },
]

function App() {
  const [dark, setDark] = useState(false)
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])

  const categories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))]

  const filtered = category === 'All' ? initialProducts : initialProducts.filter(p => p.category === category)

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header className="app-header">
        <h1>Shopping App</h1>
        <div className="header-controls">
          <button onClick={() => setDark(d => !d)} aria-pressed={dark}>
            {dark ? 'Dark' : 'Light'}
          </button>
          <div className="cart">
            <strong>Cart:</strong> {cart.reduce((s, i) => s + i.qty, 0)} items
            {cart.length > 0 && (
              <ul>
                {cart.map(i => (
                  <li key={i.id}>{i.title} × {i.qty}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      <main className="main">
        <div className="filters">
          <label>
            Category:
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <section className="products">
          {filtered.length === 0 ? (
            <p>No products available.</p>
          ) : (
            filtered.map(p => (
              <div className="product" key={p.id}>
                <div className="product-info">
                  <h3>{p.title}</h3>
                  <p className="category">{p.category}</p>
                  <p className="price">${p.price.toFixed(2)}</p>
                </div>
                <div className="product-actions">
                  <button onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default App
