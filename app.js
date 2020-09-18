const getInput = document.querySelector("#getInput"),
  getButton = document.querySelector("#button-addon2"),
  header = document.querySelector("h5#exampleModalLabel"),
  restArea = document.querySelector(".modal-body");

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const keyOfIndex = "!$*:";

const CharPos = (chars) => {
  chars = chars.toLowerCase();
  let i = 0;
  while (i < 26) {
    if (chars == alphabet.charAt(i)) {
      return i + 1;
    }
    i++;
  }

  return 27;
};

const CharReplace = (chars, toPos) => {
  let thisPos = CharPos(chars);
  if (thisPos == 27) {
    return chars;
  }

  toPos %= 26;
  toPos += thisPos;

  if (toPos > 26) {
    toPos -= 26;
  } else if (toPos < 1) {
    toPos += 26;
  }

  let rest = alphabet.charAt(toPos - 1);

  chars == chars.toUpperCase() ? (rest = rest.toUpperCase()) : rest;

  return rest;
};

const Construct = (input) => {
  let key = 0,
    rest = "";
  while (key < 5) {
    key = Math.round(Math.random() * 100);
  }

  for (i = 0; i < input.length; i++) {
    rest += CharReplace(input.charAt(i), key + i);
  }

  return `${keyOfIndex} ${rest} ${key}`;
};

const Destruct = (input, key) => {
  let rest = "";

  for (i = 0; i < input.length; i++) {
    rest += CharReplace(input.charAt(i), key * -1 - i);
  }

  return rest;
};

const IsDestruct = (input) => {
  input = input.split(" ");

  return input[0] == keyOfIndex;
};

const GetKey = (input) => {
  input = input.split(" ");
  input = input[input.length - 1];

  return input;
};

const GetValue = (input, key) => {
  input = input.replace(keyOfIndex + " ", "");
  input = input.replace(" " + key, "");

  return input;
};

getButton.addEventListener("click", () => {
  let input = getInput.value;
  let rest = "";

  if (IsDestruct(input)) {
    let key = GetKey(input),
      val = GetValue(input, key);
    rest = Destruct(val, key);
    header.innerHTML = "Destruct";
  } else {
    rest = Construct(input);
    header.innerHTML = "Construct";
  }

  restArea.innerHTML = rest;
});
