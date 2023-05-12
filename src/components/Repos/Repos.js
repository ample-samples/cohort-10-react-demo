import "./Repos.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// show all repositories for me on the page by default when i load the page.
// show also a input field where i can type any user's github username
// when i hit the button, i want to see their repositories on the page.

// clicking a repo should navigate to /user/repo-name and show information about the repo
// I should be able to navigate back to the home page showing a list of repositories for the user

const initialFormData = {
  github: "ManNavic",
};

function Repos({setRepos, repos, username, setUsername, notFound, setNotFound }) {
  // const [username, setUsername] = useState('ManNavic')
  const [formData, setFormData] = useState(initialFormData);
  // const [repoData, setRepoData]= useState([])

  const handleChange = (e) => {
    setFormData({ ...formData, github: e.target.value });
  };

  return (
    <>
      {<img style={{width: "100px"}} src={`https://github.com/${username}.png`} alt="avatar"></img>}

      {repos.map((repo) => (
        <div>
          <Link to={`/${username}/${repo.name}`}>{repo.name}</Link>
        </div>
      ))}
    </>
  );
}

export default Repos;
