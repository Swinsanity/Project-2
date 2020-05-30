DROP DATABASE IF EXISTS jobmancer;
CREATE DATABASE jobmancer;

USE jobmancer;

CREATE TABLE IF NOT EXISTS accounts (
  id int(11) NOT NULL,
  username varchar(50) NOT NULL,
  pass varchar(255) NOT NULL,
  email varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


ALTER TABLE accounts ADD PRIMARY KEY (id);
ALTER TABLE accounts MODIFY id int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

CREATE TABLE users
(
    users_name VARCHAR(100) not null,
    job_title VARCHAR(100) not null,
    email VARCHAR(100) not null,
    phone VARCHAR(100) not null,
    country VARCHAR(100) not null,
    ustate VARCHAR(100),
    city VARCHAR(100) not null,
    zip INT(5) not null,

    network VARCHAR(100),
    net_username VARCHAR(100),
    siteurl VARCHAR(100)
    );

CREATE TABLE education
(
      institution VARCHAR(100) not null,
      field VARCHAR(100) not null,
      srtDate VARCHAR(100),
      gpa INT(4),
      endDate VARCHAR(100)
    );

CREATE TABLE certs
(
      title VARCHAR(100),
      certdate VARCHAR(100),
      awarder VARCHAR(100)
);

CREATE TABLE skills
(
      skillName VARCHAR(100),
      skilllevel VARCHAR(100),
      keywords VARCHAR(100)
);


CREATE TABLE extra
(
      org VARCHAR(100),
      pos VARCHAR(100),
      website VARCHAR(100),
      srtDate VARCHAR(100),
      endDate VARCHAR(100)
);
