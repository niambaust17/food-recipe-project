const loadMeal = () =>
{
    const searchedMealName = document.querySelector('#searchMeal').value;
    if (isNaN(searchedMealName))
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ searchedMealName }`)
            .then(res => res.json())
            .then(data => showMeals(data))
            .catch(error => alert('Food not found.'))
        document.querySelector('#meal-container').innerHTML = '';
        document.querySelector('#meal-detail').innerHTML = '';
        document.querySelector('#meal-category-container').innerHTML = '';
    }
    else
    {
        alert('You did something wrong try again.');
        document.querySelector('#searchMeal').value = '';
    }
};


const showMeals = (data) =>
{
    const mealContainer = document.querySelector('#meal-container');
    data.meals.forEach(meal =>
    {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal row';

        const mealDivInfo = `
        <div class="col">
            <div onclick='loadMealDetail(${ meal.idMeal })' class="card m-3">
                <img src="${ meal.strMealThumb }" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-title text-center">${ meal.strMeal }</p>
                </div>
            </div>
        </div>`;
        mealDiv.innerHTML = mealDivInfo;
        mealContainer.appendChild(mealDiv);
        document.querySelector('#searchMeal').value = '';
    });
};


const loadMealDetail = (mealId) =>
{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`)
        .then(res => res.json())
        .then(data => showMealDetail(data.meals[0]))
};


const showMealDetail = (mealDetail) =>
{
    const mealDetailContainer = document.querySelector('#meal-detail');
    const videoSrc = mealDetail.strYoutube.slice(32, mealDetail.strYoutube.length);
    const mealDetailInfo = `
    <h1 class='ms-4'>${ mealDetail.strMeal }</h1>
    <ul id="ingredient"></ul>
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/${ videoSrc }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
    mealDetailContainer.innerHTML = mealDetailInfo;
    for (let i = 1; i < 21; i++)
    {
        const li = document.createElement('li');
        li.style.listStyle = 'none';
        const ingredient = 'strIngredient' + i;
        const measure = 'strMeasure' + i;
        if (mealDetail[ingredient] !== '' && mealDetail[ingredient] !== null)
        {
            const listInfo = `<input type="checkbox" name="" id="" checked> ${ mealDetail[measure] } ${ mealDetail[ingredient] }`;
            li.innerHTML = listInfo;
            document.querySelector('#ingredient').appendChild(li);
        }
    }
};


const loadCategory = () =>
{
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => showCategory(data))
};

const showCategory = data =>
{
    const mealCategoryContainer = document.querySelector('#meal-category-container');
    document.querySelector('#meal-container').innerHTML = '';
    document.querySelector('#meal-detail').innerHTML = '';
    data.categories.forEach(category =>
    {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category row';

        const categoryDivInfo = `
        <div class="col">
            <div onclick="showCategoryMeal('${ category.strCategory }')" class="card m-3">
                <img src="${ category.strCategoryThumb }" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-title text-center">${ category.strCategory }</p>
                </div>
            </div>
        </div>`;
        categoryDiv.innerHTML = categoryDivInfo;
        mealCategoryContainer.appendChild(categoryDiv);
    });
};

const showCategoryMeal = (categoryName) =>
{
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ categoryName }`)
        .then(res => res.json())
        .then(data => showMeals(data))
    document.querySelector('#meal-container').innerHTML = '';
    document.querySelector('#meal-category-container').innerHTML = '';
}
