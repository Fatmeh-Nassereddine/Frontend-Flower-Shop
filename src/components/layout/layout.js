import * as React from "react";
import Header  from "../Header";
import Footer  from "../Footer";

export function Layout({ children }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap"
        rel="stylesheet"
      />
      <div className="max-w-none w-full bg-white mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
