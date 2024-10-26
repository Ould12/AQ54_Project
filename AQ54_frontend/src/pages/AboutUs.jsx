import { NavLink } from "react-router-dom";

const Page = () => {
  return (
    <>
      <section>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-xl text-2xl font-medium title-font mb-4 font-poppins tracking-wide text-green-600">
              A propos du projet
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed mt-3 text-sm lg:text-lg font-poppins text-green-700">
              Le projet AQ54 vise à déployer un réseau de capteurs de qualité de l’air dans Abidjan pour obtenir une véritable cartographie de la qualité de l’air dans la ville. Les données collectées seront traitées, analysées et partagées de manière ouverte via une plateforme dédiée. 
              L'objectif est de combler le manque d’information et de promouvoir une prise de conscience sur la pollution de l’air. En installant des capteurs dans différents quartiers d’Abidjan, le projet aidera à surveiller et à analyser la qualité de l'air pour mieux informer les politiques publiques, les entreprises et les citoyens.
              <br />
              <br />
              Un projet pilote a déjà été lancé avec l'installation de deux capteurs en mai 2023. Cette phase pilote vise à étudier l'impact du bitumage des routes sur la pollution atmosphérique et à développer une plateforme de visualisation des données en temps réel. Les résultats de cette étude permettront d'améliorer la compréhension des mesures à prendre pour lutter contre la pollution dans la ville.
            </p>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
            <NavLink to='/' className='block m-auto'>
              <button className="text-white bg-green-500 border-0 py-3 px-8 focus:outline-none hover:bg-green-600 rounded text-sm lg:text-lg shadow-lg">
                Retour
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
