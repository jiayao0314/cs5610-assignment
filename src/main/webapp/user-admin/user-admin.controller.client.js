var $usernameFld
var $passwordFld
var $firstNameFld
var $lastNameFld
var $roleFld
var $createBtn
var theTableBody
var $updateBtn
var UserService = new UserServiceClient()

var Users = [];

function createUser(User) {
    UserService.createUser(User)
        .then(function (actualUser) {
            Users.push(actualUser)
            renderUsers(Users)
        })
}

var selectedUser = null
function selectUser(event) {
    var selectBtn = jQuery(event.target)
    var theId = selectBtn.attr("id")
    selectedUser = Users.find(User => User._id === theId)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)
}

function deleteUser(event) {
    console.log(event.target)
    var deleteBtn = jQuery(event.target)
    var theClass = deleteBtn.attr("class")
    var theIndex = deleteBtn.attr("id")
    var theId = Users[theIndex]._id
    console.log(theClass)
    console.log(theIndex)

    UserService.deleteUser(theId)
        .then(function (status) {
            Users.splice(theIndex, 1)
            renderUsers(Users)
        })
}

function renderUsers(Users) {
    theTableBody.empty()
    for (var i = 0; i < Users.length; i++) {
        var User = Users[i]
        theTableBody
            .prepend(`
    <tr>
        <td>${User.username}</td>
        <td>&nbsp;</td>
        <td>${User.firstName}</td>
        <td>${User.lastName}</td>
        <td>${User.role}</td>
        <td >
            <i class="fas fa-times wbdv-delete " id="${i}"></i>
            <i class="fas fa-pencil-alt wbdv-select float-right" id="${User._id}"></i>
        </td>
    </tr>
  `)
    }
    jQuery(".wbdv-delete")
        .click(deleteUser)
    jQuery(".wbdv-select")
        .click(selectUser)
}
// renderUsers(Users)

function updateUser() {
    console.log(selectedUser)
    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstName = $firstNameFld.val()
    selectedUser.lastName = $lastNameFld.val()
    selectedUser.role = $roleFld.val()
    UserService.updateUser(selectedUser._id, selectedUser)
        .then(function (status) {
            var index = Users.findIndex(User => User._id === selectedUser._id)
            Users[index] = selectedUser
            renderUsers(Users)
        })
}

function init() {
    $usernameFld = $("#usernameFld")
    $passwordFld = $("#passwordFld")
    $firstNameFld = $("#firstNameFld")
    $lastNameFld = $("#lastNameFld")
    $roleFld = $("#roleFld")
    $createBtn = $("#wbdv-create")
    $updateBtn = $("#wbdv-update")
    theTableBody = jQuery("tbody")

    $updateBtn.click(() => {
        updateUser()
        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
    })
    $createBtn.click(() => {
            createUser({
                username: $usernameFld.val(),
                password: $passwordFld.val(),
                firstName: $firstNameFld.val(),
                lastName: $lastNameFld.val(),
                role: $roleFld.val()
            })
            $usernameFld.val("")
            $passwordFld.val("")
            $firstNameFld.val("")
            $lastNameFld.val("")
        }
    )

    UserService.findAllUsers()
        .then(function (actualUsersFromServer) {
            Users = actualUsersFromServer
            renderUsers(Users)
        })
}
jQuery(init)
