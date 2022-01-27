const PageDetail = (argument) => {
  console.log(argument);
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      console.log(gameData);
      const { name, released, description } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
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
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;