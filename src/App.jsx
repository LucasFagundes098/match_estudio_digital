import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [itens, setItens] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(itens.length / itensPerPage)
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = itens.slice(startIndex, endIndex)


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => data)

      setItens(result)
    }
      fetchData()
  },[])

  return (
    <div className="App">

      <div>
        {Array.from(Array(pages), (item,index) => {
          return (
            <button value={index} onclick={(e) => setCurrentPage(Number(e.target.value))}>{index}</button>
          )
        })}
      </div>

        {currentItens.map((item, key) => {
          return(
            <div key={(key)} className="item">
              <h3>{item.id}</h3>
              <p>{item.title}</p>
            </div>
          )
        })}
    </div>
  )
}

export default App
