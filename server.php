<?php
/**
 * Created by PhpStorm.
 * User: antonshell
 * Date: 18.09.2017
 * Time: 17:22
 */

include 'vendor/autoload.php';

use Dilab\Network\SimpleRequest;
use Dilab\Network\SimpleResponse;
use Dilab\Resumable;

$request = new SimpleRequest();
$response = new SimpleResponse();

$resumable = new Resumable($request, $response);

$resumable->tempFolder = 'temp';
$resumable->uploadFolder = 'uploads';

/*$resumable->tempFolder = __DIR__ . '/temp';
$resumable->uploadFolder = __DIR__ . '/uploads';*/

$resumable->process();
