<h1>Proyecto final: Redemplear</h1>
<h2>UTN FRLP</h2>

<h3>Breve descripción del proyecto</h3>
<p> 
  La idea es crear una aplicación web la cual permita tanto a empresas como a particulares (demandantes) contratar profesionales (oferentes). Estos últimos se podrán crear un perfil en el cual deberán completar sus datos personales (nombre, apellido, email, teléfono, país, provincia, ciudad, entre otros que puedan surgir) así como también sus skills o habilidades. También podrán adjuntar su curriculum vitae y crear un portfolio con sus trabajos (pudiendo ser este el link de Github por ejemplo o alguna plataforma equivalente para traductores u otra profesión). A su vez podrán gestionar su información y recibir ofertas de trabajo mediante notificaciones, pudiendo ser estas rechazadas o aceptadas.
Del lado de los oferentes se proveerá un buscador en el cual se podrán filtrar por Programador o Traductor, así como también incumbencias o especializaciones, como puede ser en el caso de un programador especializado en Javascript o Python, entre otros, o para un traductor especializado en portugués, artículos de ingeniería, artículos de cocina, entre otros. También podrán filtrar por localización. Por ejemplo: Programador => Python => La Plata, Buenos Aires, Argentina. Una vez que filtren aparecerán listados todos los candidatos al trabajo requerido, pudiendo seleccionar por algún criterio. Lo ideal sería que haya una evaluación de parte del empleador hacia el empleado una vez que finalice la tarea para, en un futuro, poder filtrar por calificación. 
Los costos hora-hombre serán fijados por el trabajador, aunque también habrá una opción de negociado.
Una vez que se realice un contrato quedará asentada toda la información del mismo: el monto que se acordó, el tiempo de duración, los datos de ambos participantes, y otros datos pertinentes a la transacción.
</p>
  
<h3>Objetivos</h3>
<ul>
  <li>Proveer una herramienta útil a diferentes profesionales para conseguir empleos y desarrollar su carrera profesional.</li>
  <li>Proveer a empresas o particulares una diversa oferta de servicios de diversas profesiones.</li>
  <li>Simplificar la contratación y ofrecimiento de servicios laborales.</li>
  <li>Generar un proyecto escalable, pudiendo incorporar nuevas funcionalidades.</li>
  <li>Consolidar una plataforma en la cual los usuarios confíen y tengan como una opción relevante.</li>
  <li>Expandir la aplicación a otras profesiones.</li>
</ul>

<h3>Como correr el proyecto</h3>

<h4>Descargar Git y clonar el proyecto</h4>
<ol> 
  <li>Abrir una terminal en Linux y Ejecutar > sudo apt-get install git</li>
  <li>En Windows podés descargar Git https://git-scm.com/ e instalarlo. Usaremos Git Bash para poder ejecutar los comandos de Git</li>
  <li>En Linux ejecutar el siguiente comando en la Terminal y en Windows hacerlo utilizando Git Bash: > git clone https://github.com/nachomac12/ProyectoFinal.git</li>
</ol>

<h4>Configurar la base de datos</h4>
  <ol>
    <li>Descargar MongoDB: https://www.mongodb.com/download-center/enterprise </li>
    <li>Si estas en Windows tenes que ir a la ruta donde se instaló Mongo, por lo general es C:/ => Program Files => MongoDB => Server => <Version de Mongo> => bin => ejecutar el archivo mongod.exe; si estas en Linux dejo este tutorial https://tecadmin.net/install-mongodb-on-ubuntu/. Este paso es para poder dejar corriendo la db en un puerto.</li>
  <li>Una vez hecho esto descargar este <a href="https://mega.nz/#!hM9QHIKJ!6bOdRaWKWnHrPwF1k3Q5aldR6NNwZmqc_zxwXwPuugU" target="_blank">archivo</a> y descomprimirlo.</li>
    <li>Ejecutar en una Terminal (Linux) o Windows Power Shell (Windows) el siguiente comando: > mongorestore -d redprof <RUTA_ARCHIVO_DESCOMPRIMIDO>/redprof</li>. Si estas en Windows este último comando lo vas a tener que correr desde este directorio: C:/ => Program Files => MongoDB => Server => <Version de Mongo> => bin
  </ol>

<h4>Descargar Node y correr el proyecto</h4>
<ol>
  <li>Descargar node en https://nodejs.org/es/</li>
  <li>Abrir una terminal en Linux o "Windows Power Shell" en Windows</li>
  <li>Ir a la carpeta raíz de ProyectoFinal y correr > npm install</li>
  <li>Ir a la carpeta ProyectoFinal/client y ejecutar > npm install</li>
  <li>Volver al directorio ProyectoFinal y ejecutar > npm run dev</li>
</ol>
  
  <b>Cualquier consulta enviarme un email a maciasignacio0@gmail.com</b>
