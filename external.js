// A function to create a save button for an element
function createSaveButton(child) {

    const span = document.createElement("span");
    span.setAttribute("class", "save");
    span.textContent = sessionStorage.getItem(child.id) === null ? "save" : "\u2713 saved"  // dynamically shows save/saved by reading the session storage

    span.addEventListener("click", (event) => {
        if (event.target.textContent === "save") {
            // toggle on "saved", add the innerHTML of the entire parent element and the class name to session storage 
            event.target.textContent = "\u2713 saved";
            sessionStorage.setItem(child.id, JSON.stringify([child.innerHTML, child.className]));
        } else {
            // toggle off "saved", remove the parent element from session storage
            event.target.textContent = "save";
            sessionStorage.removeItem(child.id);
        }
        console.log(Object.keys(sessionStorage));  // for quick debugging
        // Do not count comments, messages and likes
        savedCount = Object.keys(sessionStorage).reduce((accumulator, key) => {
            if (key.indexOf("comment") == -1 && key.indexOf("message") == -1 && key.indexOf("_like") == -1) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
        alert(`You just ${sessionStorage.getItem(child.id) === null ? "remove" : "saved"} an item. You have ${savedCount} item(s) saved in total`) ;
    });

    child.appendChild(span);
}

// A function to create a like button for an element
function createLikeButton(child) {

    const likeButton = document.createElement("button");
    likeButton.setAttribute("id", child.id + "_like");
    likeButton.setAttribute("class", "like");
    likeButton.textContent = Object.keys(sessionStorage).includes(likeButton.id) ? "liked" : "like";  // dynamically shows like/liked by reading the session storage

    likeButton.addEventListener("click", (event) => {
        if (event.target.textContent === "like") {
            // toggle on "liked", add "parent_id + _liked" to the session storage to mark it as liked
            event.target.textContent = "liked";
            sessionStorage.setItem(event.target.id, "liked");
        } else {
            // toggle off "liked", remove "parent_id + _liked" from session storage to indicate it's not liked
            event.target.textContent = "like";
            sessionStorage.removeItem(event.target.id);
        }
        console.log(Object.keys(sessionStorage));  // for quick debugging
    })

    child.appendChild(likeButton);
}

// Add save and like buttons to content elements
const children = document.getElementById("external_banner").children;
for (const child of children) {
    createLikeButton(child);
    createSaveButton(child);
}

const table = document.getElementById("external_table");
createLikeButton(table);
createSaveButton(table);


