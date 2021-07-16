<?php
include("cn.php");
$usuarios= "SELECT * FROM usuarios ORDER BY puntuacion desc LIMIT 3;";
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RunLain</title>
    <link rel="stylesheet" href="/css/estilos.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.1/howler.min.js"></script>
    <script src="juego.js"></script>
    
 

</head>
<body onload="inicializar();" background="/data/fondoPagina.jpeg">
   <canvas onclick="click()" id="canvas" width="700" height="300" style="border: 4px solid #ffffff;"></canvas> 

   <form name="formulario" action="procesar.php" method="post">
    <p class="nombre">Nombre: <input type="text" name="nombre" /></p>
    <input type="hidden" name="puntuacion" id="puntuacion">
    <input class="botonEnviar" id="botonEnviar" type="submit" value="Enviar" disabled/>
    </form>
    <button onclick="tapOrClick()">Reset</button>

    <?php $resultado = mysqli_query($conexion, $usuarios);
        $contador=1;
        while ($row=mysqli_fetch_assoc($resultado)) { ?>
            <div><?php echo $contador ?>. <?php echo $row ['nombreUsuario'];?>: <?php echo $row ['puntuacion']; ?></div>
     <?php $contador++; } mysqli_free_result($resultado);?>
</body>
</html>