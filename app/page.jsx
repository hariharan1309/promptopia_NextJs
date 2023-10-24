import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center"> Discover and Share 
        <br className="max-md:hidden"/> {/* hide on mobile */}
        <span className="orange_gradient text-center">AI powered prompts</span>
      </h1>
      <p className="text-center desc">
        Promtopia is an Open source AI powered prompting tool for discover, create and generate creative prompts.
      </p>
      <Feed />
    </section>
  )
}

export default Home;