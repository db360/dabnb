import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";

export default function Home({ exploreData }) {
  return (
    <div className="">
      <Head>
        <title>DaBnB Real State</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* pull data from the server - API endpoints */}
          {exploreData?.map((item) => (
            <h1>{item.location}</h1>
          ))}
        </section>
      </main>
    </div>
  );
}

// TELLS NEXTJS THIS IS SERVER SIDE RENDERING
export async function getStaticProps() {
  //JSON objetos con img, location, distance
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  return {
    props: {
      exploreData
    }
  }
}
