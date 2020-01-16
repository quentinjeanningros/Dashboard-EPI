CREATE TABLE users
(
  `id` int AUTO_INCREMENT NOT NULL,
  `username` text NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE widget
(
  `id` int AUTO_INCREMENT NOT NULL,
  `user_id` int NOT NULL,
  `refresh` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `config` varchar(255) NOT NULL,
  `pos` int NOT NULL,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;