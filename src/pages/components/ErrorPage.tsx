type Props = {
    errText? : number 
}

const ErrorPage = ({errText} : Props) => {
    return(
        <section className="text-center flex-grow pt-[50%]">
            <h1 className="font-lg text-base line-clamp-2">Упсс... Произошла ошибка!👾</h1>
            <p className="font-semibold">{errText}</p>
        </section>
    )
}

export default ErrorPage