<?php
$string = $_POST["string"]."\n";//エスケープシーケンスが意味を持つようにダブルクオテーション
$fileName = 'canvasString2.js';
$fp = fopen($fileName, 'a+b');
flock($fp, LOCK_EX);
fwrite($fp, $string);
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);