import React from "react"

function changeHandler(){
    const input1 = document.getElementById("input-1").value
    const input2 = document.getElementById("input-2").value

    document.getElementById("topText").textContent = input1
    document.getElementById("bottomText").textContent = input2
}

function buttonHandler(e){
    e.preventDefault();


    fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(data => {
            let memesList = data.data.memes
            let randomIndex = Math.floor((Math.random() * 100) + 1)   // Returns a random integer from 0 to 100:
            let randomMemeImgUrl = memesList[randomIndex].url
            document.getElementById("memeImg").src = randomMemeImgUrl
        })
}

function Main() {
    window.onload = buttonHandler
    return(
        <main>
            <form method="GET" id="myForm" >
                <div className="form">
                    <input type="text" placeholder="Line 1" id="input-1" onChange={changeHandler}></input>
                    <input type="text" placeholder="Line 2" id="input-2" onChange={changeHandler}></input>
                </div>
                <button type="submit" onClick={buttonHandler}>Get a new meme image 🖼</button>
            </form>
            <div className="imgContainer">
                <img id="memeImg" alt="meme" />
                <p id="topText"></p>
                <p id="bottomText"></p>
            </div>

        </main>

    )
}

export default Main