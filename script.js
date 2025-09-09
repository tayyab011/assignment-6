  
 const navCategoryContainer = document.getElementById("navCategoryContainer");
 const treeCardParent = document.getElementById("treeCardParent");
 const historyContainer = document.getElementById("historyContainer");
 const productDivGrandParent = document.getElementById("productDivGrandParent");
 let totalPrice = Number(document.getElementById("totalPrice").innerText);

 let allTreesData=[];

//spinner manage
const manageSpinner = (status) => {
  if (status == true) {
   
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("treeCardParent").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("treeCardParent").classList.remove("hidden");
  }
};
//doing history part 1
treeCardParent.addEventListener("click",((e)=>{
if (e.target.innerHTML === "Add to Cart") {
 
  const name = e.target.parentNode.childNodes[1].innerHTML;
  const id = e.target.parentNode.childNodes[1].id;
  const price = Number(
    e.target.parentNode.childNodes[5].childNodes[3].childNodes[1].innerHTML
  );
  let exist = allTreesData.find((e)=>e.id === id)
 if (!exist) {
   allTreesData.push({
     name: name,
     price: price,
     id: id,
   });
   historyAddData(allTreesData);
   alert(`${name} tree has been add to cart`)
 }else{
  alert("This item is already in the cart");
 }
}
}))
// history part 2
const historyAddData=(data)=>{
  historyContainer.innerHTML="";
   totalPrice = 0;
data.map((e)=>{
  historyContainer.innerHTML += `
  <li class="flex justify-between items-center text-sm bg-[#F0FDF4] space-y-2 px-3">
         <div >
           <h4 class="font-bold ">${e.name}</h4>
          <div >$<span id="treesPrice">${e.price} </span>× 1</div>
         </div>

         <div id="${e.id}" onclick="historyRemovePart('${e.id}')" class="font-bold text-red-500 text-xl hover:text-red-700 cursor-pointer">x  </div>
        </li>
  `;
  totalPrice += e.price;
})
 document.getElementById("totalPrice").innerHTML = totalPrice;

}

const historyRemovePart=(data)=>{
allTreesData = allTreesData.filter((e) => e.id !== data);


historyAddData(allTreesData);
}
// add totalPrice


 //1 loadCategory Trees navbar

 const loadCategoryNavbarTrees =()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
      .then((res) => res.json())
      .then((data) => showCategoryNavbarTrees(data.categories));
 }
//2 load
 const loadCategoryCardTreesByiD =(id)=>{
   manageSpinner(true);
    fetch(` https://openapi.programming-hero.com/api/category/${id}`)
      .then((res) => res.json())
      .then((data) => showCategoryCardTreesByiD(data.plants));
const actives =  document.getElementsByClassName("actives")
for (let i of actives) {
 i.classList.remove("bg-[#15803D]", "text-white");
    
}
      const catActive = document.getElementById(`cat${id}`);
  
       catActive.classList.add("bg-[#15803D]" , "text-white");
 }
 //1 showCategory Trees navbar
 const showCategoryNavbarTrees =(navdata)=>{
    navCategoryContainer.innerHTML=""
   
navdata.forEach(element => {
   navCategoryContainer.innerHTML += `
    
    <li id="cat${element.id}" class="btn btn-sm sm:px-2 sm:py-2 md:w-full w-[80%] sm:w-[60%] justify-start actives" onclick="loadCategoryCardTreesByiD(${element.id})">${element.category_name}</li>
   `;
});
 }

//modal part Show card details in modal
const loadForTreesDetails=(id)=>{
 fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
   .then((res) => res.json())
   .then((data) => showModalInDetails(data.plants));
}

//show details on modal
const showModalInDetails =(data)=>{
const detailsContainer = document.getElementById("detailsContainer");
detailsContainer.innerHTML = `
 <div>
      <h2 class="text-xl font-bold mb-4">${data.name}</h2>
     <img src="${data.image}" class="h-46 w-[100%] object-fit-cover" />
      <p class="mb-2 mt-5"><span class="font-bold">Category: </span>${data.category} </p>
      <p class="mb-2"><span class="font-bold">Price: </span>$${data.price} </p>
      <p class="mb-2"><span class="font-bold">Description: </span>${data.description} </p>
    </div>
`;
document.getElementById("my_modal_5").showModal();
}

//byDefault Show trees
const loadAllPlants = () => {
  manageSpinner(true)
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => showCategoryCardTreesByiD(data.plants));
};

const showCategoryCardTreesByiD =(data)=>{

    treeCardParent.innerHTML="";
 data.map((e)=>{
    treeCardParent.innerHTML += `
     <div class="card bg-white rounded-[10px] shadow-xl">
          <img src="${e.image}" class="h-46 w-[100%]  rounded-t-[10px]"></img>
          <div class="card-body p-4 pt-4">
            <h2 id="${e.id}" onclick="loadForTreesDetails(${e.id})" class="card-title text-base cursor-pointer hover:text-decoration-underline decoration-slate-400">${e.name}</h2>
            <p class="text-sm text-gray-500">
          ${e.description}
            </p>
            <div class="flex justify-between items-center mt-2">
              <span class="badge badge-outline badge-sm md:badge-xs lg:badge-md  md:text-[10px] badge-success">${e.category}</span>
              <span class="font-semibold">$<span>${e.price}</span></span>
            </div>
            <button class="btn btn-success w-full mt-3 text-white">Add to Cart</button>
          </div>
        </div>
    `;
 })
  manageSpinner(false);
}

 loadCategoryNavbarTrees()

loadAllPlants()