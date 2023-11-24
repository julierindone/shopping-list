import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://realtime-database-6172e-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "items")

const inputFieldEl = document.getElementById("input-field")
const addBtnEl = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")

addBtnEl.addEventListener("click", function () {
  let inputField = inputFieldEl.value.trim()

  // check for empty value. push item to firebase or display error
  if (inputField === "") {
    let message = "Please enter an item."
    document.getElementById("error-message").innerHTML = message
  }
  else {
    push(shoppingListInDB, inputField)
  }
})

// reset error message once focus is back on input box
inputFieldEl.addEventListener("focus", function () {
  document.getElementById("error-message").innerHTML = ""
})

onValue(shoppingListInDB, function (snapshot) {
  // Check to see if there are items in the list.
  if (!snapshot.exists()) {
    clearList()
    shoppingListEl.innerHTML = `<li class="empty-list">No items here... yet!</li>`
  }
  else {
    // saving the shoppingListInDB object as an array:
    let itemsArray = Object.entries(snapshot.val())

    // clear list so it can be rebuilt from db
    clearList()

    // for each item in the db, call function to append to list in ui
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i]
      appendItemToShoppingList(currentItem)
    }
  }
})

function appendItemToShoppingList(item) {
  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement("li")

  // create a li with the name of the item
  newEl.textContent = `${itemValue}`
  shoppingListEl.append(newEl)

  clearInput()

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
    remove(exactLocationOfItemInDB)
  })
}

function clearInput() {
  inputFieldEl.value = null
}

function clearList() {
  shoppingListEl.innerHTML = null
}
