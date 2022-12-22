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