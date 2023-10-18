import SectionQuickPresentation from "@/components/sections/quick-presentation/quick-presentation";
import style from "./layout.module.scss";
import { Row, Col } from "antd";

export type DataLayoutAuth = {
  children: React.ReactNode;
};

export default function LayoutAuth(data: DataLayoutAuth) {
  const { children } = data;

  return (
    <main className={style.main}>
      <Row justify="center">
        <Col span={8}>
          <SectionQuickPresentation />
        </Col>
        <Col span={8}>{children}</Col>
      </Row>
    </main>
  );
}
