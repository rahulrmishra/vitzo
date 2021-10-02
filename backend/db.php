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

    // Insert a user in the database
    public function insert($firstName, $lastName, $dob): bool
    {
        $sql = 'INSERT INTO users (first_name, last_name, dob) VALUES (:name, :last_name, :dob)';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['name' => $firstName, 'last_name' => $lastName, 'dob' => $dob]);
        return true;
    }


}
