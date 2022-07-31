import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

interface DataRow {
  title: string;
  value: React.ReactNode;
}

type Column = 1 | 2 | 3 | 6;

interface ResponsiveDataDisplayProps {
  data: DataRow[];
  columns: Column;
}

const getSMSize = (columns: Column) => {
  switch (columns) {
    case 1:
      return 12;
    case 2:
    case 3:
    case 6:
      return 6;
  }
};
const getMDSize = (columns: Column) => {
  switch (columns) {
    case 1:
      return 12;
    case 2:
      return 6;
    case 3:
      return 4;
    case 6:
      return 2;
  }
};

export const ResponsiveDataDisplay: React.FC<ResponsiveDataDisplayProps> = ({
  data,
  columns,
}) => {
  const SMSize = getSMSize(columns);
  const MDSize = getMDSize(columns);
  return (
    <Container>
      <Row as="dl">
        {data.map((col, colIndex) => (
          <Col xs={12} sm={SMSize} md={MDSize} key={colIndex}>
            <dt>{col.title}</dt>
            <dd>{col.value}</dd>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
