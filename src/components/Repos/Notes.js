import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

function Notes(){
  const [notes, setNotes]= useState([])

  const { username, reponame  } = useParams()

  const getNotes = () => {
    fetch("http://localhost:4000/data")
    .then((res) => res.json())
    .then((json) => setNotes(json))
  }

  useEffect(() => {
    getNotes()
  }, [])

  const deleteComment = (id) => {
    const options = {
      method: "DELETE"
    }

    fetch(`http://localhost:4000/data/${id}`, options) 
    .then(response => {
      return response.json()
    })
    .then(() => {
        getNotes()
      })
  }

  return(
      <>
        <ul>
        {
          notes.slice(0).reverse()
          .filter((el) => {return el.username === username && el.repo === reponame})
          .map((el) => { 
            return <li>Comment: {el.comment} <Link to={`/${username}/notes/${el.id}/edit`}>edit page</Link> <button onClick={() => deleteComment(el.id)}>delete</button></li>
          })
        }
        </ul>
      </>
  )
}
export default Notes
