import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";

import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";

const Search = ({ searchResults }) => {
  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query; //extraemos los querys

  //formatear las fechas
  const formatedStartDate = format(new Date(startDate), "dd MMMM YYY");
  const formatedEndDate = format(new Date(endDate), "dd MMMM YYY");

  //string con los dos valores
  const range = `${formatedStartDate} - ${formatedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs ">
            300+ Stays from {range} to, for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex space-x-3 text-gray-800 whitespace-nowrap mb-5">
            <p className="button">Cancelation Flexibility</p>
            <p className="button">Type of place</p>
            <p className="button">Price</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => {
                return (
                  <InfoCard
                    key={img}
                    img={img}
                    location={location}
                    title={title}
                    description={description}
                    star={star}
                    price={price}
                    total={total}
                  />
                );
              }
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
