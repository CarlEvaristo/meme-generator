import React from "react"



function Main() {
    const [meme, setMeme] = React.useState({
        image: "https://i.imgflip.com/1ii4oc.jpg",
        topText: "I love this autograph",
        bottomText: "It's great, it's the best"
    })

    function changeHandler(){
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                topText: document.getElementById("input-1").value,
                bottomText: document.getElementById("input-2").value
            }
        })
    }
    
    function getMemeImage(e){
        e.preventDefault()
        
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => {
                let memesList = data.data.memes
                let randomIndex = Math.floor((Math.random() * 100) + 1)   // Returns a random integer from 0 to 100:
                let randomMemeImgUrl = memesList[randomIndex].url
                
                setMeme(prevMeme => {
                    return {
                        ...prevMeme,
                        image: randomMemeImgUrl
                    }
                })
            })
    }

    return(
        <main>
            <form method="GET" id="myForm" >
                <div className="form">
                    <input type="text" placeholder="Line 1" id="input-1" onChange={changeHandler}></input>
                    <input type="text" placeholder="Line 2" id="input-2" onChange={changeHandler}></input>
                </div>
                <button type="submit" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </form>
            <div className="imgContainer">
                <img src={meme.image} id="memeImg" alt="meme" />
                <p id="topText">{meme.topText}</p>
                <p id="bottomText">{meme.bottomText}</p>
            </div>

        </main>

    )
}

export default Main