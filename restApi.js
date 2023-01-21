document.querySelector('.btn').addEventListener('click', submit);

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/91f449b0e5e3449c8c8be29453804962/data")
        .then((res) => {
            console.log(res);

            for (let i = 0; i < res.data.length; i++) {
                showNewUserOnScreen(res.data[i])
            }

        })
        .catch((err) => {
            // document.body.innerHTML = document.body.innerHTML + "<h4>somthing is wrong</h4>"
            console.log(err);
        })

})

function showNewUserOnScreen(user) {
    // user = {
    //     _id: '',
    //     name: '',
    //     email: ''
    // }

    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#number').value = '';
    if (localStorage.getItem((user.name) !== null)) {
        removeUserFromScreen(user.name)
    }
    const parentNode = document.getElementById('users');
    const childHtml = `<li id=${user._id}> ${user.email} - ${user.name} - ${user.number}
    <button onclick=deleteUser('${user._id}')>delete</delete>
    <button onclick="editUserDetails('${user.name}','${user.email}','${user.number}','${user._id}')">edit</button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHtml;
}


function editUserDetails(name, email, number, userId) {
    document.querySelector('#name').value = name;
    document.querySelector('#email').value = email;
    document.querySelector('#number').value = number;
    deleteUser(userId)
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/91f449b0e5e3449c8c8be29453804962/data/${userId}`)
        .then((res) => {
            console.log(res);
            removeUserFromScreen(userId)
        })
        .catch((err) => console.log(err))
    // console.log(name)
    // localStorage.removeItem(name);
    // removeUserFromScreen(name);
}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('users');
    const chilNodeToBeDeleted = document.getElementById(userId);
    if (chilNodeToBeDeleted) {
        parentNode.removeChild(chilNodeToBeDeleted)
    }
}


function submit(e) {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const number = document.querySelector('#number').value;

    const obj = {
        name,
        email,
        number
    }

    axios.post("https://crudcrud.com/api/91f449b0e5e3449c8c8be29453804962/data", obj)
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })

   }