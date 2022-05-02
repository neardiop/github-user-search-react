import { useState } from "react";

const SearchUser = () => {

    const [userList, setUserList] = useState([])
    const [error, setError] = useState('')

    const searchUser = (e) => {
        fetch(`https://api.github.com/search/users?q=${e.target.value}`, {
            "method": "GET",
        })
        .then(response => response.json())
        .then(response => {
            if(response?.items) {
                setUserList(response?.items)
                setError('')
            } else
                setError('Please try again later')
        })
        .catch(err => { console.log(err); 
        });
    }
    

    return (
        <div>
            <div>
                <input type="text" name="username" onChange={(e) => searchUser(e)}/>
                <label htmlFor="username">Username</label>
            </div>
            <div style={{marginTop:10}}>
                {!userList?.length ? <div>No Results</div> : (
                    userList?.map(({avatar_url, html_url, login}) => (
                        <div key={login} style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#ccc', width:'60%', padding:10}}>
                            <img  style={{height:30, width:30}} alt="profil" src={avatar_url} />
                            <div>{login}</div>
                            <div>
                            <a href={html_url} target="_blank" rel="noreferrer">Github Url</a>
                            </div>
                        </div>
                    ))
                )}
                {error}
            </div>
        </div>
    )
}

export default SearchUser;