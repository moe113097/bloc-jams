var createSongRow =function(songNumber, songName, songLength) {
    var template=
    '<tr class="album-view-song-item">'
    //using data-song number to store songNumber and then retreving during mouse leave
    +'  <td class="song-item-number" data-song-number="' + songNumber +'">' + songNumber +'</td>'
    +'  <td class="song-item-title">'+ songName+'</td>'
    +'  <td class="song-item-duration">' +songLength + '</td>'
    +'</tr>'
    ;
    songNameHolder =songName
  var $row=$(template);
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};
var updatePlayerBarSong = function(){

    $('h2.song-name').text(currentSongFromAlbum);
    $('h3.artist-name').text(currentAlbumArtist);
    $('h2.artist-song-mobile').text(currentSongFromAlbum+" "+currentAlbumArtist); //forgot to add mobile version
    $('.main-controls .play-pause').html(playerBarPauseButton)
  };
  var trackIndex = function(album, song) {
      length = album.songs.length;
      for (i=0; i<=length; i++){
      if  (album.songs[i].title === song){
      return i;
      }
      }

  };
  var nSong = function() {
      var length = currentAlbum.songs.length;
      var currentSongIndex = trackIndex(currentAlbum ,currentSongFromAlbum);// this is causing issue since trackIndex not returning index
          currentSongIndex ++;  //originally had after the if but not accurate test
      if (currentSongIndex >= length){
          currentSongIndex = 0;
      }
      var lastSongNumber = currentlyPlayingSongNumber; // did not consider this simple way of storing current number without any calculations
      currentlyPlayingSongNumber = currentSongIndex +1;
      currentSongFromAlbum= currentAlbum.songs[currentSongIndex].title; // had .title at the end originally
  // once currentSongFromAlbum is stored can run updatePlayerBarSong();
      updatePlayerBarSong();

  // orignally copied language from clickHandler else  but then realized after looking at the example that not only do I have to update the current to a
  //pause button but also have to change previous one to number again . I ended up using code example provided
      var $nextSongNumberCell= $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber+'"]');
      var $lastSongNumberCell= $('.song-item-number[data-song-number="' + lastSongNumber+'"]');

      $nextSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);

    };
    var pSong =function() {
        var length = currentAlbum.songs.length;
        var currentSongIndex = trackIndex(currentAlbum ,currentSongFromAlbum);// this is causing issue since trackIndex not returning index
            currentSongIndex --;
        if (currentSongIndex < 0){
            currentSongIndex = length-1;
        }
        var lastSongNumber = currentlyPlayingSongNumber;
        currentlyPlayingSongNumber = currentSongIndex +1;
        currentSongFromAlbum= currentAlbum.songs[currentSongIndex].title;

        updatePlayerBarSong();

        $('.main-controls .play-pause').html(playerBarPauseButton); // did not consider this but was not told that previous action should pause the new song

        var $previousSongNumberCell= $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber+'"]');
        var $lastSongNumberCell= $('.song-item-number[data-song-number="' + lastSongNumber+'"]');

        $previousSongNumberCell.html(pauseButtonTemplate);
        $lastSongNumberCell.html(lastSongNumber);

      };
      var clickHandler =function(){
          var songNumberCell = $(this).closest('.album-view-song-item').find('.song-item-number');
          var songNumber = parseInt(songNumberCell.attr('data-song-number'));

              currentAlbumArtist = $('.album-view-artist').text();
                if (currentlyPlayingSongNumber === null){
                  songNumberCell.html(pauseButtonTemplate);
                  currentlyPlayingSongNumber= songNumber;
                  currentSongFromAlbum= currentAlbum.songs[songNumber-1].title;

                  updatePlayerBarSong();
            }
              else if (currentlyPlayingSongNumber===songNumber){
                  songNumberCell.html(playButtonTemplate);
                  $('.main-controls .play-pause').html(playerBarPlayButton);
                  currentlyPlayingSongNumber = null;
                  currentSongFromAlbum= currentAlbum.songs[songNumber-1].title;
            }
              else if (currentlyPlayingSongNumber !== songNumber){
                  var currentlyPlayingCell= $('.song-item-number[data-song-number="' +currentlyPlayingSongNumber+'"]');// had issue defining lookup criteria for old song
                    currentlyPlayingCell.html(currentlyPlayingSongNumber);
                    songNumberCell.html(pauseButtonTemplate);
                    currentlyPlayingSongNumber=songNumber;
                    currentSongFromAlbum= currentAlbum.songs[songNumber-1].title;
                    updatePlayerBarSong();

                  };

      }
      var onHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');// correct
        var songNumber = parseInt(songNumberCell.attr('data-song-number')); // tried to skip this step and use .text in the if statement directly
             if (songNumber !== currentlyPlayingSongNumber){   //tried to compare .text on both rather then just use another variable
                songNumberCell.html(playButtonTemplate); //tried to assign value with = did not know I can use .html to assign value
              }
      };
      var offHover = function(event){
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
             if (songNumber !== currentlyPlayingSongNumber){
                songNumberCell.html(songNumber);
          }
      };
      var setCurrentAlbum = function(album){
        // #1
          currentAlbum=album;

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

        var currentAlbum=null;
        var currentlyPlayingSongNumber = null;
        var currentSongFromAlbum = null;
        var $previousButton = $('.main-controls .previous');
        var $nextButton = $('.main-controls .next');
        var currentAlbumArtist =null;
        var playButtonTemplate='<a class="album-song-button"><span class="ion-play"></span></a>'
        var pauseButtonTemplate='<a class="album-song-button"><span class="ion-pause"></span></a>'
        var playerBarPlayButton='<span class="ion-play"></span>';
        var playerBarPauseButton='<span class="ion-pause"></span>';


        $(document).ready(function(){
          setCurrentAlbum(albumPicasso);
            //code below cannot find the function gives error in console
          $previousButton.click(pSong);
          $nextButton.click(nSong);

      });
