import styles from "./page.module.scss";
import Link from "next/link";
import { Button, Flex } from "antd";

export default function Home() {
  return (
    <main>
      <h1>Pagina home</h1>
      <Flex gap="middle" justify="center">
        <Link href="/auth/login">
          <Button size="large">Login</Button>
        </Link>
        <Link href="/auth/sigin">
          <Button size="large">Sigin</Button>
        </Link>
        <Link href="/painel">
          <Button size="large">Painel</Button>
        </Link>
      </Flex>
    </main>
  );
}
