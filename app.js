
const RecipeApp = (function () {
    console.log("RecipeApp initializing...");

    const recipes = [
        {
            id: 1,
            title: "Pasta",
            ingredients: ["Pasta", "Salt", "Olive Oil", "Garlic", "Tomato"],
            steps: [
                "Boil water",
                {
                    text: "Prepare sauce",
                    substeps: ["Heat oil", "Add garlic", "Add tomato"]
                },
                "Mix pasta and sauce"
            ]
        },
        {
            id: 2,
            title: "Sandwich",
            ingredients: ["Bread", "Butter", "Veggies", "Cheese"],
            steps: [
                "Toast bread",
                "Add fillings",
                "Serve"
            ]
        }
    ];

    const container = document.getElementById("recipe-container");

    const renderSteps = (steps, level = 0) => {
        let html = "<ul>";
        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li class="step">${step}</li>`;
            } else {
                html += `<li class="step">${step.text}</li>`;
                html += `<li class="substep">${renderSteps(step.substeps, level + 1)}</li>`;
            }
        });
        html += "</ul>";
        return html;
    };

    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card">
                <h2>${recipe.title}</h2>
                <button class="toggle-btn" data-toggle="steps">Show Steps</button>
                <button class="toggle-btn" data-toggle="ingredients">Show Ingredients</button>

                <div class="steps-container">
                    ${renderSteps(recipe.steps)}
                </div>

                <div class="ingredients-container">
                    <ul>
                        ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `;
    };

    const renderRecipes = () => {
        container.innerHTML = recipes.map(createRecipeCard).join("");
    };

    const handleToggle = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const card = e.target.closest(".recipe-card");
        const type = e.target.dataset.toggle;
        const box = card.querySelector(`.${type}-container`);

        box.classList.toggle("visible");
        e.target.textContent = box.classList.contains("visible")
            ? `Hide ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Show ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    };

    const init = () => {
        renderRecipes();
        container.addEventListener("click", handleToggle);
        console.log("RecipeApp ready!");
    };

    return { init };
})();

RecipeApp.init();
