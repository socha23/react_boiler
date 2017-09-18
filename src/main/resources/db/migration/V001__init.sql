/*
CREATE TABLE IF NOT EXISTS mobile_connection (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  connection_date datetime NOT NULL,
  conn_type int(11) NOT NULL,
  responder_id bigint(20) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE mobile_connection
  ADD CONSTRAINT fk_mobile_connection_responder_id FOREIGN KEY (responder_id) REFERENCES responder(id);

CREATE INDEX idx_mobile_connection_date ON mobile_connection(responder_id, connection_date);

*/