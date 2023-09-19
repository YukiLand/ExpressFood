import "./Home.css";
import banner from "../../assets/banner.jpg";

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';


function Home() {

  let sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${banner})`
  };

  return (
    <div className="home">
      <div className="banner" style={sectionStyle} >
        <div className="banner-text">
          <h1>Express Food</h1>
          <p>Commandez vos plats préférés en ligne et faites-vous livrer en moins de 20 minutes.</p>
        </div>
      </div>
      <Divider></Divider>
      <div className="desc">
        <p className="desc-text">Notre secret réside dans notre engagement envers la fraîcheur et la diversité. Chaque jour, nous concoctons avec passion 2 plats et 2 desserts alléchants au sein de notre QG, en collaboration avec des chefs expérimentés. Vous ne mangerez jamais la même chose deux fois !</p>
        <img className="desc-img" src="/src/assets/desc1.jpg" alt="" />
      </div>
      <Divider></Divider>
      <div className="desc">
        <img className="desc-img" src="/src/assets/desc2.jpg" alt="" />
        <p className="desc-text">Commander chez ExpressFood est un jeu d'enfant. Vous avez la possibilité de sélectionner un ou plusieurs plats ainsi que des desserts gourmands. De plus, pour rendre l'expérience encore plus agréable, nous offrons la livraison gratuite à partir de 19,99€ d'achat. Oubliez les frais de livraison exorbitants !</p>
      </div>
      <Divider></Divider>
    </div>
  );
}

export default Home;