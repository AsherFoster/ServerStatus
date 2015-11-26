<?php
$handle =curl_init($_GET['url']);

curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($handle, CURLOPT_HEADER, true);
curl_setopt($handle, CURLOPT_NOBODY, true);
$response = curl_exec($handle);

$code = curl_getinfo($handle, CURLINFO_HTTP_CODE);
if(!empty($code)){
    echo '{
        "code":'.$code.',
        "text":"'.rtrim(strtok($response, "\n")).'"
    }';
    die();
}else{
    echo "ERR";
    die();
}
?>