# Aplicación front-end de la mascota virtual

## Descripción general y funcionalidades
Este proyecto constituye la parte front-end de una aplicación destinada a crear y cuidar mascotas virtuales. Consume RestApis expuestas en el proyecto correspondiente de Back-end disponible en este repositorio https://github.com/g-lemoing/virtualPetBk

 Incluye las funcionalidades siguientes:
- identificación y autenticación mediante Json Web Token, con sus páginas de login y alta de nuevo usuario correspondientes
- ver y acceder a todas las mascotas del usuario autenticado (si tiene role USER) y de las mascotas de todos los usuarios, si el usuario autenticado tiene role ADMIN.
- crear nuevas mascotas, seleccionando entre los tipos de animales y colores disponibles y dandoles nombre propio
- interactuar con ellas a través de varios botones de acción que producen efectos visuales en su imagen y modificaciones en 3 indicadores de estado: ánimo, hambre y energía
- eliminar mascotas si así se desea.

## Requísitos y dependencias:
- Es necesario tener node.js instalado (https://nodejs.org/)
- Proyecto React creado con Vite
- TailwindCss para Estilos css
- Axios para consumir endpoints disponibles

## Instalación
1. Clonar el repositorio de Github
git clone https://github.com/g-lemoing/virtualPetFrontEnd.git
2. Instalar node.js si necesario desde (https://nodejs.org/)
3. Abrir el IDE e importar el proyecto desde el repositorio local desde Archivo>Abrir>Carpeta.


## Ejecución
1. Abrir la terminal en el IDE y navegar hasta el directorio raíz del proyecto React
2. Ejecutar el comando > npm run dev
Eso iniciará el servidor, con la URL donde estará disponible la aplicación (en principio localhost:5173)
3. Abrir el navegador e ir a la URL indicada, y empezar a usar la aplicación

## Contribución
1. Crear un fork del repositorio: 
2. Clonar el repositorio hacia el directorio local marcado por git bash
 git clone https://github.com/YOUR-USERNAME/virtualPetFrontEnd
3. Crear una rama
git branch BRANCH-NAME
git checkout BRANCH-NAME
4. Realizar cambios o comentarios, y hacer un commit: git commit -m 'mensaje cambios'
5. Subir cambios a tu nueva rama: git push origin BRANCH-NAME
6. Hacer un pull request

