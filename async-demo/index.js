console.log('Before');
// callBack

getUser(1, (user) => {
    getRepositories(user.gitHubUserName, (repos) => {
        console.log('Repos',repos);        
    })
})
console.log('After');

function getUser(id, callBack){
    setTimeout(() => {
        console.log('Reading a user from a database....');
        callBack({id:id, gitHubUserName : 'CP'})
    } , 2000)
}

function getRepositories(username,callBack){
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callBack (['repo1','repo2','repo3'])

    }, 2000)

}