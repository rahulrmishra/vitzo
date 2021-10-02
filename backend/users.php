<?php

// Include CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

// Include action.php file
include_once 'db.php';
// Create object of Users class
$user = new Database();

// create an api variable to get HTTP method dynamically
$api = $_SERVER['REQUEST_METHOD'];

// get id from url
$id = intval($_GET['id'] ?? '');

// Get all or a single user from database
if ($api == 'GET') {
    if ($id != 0) {
        $data = $user->fetch($id);
    } else {
        $data = $user->fetch();
    }

    echo json_encode($data);
}

// Add a new user into database
if ($api == 'POST') {
    $post_input = json_decode(file_get_contents('php://input'));

    $firstName = $user->check_input($post_input->firstName);
    $lastName = $user->check_input($post_input->lastName);
    $dob = $user->check_input($post_input->dob);
    if ($dob != '')
        $dob = date('Y-m-d', strtotime($dob));

    if ($user->insert($firstName, $lastName, $dob)) {
        echo $user->message('User added successfully!', false);
    } else {
        echo $user->message('Failed to add an user!', true);
    }
}

