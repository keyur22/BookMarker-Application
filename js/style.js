document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e){

  //Prevent form from submitting
  e.preventDefault();

  let sitename = document.getElementById('sitename').value;
  let siteurl = document.getElementById('siteurl').value;

  let bookmark = {
    name: sitename,
    url: siteurl
  }

  //console.log(bookmark);

  // localStorage.getItem('bookmarks');
  // localstorage.setItem('bookmarks', 'Hello World');
  // localStorage.removeItem('bookmarks');
  // JSON.stringify converts json to string
  // JSON.parse converts string to json

  // Check if bookmark is null
  if(localStorage.getItem('bookmarks') === null){

    let bookmarks = [];
    bookmarks.push(bookmark);

    // Add to local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }
  else{

    // Get bookmark from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add item to bookmarks
    bookmarks.push(bookmark);
    // Add to local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //Fetch Bookmarks
  fetchBookmarks();
}

//fetch Bookmarks from LocalStorage
function fetchBookmarks(){

  //getting bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //console.log(bookmarks);

  let entry = document.getElementById('entries');
  entry.innerHTML = '';

  for(i = 0; i < bookmarks.length; i++){
    entry.innerHTML += '<div class="jumbotron jumbotron-fluid text-center">'+
                          '<div class="container">'+
                            '<h3>'+bookmarks[i].name+
                            '<a class="btn btn-success ml-3" href="'+bookmarks[i].url+'" target="_blank">Visit</a> '+
                            '<a onclick="deletebookmarks(\''+bookmarks[i].url+'\')" href="#" class="btn btn-danger">Delete</a> '+
                            '</h3>'+
                          '</div>'+
                        '</div>'
  }

}

function deletebookmarks(url){

  //getting bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for(i = 0; i < bookmarks.length; i++){

      if(bookmarks[i].url == url){
        console.log(i);
        //remove from array
        bookmarks.splice(i, 1);
      }

  }
  //Add to local Storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();

}
