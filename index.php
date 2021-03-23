<?php
	$file = fopen("userdata.json", "w");
	$content = $_POST["postData"];
	fwrite($file,$content);
    fclose($file);
?>