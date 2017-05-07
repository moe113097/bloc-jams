//Example Album
 var albumPicasso = {
    title:'The Colors',
     artist:'Pable Picasso',
     label: 'Cubism',
     year:'1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
        {title:'Blue', duration: '4:26'},
        {title:'Green', duration: '3:14'},
        {title:'Red', duration: '5:01'},
        {title:'Pink', duration: '3:21'},
        {title:'Magenta', duration: '2:15'},
    ]
};

//Another Example album
 var AlbumMarconi ={
     title:'The Telephone',
     artist:'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs:[
        {title:'Hello, Operator?', duration:'1:01'},
        {title: 'Ring, ring, ring', duration: '5:01'},
        {title:'Fits in your pocket', duration:'3:21'},
        {title:' Can you hear me now?', duration:'3:14'},
        {title: 'Wrong phone number', duration :'2:15'}
  ]
};

var createSongRow =function(songNumber, songName, songLength) {
    var template=
    '<tr class="album-view-song-item">'
    //using data-song number to store songNumber and then retreving during mouse leave
    +'  <td class="song-item-number" data-song-number="' + songNumber +'">' + songNumber +'</td>'
    +'  <td class="song-item-title">'+ songName+'</td>'
    +'  <td class="song-item-duration">' +songLength + '</td>'
    +'</tr>'
    ;

return template;

  };

  var setCurrentAlbum = function(album){
    // #1
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


    //#2
    albumTitle.firstChild.nodeValue =album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue =album.year +' '+ album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    //#3
    albumSongList.innerHTML = '';

    //#4
    for (var i= 0;i<album.songs.length; i++){
        albumSongList.innerHTML += createSongRow(i + 1,album.songs[i].title, album.songs[i].duration);
    }
  };
  var songListContainer =document.getElementsByClassName('album-view-song-list')[0];
  var songRows = document.getElementsByClassName('album-view-song-item');
  //album button templates
  var playButtonTemplate='<a class="album-song-button"><span class="ion-play"></span></a>'
  var playButtomTemplate='<a class="album-song-button"><span class="ion-pause"></span></a>'
    var CurrentlyPlayingSong = null;

  window.onload =function(){
      setCurrentAlbum(albumPicasso);
      var playButtonTemplate='<a class="album-song-button"><span class="ion-play"></span></a>'
      var pauseButtonTemplate='<a class="album-song-button"><span class="ion-pause"></span></a>'



    var findParentByClassName =function(element, target){
        if(element) {
              var cParent= element.parentElement;
        while (cParent.className !== target && cParent.className !==null) {
             cParent =cParent.parentElement;

            }
            console.log (cparent);
            return cparent
      }
    };

   var getSongItem = function (element) {
         switch (element.className) {
          case 'icon-pause':
             return findParentByClassName(element,'song-item-number');
         case 'album-song-button':
            return;
            //return element.querySelector('')
         case 'song-item-number':
          return element.querySelector('song-item-number')
      //    case 'song-item-title':
      //    case 'song-item-duration':
           case 'ion-play' :
                return;
          default:
          return;

        }
      }
   var currentlyPlayingSong = null;
   var clickHandler = function(targetElement){
           var songItem = getSongItem(targetElement);
           //console.log("this is songItem.innHTML "+songItem.innerHTML);
          if (currentlyPlayingSong === null){
          songItem.innerHTML = pauseButtonTemplate;
          currentlyPlayingSong = songItem.getAttribute('data-song-number');
        //  console.log("current playing song " +currentlyPlayingSong);
        }else if (currentlyPlayingSong===songItem.getAttribute ('data-song-number')){
          songItem.innerHTML = playButtonTemplate;
          currentlyPlayingSong = null;
        }else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
           var currentlyPlayingSongElement =document.querySelector('[data-song-number="'+currentlyPlayingSong+'"]');
           currentlyPlayingSongElement.innerHTML =currentlyPlayingSongElement.getAttribute('data-song-number');
           songItem.innerHTML =pauseButtonTemplate;
           currentlyPlayingSong=songItem.getAttribute('data-song-number');

        }
    };


      songListContainer.addEventListener('mouseover', function(event){
        // only target individual song rows during event delegation
        if (event.target.parentElement.className==='album-view-song-item'){
                        event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }


      });
      for(var i =0;i<songRows.length;i++){
        songRows[i].addEventListener('mouseleave',function(event){
          this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');

        });
        songRows[i].addEventListener('click',function(event){
          //event handler call
          console.log("target element "+event.target.className);
        // clickHandler(event.target) ;
        });
      }
      }
