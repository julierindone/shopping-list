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
  let inputField = inputFieldEl.value

  push(shoppingListInDB, inputField)
})

onValue(shoppingListInDB, function (snapshot) {
  // saving the shoppingListInDB object as an array:
  let itemsArray = Object.entries(snapshot.val())
  clearList()

  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i]

    appendItemToShoppingList(currentItem)
  }
})

// getting my functions out of the way //
function appendItemToShoppingList(item) {
  let itemId = item[0]
  let itemValue = item[1]
    console.log(`current item id is ${itemId}.\ncurrent item value is ${itemValue}`)

  let newEl = document.createElement("li")
  newEl.textContent = `${item}`
  // newEl.textContent = shoppingListEl.append(newEl)
shoppingListEl.append(newEl)

  clearInput()
}

function clearInput() {
  inputFieldEl.value = null
}

function clearList() {
  shoppingListEl.innerHTML = null
}


// // it's going to have to find the id for the value, feed it into "items/{whatever}", and then remove it w the remove function.
// function removeItem(array) {
//   console.log(`inside removeitem - ${array.length}`)


//   for (let i = 0; i < array.length; i++) {

//     if (array[i] === "toys") {

//       console.log(`${array[i]} - it's a toy... deleting.`)
//       remove((array[i])[0])
//     } else {
//       console.log(`${array[i]} - not a toy`)
//     }
//   }


  // let id = 

  // let itemToRemove = ref(database, `items/${id}`)
  // remove(itemToRemove)
