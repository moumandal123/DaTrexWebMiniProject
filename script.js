async function searchMeme() {
    let query = document.getElementById("searchBox").value.toLowerCase();

    if (query.trim() === "") return;

    document.getElementById("caption").innerText = "Searching...";

    try {
        let res = await fetch("https://api.imgflip.com/get_memes");
        let data = await res.json();
        let allMemes = data.data.memes;

        let results = allMemes.filter(m => 
            m.name.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            document.getElementById("caption").innerText = "No meme found!";
            return;
        }

        let randomMeme = results[Math.floor(Math.random() * results.length)];

        document.getElementById("meme-img").src = randomMeme.url;
        document.getElementById("caption").innerText = randomMeme.name;

    } catch {
        document.getElementById("caption").innerText = "Error loading memes!";
    }
}

function toggleMode() {
    document.body.classList.toggle("dark");

    let btn = document.getElementById("modeToggle");

    if (document.body.classList.contains("dark")) {
        btn.innerText = "Light Mode";
    } else {
        btn.innerText = "Dark Mode";
    }
}

let memeList = [
    "images/meme1.jpg",
    "images/meme2.jpg",
    "images/meme3.jpg"
];

let index = 0;

function nextMeme() {
    index = (index + 1) % memeList.length;
    document.getElementById("meme-img").src = memeList[index];
}

function prevMeme() {
    index = (index - 1 + memeList.length) % memeList.length;
    document.getElementById("meme-img").src = memeList[index];
}

let likes = 0;
function likeMeme() {
    likes++;
    document.getElementById("like-count").innerText = likes + " Likes";
}

function uploadMeme() {
    let file = document.getElementById("uploadInput").files[0];
    let url = URL.createObjectURL(file);

    document.getElementById("meme-img").src = url;
    document.getElementById("caption").innerText = "Uploaded Meme";
}