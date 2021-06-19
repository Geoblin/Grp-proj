const form = document.getElementById("form");
const artistName = document.getElementById("artist");
const songTitle = document.getElementById("song");
const button = document.getElementById("button");
const showLyrics = document.getElementById("lyrics");
const errorMessage = document.getElementById("error");

function searchLyrics(Artist, Song) {

  fetch(`http://ianertson.com:3500/${Artist}/${Song}`).then(function(res){
      res.json().then(function(data) {
        
        const lyrics = data[0].lyrics.replaceAll("\n", ". ")
        //lyrics.replaceAll("\n", ".")
        //console.log("asdasd");

        //removes textarea if one exists
        //prevents multiple textareas ruining the style of website
        if (showLyrics.querySelector("textarea")){
            showLyrics.removeChild("textarea");
        }
        const textArea = document.createElement('textarea');
        showLyrics.appendChild(textArea);
        textArea.className = "textarea";
        textArea.innerHTML = " "
        textArea.innerText = lyrics
      })
  });
}

form.addEventListener('input', (e) => {
  e.preventDefault();
  //console.log("asd");
  const inputArtist = artistName.value;
  const inputSong = songTitle.value;
  showLyrics.innerHTML = "";

      if (inputArtist.length > 0 && inputSong.length > 0) {
        button.disabled = false;
        //button.removeAttribute("disabled");
        //console.log("qwer");
        errorMessage.innerText = "";      
        
        button.addEventListener("click", e => {
          e.preventDefault();
          searchLyrics(inputArtist, inputSong);
          
          
        });
      }
      //disables button if nothing has been typed
        else if (!inputArtist.length && !inputSong.length) {
        button.disabled = true;
          //button.setAttribute('disabled', 'disabled');
          errorMessage.innerHTML = "Please fill all with correct information";
          //button.innerHTML("Disabled");
                
      }
        else if(inputArtist.length > 0 || inputSong.length > 0) {
            button.disabled = true;
            //button.setAttribute('disabled', 'disabled');
          errorMessage.innerText = "Please fill all with correct information";     
        }
  });