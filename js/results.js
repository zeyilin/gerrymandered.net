const API_BASE = "https://gerrymandered.herokuapp.com";

function updateOfficial(prefix, data) {
    if (!data) return;

    const q = (sel) => document.querySelector(sel);

    q(`#${prefix}-first`).textContent = data.first_name || "";
    q(`#${prefix}-middle`).textContent = data.middle_name || "";
    q(`#${prefix}-last`).textContent = data.last_name || "";

    q(`#${prefix}-state`).textContent = "State: " + (data.state_name || "N/A");
    q(`#${prefix}-gender`).textContent = "Gender: " + (data.gender || "N/A");
    q(`#${prefix}-party`).textContent = "Party: " + (data.party || "N/A");
    q(`#${prefix}-chamber`).textContent = "Chamber: " + (data.chamber || "N/A");
    q(`#${prefix}-office`).textContent = "Office: " + (data.office || "N/A");

    q(`#${prefix}-contact`).setAttribute("href", data.contact_form || "#");
    q(`#${prefix}-website`).setAttribute("href", data.website || "#");

    if (data.facebook_id) {
        q(`#${prefix}-profpic`).setAttribute("src", `https://avatars.io/facebook/${data.facebook_id}`);
        q(`#${prefix}-fb`).setAttribute("href", `https://www.facebook.com/${data.facebook_id}`);
    }

    if (data.twitter_id) {
        q(`#${prefix}-twitter`).setAttribute("href", `https://twitter.com/${data.twitter_id}`);
        q(`#${prefix}-twitter`).innerHTML = `<img class="tweet" src="img/twitter.png" alt="Twitter"> @${data.twitter_id}`;
    }
}

async function loadJsonData() {
    const params = new URLSearchParams(window.location.search);
    const address = decodeURIComponent(params.get("address-input") || "");

    if (!address) {
        showError("No address provided.");
        return;
    }

    const parts = address.split("____");
    const query = parts.length > 1 ? `${parts[0]},${parts[1]}` : address;
    const url = `${API_BASE}/?address=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API request failed");

        const json = await response.json();

        if (!Array.isArray(json) || json.length < 3) {
            showError("Could not find representatives for this location.");
            return;
        }

        updateOfficial("rep", json[0]);
        updateOfficial("sen1", json[1]);
        updateOfficial("sen2", json[2]);
    } catch {
        showError("Please enter a more specific or valid location.");
    }
}

function showError(message) {
    const errorDiv = document.getElementById("error-message");
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
    } else {
        alert(message);
    }
    window.location.replace("index.html");
}
