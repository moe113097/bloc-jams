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

var $row=$(template);

var clickHandler =function(){
  var songNumberCell = $(this).closest('.album-view-song-item').find('.song-item-number');
  var songItem = songNumberCell.attr('data-song-number');
        if (currentlyPlayingSong === null){
          songNumberCell.html(pauseButtonTemplate);
          currentlyPlayingSong= songItem;
      }
      else if (currentlyPlayingSong===songItem){
          songNumberCell.html(playButtonTemplate);
          currentlyPlayingSong = null;
      }
      else if (currentlyPlayingSong !== songItem){
            var currentlyPlayingCell= $('.song-item-number,[data-song-number="' +currentlyPlayingSong+'"]');// had issue defining lookup criteria for old song 
            currentlyPlayingCell.html(currentlyPlayingSong);
            songNumberCell.html(pauseButtonTemplate);
            currentlyPlayingSong=songItem;
            };

}
var onHover = function(event){
  var songNumberCell = $(this).find('.song-item-number');// correct
  var songNumber = songNumberCell.attr('data-song-number'); // tried to skip this step and use .text in the if statement directly
    console.log (songNumber);


       if (songNumber !== currentlyPlayingSong){   //tried to compare .text on both rather then just use another variable
        songNumberCell.html(playButtonTemplate); //tried to assign value with = did not know I can use .html to assign value
        }
};
var offHover = function(event){
  var songNumberCell = $(this).find('.song-item-number');
  var songNumber = songNumberCell.attr('data-song-number');

       if (songNumber !== currentlyPlayingSong){
          songNumberCell.html(songNumber);
       }
};
//#1
$row.find('.song-item-number').click(clickHandler);

//#2
$row.hover(onHover, offHover);
//#3
return $row;

  };

  var setCurrentAlbum = function(album){
    // #1
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo =$('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');



    //#2

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year +" "+ album.label);
    $albumImage.attr('src', album.albumArtUrl);

    //#3
    $albumSongList.empty();

    //#4
    for (var i= 0;i<album.songs.length; i++){
         var $newRow = createSongRow(i+1,album.songs[i].title,album.songs[i].duration);
         $albumSongList.append($newRow);
    }
  };

  $(document).ready()

      setCurrentAlbum(albumPicasso);
      var playButtonTemplate='<a class="album-song-button"><span class="ion-play"></span></a>'
      var pauseButtonTemplate='<a class="album-song-button"><span class="ion-pause"></span></a>'
      var currentlyPlayingSong = null;
