document.querySelector('form').addEventListener('submit', getMeal);

function getMeal(e) {
  e.preventDefault();

  removePreviousMeals();

  const meal = document.querySelector('input').value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      data.meals.forEach(meal => {
        const id = `id${meal.idMeal}`;
        const listId = meal.strMeal.replace(/\W/g, '') + 'Ingredients';

        addMealCard(id);
        addDishName(meal.strMeal, id);
        addArea(meal.strArea, id);
        addCategory(meal.strCategory, id);
        addImage(meal.strMealThumb, id);
        addIngredientHeading(id);
        addIngredientList(listId, id);
        for (i = 1; meal[`strIngredient${i}`]; i++) {
          addIngredientItem(meal[`strMeasure${i}`] || '', meal[`strIngredient${i}`], listId);
        }
        addInstructions(meal.strInstructions, id);
        addVideo(meal.strYoutube, id);

      })
    })
    .catch(err => console.log(`Error: ${err}`));
}

function addMealCard(id) {
  const section = document.createElement('section');
  section.setAttribute('id', id);
  document.body.appendChild(section);
}

function addDishName(name, id) {
  const h2 = document.createElement('h2');
  h2.innerText = name;
  document.querySelector(`#${id}`).appendChild(h2);
}

function addArea(area, id) {
  const span = document.createElement('span');
  span.setAttribute('class', 'area');
  span.innerText = area;
  document.querySelector(`#${id}`).appendChild(span);
}

function addCategory(category, id) {
  const span = document.createElement('span');
  span.setAttribute('class', 'category');
  span.innerText = category;
  document.querySelector(`#${id}`).appendChild(span);
}

function addImage(imgSource, id) {
  const img = document.createElement('img');
  img.src = imgSource;
  document.querySelector(`#${id}`).appendChild(img);
}

function addIngredientHeading(id) {
  const h3 = document.createElement('h3');
  h3.innerText = 'Ingredients:';
  document.querySelector(`#${id}`).appendChild(h3);
}

function addIngredientList(listId, id) {
  const ul = document.createElement('ul');
  ul.setAttribute('id', listId);
  document.querySelector(`#${id}`).appendChild(ul);
}

function addIngredientItem(measure, ingredient, listId) {
  const li = document.createElement('li');
  li.innerText = `${measure} ${ingredient}`;
  document.querySelector(`#${listId}`).appendChild(li);
}

function addInstructions(instructions, id) {
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  h3.innerText = 'Instructions:';
  p.innerText = instructions;
  document.querySelector(`#${id}`).appendChild(h3);
  document.querySelector(`#${id}`).appendChild(p);
}

function addVideo(vidSource, id) {
  const iframe = document.createElement('iframe');
  iframe.src = vidSource.slice(0, vidSource.lastIndexOf('/')) + '/embed/' + vidSource.slice(vidSource.lastIndexOf('=') + 1);
  document.querySelector(`#${id}`).appendChild(iframe);
  // console.log(vidSource.lastIndexOf('/'))
  // console.log(vidSource.lastIndexOf('='))
  // console.log(vidSource.slice(0, vidSource.lastIndexOf('/')) + '/embed/' + vidSource.slice(vidSource.lastIndexOf('=') + 1));
  // console.log(vidSource);
}

function removePreviousMeals() {
  document.querySelectorAll('h2').forEach(e => e.remove());
  document.querySelectorAll('span').forEach(e => e.remove());
  document.querySelectorAll('img').forEach(e => e.remove());
  document.querySelectorAll('h3').forEach(e => e.remove());
  document.querySelectorAll('ul').forEach(e => e.remove());
  document.querySelectorAll('p').forEach(e => e.remove());
  document.querySelectorAll('iframe').forEach(e => e.remove());
}
