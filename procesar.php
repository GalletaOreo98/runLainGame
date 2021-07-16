<?php  
include('cn.php');

$nombre=$_POST['nombre'];
$puntuacion=$_POST['puntuacion'];

$insertar = "INSERT INTO usuarios (nombreUsuario, puntuacion) VALUES('$nombre', '$puntuacion')";

$resultado = mysqli_query($conexion, $insertar);

if ($resultado) {
      echo "¡Tu informacion se ha enviado exitosamente!";
}else{
      echo "Error al conectar con la base de datos :(";
}
?>
