// What I know:
    // I have to create a list of freelancers and their starting price for each. 
    // I have to create a message that displays the average starting price of all the freelancers and it is updated w/ every entry.
    // my functions will have to focus on updating names and the average price.
    // I will lay out the following steps:
        // 1. initial freelancers array
        // 2. identify arrays for names, occupations and prices for rendering
        // 3. identify DOM selectors
        // 4. Create function for rendering freelancers on webpage
        // 5. Create function for updating average price
        // 6. Create funtion for generating random freelancer informtion
        // 7. interval funtion to add a new free lancer every 5 seconds

// Guiding Questions:
    //Is your HTML file connected to your JS file? YES
    // Have you defined arrays for possible names and occupations? NO
    // Have you defined an initial array of freelancers? YES
    // Do you know how you want the freelancers' information to be displayed on the page?
    // Have you written and called a function to render the initial freelancer data?
    // Have you written a function to generate a new random freelancer?
    // Is this function being called in an interval?
    // Have you written a function to calculate the average starting price of your freelancers' array?
    // When should this function be called to update the displayed message?


// 1. initial freelancers array
const freelancers = [
    { name: "Alice", price: 30, occupation: "Writer" },
    { name: "Bob", price: 50, occupation: "Teacher" },
    { name: "Carol", price: 70, occupation: "Programmer" },
    { name: "Nestor", price: 90, occupation: "Network Architect" },
    { name: "Milly", price: 120, occupation: "Cloud Architect" },
    { name: "Darell", price: 120, occupation: "DevSec Ops Engineer"},

];
console.log("Step 1: Initial freelancers array", freelancers); // Verify output

// 2. identify arrays for names, occupations and prices for rendering
const names = ["John", "Michael", "Jennifer", "Alondra", "Guillermo", "Emmanuel", "Breonna"];
const occupations = ["Landscape Designer", "Interior Designer", "Teacher", "Cybersecurity Consultant", "Photographer", "Filmmaker", "Sound Engineer"];
const priceRange = { min: 25, max: 140 };

console.log("Step 2: Arrays for names, occupations, and prices defined"); //Verifying output

// 3. identify DOM selectors
const freeLancerList = document.querySelector("#freelancerList");
const averagePriceEl = document.querySelector("#averagePrice");

console.log("Step 3: DOM selectors identified");

// 4. Create function for rendering freelancers on webpage
// let addFreelancerInterval;

function renderFreelancers() {
    freeLancerList.innerHTML = '';
    freelancers.forEach(freelancer => {
        const li = document.createElement("li");
        li.textContent = `${freelancer.name}, the ${freelancer.occupation}, Starting Price: $${freelancer.price}`;
        freeLancerList.appendChild(li);
    });
    console.log("Step 4: Freelancers rendered on the webpage"); // output the freelancers listed to the console
    updateAveragePrice();

    // // Stoping more listings past 15 entries
    // if (freelancers.length >= 15) {
    //     clearInterval(addFreelancerInterval);
    //     console.log(`Stopped adding freelancers after 15 entries.`)
    // }

};

// 5. Create function for updating average price
function updateAveragePrice() {
    const total = freelancers.reduce((sum, freelancer) => sum + freelancer.price, 0);
    const average = total / freelancers.length;
    averagePriceEl.textContent = `Average Starting Price: $${average.toFixed(2)}`;
    console.log(`The new average price is: $${average.toFixed(2)}`); // console log the new price average
};


// 6. Create funtion for generating random freelancer informtion
function generateRandomFreelancer() {
    const name = names[Math.floor(Math.random() * names.length)];
    const occupation = occupations[Math.floor(Math.random() * occupations.length)];
    const price = Math.floor(Math.random() * (priceRange.max - priceRange.min + 1)) + priceRange.min;
    return { name, occupation, price };
}

// Setting up interval to stop listing after 15 entries as well as swapping out original array w/ new list of freelancers

let entries = 0; // Initialize a counter for the entries
const maxEntries = 15 - freelancers.length;

// Interval setup
const intervalId = setInterval(() => {
    if (entries < maxEntries) {
        // If we have more than 6 freelancers, start replacing the oldest ones

        // Generate and add a new freelancer
        const newFreelancer = generateRandomFreelancer();
        if (freelancers.length >= 15) {
            freelancers.shift();
        } else {
            freelancers.push(newFreelancer);
        }
        
        console.log(`Adding a new freelancer: `, newFreelancer); // Log the newly added freelancer
        renderFreelancers(); // Re-render the list of freelancers with the update
        
        entries++; // Increment the counter since we've added a new entry
    } else {
        clearInterval(intervalId); // Stop the interval once we reach the max number of entries
        console.log("Max freelancers reached. Stopping interval.");
    }
}, 5000);

renderFreelancers(); // Initial call to display the freelancers