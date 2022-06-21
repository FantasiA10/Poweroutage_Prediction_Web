<?php
	$jpg = base64_decode(chunk_split($_POST['imagedata']));
	header('Connection: Keep-alive');
	header('Content-Type: image/jpeg');
	header("Content-Disposition: attachment; filename=".$_GET['name']);
	echo $jpg;
?>