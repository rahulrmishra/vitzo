<?php
// Include config.php file
include_once 'config.php';

// Create a class Users
class Database extends Config {
    // Fetch all or a single user from database
    public function fetch($id = 0) {
        $sql = 'SELECT * FROM users';
        if ($id != 0) {
            $sql .= ' WHERE id = :id';
        }
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->fetchAll();
    }


}
