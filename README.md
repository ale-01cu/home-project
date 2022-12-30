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
