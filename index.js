import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
  let inputField = inputFieldEl.value

  push(shoppingListInDB, inputField)
})

onValue(shoppingListInDB, function (snapshot) {
  // saving the shoppingListInDB object as an array:
  let itemsArray = Object.values(snapshot.val())
  clearList()

  for (let i = 0; i < itemsArray.length; i++) {
    appendItemToShoppingList(itemsArray[i])
  }
})

// getting my functions out of the way //
function appendItemToShoppingList(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`
  clearInput()
}

function clearInput() {
  inputFieldEl.value = null
}

function clearList() {
  shoppingListEl.innerHTML = null
}