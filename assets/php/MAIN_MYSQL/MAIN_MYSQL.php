<?php class MAIN_MYSQL {
  protected $server = "";
  protected $username = "";
  private $password = "";

  public $conn = "";

  protected $database = "";
  protected $table = "";

  function __construct($params = []) {
    $this->server = $params['server'] ?? NULL;
    $this->database = $params['database'] ?? NULL;
    $this->table = $params['table'] ?? NULL;
    $this->username = $params['username'] ?? NULL;
    $this->password = $params['password'] ?? NULL;

    if (!empty($this->database) && !empty($this->username) && !empty($this->password)) {
      try {
        $this->conn = new PDO("mysql:host=$this->server;dbname=$this->database;charset=utf8", $this->username, $this->password);
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }
    }
  }

  function read() {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table"); 
      $stmt->execute();

      // set the resulting array to associative
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

      $data = $stmt->fetchAll();
      return $data;
    } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  }

  function insert($cols, $values) {
    $maxA = count($cols)-1;
    $strA = "";

    $maxB = count($values)-1;
    $strB = "";

    for ($a = 0; $a<count($cols); $a++) {
      if ($a < $maxA) {
        $strA .= $cols[$a] . ", ";
      } else {
        $strA .= $cols[$a];
      }
    }

    for ($b = 0; $b<count($values); $b++) {
      if ($b < $maxB) {
        $strB .= "'" . $values[$b] . "', ";
      } else {
        $strB .= "'" . $values[$b] . "'";
      }
    }

    try {
      $sql = "INSERT INTO $this->table ($strA) VALUES ($strB)";
      // use exec() because no results are returned
      $this->conn->exec($sql);
      return array(
        'status' => True,
        'insertId' => $this->conn->lastInsertId()
      );
    } catch(PDOException $e) {
      echo $sql . "<br>" . $e->getMessage();
      return False;
    }
  }

  function update($id, $cols, $values) {
    if (count($cols) === count($values)) {
      $max = count($cols)-1;
      $str = "";
      for ($i = 0; $i<count($cols); $i++) {
        if ($i < $max) {
          $str .= $cols[$i] . "='" . $values[$i] . "', ";
        } else {
          $str .= $cols[$i] . "='" . $values[$i] . "'";
        }
      }
      try {
        $sql = "UPDATE $this->table SET $str WHERE id=$id";
    
        // Prepare statement
        $stmt = $this->conn->prepare($sql);
    
        // execute the query
        $stmt->execute();
        return True;
      } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
        return False;
      }
    } else {
      echo "<strong>FATAL ERROR: Value count is not equal!</strong>";
    }
  }

  function selectId($id) {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE id=$id"); 
      $stmt->execute();

      // set the resulting array to associative
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

      $data = $stmt->fetch();
      return $data;
    } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  }

  function delete($id) {
    try {
      // sql to delete a record
      $sql = "DELETE FROM $this->table WHERE id=$id";
  
      // use exec() because no results are returned
      $this->conn->exec($sql);
    } catch(PDOException $e) {
      echo $sql . "<br>" . $e->getMessage();
    }
  }

  function search($str, $cols) {
    $sqlStr = "";
    $max = count($cols)-1;

    for ($i = 0; $i<count($cols); $i++) {
      if ($i < $max) {
        $sqlStr .= $cols[$i] . " LIKE '%" . $str . "%' OR ";
      } else {
        $sqlStr .= " " . $cols[$i] . " LIKE '%" . $str . "%'";
      }
    }

    $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE $sqlStr"); 
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $data = $stmt->fetchAll();
    
    if (count($data) > 0) {
      return $data;
    } else {
      return False;
    }
  }

  function sortSearch($str, $cols) {
    $sqlStr = "";
    $max = count($cols)-1;

    for ($i = 0; $i<count($cols); $i++) {
      if ($i < $max) {
        $sqlStr .= $cols[$i] . " LIKE '%" . $str . "%' OR ";
      } else {
        $sqlStr .= " " . $cols[$i] . " LIKE '%" . $str . "%'";
      }
    }

    $sqlStr .= " ORDER BY song_name ASC";

    $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE $sqlStr"); 
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $data = $stmt->fetchAll();
    
    if (count($data) > 0) {
      return $data;
    } else {
      return False;
    }
  }

  function asc($column) {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table ORDER BY $column ASC"); 
      $stmt->execute();

      // set the resulting array to associative
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

      $data = $stmt->fetchAll();
      return $data;
    } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  }

  function desc($column) {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table ORDER BY $column DESC"); 
      $stmt->execute();

      // set the resulting array to associative
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

      $data = $stmt->fetchAll();
      return $data;
    } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  }

  function count() {
    try {
      $stmt = $this->conn->prepare("SELECT COUNT(*) FROM $this->table"); 
      $stmt->execute();

      // set the resulting array to associative
      $result = $stmt->fetchColumn();

      $data = $result;
      return $data;
    } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  }

  public function info() {
    echo "\$db = new MAIN_MYSQL([Database], [Table], [Server], [Username], [Password]);";
  }
}