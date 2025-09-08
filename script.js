  
 const navCategoryContainer = document.getElementById("navCategoryContainer");
 const treeCardParent = document.getElementById("treeCardParent");

 //1 loadCategory Trees navbar

 const loadCategoryNavbarTrees =()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
      .then((res) => res.json())
      .then((data) => showCategoryNavbarTrees(data.categories));
 }
//2 load
 const loadCategoryCardTreesByiD =(id)=>{
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
            <h2 onclick="loadForTreesDetails(${e.id})" class="card-title text-base cursor-pointer hover:text-decoration-underline decoration-slate-400">${e.name}</h2>
            <p class="text-sm text-gray-500">
          ${e.description}
            </p>
            <div class="flex justify-between items-center mt-2">
              <span class="badge badge-outline badge-sm md:badge-xs lg:badge-md  md:text-[10px] badge-success">${e.category}</span>
              <span class="font-semibold">$${e.price}</span>
            </div>
            <button class="btn btn-success w-full mt-3">Add to Cart</button>
          </div>
        </div>
    `;
 })

}

 loadCategoryNavbarTrees()

loadAllPlants()