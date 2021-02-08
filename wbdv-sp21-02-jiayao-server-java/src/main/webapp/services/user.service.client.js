function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    // this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/jiayao0314/Users';
    var self = this;
    function createUser(User) {
        return fetch(self.url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(User)
        }).then(function (response) {
            return response.json()
        })
    }
    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json()
            })
    }
    // function findUserById(UserId) {
    //
    // }
    function updateUser(UserId, User) {
        return fetch(`${self.url}/${UserId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(User)
        }).then(response => response.json())
    }
    function deleteUser(UserId) {
        return fetch(`${self.url}/${UserId}`,
            {method: 'DELETE'})
    }
}