const showModal = new bootstrap.Modal(document.getElementById("AddModal"));
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const shModal = new bootstrap.Modal(document.getElementById("ShowModal"));
const editModal = new bootstrap.Modal(document.getElementById("editModal"));

const handler = new Datahandler();
let category = handler.GetCategories();

let tasks = handler.GetRecord();
LoadCards(tasks);

let catagories = document.querySelectorAll(".catagoryClass");
catagories.forEach((e) => {
  e.addEventListener("click", function (event) {
    event.preventDefault();
    const cid = event.target.getAttribute("data-evs-cid");
    let data = handler.findbycategory(cid);
    // let tasks = handler.GetRecord();

    LoadCards(data);
  });
});
document.getElementById("dropdownMenuLink").addEventListener("click", () => {
  let tasks = handler.GetRecord();
  LoadCards(tasks);
  favFun();
});

document.getElementById("Addbtn").addEventListener("click", function () {
  // debugger
  let addtitle = document.getElementById("addtxttitle");
  let adddetail = document.getElementById("addtxtDetail");
  let progressid = document.getElementById("ddlprogress");
  // handler.AddTasks(addtitle, new Date(), adddetail, progressid)
  progressid.value = 0;
  addtitle.value = adddetail.value = "";

  showModal.show();
});

document.getElementById("btnResult").addEventListener("click", function () {
  // debugger
  let addtitle = document.getElementById("addtxttitle").value;
  let adddetail = document.getElementById("addtxtDetail").value;
  let progressid = document.getElementById("ddlprogress").value;
  handler.AddTasks(addtitle, new Date(), adddetail, progressid);

  LoadCards(handler.GetRecord());
  showModal.hide();
});

function LoadCards(tasks) {
  document.getElementById("tblbody").innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let temp = `
    <div class="col-md-6 col-lg-4">
        <div class="card mt-4">
            <div class="m-4">
                <h3 class=" link-show" data-vs-pd="${tasks[i].Title},${tasks[i].Detail},${tasks[i].Category.Id}">
                    ${tasks[i].Title}
                </h3>
                <div class="text-body-secondary">${tasks[i].PostedOn}</div>
            </div>
            <div class="card-body">
                <div class="col d-flex flex-column position-static">
                    <p class="card-text mb-auto">${tasks[i].Detail}</p>
                    <div class="d-flex top">
                        
                        <i class="fa-regular fa-trash-can fa-lg text-danger delete-Card" id="${tasks[i].Id}"></i>
                        &nbsp;&nbsp;&nbsp;
                        <i class="fa-regular fa-pen-to-square fa-lg text-success edit-Card" id="${tasks[i].Id}"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>`;


    document.getElementById("tblbody").innerHTML += temp;
  }

  document.querySelectorAll(".delete-Card").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation(); // Stop event propagation
      // body
      const pid = e.target.getAttribute("id");
      const found = handler.FindProducts(pid);
      if (found) {
        document.getElementById("delhdnid").value = found.Id;
        document.getElementById("deltxttitle").value = found.Title;
        document.getElementById("deltxtDetail").value = found.Detail;
        document.getElementById("delprogress").value = found.Category.Id;

        deleteModal.show();
      }
    });
  });


  document.querySelectorAll(".edit-Card").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation(); // Stop event propagation
      const pid = e.target.getAttribute("id");
      const found = handler.FindProducts(pid);
      if (found) {
        document.getElementById("edithdnId").value = found.Id;
        document.getElementById("edittxttitle").value = found.Title;
        document.getElementById("edittxtDetail").value = found.Detail;
        document.getElementById("editprogress").value = found.Category.Id;

        editModal.show();
      }
    });
  });



  document.getElementById("btnedit").addEventListener("click", function () {
    const editid = document.getElementById("edithdnId").value;
    const edittitle = document.getElementById("edittxttitle").value;
    const editdetail = document.getElementById("edittxtDetail").value;
    const editprogress = document.getElementById("editprogress").value;

    handler.EditTasks(editid, edittitle, editdetail, editprogress);
    LoadCards(handler.GetRecord());
    editModal.hide();
  });




  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', function () {
      const cardTitle = card.querySelector('.link-show').textContent;
      const cardDate = card.querySelector('.text-body-secondary').textContent;
      const cardDetail = card.querySelector('.card-text').textContent;

      // Populate modal with card content
      document.getElementById('modalTitleId').textContent = cardTitle;
      document.getElementById('showtxttitle').value = cardTitle;
      document.getElementById('showtxtDetail').value = cardDetail;

      // Open the modal
      shModal.show();
    });
  });

}

document.getElementById('btnshow').addEventListener('click', function (e) {

  shModal.hide();
});


document.getElementById("btndelete").addEventListener("click", function () {
  // body
  const delid = document.getElementById("delhdnid").value;
  const deltitle = document.getElementById("deltxttitle").value;
  const deldetail = document.getElementById("deltxtDetail").value;
  const delprogress = document.getElementById("delprogress").value;
  handler.DeleteTasks(delid, deltitle, deldetail, delprogress);
  LoadCards(handler.GetRecord());
  deleteModal.hide();

});




// // Favourite
// function favFun(params) {
//   let fav = document.querySelectorAll(".favourite");
//   fav.forEach((e) => {
//     e.addEventListener("click", () => {
//       handler.setFavourite(e.getAttribute("id"));
//     });
//   });
// }

// document.getElementById("favourite").addEventListener("click", (e) => {
//   let tasks = handler.getFavourite();
//   // console.log(tasks);
//   LoadCards(tasks);
// });

// load Categories
addEventListener("load", function () {
  document.getElementById(
    "ddlprogress"
  ).innerHTML = `<option value="0">Category</option>`;
  for (let i = 0; i < category.length; i++) {
    let temp = `<option value="${category[i].Id}">${category[i].Name}</option>`;
    document.getElementById("ddlprogress").innerHTML += temp;
  }
});

addEventListener("load", function () {
  document.getElementById("delprogress").innerHTML = `<option value="0">Category</option>`;
  for (let i = 0; i < category.length; i++) {
    let temp = `<option value="${category[i].Id}">${category[i].Name}</option>`;
    document.getElementById("delprogress").innerHTML += temp;
  }
});

addEventListener("load", function () {
  document.getElementById("editprogress").innerHTML = `<option value="0">Category</option>`;
  for (let i = 0; i < category.length; i++) {
    let temp = `<option value="${category[i].Id}">${category[i].Name}</option>`;
    document.getElementById("editprogress").innerHTML += temp;
  }
});

addEventListener("load", function () {
  document.getElementById("showprogress").innerHTML = `<option value="0">Category</option>`;
  for (let i = 0; i < category.length; i++) {
    let temp = `<option value="${category[i].Id}">${category[i].Name}</option>`;
    document.getElementById("showprogress").innerHTML += temp;
  }
});

favFun();
