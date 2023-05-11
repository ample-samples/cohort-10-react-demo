import './Repos.css'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'


// show all repositories for me on the page by default when i load the page.
// show also a input field where i can type any user's github username
// when i hit the button, i want to see their repositories on the page.

// clicking a repo should navigate to /user/repo-name and show information about the repo
// I should be able to navigate back to the home page showing a list of repositories for the user

const initialFormData = {
  github: 'ManNavic'
}

function Search () {
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState('ManNavic')
  const [formData, setFormData] = useState(initialFormData)
  const [notFound, setNotFound] = useState(false)
  const [repoData, setRepoData]= useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // https://api.github.com/users/${username}/repos
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json()) // read the response format which is stored in JSON
      .then(data => {
      if (data.message === 'Not Found') {
        setNotFound(true)
      } else {
        // console.log(data)
        setNotFound(false)
        setRepos(data)
        
      }
    })
  }, [username])

  useEffect(() => {
    // handleData()
  }, [repos])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('repos', repos, '\n', 'repoData', repoData)
    const userName = formData.github
    setUsername(userName)
    // if the username key doesn't exist inside of db.json, create it and 
    // give it a value of an object, which has keys for each repo name and 
    // values (for those keys) of an empty array
    if (!repos.hasOwnProperty(userName)) {
      repos[userName] = {}
    // repoData

    }
    navigate(`/${username}`)
  }

  const handleChange = (e) => {
    setFormData({...formData, github: e.target.value})
  }


//   function handleData(){
//     const reposList = []
//     for (let i = 0; i < repos.length;i++) {
//       const reposData = repos[i].name
//       // console.log(reposData)
//       reposList.push(reposData)
//     }
//     setRepoData(reposList)
//   }

  return (
    <>
      {
        notFound && <div>user '{username}' does not exist</div>
      }
      <form onSubmit={handleSubmit}>
        <input type="text" name="github" onChange={handleChange} value={formData.github}/>
        <button>get repos</button>
      </form>
    </>
  )
}


export default Search