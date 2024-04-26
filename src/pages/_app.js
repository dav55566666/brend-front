import { Provider } from "react-redux"
import store from "../store/store";
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import "../style.scss"
import Subscribe from "@/components/Subscribe/Subscribe";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Provider store={store}>
                <div className="wrapper">
                    <Header />
                    <main className="page">
                        <Component {...pageProps} />
                        <Subscribe />
                    </main>
                    <Footer />
                </div>
            </Provider>
        </>
    )
}

export default MyApp