import React from "react"



function Main() {
    const [allMemes, setAllMemes] = React.useState()
    const [meme, setMeme] = React.useState({
        image: "https://i.imgflip.com/1ii4oc.jpg",
        topText: "I love this autograph",
        bottomText: "It's great, it's the best",
        fontSize: 33
    })

    function changeHandler(event){
        const {name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage(e){
        e.preventDefault()
        let randomIndex = Math.floor((Math.random() * 100) + 1)   // Returns a random integer from 0 to 100:
        let randomMemeImgUrl = allMemes[randomIndex].url
        
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                image: randomMemeImgUrl
            }
        })  
    }

    return(
        <main>
            <form method="GET" id="myForm" >
                <div className="form">
                    <input type="text" placeholder="Line 1" name="topText" onChange={changeHandler} value={meme.topText} />
                    <input type="text" placeholder="Line 2" name="bottomText" onChange={changeHandler} value={meme.bottomText} />
                    <input type="number" id="fontsize" name="fontSize" min="1" max="100" value={meme.fontSize} onChange={changeHandler}></input>
                </div>
                <button type="submit" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </form>
            <div className="imgContainer">
                <img src={meme.image} id="memeImg" alt="meme" />
                <p id="topText" style={{fontSize:Number(meme.fontSize)}}>{meme.topText}</p>
                <p id="bottomText" style={{fontSize:Number(meme.fontSize)}}>{meme.bottomText}</p>
            </div>

        </main>

    )
}

export default Main