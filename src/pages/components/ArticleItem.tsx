import { Article } from "@/store/newsSlice"
import Image from "next/image"

type Props = {
  item: Article
}

const ArticleItem = ({ item }: Props) => {

  function formatCustomDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

    return (
        <li key={item?.url}>
              <a className="flex gap-4 items-start py-3" href={item?.url} target="_blank" rel="noopener noreferrer">
                <div className="w-26 h-18 flex-shrink-0 mt-9">
                    {item?.multimedia && item?.multimedia.length > 0 ? (
                      <Image
                        className="w-full h-full object-cover"
                        src={`https://www.nytimes.com/${item?.multimedia[0].url}`}
                        alt={item.title}
                        width={100}
                        height={74}
                      />
                    ) : (
                      <div className="bg-gray-200 w-[100px] h-[74px] flex items-center justify-center text-gray-500">
                        No image
                      </div>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-base font-semibold text-blue-600 hover:underline line-clamp-2" >{item.source}</h3>
                    <p className="text-md mt-1 line-clamp-3" >{item?.abstract}</p>
                    <small className="text-gray-400 text-s" >{formatCustomDate(item?.published_date)}</small>
                </div>
              </a>
            </li>
    )
}

export default ArticleItem