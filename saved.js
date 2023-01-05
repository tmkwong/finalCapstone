container = document.getElementById("saved_container");

Object.keys(sessionStorage).forEach((key) => {

    // Skip session storage items which are corresponded to likes, message and comments
    if ((key.indexOf("_like") != -1) || (key == "comments") || (key == "messages")) {
        return;
    }

    // Create a container for a element saved in session storage
    const [innerHTML, className] = [JSON.parse(sessionStorage.getItem(key))[0], JSON.parse(sessionStorage.getItem(key))[1]];
    const child = key === "external_table" ? document.createElement("table") : document.createElement("div");
    child.setAttribute("id", key);
    child.setAttribute("class", className);
    child.innerHTML = innerHTML;
    child.style.borderStyle = "solid";
    child.style.borderColor = "grey";

    // Render the save button according to session storage
    const span = child.querySelector("span.save");
    span.addEventListener("click", (event) => {
        if (event.target.textContent === "save") {
            event.target.textContent = "\u2713 saved";
            event.target.textContent = "liked";
            sessionStorage.setItem(child.id, JSON.stringify([child.innerHTML, child.className]));
        } else {
            event.target.textContent = "save";
            sessionStorage.removeItem(child.id);
        }
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

    // Render the like button according to session storage
    const likeButton = child.querySelector(".like");
    likeButton.setAttribute("class", Object.keys(sessionStorage).includes(likeButton.id) ? "liked" : "like");
    likeButton.textContent = likeButton.className;
    likeButton.addEventListener("click", (event) => {
        if (event.target.textContent === "like") {
            event.target.textContent = "liked";
            sessionStorage.setItem(likeButton.id, "liked");
        } else {
            event.target.textContent = "like";
            sessionStorage.removeItem(likeButton.id);
        }
    })

    // Assemble the saved element
    child.appendChild(likeButton);
    container.appendChild(child);
    container.appendChild(document.createElement("br"));
})
