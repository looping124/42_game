const PageDetail = (argument) => {
  console.log(argument);
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      console.log(gameData);
      const { name, released, description, website, background_image, publishers,tags, developers,genres,parent_platforms, rating, ratings_count, stores} = gameData;
      const articleDOM = document.querySelector(".page-detail .article");

      articleDOM.querySelector("p.background_image").innerHTML = `
      <img src="${background_image}" alt="" class="back-img">
      `;
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("p.website").innerHTML = website; 
      publishers.forEach(publisher => {
        articleDOM.querySelector("p.publishers").innerHTML += `
        <p>${publisher.name}</p>
        `;
      });          
      tags.forEach(tag => {
        articleDOM.querySelector("p.tags").innerHTML += `
        <p>${tag.name}</p>
        `;
      });
      developers.forEach(developer => {
        articleDOM.querySelector("p.developers").innerHTML += `
        <p>${developer.name}</p>
        `;
      });       
      genres.forEach(genre => {
        articleDOM.querySelector("p.genres").innerHTML += `
        <p>${genre.name}</p>
        `;
      });  
      parent_platforms.forEach(parent_platform => {
        articleDOM.querySelector("p.parent_platforms").innerHTML += `
        <p>${parent_platform.platform.name}</p>
        `;
      });  
      articleDOM.querySelector("p.rating").innerHTML = `Rating : ${rating}`;
      articleDOM.querySelector("p.ratings_count").innerHTML = `Ratings_count : ${ratings_count}`;
      console.log(stores[0].store.domain);
      stores.forEach(astore => {
        articleDOM.querySelector("p.stores").innerHTML += `
        <p>${astore.store.domain}</p>
        `;
      });  
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${'8f284fc566e044f1a78da7f07da524cb'}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    let intro = document.getElementById('intro');
    let filter = document.getElementById('filter');
    let showMore = document.getElementById('showMore');
    intro.classList.add("hide-me");
    filter.classList.add("hide-me");
    showMore.classList.add("hide-me");
    

    document.getElementById("main").innerHTML = `
      <section class="page-detail">
        <div class="article">
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
          <p class ="background_image"></p>
          <p class="website"></p>
          <p class="publishers"></p>
          <p class="tags"></p>
          <p class="developers"></p>
          <p class="genres"></p>
          <p class="parent_platforms"></p>
          <p class="rating"></p>
          <p class="ratings_count"></p>
          <p class="stores"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;