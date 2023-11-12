import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://realtime-database-6172e-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)

const shoppingListInDB = ref(database, "items")

const addBtn = document.getElementById("add-btn")
const inputValueEl = document.getElementById("input-value")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListInDB, function (snapshot) {
  let shoppingArray = Object.values(snapshot.val())
  clearList()

  for (let i = 0; i < shoppingArray.length; i++) {
    addItemToList(shoppingArray[i])
  }
})

addBtn.addEventListener("click", function () {
  let inputValue = inputValueEl.value
  push(shoppingListInDB, inputValue)
})

function addItemToList(addItem) {
  shoppingListEl.innerHTML += `<li>${addItem}</li>`
  clearInput()
}

function clearInput() {
  inputValueEl.value = null
}

function clearList() {
  shoppingListEl.innerHTML = null
}