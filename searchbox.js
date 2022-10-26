  //  javaScript part of Search div

  
  async function main() {
    let query = document.querySelector("#querysearch").value;
    let searchdata = await getDatasearch(query);
    append(searchdata);
  }

  async function getDatasearch(query) {
    const url = `https://www.omdbapi.com/?apikey=af714f66&s=${query}`;
    let res = await fetch(url);
    let searchdata = await res.json();
    console.log(searchdata);
    return searchdata.Search;
  }

  function append(searchdata) {
    if (!searchdata) {
      return;
    }
    let containet = document.getElementById("movies");

    containet.innerHTML = null;

    searchdata.forEach(function (el) {
      let img = document.createElement("img");
      img.src = el.Poster;

      let title = document.createElement("p");
      title.innerText = "Title:" + el.Title;

      let year = document.createElement("p");
      year.innerText = "Year:-" + el.Year;

      let ImdbId = document.createElement("p");
      ImdbId.innerText = "imdbID :-" + el.imdbID;

      let details = document.createElement("div");
      details.setAttribute("id", "details");
      details.append(title, year, ImdbId);

      let smalldiv = document.createElement("div");
      smalldiv.onclick = () => {
        savemovie(el);
      };
      smalldiv.setAttribute("id", "movie");
      smalldiv.append(img, details);
      containet.append(smalldiv);
    });
  }
  // debounsing concept
  let id;
  function debounce(fun, delay) {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(function () {
      fun();
    }, delay);
  }

  // to display particular movie in another page

  let savemovie = (onemovieobj) => {
    //console.log("don")
    localStorage.setItem("particularmovie", JSON.stringify(onemovieobj));
    window.location.href = "onemovie.html";
  };

  // to erase all movie from search box
  function erase() {
    let containet = document.getElementById("movies");
    containet.innerHTML = null;
    let query = document.querySelector("#querysearch");
    query.value=null;
    window.location.reload()
  }