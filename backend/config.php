<?php

class Config
{
    // Database Details
    const DB_HOST = 'localhost';
    const DB_USER = 'root';
    const DB_PASSWORD = '';
    const DB_NAME = 'vitzo';

    // Data Source Network
    private $dsn = 'mysql:host=' . self::DB_HOST . ';dbname=' . self::DB_NAME . '';

    // connection variable
    protected $conn = null;

    // Constructor Function
    public function __construct()
    {
        try {
            $this->conn = new PDO($this->dsn, self::DB_USER, self::DB_PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            die('Connection Failed : ' . $e->getMessage());
        }
        return $this->conn;
    }

    // Sanitize Inputs
    public function check_input($data): string
    {
        $data = strip_tags($data);
        $data = htmlspecialchars($data);
        $data = stripslashes($data);
        return trim($data);
    }

    // JSON Format Converter Function
    public function message($content, $status)
    {
        return json_encode(['message' => $content, 'error' => $status]);
    }
}