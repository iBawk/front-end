"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import style from "./sign-up.module.scss";
import ElementFormInput from "@/components/elements/form-input/form-input";
import { Button } from "antd";
import Link from "next/link";
import {
  emailIsValid,
  nameIsMinimumValid,
  passwordIsValid,
  phoneNumberIsValid,
} from "@/helpers/validation/validation";
import { phoneNumberMask } from "@/helpers/mask/maks";
import Api from "@/services/api/api";
import { useRouter } from "next/navigation";

export type DataSectionSignUp = {};

export default function SectionSignUp(data: DataSectionSignUp) {
  const {} = data;

  const router = useRouter();

  type FormsField = {
    value: string;
    valid: boolean;
    invalid: boolean;
  };

  type DataForms = {
    name: FormsField;
    email: FormsField;
    phoneNumber: FormsField;
    password: FormsField;
    confirmPassword: FormsField;
  };

  const [form, setForm] = useState<DataForms>({
    name: { value: "", valid: false, invalid: false },
    email: { value: "", valid: false, invalid: false },
    phoneNumber: { value: "", valid: false, invalid: false },
    password: { value: "", valid: false, invalid: false },
    confirmPassword: { value: "", valid: false, invalid: false },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, phoneNumber, password, confirmPassword } = form;

    name.valid = nameIsMinimumValid(name.value);
    email.valid = emailIsValid(email.value);
    phoneNumber.valid = phoneNumberIsValid(phoneNumber.value);
    password.valid = passwordIsValid(password.value);
    confirmPassword.valid = password.value === confirmPassword.value;

    const valid =
      name.valid &&
      email.valid &&
      phoneNumber.valid &&
      password.valid &&
      confirmPassword.valid;

    if (!valid) {
      name.invalid = !nameIsMinimumValid(name.value);
      email.invalid = !emailIsValid(email.value);
      phoneNumber.invalid = !phoneNumberIsValid(phoneNumber.value);
      password.invalid = !passwordIsValid(password.value);
      confirmPassword.invalid = password.value !== confirmPassword.value;

      setForm({ name, email, phoneNumber, password, confirmPassword });
      return;
    }

    Api.public
      .postUserRegister({
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        console.log(response);
        router.replace("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    form.name = {
      value: newValue,
      valid: !!newValue && nameIsMinimumValid(newValue),
      invalid: !!newValue && !nameIsMinimumValid(newValue),
    };

    setForm({ ...form });
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    form.email = {
      value: newValue,
      valid: !!newValue && emailIsValid(newValue),
      invalid: !!newValue && !emailIsValid(newValue),
    };

    setForm({ ...form });
  };

  const onChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = phoneNumberMask(event.target.value);

    form.phoneNumber = {
      value: newValue,
      valid: !!newValue && phoneNumberIsValid(newValue),
      invalid: !!newValue && !phoneNumberIsValid(newValue),
    };

    setForm({ ...form });
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    form.confirmPassword = { value: "", valid: false, invalid: false };

    form.password = {
      value: newValue,
      valid: !!newValue && passwordIsValid(newValue),
      invalid: !!newValue && !passwordIsValid(newValue),
    };

    setForm({ ...form });
  };

  const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    form.confirmPassword = {
      value: newValue,
      valid: !!newValue && newValue === form.password.value,
      invalid: !!newValue && newValue !== form.password.value,
    };

    setForm({ ...form });
  };

  return (
    <section id={style.SectionSignUp}>
      <h2 className={style.title}>Create an account</h2>
      <p className={style.text}>Welcome to bawk, create your account!</p>
      <form className={style.form} onSubmit={onSubmit}>
        <ElementFormInput
          type="text"
          placeholder="Nome"
          onChange={onChangeName}
          value={form.name.value}
          valid={form.name.valid}
          invalid={form.name.invalid}
        />
        <ElementFormInput
          type="email"
          placeholder="Email"
          onChange={onChangeEmail}
          value={form.email.value}
          valid={form.email.valid}
          invalid={form.email.invalid}
        />
        <ElementFormInput
          type="tel"
          placeholder="Numero de Telefone"
          onChange={onChangePhoneNumber}
          value={form.phoneNumber.value}
          valid={form.phoneNumber.valid}
          invalid={form.phoneNumber.invalid}
        />
        <ElementFormInput
          type="password"
          placeholder="Senha"
          onChange={onChangePassword}
          value={form.password.value}
          valid={form.password.valid}
          invalid={form.password.invalid}
        />
        <ElementFormInput
          type="password"
          placeholder="Confirmação de senha"
          onChange={onChangeConfirmPassword}
          value={form.confirmPassword.value}
          valid={form.confirmPassword.valid}
          invalid={form.confirmPassword.invalid}
        />
        <div className={style.containerButtons}>
          <div className={style.containerButton}>
            <Button
              className={`${style.button} ${style.buttonSiginUp}`}
              htmlType="submit"
              type="primary"
            >
              Sign Up
            </Button>
          </div>
          <Link href="/auth/login" className={style.containerButton}>
            <Button
              className={`${style.button} ${style.buttonLoggin}`}
              type="default"
            >
              Login
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
