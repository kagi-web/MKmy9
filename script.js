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
.slice(0,6);

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

// 画像保存と共有
const generateBtn=document.getElementById("generateBtn");
const shareArea=document.getElementById("shareArea");
const preview=document.getElementById("imagePreview");

let generatedImage="";

generateBtn.onclick=()=>{

const grid=document.getElementById("grid");


html2canvas(grid).then(canvas=>{

generatedImage=canvas.toDataURL("image/png");

preview.innerHTML=`<img src="${generatedImage}">`;

shareArea.style.display="block";

/* 画像へスクロール */
const img = preview.querySelector("img");

img.onload = () => {

document.getElementById("saveBtn").scrollIntoView({
behavior:"smooth",
block:"end"
});

};

});

};

document.getElementById("saveBtn").onclick=()=>{

if(!generatedImage)return;

const link=document.createElement("a");

link.href=generatedImage;

link.download="my9card.png";

link.click();

};

document.getElementById("twitterBtn").onclick=()=>{

const text="マリオカート8DX・ワールド私の推しコース9選 #私の推しコース9選 #マリオカート8DX #マリオカートワールド";

const url=location.href;

const shareUrl=
`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

window.open(shareUrl,"_blank");

};