import { Category } from ".prisma/client";
import { Card, Container, Row } from "react-bootstrap";

interface CategoryProps {
  categories: Category[];
  className?: string;
}

export default function CategoryComponent({
  categories,
  className,
}: CategoryProps) {
  if (categories) {
    return (
      <Container className={className}>
        <Row className="d-flex justify-content-center">
          {categories.map((category) => {
            return (
              <Card className="text-center" key={category.label}>
                <Card.Header>{`${category.emoji || ""} ${
                  category.label
                }`}</Card.Header>
              </Card>
            );
          })}
        </Row>
      </Container>
    );
  } else {
    return <></>;
  }
}
