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

## Creacion del repositorio local

En la terminal ejecutamos

```sh
proyectos/ui-lib:~$ git init -b main
```

Agregamos -b main ya que por default git crea la rama como 'master', y nosotros en el remoto la tenemos como 'main'

Podes cambiar la rama por default para tus proximos proyectos con el siguiente comando

```sh
proyectos:~$ git config --global init.defaultBranch main
```

Luego de iniciar git creamos el archivo .gitignore y colocamos dentro del archivo:

```sh
node_modules
dist
```

Conectamos con el repositorio remoto y comiteamos

```sh
ui-libs:~$ git remote add origin https://github.com/sebas663/ui-lib.git
ui-libs:~$ git pull https://github.com/sebas663/ui-lib.git main
ui-libs:~$ git add .
ui-libs:~$ git commit -m "add .gitignore"
ui-libs:~$ git push --set-upstream origin main
```

Ya tenemos conectado nuestro repositorio local con el remoto.

## Creacion del proyecto

Vamos a crear el proyecto con yarn, le agremos el flag -y para que no nos pregunte nada y genere el package.json con los valores por default.

```sh
ui-libs:~$ yarn init -y
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
ui-libs:~$ yarn add -D react react-dom
ui-libs:~$ yarn add -P react react-dom
```

Agregamos Typescript

```sh
ui-libs:~$ yarn add typescript @types/node @types/react @types/react-dom
```

Crear directorio 'src' dentro de ui-lib y dentro de src crear index.js

## Configurar Storybook

El siguiente comando descarga las dependencias de storybook, agrega las configuraciones al proyecto, los scripts para usarlo en package.json y ademas unos componentes de ejemplo que se pueden ver cuando se levanta storybook.

```sh
ui-libs:~$ npx sb init
```

Para chequear que esta todo bien, levantamos storybook.

```sh
ui-libs:~$ yarn storybook
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
ui-libs:~$ yarn add -D webpack webpack-cli clean-webpack-plugin webpack-node-externals
```

Para Babel

```sh
ui-libs:~$ yarn add -D @babel/preset-env @babel/preset-react @babel/plugin-transform-typescript @babel/preset-typescript
```

Para css

```sh
ui-libs:~$ yarn add -D sass sass-loader style-loader css-loader
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

Crear otro proyecto React, luego de crear el proyecto agregar como dependencia la libreria

```sh
otro-proyecto-react:~$ yarn add https://github.com/sebas663/ui-lib.git
```

Y se pueden utilizar los componentes solo importandolos

```js
import { Button, Header, Page } from '@sebas663/ui-lib'
```

## Bonus Eslint Prettier Husky

### Configuracion de Eslint

```sh
ui-libs:~$ yarn add -D eslint
ui-libs:~$ yarn run eslint --init
```

Seba pone los pasos del promp y como queda el config final!!!

Crear .eslintignore dentro de ui-lib y colocar

```sh
dist/
```

### Configuracion Prettier

```sh
ui-libs:~$ yarn add -D eslint-config-prettier prettier
```

Crear .prettierrc.json dentro de ui-lib y colocar

```json
{
	"singleQuote": true,
	"useTabs": true,
	"tabWidth": 1,
	"semi": false,
	"jsxSingleQuote": true
}
```

Crear .prettierignore dentro de ui-lib y colocar

```sh
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
ui-libs:~$ npx mrm@2 lint-staged
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
