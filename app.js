class Character {
  constructor(name, gender, height, mass, hairColor, pictureUrl) {
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.pictureUrl = pictureUrl;
  }

  // comparison functions

  compareMass(character) {
    let comparisonMessage = "";
    if (parseFloat(this.mass) > parseFloat(character.mass)) {
      comparisonMessage = `${this.name} has ${this.mass} mass,he is heavier than ${character.name}`;
    } else if (parseFloat(this.mass) < parseFloat(character.mass)) {
      comparisonMessage = `${character.name} has ${character.mass} mass,he is heavier than ${this.name}`;
    } else {
      comparisonMessage = `They have the same mass which is ${this.mass}`;
    }
    return comparisonMessage;
  }

  compareHeight(character) {
    let comparisonMessage;

    if (parseFloat(this.height) > parseFloat(character.height)) {
      comparisonMessage = `${this.name} is ${this.height} long,he is taller than ${character.name}`;
    } else if (parseFloat(this.height) < parseFloat(character.height)) {
      comparisonMessage = `${character.name}is ${character.height} tall, he is taller than ${this.name}`;
    } else {
      comparisonMessage = `They have the same height which is ${this.height}`;
    }
    return comparisonMessage;
  }

  compareHairColor(character) {
    let comparisonMessage;
    if (this.hair_color == character.hair_color) {
      comparisonMessage = `${this.name} and ${character.name} have same hair color which is ${this.hair_color} `;
    } else {
      comparisonMessage = `${this.name}'s hair color is ${this.hair_color} and ${character.name}'s ha hair color is ${character.hair_color} `;
    }
    return comparisonMessage;
  }

  compareGender(character) {
    let comparisonMessage;

    if (this.gender == character.gender) {
      comparisonMessage = `They have same gender`;
    } else {
      comparisonMessage = `${this.name}'s gender is ${this.gender} and ${character.name}'s gender is ${character.gender} `;
    }
    return comparisonMessage;
  }
}

const compareCharactersBtn = document.querySelector("#compareCharactersBtn");
const firstCharacterDisplay = document.querySelector("#firstCharacterDisplay");
const secondCharacterDisplay = document.querySelector("#secondCharacterDisplay");
let character1 = "";
let character2 = "";
let characters = [];

// fetch data

const fetchCharacters = async (character1, character2) => {
  let searchValue1 = character1.replace("_", " ");
  let searchValue2 = character2.replace("_", " ");
  let response1 = await fetch(
    `https://swapi.dev/api/people/?search=${searchValue1}`
  );
  let response2 = await fetch(
    `https://swapi.dev/api/people/?search=${searchValue2}`
  );
  let firstCharacter = await response1.json();
  let secondCharacter = await response2.json();
  let characters = [firstCharacter.results[0], secondCharacter.results[0]];
  return characters;
};


// getting picture 

function getImage(character) {
  let makePictureUrl = "";
  if (character.includes("-") && character.includes(" ")) {
    makePictureUrl = `/images/${character
      .toLowerCase()
      .replace("-", "_")
      .replace(" ", "_")}.jpg`;} 
      else if (character.includes("-")) {makePictureUrl = `/images/${character.toLowerCase().replace("-", "_")}.jpg`;} 
      else 
    {makePictureUrl = `/images/${character.toLowerCase().replace(" ", "_")}.jpg`;}
  return makePictureUrl;
}

// write characters

function writeCharacters(character1, character2) {
  const firstCharacterContent = `
        <div class="characterContentWrapper">

        <section class="characterPicAndTitle">
        <img class="img" src="${character1.pictureUrl}" alt="image of ${character1.name}"><img> 
        <p class="characterTitle">${character1.name}</p>
        <section/>

        <section class="answerWrapper">
        <div class="firstAnswer"></div>
        <section/>

        <section class="buttonsWrapper">
        <button class="itemBtn" id="weightButtonFirstCharacter">How much does ${character2.name} weigh?</button>
        <button class="itemBtn" id="heightButtonFirstCharacter">How tall is ${character2.name}?</button>
        <button class="itemBtn" id="hairColorButtonFirstCharacter">What hair color does ${character2.name} have?</button>
        <button class="itemBtn" id="genderButtonFirstCharacter">What gender is ${character2.name}?</button>
        <section/>

        </div>

        
    `;
  const secondCharacterContent = `
        <div class="characterContentWrapper">
        
        <section class="characterPicAndTitle">
        <img class="img" src="${character2.pictureUrl}" alt="image of ${character2.name}"><img>  
        <p class="characterTitle">${character2.name}</p>
        <section/>

        <section class="answerWrapper">
        <div class="secondAnswer"></div>
        <section/>

        <section class="buttonsWrapper">
        <button class="itemBtn" id="weightButtonSecondCharacter">How much does ${character1.name} weigh?</button>
        <button class="itemBtn" id="heightButtonSecondCharacter">How tall is ${character1.name}?</button>
        <button class="itemBtn" id="hairColorButtonSecondCharacter">What hair color does ${character1.name} have?</button>
        <button class="itemBtn" id="genderButtonSecondCharacter">What gender is ${character1.name}?</button>
        <section/>

        </div>
        
        
    `;
  firstCharacterDisplay.innerHTML = firstCharacterContent;
  secondCharacterDisplay.innerHTML = secondCharacterContent;
}


// comparison button function

compareCharactersBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const firstCharacterValue = document.querySelector("#firstCharacterList").value;
  const secondCharacterValue = document.querySelector("#secondCharacterList").value;
  
  characters = await fetchCharacters(firstCharacterValue, secondCharacterValue);
  let pictureUrlFirstCharacter = getImage(characters[0].name);
  let imageURLChar2 = getImage(characters[1].name);
  character1 = new Character(characters[0].name, characters[0].gender, characters[0].height, characters[0].mass, characters[0].hair_color, pictureUrlFirstCharacter);
  character2 = new Character(characters[1].name, characters[1].gender, characters[1].height, characters[1].mass, characters[1].hair_color, imageURLChar2);


  writeCharacters(character1, character2);


  // item buttons 

  const firstAnswer = document.querySelector(".firstAnswer");
  const secondAnswer = document.querySelector(".secondAnswer");
  const weightButtonFirstCharacter = document.getElementById("weightButtonFirstCharacter");
  const weightButtonSecondCharacter = document.getElementById("weightButtonSecondCharacter");
  const heightButtonFirstCharacter = document.getElementById("heightButtonFirstCharacter");
  const heightButtonSecondCharacter = document.getElementById("heightButtonSecondCharacter");
  const hairColorButtonFirstCharacter = document.getElementById("hairColorButtonFirstCharacter");
  const hairColorButtonSecondCharacter = document.getElementById("hairColorButtonSecondCharacter");
  const genderButtonFirstCharacter = document.getElementById("genderButtonFirstCharacter");
  const genderButtonSecondCharacter = document.getElementById("genderButtonSecondCharacter");

  weightButtonFirstCharacter.addEventListener("click", () => {
    let result = character1.compareMass(character2);
    firstAnswer.innerHTML = result;
  });
  heightButtonFirstCharacter.addEventListener("click", () => {
    let result = character1.compareHeight(character2);
    firstAnswer.innerHTML = result;
  });
  hairColorButtonFirstCharacter.addEventListener("click", () => {
    let result = character1.compareHairColor(character2);
    firstAnswer.innerHTML = result;
  });
  genderButtonFirstCharacter.addEventListener("click", () => {
    let result = character1.compareGender(character2);
    firstAnswer.innerHTML = result;
  });

 
  weightButtonSecondCharacter.addEventListener("click", () => {
    let result = character2.compareMass(character1);
    secondAnswer.innerHTML = result;
  });
  heightButtonSecondCharacter.addEventListener("click", () => {
    let result = character2.compareHeight(character1);
    secondAnswer.innerHTML = result;
  });
  hairColorButtonSecondCharacter.addEventListener("click", () => {
    let result = character2.compareHairColor(character1);
    secondAnswer.innerHTML = result;
  });
  genderButtonSecondCharacter.addEventListener("click", () => {
    let result = character2.compareGender(character1);
    secondAnswer.innerHTML = result;
  });
});
