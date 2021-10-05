<?php
// Include config.php file
include_once 'config.php';

// Create a class Users
class Database extends Config
{
    // Fetch all or a single user from database
    public function fetch($id = 0, $pageNo = 0)
    {
        $offset = ($pageNo * 20) + 1;
        $sql = 'SELECT id, first_name as firstName,last_name as lastName, DATE_FORMAT(dob,"%m/%d/%Y") as dob FROM users';
        if ($id != 0) {
            $sql .= ' WHERE id = :id';
        } else {
            $sql .= ' LIMIT 20 OFFSET ' . $offset;
        }
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->fetchAll();
    }

    // Fetch all users count from database
    public function getCounts($pageNo = 0): int
    {
        $sql = 'SELECT id FROM users';
        if ($pageNo > 0) {
            $offset = ($pageNo * 20) + 1;
            $sql .= ' LIMIT 20 OFFSET ' . $offset;
        }
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->rowCount();
    }

    // Insert a user in the database
    public function insert($firstName, $lastName, $dob): bool
    {
        $sql = 'INSERT INTO users (first_name, last_name, dob) VALUES (:name, :last_name, :dob)';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['name' => $firstName, 'last_name' => $lastName, 'dob' => $dob]);
        return true;
    }

    // Update a user in the database
    public function update($firstName, $last_name, $dob, $id): bool
    {
        $sql = 'UPDATE users SET first_name = :first_name, last_name = :last_name, dob = :dob WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['first_name' => $firstName, 'last_name' => $last_name, 'dob' => $dob, 'id' => $id]);
        return true;
    }

    // Delete an user from database
    public function delete($id): bool
    {
        $sql = 'DELETE FROM users WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);
        return true;
    }
}
