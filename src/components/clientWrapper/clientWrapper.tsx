'use client'

import { useState } from "react";
import Header from "../header/header";
import Logo from "../logo/logo";
import Nav from "../nav/nav";
import Content from "../content/content";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [menuToggled, setMenuToggled] = useState(false);

  return (
    <div className="app">
      <div className={`top-grid ${menuToggled ? "menu-toggled" : ""}`}>
        <Logo menuToggled={menuToggled}/>
        <Header setMenuToggled={setMenuToggled} />
      </div>
      <div className={`main-grid ${menuToggled ? "menu-toggled" : ""}`}>
        <Nav menuToggled={menuToggled} />
        <Content>{children}</Content>
      </div>
    </div>
  );
}
