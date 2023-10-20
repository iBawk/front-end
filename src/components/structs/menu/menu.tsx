"use client";

import { ReactNode, cloneElement } from "react";
import style from "./menu.module.scss";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "antd";
import Link from "next/link";

export type TypeOptionsMenu = {
  title: string;
  icon: JSX.Element;
  link: string;
};

export type DataStructMenu = {
  options: Array<TypeOptionsMenu>;
  children: ReactNode;
};

export default function StructMenu(data: DataStructMenu) {
  const { children, options } = data;
  const router = useRouter();

  return (
    <div id={style.StructMenu}>
      <div className={style.menu}>
        <div className={style.header}></div>
        <div className={style.body}>
          {options.map(({ icon, link, title }, index) => {
            const newIcon = cloneElement(icon, {
              className: `${style.icon} ${icon.props.className}`,
            });

            return (
              <Link
                className={style.option}
                key={index}
                href={link}
                title={title}
              >
                {newIcon}
                <span className={style.text}>{title}</span>
              </Link>
            );
          })}
        </div>
        <div className={style.footer}>
          <Button
            onClick={() => {
              Cookies.remove("auth_token");
              Cookies.remove("token_type");
              router.replace("auth/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}
