<?php class DataController {
  protected $server = "";
  protected $username = "";
  private $password = "";

  protected $conn = "";

  protected $database = "";
  protected $table = "";

  function __construct($params = []) {
    $this->server = $params['server'] ?? NULL;
    $this->database = $params['database'] ?? NULL;
    $this->table = $params['table'] ?? NULL;
    $this->username = $params['username'] ?? NULL;
    $this->password = $params['password'] ?? NULL;

    if (!empty($params)) {
      if (!empty($this->database) && !empty($this->username)) {
        try {
          $this->conn = new PDO("mysql:host=$this->server;dbname=$this->database;charset=utf8", $this->username, $this->password);
          // set the PDO error mode to exception
          $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
          echo "Connection failed: " . $e->getMessage();
        }
      }
    } else {
      $this->info();
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
      return False;
      exit();
    }
  }

  function insert($cols, $values) {
    if (count($cols) === count($values)) {
      $maxA = count($cols)-1;
      $strA = "";
      $strB = "";

      for ($a = 0; $a<count($cols); $a++) {
      if ($a < $maxA) {
          $strA .= $cols[$a] . ", ";
          $strB .= ":".$cols[$a] . ", ";
      } else {
          $strA .= $cols[$a];
          $strB .= ":".$cols[$a];
      }
      }

      try {
        $stmt = $this->conn->prepare("INSERT INTO $this->table ($strA) VALUES ($strB)");
        for ($n = 0; $n < count($cols); $n++) {
            $stmt->bindParam(":".$cols[$n], $values[$n]);
        }
        $stmt->execute();
        return array(
            "status" => True,
            "insertId" => $this->conn->lastInsertId()
        );
      } catch(PDOException $e) {
        echo "Insert Error: " . $e->getMessage();
        return False;
        exit();
      }
    } else {
      echo "Insert Error: columns and values must have the same length.";
      return False;
      exit();
    }
  }

  function update($id, $cols, $values) {
    if (count($cols) === count($values)) {
      $max = count($cols)-1;
      $str = "";
      for ($i = 0; $i<count($cols); $i++) {
        if ($i < $max) {
          $str .= $cols[$i] . "=:" . $cols[$i] . ", ";
        } else {
          $str .= $cols[$i] . "=:" . $cols[$i];
        }
      }
      try {
        $stmt = $this->conn->prepare("UPDATE $this->table SET $str WHERE id=:id");
        $stmt->bindParam(":id", $id);
        for ($n = 0; $n < count($cols); $n++) {
            $stmt->bindParam(":".$cols[$n], $values[$n]);
        }
        $stmt->execute();
        return True;
      } catch (PDOException $e) {
        echo "Update Error: " . $e->getMessage();
        return False;
        exit();
      }
    } else {
        echo "Insert Error: columns and values must have the same length.";
        return False;
        exit();
    }
  }

  function selectId($id) {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE id=:id");
      $stmt->bindParam(":id", $id);
      $stmt->execute();

      // set the resulting array to associative
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

      $data = $stmt->fetch();
      return $data;
    } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
      return False;
      exit();
    }
  }

  function delete($id) {
    try {
      $stmt = $this->conn->prepare("DELETE FROM $this->table WHERE id=:id");
      $stmt->bindParam(":id", $id);
      $stmt->execute();
      return True;
    } catch(PDOException $e) {
      echo "Delete Error: " . $e->getMessage();
      return False;
      exit();
    }
  }

  function search($str, $cols, $order = Null) {
    $sqlStr = "";
    $max = count($cols)-1;

    for ($i = 0; $i<count($cols); $i++) {
      if ($i < $max) {
        $sqlStr .= $cols[$i] . " LIKE :" . $cols[$i] . " OR ";
      } else {
        $sqlStr .= " " . $cols[$i] . " LIKE :" . $cols[$i];
      }
    }

    try {
      if ($order === Null) {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE $sqlStr");
      } else {
        if (!empty($order)) {
          $orCol = $order["column"] ?? Null;
          $orTyp = $order["type"] ?? "ASC";
          if ($orCol !== Null) {
            if (strtoupper($orTyp) === "ASC") {
              $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE $sqlStr ORDER BY $orCol ASC");
            } else if (strtoupper($orTyp) === "DESC") {
              $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE $sqlStr ORDER BY $orCol DESC");
            } else {
              echo "Search Error: missing sorting type [asc, desc]";
              return False;
              exit();
            }
          } else {
            echo "Search Error: missing column";
            return False;
            exit();
          }
        }
      }
      $ned = "%$str%";
      for ($n = 0; $n<count($cols); $n++) {
        $stmt->bindParam(":".$cols[$n], $ned);
      }
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

      $data = $stmt->fetchAll();
      return $data;
    } catch(PDOException $e) {
      echo "Search Error: " . $e->getMessage();
      return False;
      exit();
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
      return False;
      exit();
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
      return False;
      exit();
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
      return False;
      exit();
    }
  }

  function info() {
    echo "<pre>";
    $msg = '<strong>DatabaseController</strong>
This is a PHP tool to controll databases independently.

<strong>basic usage</strong>:
$db = new DataController([
  "server" => "localhost",
  "database" => "myDatabase",
  "table" => "myTable",
  "username" => "myUsername",
  "password" => "myPassword"
]);

echo <"pre">;
print_r($db->read());




<strong>methods</strong>:
--> read()
    returns all values from the database unsorted
    * takes no parameters

--> insert(columns<sup>1</sup>, values<sup>2</sup>)
    inserts an entry to the database defined by column and value arrays
    1. the array wich represents the columns (array)
    2. the array wich represents the values (array)

--> update(id<sup>1</sup>, columns<sup>2</sup>, values<sup>3</sup>)
    updates an entry specified by id and defined by column and value arrays
    1. database id (int)
    2. the array wich represents the columns (array)
    3. the array wich represents the values (array)

--> selectId(id<sup>1</sup>)
    selects one specific entry from the database defined by id
    1. database id (int)

--> delete(id<sup>1</sup>)
    deletes one specific entry from the database defined by id
    1. database id (int)

--> search(string<sup>1</sup>, columns<sup>2</sup>, [sort<sup>3</sup>])
    searches the database by the given columns
    1. string to search for (str)
    2. columns in wich should be searched (array)
    3. optional sort: (array)
       takes an array as follows:
       array(
         "column" => [column to sort by],
         "type" => [ASC or DESC]
       )

--> asc(column<sup>1</sup>)
    returns the database values sorted by the given column in ascending order
    1. column (string)

--> desc(column<sup>1</sup>)
    returns the database values sorted by the given column in descending order
    1. column (string)

--> count()
    returns the number of entries the database currently has
    * takes no paramenters



<strong>* this tool works on prepared PDO statements since August 2020</strong>';
    echo $msg;
    echo "</pre>";
  }
}