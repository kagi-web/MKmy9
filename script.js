let characters=[];
let currentCell=null;

fetch("characters.json")
.then(res=>res.json())
.then(data=>characters=data);

// +ボタンイベント
const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {

cell.onclick = () => {
openModal(cell);
};

});


// モーダル開く
function openModal(cell){

currentCell = cell;

document.getElementById("modal").style.display = "block";

}


// モーダル閉じる
function closeModal(){

document.getElementById("modal").style.display = "none";

document.getElementById("search").value = "";

document.getElementById("suggestions").innerHTML = "";

}

// コース検索

const search = document.getElementById("search");

search.addEventListener("input", function(){

const word = this.value.toLowerCase();

const results = characters
.filter(c => {

const fullName = (c.tag ? c.tag + " " + c.name : c.name).toLowerCase();

return fullName.includes(word);


})
.slice(0,8);

const suggestions = document.getElementById("suggestions");

suggestions.innerHTML="";

results.forEach(char=>{

const div=document.createElement("div");
div.className="suggestion";

const fullName = char.tag ? char.tag + " " + char.name : char.name;

div.innerHTML=`
<img src="${char.image}">
<span>${fullName}</span>
`;

div.onclick=()=>selectCharacter(char);

suggestions.appendChild(div);

});

});

// 画像表示
function selectCharacter(char){

currentCell.innerHTML = `
<img src="${char.image}">
<div class="titleBox">
${char.tag ? `<div class="tag">${char.tag}</div>` : ""}
<div class="title">${char.name}</div>
</div>

<button class="remove" data-html2canvas-ignore="true">×</button>
`;

const removeBtn = currentCell.querySelector(".remove");

removeBtn.onclick = (e) => {

e.stopPropagation();

const cell = e.target.parentElement; // ← 押されたセル

cell.innerHTML = `<div class="plus">+</div>`;

cell.querySelector(".plus").onclick = () => {
openModal(cell);
};

};

closeModal();

}

const previewBtn = document.getElementById("previewBtn");
const editGrid = document.getElementById("grid");
const previewGrid = document.getElementById("previewGrid");
const shareArea = document.getElementById("shareArea");
const previewTitle = document.getElementById("previewTitle");

previewBtn.onclick = () => {
  previewGrid.innerHTML = ""; // 前の内容クリア

  editGrid.querySelectorAll(".cell").forEach(cell => {
    const clone = cell.cloneNode(true);
    previewGrid.appendChild(clone);

  });

    previewGrid.style.display = "grid";
    shareArea.style.display = "block";
    previewTitle.style.display = "block";

  // スクロールも可
    shareArea.scrollIntoView({behavior:"smooth", block:"end"});
};

if (location.pathname.endsWith("/share")) {
  location.replace(location.pathname.replace("/share", "/"));
}
