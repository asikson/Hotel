Poprawne działanie frontu w sytacji problemów z uruchomieniem na Windowsie w przeglądarce Chrome oraz Friefox

1. w package.json zmieniamy dwie linijki z: 
"scripts": { 
    "start": "export SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts start",
     "build": "export SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts build",

zmiana na: "scripts": { 
    "start": "react-scripts start --openssl-legacy-provider", 
    "build": "react-scripts build --openssl-legacy-provider",

2. instalowanie inkon do reacta
npm install react-icons --save

https://react-icons.github.io/react-icons/icons?name=io (więcej informacji o ikonach dla react-a)