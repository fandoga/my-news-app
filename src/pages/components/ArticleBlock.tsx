import { Article } from "@/store/newsSlice";
import ArticleItem from "./ArticleItem";

type Props = {
    articlesGrouped : Article[]
    date: string
}

const ArtcileBlock = ({articlesGrouped, date}: Props, ) => {
    return (
        <section className="mb-5">
            <h2 className="text-lg font-bold pt-2">News for {date}</h2>
            <ul>
                {(articlesGrouped || []).map((item) => (
                <ArticleItem
                key={item.url}
                item={item}
                />
                ))}
            </ul>
        </section>
    )
}

export default ArtcileBlock