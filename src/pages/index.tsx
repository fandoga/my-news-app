
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, wrapper } from "../store/store";
import { setArticles, loadMore, Article, startLoading, finishLoading} from "../store/newsSlice";
import { Lato } from "next/font/google";
import ArticlesList from "./components/ArticlesList";
import LoaderSpinner from "./components/LoaderSpinner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home({error} : {error?: number}) {
  const dispatch = useDispatch<AppDispatch>();
  const displayedArticles = useSelector(
    (state: RootState) => state.news.displayedArticles
  );

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loading = useSelector((state: RootState) => state.news.loading)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          dispatch(startLoading())
            setTimeout(() => { // Имитация загрузки при скроле
              dispatch(loadMore());
              dispatch(finishLoading())
            }, 100)
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [dispatch]);

  // Автообновление
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`api/nyt`)

      if (!res.ok) {
        console.error("Ошибка запроса NYT:", res.status, res.statusText);
        dispatch(setArticles([]));
        return { props: {} };
      }
      const news: Article[] = await res.json();

      dispatch(setArticles(news));
      
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>BESIDER</title>
        <meta name="description" content="New York Times News" />
      </Head>
      <main className={`${lato.className} flex flex-col font-sans max-w-2xl mx-auto min-h-screen p-5`}>
        <Header/>
        {error !== 200 ? (
                <ErrorPage errText={error}/>
              ) : loading && displayedArticles.length === 0 ? (
                <LoaderSpinner/>
              ) : (
                <ArticlesList articles={displayedArticles}/>
              )}
        { loading && (
          <LoaderSpinner/>
        )}
       <Footer ref={loaderRef}/>
      </main>
    </>
  );
}

// ------------------- SERVER SIDE -------------------

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req }) => {
    store.dispatch(startLoading())
    const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;
    const res = await fetch(`${baseUrl}/api/nyt`)

    console.log(res)
    if (!res.ok) {
      console.error("Ошибка запроса NYT:", res.status, res.statusText);
      store.dispatch(setArticles([]));
      store.dispatch(finishLoading())
      return { props: {error: res.status} };
    }

    const news: Article[] = await res.json();

    store.dispatch(setArticles(news));
    store.dispatch(finishLoading())

    return { props: {error: res.status} };
  }
);
