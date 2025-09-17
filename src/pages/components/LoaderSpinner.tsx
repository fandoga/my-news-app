import { PulseLoader } from "react-spinners"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const LoaderSpinner = () => {
    return (
        <section className="text-center flex-grow py-12">
               <PulseLoader
                color={'#096FFA'}
                loading={true}
                cssOverride={override}
                size={14}
                speedMultiplier={0.7}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
          </section>
    )
}

export default LoaderSpinner