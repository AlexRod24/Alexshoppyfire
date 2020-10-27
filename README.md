# ShoppyFire
Mi primer proyecto E-commerce en ReactJS

Creado primariamente con Create React App y React Bootstrap
[Create React App](https://github.com/facebook/create-react-app).
[React Bootstrap](https://react-bootstrap.github.io/)

## Home
Como se puede apreciar el inicio de la app contiene un Loader creado con `React-loader-spinner`,
Utilicé Cloud Firestore de Firebase como server para poder traer todo el contenido al sitio.
Luego, se puede ver que la Home genera un Banner de tipo Slider y 2 bloques de productos filtrado por Promos.

## Productos
Al ingresar a la sección de Productos se pueden ver los mismos y añadirlos al carrito eligiendo su cantidad, coloqué un botón de Borrar
ya que muchas veces en Mobile es mas sencillo y rápido que apretar el input y borrar o decrementar todo.
Al apretar "Añadir al carrito" (que está bloqueados hasta que no se elija al menos 1 item) se puede observar un Modal
que te avisa cuando se agregó satisfactoriamente y si se clikea en el CartIcon Button del Nav se podrá apreciar
(antes de ingresar al carrito) los productos agregados con su detalle.
Al quedarse 1 item "sin Stock" el botón de Añadir carrito se convierte en un botón de "Avisarme cuando esté disponible", el contador también desaparece.

## Carrito
Contiene el detalle previo al checkout en el cuál decidí colocar un botón de "Eliminar" para retirar el mismo del listado.


## Checkout
El el mismo se puede ver un Form para ingresar los datos del cliente y el listado final con los detalles y la sumatoria de los precios e items.
Una vez ingresado los datos se confirma la compra enviando la información a "Orders" dentro del Firestore.


## Pedidos
Listado de pedidos realizados por el usuario.
Al apretar en el componente "Accordion" con el N° de Pedido, muestra el detalle completo de la misma.

## El sitio
Se puede visualizar el sitio en el siguiente link:
- [Video del sitio ShoppyFire](docs/shoppyfire.mp4)

<br />
<br />
---------------------------------------
<br />
<br />

Este Proyecto se puede inicializar con:

### `npm run start`

Runs the app in the development mode.<br />
Abrí [http://localhost:3000](http://localhost:3000) para verlo en tu navegador.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Contribute
- Fork this repo.
- Create a pull request.
- Ask for my review.
- Push your changes.

## Extra Docs
- [Enviroment Doc](docs/Enviroment.md)






