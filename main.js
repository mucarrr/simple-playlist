
    const prevButton = document.getElementById('prev')
    const nextButton = document.getElementById('next')
    const repeatButton = document.getElementById('repeat')
    const shuffleButton = document.getElementById('shuffle')
    const audio = document.getElementById('audio')
    const songImage = document.getElementById('song-image')
    const songName = document.getElementById('song-name')
    const songArtist = document.getElementById('song-artist')
    const pauseButton = document.getElementById('pause')
    const playButton = document.getElementById('play')
    const playListButton = document.getElementById('playlist')
    
    
    const maxDuration = document.getElementById('max-duration')
    const currentTimeRef = document.getElementById('current-time')
    
    const progressBar = document.getElementById('progress-bar')
    const playListContainer = document.getElementById('playlist-container')
    const closeButton= document.getElementById('close-button')
    const playListSongs = document.getElementById('playlist-songs')
    
    const currentProgress = document.getElementById('current-progress')
    
    let index //index sirasi
    let loop = true // bitince basa sarma acik 
    
    const songsList = [ // bir oge icinde birden fazla yapi oldugu icin obje olusturmak zorundayim. duz dizi yapamam.
        {
            name: "Mia Pista Apo Fosforo",
            link: "assets/miapista.mpeg",
            artist: "Xaris Alexiou",
            image: "assets/xaris.mia.jpeg"
        },
        {
            name: "Ta Mavra Matia Sou",
            link: "assets/tamavra.mpeg",
            artist: "Zaferis Melas",
            image: "assets/zaferis.jpeg"
           
        },
        {
            name: "Siko Horepse Syrtaki",
            link: "assets/sikohorepse.mpeg",
            artist: "Stelios Kazantzidis",
            image: "assets/kazancidis.jpeg"
        },
        {
            name: "Teli Teli Teli",
            link: "assets/teliteli.mpeg",
            artist: "Xaris Alexiou",
            image: "assets/xaris.mia.jpeg"
            
        },
        {
            name: "Ola Se Thimizoun",
            link: "assets/olase.mpeg",
            artist: "Xaris Alexiou",
            image: "assets/xaris.jpeg" 
        }
    ]
    //sarki atamak icin
    const setSong = (arrayIndex) => {
        console.log(arrayIndex)
        let{name, link, artist, image} = songsList[arrayIndex]
        audio.src = link
        songName.innerHTML = name
        songArtist.innerHTML = artist
        songImage.src = image
    
        audio.onloadedmetadata = () =>{
            maxDuration.innerText = timeFormatter(audio.duration)
            
        }
        playAudio()
        playListContainer.classList.add("hide")
    }

    const playAudio = ()=>{
        audio.play()
        pauseButton.classList.remove('hide')
        playButton.classList.add('hide')
    }
   
    //setSong(0)// her bir sarkinin ogelerini containerin icine atadik. Su an degisken halindeler. bu fonksiyon icinde cagirdigimizda sirayla gelecekler. 
    //simdi sarki calma islemi yapacagiz.

    //play butonuna basinca sarki calsin
    //playButton.addEventListener("click", playAudio)

    //pause a basinca dursun
    const pauseAudio = () =>{
        audio.pause()  
        pauseButton.classList.add('hide')
        playButton.classList.remove('hide')   
    }
    //pauseButton.addEventListener("click", pauseAudio)

    //sonraki sarkiya gecis 
    const nextSong =()=>{
        if(loop){
            if(index== (songsList.length - 1)){
                index = 0
            }else{
                index +=1 
            }
            setSong(index)
        } else{
            let randIndex = Math.floor(Math.random() *songsList.length)
            console.log(randIndex)
            setSong(randIndex)
        }
        playAudio()
    }
    //nextButton.addEventListener("click", nextSong)
   
//onceki sarkiya gec
    const previousSong =()=>{
        pauseAudio()
        if(index>0){
            index -=1
        }else{
            index = songsList.length - 1
        }
        setSong(index)
        playAudio()
    }
    //prevButton.addEventListener("click", previousSong)

//sarki en sona geldiginde
    audio.onended = () => {
        nextSong()
    }

//karistirici tiklanildigindA
    shuffleButton.addEventListener("click", ()=>{
        if(shuffleButton.classList.contains("active")){
            shuffleButton.classList.remove("active")
            loop = true
        }else{
            shuffleButton.classList.add("active")
            loop = false
        }
    })
// tekrar butonu tiklanildiginda
    repeatButton.addEventListener("click", ()=>{
        if(repeatButton.classList.contains("active")){
            repeatButton.classList.remove("active")
            loop = false
        }else{
             repeatButton.classList.add("active")
             loop = true
        }
    });
//zaman formati olusturma. max duration ve gecen sureyi alip, ekrana yazdirmak icin bu formati olusturdum. maz duration i seetSong icinde yazdirdim.
    const timeFormatter = (timeInput)=> {
        let minute = Math.floor(timeInput /60)
        minute = minute < 10 ? "0" + minute : minute
        let second = Math.floor(timeInput % 60)
        second  = second < 10 ? "0" + second : second
        return `${minute}:${second}`
    }

//anlik gecen sure 
    audio.addEventListener("timeupdate", ()=>{
        currentTimeRef.innerText = timeFormatter(audio.currentTime)
    })

// progress bara tikladigimda o andan itibaren calismasi
    progressBar.addEventListener("click", (event)=>{
        let coordStart = progressBar.getBoundingClientRect().left
        let coordEnd = event.clientX
        let progress = (coordEnd - coordStart) / progressBar.offsetWidth
        currentProgress.style.width = progress *100 + "%"
        audio.currentTime = audio.duration * progress
        playAudio()
    });

//otomatik zaman sayaci, mavi alanin genisligi
    setInterval(() => {
        currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)*100 + "%")
    }, 1000);

playButton.addEventListener("click", playAudio)
pauseButton.addEventListener("click", pauseAudio)
nextButton.addEventListener("click", nextSong)
prevButton.addEventListener("click", previousSong)

//playlist i olusturma
    const createPlaylist = () => {
        for(let i in songsList){
            playListSongs.innerHTML += `<li class="playlistSong" onclick="setSong(${i})">
            <div class="playlist-image-container">
                 <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album"> 
                ${songsList[i].artist}
                </span>
            `
        }
        
    };

// kapatma butonu
     closeButton.addEventListener("click", ()=>{
        playListContainer.classList.add("hide");
    });

    playListButton.addEventListener("click", ()=>{
        playListContainer.classList.remove("hide");
    });
     
    window.onload = () => {
        index= 0
        setSong(index)
        pauseAudio()
        createPlaylist()
    }