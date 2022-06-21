<?php
	$png = base64_decode(chunk_split($_POST['imagedata']));
	header('Connection: Keep-alive');
	header('Content-Type: image/png');
	header("Content-Disposition: attachment; filename=".$_GET['name']);
	echo $png;
?>