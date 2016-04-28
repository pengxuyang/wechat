CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  mobilephone VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  compnay VARCHAR(255),
  email VARCHAR(255),
  create_time DATETIME NOT NULL,
  user_role VARCHAR(24)
);
CREATE UNIQUE INDEX mobilephone ON user (mobilephone);


create TABLE target (
  id INT PRIMARY KEY AUTO_INCREMENT,
  target_url VARCHAR(255) NOT NULL,
  link_url VARCHAR(255),
  display_type VARCHAR(255),
  comment VARCHAR(255),
  user_id int,
  material_id int
);

create table material (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  content BLOB NOT NULL,
  content_type VARCHAR(255),
  comment VARCHAR(255),
  user_id int
);

