const PageList = (argument = '') => {
  let counterPage = 1;
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");
    let arrayImg = ['' ,'<i class="fab fa-windows" style="font-size:30px"></i>', '<i class="fab fa-playstation" style="font-size:30px"></i>', '<i class="fab fa-xbox" style="font-size:30px"></i>', '<i class="fab fa-app-store-ios" style="font-size:30px"></i>', '<i class="fab fa-apple" style="font-size:30px"></i>', '<i class="fab fa-linux" style="font-size:30px"></i>', '<i class="fab fa-nintendo-switch" style="font-size:30px"></i>', '<i class="fab fa-android" style="font-size:30px"></i>']
    const displayResults = (results,more = false) => {
      const resultsContent = results.map((article) => (
        `<article class="cardGame">
          <div class="img">
            <img src=${article.background_image} alt="image" class="card-image">
          <div class="hover">
          <p>Rating : ${article.rating} for ${article.ratings_count} ratings</p>
          <p>Genres :${article.genres[0].name}
          ${article.genres[1].name || ''}</p>
          </div>
          </div>          
          <a href="#pagedetail/${article.id}">${article.name}</a>
          <div>${article.parent_platforms.map(e => arrayImg[e.platform.id]).join(' ')}</div>
        </article>`
      ));
      const resultsContainer = document.querySelector(".page-list .articles");
      if (more){
        resultsContainer.innerHTML += resultsContent.join("\n");
      } else {
        resultsContainer.innerHTML = resultsContent.join("\n");
      }     
    };

    const fetchList = (url, argument,more = false) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results,more)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=8f284fc566e044f1a78da7f07da524cb&page_size=9&page=${counterPage}`, cleanedArgument);

    let myShowMore = document.getElementById('showMore')
    myShowMore.addEventListener('click', (e) => {

      counterPage ++;
      let myValue = document.getElementById('searchValue').value;
      fetchList(`https://api.rawg.io/api/games?key=8f284fc566e044f1a78da7f07da524cb&page_size=${9}&page=${counterPage}&search=${myValue}`, cleanedArgument,true);
      if (counterPage==3) {
        myShowMore.remove();
      }
    });

    let search = document.getElementById('search')
    search.addEventListener('click', e => {
      e.preventDefault();
      let myValue = document.getElementById('searchValue').value;
      fetchList(`https://api.rawg.io/api/games?key=8f284fc566e044f1a78da7f07da524cb&page_size=${9}&page=1&search=${myValue}`, cleanedArgument);
      if (counterPage==3) {
        myShowMore.remove();
      }
    });


  };

  const render = () => {
    let intro = document.getElementById('intro');
    let filter = document.getElementById('filter');
    let showMore = document.getElementById('showMore');
    intro.classList.remove("hide-me");
    filter.classList.remove("hide-me");
    showMore.classList.remove("hide-me");
    document.getElementById("main").innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();


};

export default PageList;