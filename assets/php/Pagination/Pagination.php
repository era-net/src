<?php class Pagination {
  protected $server, $database, $table, $username, $password, $conn;
  private $total, $limit, $order_by, $pages, $order_type;

  public function __construct($params = []) {
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

          $this->total = $this->conn->query("SELECT COUNT(*) FROM $this->table")->fetchColumn();

          if (isset($params["options"])) {
            if (isset($params["options"]["order_by"])) $this->order_by = $params["options"]["order_by"];
          }
          $this->limit = $params["options"]["limit"] ?? 20;

          $this->pages = ceil($this->total / $this->limit);
        } catch(PDOException $e) {
          echo "Connection failed: " . $e->getMessage();
        }
      } else {
        echo "Connection failed: empty database and username parameters";
      }
    } else {
      echo "Connection failed: too few arugemtns for Pagination::__construct";
    }
  }

  public function getLimit() {
    return $this->limit;
  }

  public function setLimit(int $limit) {
    $this->limit = $limit;
    $this->pages = ceil($this->total / $this->limit);
  }

  public function setOrder($column, $type = "ASC") {
    if ($type === "ASC" || $type === "asc") {
      $type = "ASC";
    } elseif ($type === "DESC" || $type === "desc") {
      $type = "DESC";
    } else {
      echo "Pagination Error: unknown order type at Pagination::setOrder";
    }
    $this->order_by = $column;
    $this->order_type = $type;
  }

  public function getTotal() {
    return (int)$this->total;
  }

  public function setTotal(int $num) {
    $this->total = $num;
    $this->pages = ceil($this->total / $this->limit);
  }

  public function getData(int $page_number = 1) {
    $page = $page_number;
    $offset = ($page - 1) * $this->limit;

    $start = $offset + 1;
    $end = min(($offset + $this->limit), $this->total);

    $previous = ($page > 1) ? intval($page - 1) : False;
    $next = ($page < $this->pages) ? intval($page + 1) : False;

    if (isset($this->order_by)) {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table ORDER BY $this->order_by $this->order_type LIMIT :limit OFFSET :offset");
    } else {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table LIMIT :limit OFFSET :offset");
    }
    $stmt->bindParam(":limit", $this->limit, PDO::PARAM_INT);
    $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      $stmt->setFetchMode(PDO::FETCH_ASSOC);
      $data = $stmt->fetchAll();

      $rsp = array(
        "status" => True,
        "page" => $page,
        "links" => array(
          "previous" => $previous,
          "next" => $next,
          "start" => 1,
          "last" => $this->pages,
        ),
        "data" => $data
      );
    } else {
      $rsp = array(
        "status" => False
      );
    }

    return $rsp;
  }

  public function getDataIgnore(int $page_number = 1, string $ignored) {
    $page = $page_number;
    $offset = ($page - 1) * $this->limit;

    $start = $offset + 1;
    $end = min(($offset + $this->limit), $this->total);

    $previous = ($page > 1) ? intval($page - 1) : False;
    $next = ($page < $this->pages) ? intval($page + 1) : False;
    

    if (isset($this->order_by)) {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table ORDER BY $this->order_by $this->order_type LIMIT :limit OFFSET :offset");
    } else {
      $stmt = $this->conn->prepare("SELECT * FROM $this->table LIMIT :limit OFFSET :offset");
    }
    $stmt->bindParam(":limit", $this->limit, PDO::PARAM_INT);
    $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      $stmt->setFetchMode(PDO::FETCH_ASSOC);
      $data = $stmt->fetchAll();

      $rsp = array(
        "status" => True,
        "page" => $page,
        "links" => array(
          "previous" => $previous,
          "next" => $next,
          "start" => 1,
          "last" => $this->pages,
        ),
        "data" => $data
      );
    } else {
      $rsp = array(
        "status" => False
      );
    }

    return $rsp;
  }
}