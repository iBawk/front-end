import { ReactNode } from "react";
import StructMenu from "@/components/structs/menu/menu";
import { AiFillHome } from "react-icons/ai";
import {
  FaMoneyBill,
  FaStoreAlt,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";

export type DataLayoutDashboard = {
  children: ReactNode;
};

export default function LayoutDashboard(data: DataLayoutDashboard) {
  const { children } = data;

  const menuOptions = [
    { title: "Home", link: "", icon: <AiFillHome /> },
    { title: "Vendas", link: "vendas", icon: <FaMoneyBill /> },
    { title: "Produtos", link: "produtos", icon: <FaStoreAlt /> },
    {
      title: "Marketplace",
      link: "marketplace",
      icon: <FaShoppingCart />,
    },
    { title: "Finanças", link: "financas", icon: <FaDollarSign /> },
    {
      title: "Minhas Compras",
      link: "minhas-compras",
      icon: <MdInventory2 />,
    },
    {
      title: "Configurações",
      link: "configuracoes",
      icon: <RiSettings4Fill />,
    },
  ];

  return (
    <main>
      <StructMenu options={menuOptions}>{children}</StructMenu>
    </main>
  );
}
