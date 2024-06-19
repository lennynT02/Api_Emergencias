# Api_Emergencias

Api que proporciona información de los hospitales de un sector.

## Rutas de Usuarios

- `POST /registro`: Permite a un nuevo usuario registrarse en la plataforma.
- `POST /login`: Permite a un usuario existente iniciar sesión en la plataforma.

## Rutas de Hospitales Públicos

- `GET /hospitalP`: Obtiene todos los hospitales públicos.
- `GET /hospitalP/:id`: Obtiene un hospital público específico por su ID.
- `PUT /hospitalP/:id`: Actualiza la información de un hospital público específico por su ID.
- `DELETE /hospitalP/:id`: Elimina un hospital público específico por su ID.
- `POST /hospitalP/:id`: Añade un recurso a un hospital público específico por su ID.

## Cómo usar

Para usar esta API, primero debe registrarse como usuario a través de la ruta `POST /registro`. Una vez registrado, puede iniciar sesión a través de la ruta `POST /login`.

Para interactuar con la información de los hospitales, puede utilizar las rutas bajo `/hospitalP`. Para obtener todos los hospitales, puede hacer una solicitud GET a `/hospitalP`. Para obtener, actualizar, eliminar o añadir un recurso a un hospital específico, puede hacer una solicitud a `/hospitalP/:id`, reemplazando `:id` con el ID del hospital.

## Notas

Por favor, asegúrese de tener los permisos adecuados antes de intentar actualizar, eliminar o añadir recursos a un hospital.