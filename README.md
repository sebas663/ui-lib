# Libreria de componentes ui

Este es un proyecto React para crear componentes ui reutilizables en otros proyectos.

Es un proyecto contruido con [Typescript](https://www.typescriptlang.org/), [Storybook](https://storybook.js.org/) para la presentación de los componentes, [Webpack](https://webpack.js.org/) para el bundle, [Babel](https://babeljs.io/) para compatibilidad de navegadores.

Ademas vamos a configurar [Eslint](https://eslint.org/) y [Prettier](https://prettier.io/) para para aplicar reglas de escritura de codigo y [Husky](https://typicode.github.io/husky/#/) para chequear esas reglas en cada commit.

Se van a seguir los siguientes pasos:

1. [Creacion del repositorio en GitHub](#creacion-del-repositorio-en-github)
2. [Creacion del directorio root](#creacion-del-directorio-root)
3. [Creacion del repositorio local](#creacion-del-repositorio-local)
4. [Creacion del proyecto](#creacion-del-proyecto)
5. [Configurar Storybook](#configurar-storybook)
6. [Configuracion de Webpack](#configuracion-de-webpack)
7. [Utilizacion de libreria](#utilizacion-de-libreria)
8. [Bonus Eslint Prettier Husky](#bonus-eslint-prettier-husky)
9. [Bonus 2 test Jest](#bonus-2-test-jest)

## Creacion del repositorio en GitHub

Se crea el repositorio remoto que es donde vamos a subir el proyecto.

Cuando se crea el repositorio en github la rama por default es main.

El repositorio a crear tiene que ser un repositorio publico con un readme nada mas.

Se puede seguir este instructivo si no sabes como crear el repositorio [creacion de repositorio GitHub](https://docs.github.com/es/get-started/quickstart/create-a-repo)

## Creacion del directorio root

Abrir una terminal en el directorio donde vas a crear el proyecto

```sh
proyectos:~$ mkdir ui-lib
proyectos:~$ cd ui-lib
```

Ya dentro de ui-lib vamos a correr los comandos.

## Creacion del repositorio local

En la terminal ejecutamos

```sh
git init -b main
```

Agregamos **_-b main_** ya que por default git crea la rama como **master**, y nosotros en el remoto la tenemos como 'main'

Podes cambiar la rama por default para tus proximos proyectos con el siguiente comando

```sh
git config --global init.defaultBranch main
```

Luego de iniciar git creamos el archivo .gitignore y colocamos dentro del archivo:

```js
node_modules
dist
```

Conectamos con el repositorio remoto y comiteamos

```sh
git remote add origin https://github.com/sebas663/ui-lib.git
git pull https://github.com/sebas663/ui-lib.git main
git add .
git commit -m "add .gitignore"
git push --set-upstream origin main
```

Ya tenemos conectado nuestro repositorio local con el remoto.

## Creacion del proyecto

Vamos a crear el proyecto con yarn, le agremos el flag -y para que no nos pregunte nada y genere el package.json con los valores por default.

```sh
yarn init -y
```

El comando genera solo el archivo pacjage.json con los siguientes datos:

```json
{
	"name": "ui-lib",
	"version": "1.0.0",
	"main": "index.js",
	"repository": "https://github.com/sebas663/ui-lib.git",
	"author": "sebas663 <sebastian_escuderoh@hotmail.com>",
	"license": "MIT"
}
```

Una vez creado el package.json vamos a agregar las dependencias iniciales del proyecto
vamos a tener tres tipos de dependencias:

1. dependencies: son las necesarias para que funcione la libreria y que el proyecto que importa esta libreria NO las tiene como dependencia.
2. devDependencies: son las necesarias para construir la libreria.
3. peerDependencies: son las necesarias para que funcione la libreria y que el proyecto que importa esta libreria las tiene como dependencia.

Para agregar dependencies se ejecuta yarn add dependency_1 dependency_2 dependency_n

Para agregar devDependencies se ejecuta yarn add -D dependency_1 dependency_2 dependency_n

Para agregar peerDependencies se ejecuta yarn add -P dependency_1 dependency_2 dependency_n

Agregamos React

```sh
yarn add -P react react-dom
yarn add -D react react-dom
```

Agregamos Typescript

```sh
yarn add typescript @types/node @types/react @types/react-dom
```

Crear directorio **_src_** dentro de ui-lib y dentro de src crear **_index.js_**

## Configurar Storybook

El siguiente comando descarga las dependencias de [Storybook](https://storybook.js.org/), agrega las configuraciones al proyecto, los scripts para usarlo en package.json y ademas unos componentes de ejemplo que se pueden ver cuando se levanta storybook.

```sh
npx sb init
```

Para chequear que esta todo bien, levantamos storybook.

```sh
yarn storybook
```

Despues de chequear que este todo bien, tenemos que exportar los componentes en index.js

```js
import { Button } from './stories/Button'
import { Header } from './stories/Header'
import { Page } from './stories/Page'

export { Button, Header, Page }
```

## Configuracion de Webpack

### Dependencias necesarias.

Para Webpack

```sh
yarn add -D webpack webpack-cli clean-webpack-plugin webpack-node-externals
```

Para Babel

```sh
yarn add -D @babel/preset-env @babel/preset-react @babel/plugin-transform-typescript @babel/preset-typescript
```

Para css

```sh
yarn add -D sass sass-loader style-loader css-loader
```

### Creacion de los archivos de configuracion

Para configurar webpack con typescript tenemos que crear tres archivos de configuracion dentro de ui-lib:

1. tsconfig.json
2. babel.config.json
3. webpack.config.js

Contenido de tsconfig.json

```json
{
	"compilerOptions": {
		"target": "es5",
		"lib": ["dom", "dom.iterable", "esnext"],
		"allowJs": true,
		"skipLibCheck": true,
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"strict": true,
		"forceConsistentCasingInFileNames": true,
		"noFallthroughCasesInSwitch": true,
		"module": "esnext",
		"moduleResolution": "node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx"
	},
	"include": ["src"]
}
```

Contenido de babel.config.json

```json
{
	"presets": [
		["@babel/preset-env"],
		["@babel/preset-react"],
		["@babel/preset-typescript"]
	]
}
```

Contenido de babel.config.json

```js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

/** @type {import('webpack').Configuration} */
module.exports = {
	mode: 'production',
	entry: './src/index.js',
	devtool: 'source-map',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		library: '@sebas663/ui-lib', // tu repo nombre copado
		libraryTarget: 'umd',
		umdNamedDefine: true,
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.(ts|tsx|js)$/,
				exclude: /node_modules/,
			},
			{
				use: ['style-loader', 'css-loader', 'sass-loader'],
				test: /\.(css|scss|sass)$/,
				include: path.resolve(__dirname, './src'),
			},
			{
				type: 'asset',
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.json'],
	},
	plugins: [new CleanWebpackPlugin()],
}
```

### Modificacion de package.json

Agregar

```json
"name": "@sebas663/ui-lib", // tu repo nombre copado
"main": "dist/main.js",
"files": [
    "dist"
 ],
```

Dentro de scripts agregar

```json
"build": "webpack --config webpack.config.js",
"prepare": "yarn build",
```

Comitear todo lo que no hayas comiteado y con todo esto ya esta listo para poder ser utilizado por otro proyecto.

## Utilizacion de libreria

Crear otro proyecto React, luego de crear el proyecto agregar como dependencia la libreria que generamos **_ui-lib_**

```sh
yarn add https://github.com/sebas663/ui-lib.git
```

Y se pueden utilizar los componentes solo importandolos

```js
import { Button, Header, Page } from '@sebas663/ui-lib'
```

## Bonus Eslint Prettier Husky

### Configuracion de Eslint

```sh
yarn add -D eslint
yarn run eslint --init
```

Luego de ejecutar el comando, nos hace unas preguntas para el archivo de configuracion

Seleccionamos **To check syntax, find problems, and enforce code style**

```sh
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
? How would you like to use ESLint? ...
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style
```

Seleccionamos **> JavaScript modules (import/export)**

```sh
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
√ How would you like to use ESLint? · style
? What type of modules does your project use? ...
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```

Seleccionamos **React**

```sh
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
? Which framework does your project use? ...
> React
  Vue.js
  None of these
```

Seleccionamos **Yes**

```console
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
? Does your project use TypeScript? » No / Yes
```

Seleccionamos **Node**

```sh
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node
```

Seleccionamos **> Use a popular style guide**

```sh
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
? How would you like to define a style for your project? ...
> Use a popular style guide
  Answer questions about your style
```

Seleccionamos **> Airbnb: https://github.com/airbnb/javascript**

```sh
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
? Which style guide do you want to follow? ...
> Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
```

Seleccionamos **> JavaScript**

```sh
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · airbnb
? What format do you want your config file to be in? ...
> JavaScript
  YAML
  JSON
```

Seleccionamos **Yes**

```sh
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 40 in 6.757s
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · airbnb
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb@latest
The config that you ve selected requires the following dependencies:

eslint-plugin-react@^7.28.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.3 es
lint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0 @typescript-eslint/parser@latest
? Would you like to install them now with npm? » No / Yes
```

Luego de instalar las dependencias, tambien se crea el archivo **_.eslintrc.js_** con la siguiente estructura:

```js
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {},
}
```

Crear **_.eslintignore_** dentro de ui-lib y colocar

```js
dist/
```

Modificar **_.eslintrc.js_** agregando settings y las apagamos algunas rules.

```js
settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./src'],
			},
		},
	},
rules: {
		'import/extensions': ['error', 'never'],
		'react/prop-types': 'off',
		'react/require-default-props': 'off',
		'import/prefer-default-export': 'off',
		'react-hooks/rules-of-hooks': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'react/function-component-definition': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-filename-extension': 'off',
		'object-curly-newline': 'off',
		'import/no-extraneous-dependencies': 'off',
		'react/jsx-one-expression-per-line': 0,
		'react/no-unescaped-entities': 0,
	},
```

[Rules de Eslint](https://eslint.org/docs/rules/) para ver que hacen.

### Configuracion Prettier

```sh
yarn add -D eslint-config-prettier prettier
```

Crear **_.prettierrc.json_** dentro de ui-lib y colocar

```json
{
	"singleQuote": true,
	"useTabs": true,
	"tabWidth": 1,
	"semi": false,
	"jsxSingleQuote": true
}
```

Crear **_.prettierignore_** dentro de ui-lib y colocar

```js
dist
```

Agregar 'prettier' en extends de .eslintrc.js

```js
extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
```

Agregar los scripts en package.json

```json
"prettier": "prettier --write .",
"test:prettier": "prettier --check ."
```

### Configuracion Husky

El siguiente comando genera la configuracion de husky lint staged y agrega en package.json el atributo "lint-staged"

```sh
npx mrm@2 lint-staged
```

Modificar "lint-staged", tiene que quedar asi

```json
"lint-staged": {
	"*.{js,jsx,ts,tsx}": "eslint --cache --fix",
	"*.{js,jsx,ts,tsx,css,md}": "prettier --write"
}
```

Ahora cada vez que se comitea husky ejecuta lint-staged.

### Bonus 2 test Jest

Proximamente
