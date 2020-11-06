<?php

//traigo el dominio
$_DOMINIO = htmlspecialchars($_GET["dominio"]);
$_TIPO = htmlspecialchars($_GET["tipo"]);

if (isset($_FILES['image'])) {

   $errors = array();
   $file_name = $_FILES['image']['name'];
   $file_size = $_FILES['image']['size'];
   $file_tmp = $_FILES['image']['tmp_name'];
   $file_type = $_FILES['image']['type'];
   $explode_result = explode('.', $_FILES['image']['name']);
   $file_ext = strtolower(end($explode_result));

   $extensions = array("jpeg", "jpg");

   if (in_array($file_ext, $extensions) === false) {
      $errors[] = "extension no permitida, elija un archivo JPEG.";
   }

   if ($file_size > 10097152) {
      $errors[] = 'Archivo demasiado grande';
   }

   if (empty($errors) == true) {

      if (!file_exists('images/' . $_DOMINIO)) {
         mkdir('images/' . $_DOMINIO);
      }
      move_uploaded_file($file_tmp, "images/" . $_DOMINIO . '/' . $_TIPO . '-' . $_DOMINIO . '.' . $file_ext); //front04-CHP992.jpg frontbaja-CHP992.jpg
      echo "Success";
      echo "<script>window.close();</script>";
   } else {
      print_r($errors);
   }
}
?>
<html>

<body>

   <form action="" method="POST" enctype="multipart/form-data">
      <input type="file" name="image" />
      <input type="submit" />
   </form>

</body>
<script>
   function CloseMySelf(sender) {
      try {
         window.opener.HandlePopupResult(sender.getAttribute("result"));
      } catch (err) {}
      window.close();
      return false;
   }
</script>

</html>