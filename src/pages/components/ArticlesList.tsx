import { Article } from "@/store/newsSlice";
import ArtcileBlock from "./ArticleBlock";

type Props = {
    articles: Article[];
  };

const ArticlesList = ({articles} : Props) => {
    const grouped = articles.reduce<Record<string, Article[]>>((acc, article) => {
        const date = new Date(article.published_date).toLocaleDateString("ru-RU");
        if (!acc[date]) acc[date] = [];
        acc[date].push(article);
        return acc;
      }, {});

    return (
        <div>
            {Object.entries(grouped).map(([date, items]) => (
                <ArtcileBlock key={date} date={date} articlesGrouped={items}  />
            ))}
        </div>
    )
}

export default ArticlesList