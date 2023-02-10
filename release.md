#  Versiones:


### v0.0.3:
- Tiene el formulario del frontend para agregar categorias con toda la informacion que necesita.
- Envia el formulario con toda la informacion al servidor por un formData y fetch.
- El servidor recive la informacion y archiva la imagen.
- Guarda la imagen en carpetas personalizadas con el nombre de la categoria ordenadamente.

### v0.0.31:
- Se modificó el middleware de multer para verificar si existen las carpetas antes de crearlas.
- Se cambió los inputs multiples de las fotos a solo 1 foto.
- Se ignoró la carpeta uploads/.

### v0.0.32:
- Se arreglaron errores en el middleware de multer al crear carpetas.

### v0.0.4:
- Cambios en el estilo de los formularios(el input date, se cambio el h3 del total de capitulos en el formulario de series a un input text, modificacion del campo "descripcion", ).
- Correccion de errores en el frontend como el de resetear, el efecto de los inputs y el input del total de capitulos.
- Cambios en el html del formSerie.
- Se Agrego la ruta y el controlador del formulario de serie al backend.
- Modificaciones en el middleware de multer para crear las carpetas.

### v0.0.5: 
- Se agrego la Base de datos.
- Se instalo Mongoose.
- Se instalo express-validator.
- Se crearon los directorios ( helpers, db, models, validators ).
- Se configuro Mongoose.
- Se crearon los modelos.
- Modificaciones en el middleware de multer.
- Se crearon las validaciones en validators/formCategorias.
- Se le quitaron los bordes a los labels en el frontend.
- Se organizaron los archivos css de las vistas.
- Se aplico la herencia a los archivos js de los formularios de las categorias.
- En el controlador formAdmin se agregó el manejo con la base de datos.

### v0.0.55:
- Se organizaron las vistas de formCategorias y se separaron en pequeñas partes.
- Cambios de Estilo en el formulario de las categorias( se cambio el input date, entre otras cosas ).
- Instalacion de Tailwindcss.
- Cambio del estilo SilderBar a tailwindcss. 
- Se corrijeron errores en el modal. 


### V0.0.56:
- Algunos cambios en el diseño de los formularios de las categorias.
- Se agregaron mis clases a tailwind en la parte del navegador lateral.


### v0.0.6:
- Se agrego la vista del catalogo.
- Se configuro el controlador para que devuelva la informacion necesaria a la vista.

### v0.0.7:
- Se configuro la vista dinamicamente para las busquedas, el filtrado de generos y las targetas.
- Se configuro la funcionalidad del buscador del catalogo.
- Se configuro las funcionalidades del carrucel.
- Se cambio el estilo de las targetas.
- Se configuro todo en la vista para movil y pantallas grandes.

### v0.0.8:
- Se cambiaron las configuraciones de tailwind y sus archivos estaticos de cada componente de la vista.
- Se cambiarion los estilos de los formularios para insertar categorias.
- Se cambiarion los estilos de los formularios de css a tailwindcss.


### v0.1.0:
- Se agrego la paginacion.
- Se cambio toda la UI a la parte del frontend con javascript.
. Se agrego la api de Series en el backend y en el frontend.

### v0.1.1:
- Se cambiaron todas las vistas del catalogo a una sola la igual que los archivos js.
- Se agrego bin al frontend la libreria swiper.

### v0.1.2:
- Se adiciono la funcion de "estar solo uno" en la vista del catalogo en la parte del buscador y los generos.

## v0.1.3
- Se se cambiaron todas las vistas de los formularios a una sola y se paso la logica al frontend.


