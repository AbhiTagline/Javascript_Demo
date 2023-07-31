
const countryStateCityData = {
  "India":{
    Gujarat : ["Surat","Vadodara","Rajkot"],
    Maharashtra:["Mumbai","Nagpur","Pune"],
    Goa: ["Panjim","Margao","Mapusa"]
  },
  "Nepal":{
    Koshi:["Biratnagar","Inaruwa","Dhankutta"],
    Madhesh: ["Kalaiya","Janakpur","Birgunj"],
    Bagmati: ["Kathmadnu","Lalitpur","Bidur"]
  },
}


// function to create a dropdown for country
function getCountry(){
  let country = document.getElementById('country')
  addOption(country,'Select an Option','none')
  let values = Object.keys(countryStateCityData)
  for(i=0;i<values.length;i++){
    addOption(country,values[i],values[i])
  }
}
getCountry()



// to change the state with respect to country selected
function getState(){
  let country = document.getElementById('country').value
  let state = document.getElementById("state") 
  console.log(countryStateCityData)
  state.innerHTML =  "";
  let len = Object.keys(countryStateCityData)
  if ( country !== "none"){
    addOption(state,'Select an Option','none')
  for(i=0;i<len.length ;i++){
      for(const states in countryStateCityData[country]){
        addOption(state,states,states)
      }
    break
  }
}
else{
  state.innerHTML=""
}
}


// to change the cities with respect to state selected
function getCity(){
  let state = document.getElementById("state").value;
  let cities = document.getElementById("city");
  let value = Object.values(countryStateCityData)
  cities.innerHTML = "";
  if (!(state === "none")){
    addOption(cities,'Select an Option','none')
  for (i=0;i<value.length;i++){
    
    let len = value[i][state]
    if (len){
      for(j=0;j<len.length;j++){
        addOption(cities,len[j],len[j])
      }
      break
    }
  }
}
else{
  cities.innerHTML = ""
}
}


function addOption(selectElement, text, value) {
  var option = document.createElement("option");
  option.text = text;
  option.value = value;
  selectElement.add(option);
}



const info = [
  {
    name: "Abhi",
    email: "abhi@gmail.com",
    gender: "male",
    hobby: "reading",
    age:'21',
    country: "India",
    state: "Goa",
    city: "Panjim",
    delete: '',
    modify: '',
    time:Date().toString().slice(15,24),
  },
  {
    name: "Ashu",
    email: "ashu@gmail.com",
    gender: "male",
    hobby: "sports",
    age:'22',
    country: "Nepal",
    state: "Bagmati",
    city: "Kathmadnu",
    delete: '',
    modify: '',
    time:Date().toString().slice(15,24),
  },
];



// fucntion to retirve submitted data
function getData() {
  console.log('got in')
  let name = document.getElementById("name").value;
  if (name !== "") {
    let email = document.getElementById("email").value;
    // let gender = document.getElementsByName("gender")[0].checked
    //   ? "male"
    //   : "female";
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let hobby = "";
    let checkboxes = document.querySelectorAll('input[id="hobby"]:checked');
    checkboxes.forEach((checkbox) => {
      hobby += checkbox.value + " ";
    });
    if(hobby !== ""){
      let age = document.getElementById("age").value;
      console.log(age >= 20 && age < 60)
      if (age >= 20 && age < 60){
        let country = document.getElementById("country").value;
        let state = (document.getElementById("state").value);
        if (state !== 'none' && state !== ""){
          let city = document.getElementById("city").value;
          console.log('doing')
          if(city === "none" && city !== ""){
            alert("Please select a city")
          }
          else{
            let createdAt = new Date()
            let details = {
              name,
              email,
              gender,
              hobby: hobby,
              age,
              country,
              state,
              city,
              delete: "",
              modify: "",
              time: createdAt.toString().slice(16, 24),
            };
            console.log(rowIndex,rowIndex !== undefined)
            if (rowIndex !== undefined){
              console.log(details)
              info[rowIndex] = details
              console.log(rowIndex,details)
              console.log("done")
              console.log(info)
            }
            else{
              info.push(details)
              document.getElementById('form1').reset()
              return details
            }
          }
        }
        else{
          alert("Please Select State")
        }
      }
      else{

        alert('Please enter age between 20 to 60')
        document.getElementById('age').vlaue = ''
      }
    }
    else{
      alert("Please select atleast one of the Hobbies to proceed")
    }
    
  } 
  else {
    return [];
  }
}


// function to display the array data into the table
function displayData(data) {
  let table = document.getElementById("display");
  while (table.rows.length > 1) {
    table.deleteRow(-1);
  }
  let dataArray = data ? data : info;
  let input = document.getElementById('search');
  let search = input.value.toLowerCase();
  for (let i = 0; i < dataArray.length; i++) {
    if (!search || dataArray[i]['name'].toLowerCase().includes(search)) {
      let count = 0;
      let row = table.insertRow(-1);
      for (const key in dataArray[i]) {
        if (!(key === "time")) {
          if (count === 8) {
            row.insertCell(count).innerHTML =
              '<button id="del" onclick="deleteRow(this)">Delete</button>';
          } else if (count === 9) {
            row.insertCell(count).innerHTML =
              '<button id="edit" onclick="editRow(this);newButton()" >Edit</button>';
          } else {
            row.insertCell(count).innerText = dataArray[i][key];
          }
          count += 1;
        }
      }
    }
  }
}

// displayData()


// function to delete the row according to the name 
function deleteRow(button) {
  let row = button.parentNode.parentNode;
  let rowIndex = row.rowIndex;

  let nameToDelete = row.cells[0].innerText; // Assuming the first cell contains the 'name' data
  let indexToDelete = info.findIndex(item => item.name === nameToDelete);
  
  if (indexToDelete !== -1) {
    document.getElementById("display").deleteRow(rowIndex);
    info.splice(indexToDelete, 1);
    document.getElementById('form1').reset();
    document.getElementById('state').innerHTML= ''
    document.getElementById('city').innerHTML= ''

    if (document.getElementById('update') !== null) {
      let row1 = document.getElementById('update').parentNode;
      rowIndex = undefined;
      row1.innerHTML = '<input type="submit" onclick="getData()" value="Submit" id="submit" />';
    }

    originalInfo = [...info];

    if (searchResults) {
      let searchIndex = searchResults.findIndex(item => item.name === nameToDelete);
      if (searchIndex !== -1) {
        searchResults.splice(searchIndex, 1);
      }
    }
  }
}


// global index position of a row in a table
let rowIndex;

function editRow(button) {
  let row = button.parentNode.parentNode; 
  rowIndex = row.rowIndex-1; 
  let hobby = info[rowIndex]['hobby'].split(" ")
  document.getElementById('name').value = info[rowIndex]['name']
  document.getElementById('email').value = info[rowIndex]['email'];
  (info[rowIndex]['gender'] === 'male') ? document.getElementById('male').checked = true : document.getElementById('female').checked = true
  let checkboxes = document.querySelectorAll('#hobby')
  for (let i = 0; i < checkboxes.length; i++) {
    let checkbox = checkboxes[i];
    let checkboxValue = checkbox.value;
    if (hobby.includes(checkboxValue)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }
  document.getElementById('country').value = info[rowIndex]['country']
  getState();
  document.getElementById('age').value = info[rowIndex]['age']
  document.getElementById('state').value = info[rowIndex]['state']
  getCity();
  document.getElementById('city').value = info[rowIndex]['city']
  
}



function newButton(){
  let button = document.getElementById('button')
  if (document.getElementById('submit') !== null){
    submit = document.getElementById('submit') 
    console.log(submit )
    submit.remove()
  }
  button.innerHTML = "<button id='update' onclick = 'getData();updateData()' >Update</button>" + "<button id='cancel' onclick='cancelUpdate()'>Cancel</button>"

}



function updateData(){
  // getData()
  console.log(info)
  console.log(rowIndex)
  const table = document.getElementById('display');
  while (table.rows.length > 1) {
    table.deleteRow(-1);
  }
  // staticData()
  setTimeout(displayData,800)
  document.getElementById('form1').reset()
  document.getElementById('state').innerHTML= ''
  document.getElementById('city').innerHTML= ''
  let row = document.getElementById('update').parentNode
  // rowIndex = undefined
  row.innerHTML = '<input type="submit" onclick="getData()" value="Submit" id="submit" />'

}
// updateData()


// function to change the update button and cancel and replce with submit button again
function cancelUpdate(){
  document.getElementById('form1').reset()
  let row = document.getElementById('update').parentNode
  document.getElementById('state').innerHTML= ''
  document.getElementById('city').innerHTML= ''
  rowIndex = undefined
  row.innerHTML = '<input type="submit" onclick="getData();newData()" value="Submit" id="submit" />'
}


// function for user to search there details according to there names
function searchButton(){
  let input = document.getElementById('search')
  let timeout = null 
  // used timeout to let user complete his typing 
  input.addEventListener('keyup', function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(searchData, 1000);
});
}

// a varible to store all the results form the array
let originalInfo = [];


// Function to insert the table with the provided data
// function insertData(data) {
//   const table = document.getElementById('display');
//   while (table.rows.length > 1) {
//     table.deleteRow(-1);
//   }
//   data.forEach(item => {
//     // Process each item and add it to the table
//     let count = 0;
//     let row = table.insertRow(-1);
//     for (const key in item) {
//       if (!(key === 'time')) {
//         if (count === 8) {
//           row.insertCell(count).innerHTML =
//             '<button id="del" onclick="deleteRow(this)">Delete</button>';
//         } else if (count === 9) {
//           row.insertCell(count).innerHTML =
//             '<button id="edit" onclick="editRow(this);newButton()" >Edit</button>';
//         } else {
//           row.insertCell(count).innerText = item[key];
//         }
//         count += 1;
//       }
//     }
//   });
// }


let searchResults = [];

// search data according to the text entered in the search box
function searchData() {
  let input = document.getElementById('search');
  let search = input.value.toLowerCase();
  if (search !== "") {
    // used filter to check if the user-entered data is present in the array and if present then it is stored in the variable
    searchResults = info.filter(item => item['name'].toLowerCase() === search);
    displayData(searchResults);
  } else {
    // Update originalInfo with all current data
    originalInfo = [...info];
    displayData(originalInfo);
  }
}


originalInfo = [...info];

function sortByName() {
  info.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  displayData(info);
}


function sortByNameDescending() {
  info.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return 1; 
    } else if (nameA > nameB) {
      return -1; 
    }
    return 0;
  });

  displayData(info);
}


function sortData(){
  let sort = document.getElementById('sort').value
  if(sort === "descend"){
    sortByNameDescending()
    displayData()
  }
  else{
    sortByName()
    displayData()
  }
}