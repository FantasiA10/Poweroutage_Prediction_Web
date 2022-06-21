<?php
	header('Content-type: text/csv');
	header('Content-disposition: attachment; filename="StatPlanet_data.csv"');
	$csvData = ($_POST['csvdata']) ? $_POST['csvdata'] : $_GET['csvdata'];
	echo  $csvData;
?>