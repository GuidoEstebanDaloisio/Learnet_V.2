import { Button, Card, Row, Col, Typography, Space } from "antd";
import type { FC } from "react";
import styles from "../styles/home.module.css";
import heroImg from "../assets/Hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const testimonios = [
    {
      name: "María López",
      text: "Encontré un mentor increíble que me ayudó a preparar mis exámenes de programación. ¡Totalmente recomendado!",
    },
    {
      name: "Carlos Pérez",
      text: "Nunca había aprendido tan rápido. Las mentorías son claras, dinámicas y súper útiles.",
    },
    {
      name: "Ana García",
      text: "Me encantó la plataforma. Los mentores realmente saben enseñar y te acompañan en todo.",
    },
  ];

  return (
    <>
    <Navbar />
    <div className={styles.container}>
      {/* HERO */}
      <div
        className={styles.heroSection}
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Space direction="vertical" size="large" align="center">
            <Title level={1} className={styles.heroTitle}>
              ACELERA TU CARRERA
            </Title>

            <Paragraph className={styles.heroParagraph}>
              Conecta con expertos y da el siguiente paso en tu aprendizaje.
            </Paragraph>

            <Button type="primary" size="large">
              Comenzar ahora
            </Button>
          </Space>
        </div>
      </div>

      {/* DESCRIPCIÓN */}
      <Row justify="center">
        <Col xs={22} md={16} lg={12}>
          <div className={styles.descriptionSection}>
            <Title level={2} className={styles.descriptionTitle}>
              ¿Qué es Learnet?
            </Title>

            <Paragraph className={styles.descriptionParagraph}>
              Learnet es una plataforma donde estudiantes pueden encontrar
              mentores especializados en distintas áreas. Cada mentor ofrece
              mentorías diseñadas para ayudarte a dominar un tema de manera
              clara, práctica y a tu medida.
            </Paragraph>
          </div>
        </Col>
      </Row>

      {/* TESTIMONIOS */}
      <div className={styles.testimonialsSection}>
        <Title level={2}>Testimonios</Title>

        <Row gutter={[24, 24]} justify="center">
          {testimonios.map((t, i) => (
            <Col key={i} xs={22} sm={16} md={12} lg={8} xl={6}>
              <Card className={styles.testimonialCard}>
                <Paragraph className={styles.testimonialText}>
                  “{t.text}”
                </Paragraph>
                <Paragraph strong className={styles.testimonialName}>
                  — {t.name}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
          <Footer />
    
    </>
  );
};

export default Home;