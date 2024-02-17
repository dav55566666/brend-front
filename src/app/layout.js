"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "./style.scss";
import { Provider } from "react-redux";
import store from "./store/store";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Create Next App</title>
          <meta charSet="UTF-8" />
          <meta name="format-detection" content="telephone=no" />
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
          <link rel="shortcut icon" href="favicon.ico" />
          {/* <meta name="robots" content="noindex, nofollow"> */}
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className={inter.className}>
          <div className="wrapper">
            <Header />
            <main className="page">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </Provider>
  );
}
