const imgcontainer= document.querySelector('.gallery');
const portfolio= document.querySelector('#portfolio');
const filtres = document.querySelector('.filtres');

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function get_projects(categid='all'){
  
  fetch('http://localhost:5678/api/works')
  .then((response) => response.json()) 
    .then((prj) => {
      //Parcourir les projets 1 par 1 
      for(i=0; i < prj.length; i++){
          //Creer balise figure
          let fig = document.createElement('figure');
          //creer balise img
          let img = document.createElement('img');
              img.src = prj[i].imageUrl;
              //mettre <img> dans <figure>
              fig.appendChild(img);
          let capTitle = prj[i].title;
          // creer balise figcaption
          let cap = document.createElement("figcaption");
          cap.innerHTML = capTitle;
          console.log(categid);
          if((categid == prj[i].category.id) || (categid=='all')){
            fig.appendChild(cap);
            imgcontainer.appendChild(fig);
          }
          
      }

    });
}

  // categorie
  fetch('http://localhost:5678/api/categories')
  .then((response) => response.json())
  .then((categ) => {

    //creer bouton "tous" qui affiche tous les projets
    //ce bouton est statique et peut etre créee dans l'HTML directement
    /*let btnTous = document.createElement('button');
    btnTous.innerHTML="tous";
    btnTous.id = 'all';
    btnTous.classList.add("clickactive");
    
    //insertion du bouton "Tous" dans la balise div.filtres que j'ai créée manuellement dans l'HTML
    filtres.appendChild(btnTous); */

    // console.log(categ);
    // parcourir toutes les categ
    
    for(i=0; i < categ.length; i++){
      //console.log(categ[i].name);
      let btn = document.createElement('button');
          btn.innerHTML=categ[i].name;
          btn.id = categ[i].id;
      // inserer le bouton dans la balise div.filtres
      filtres.appendChild(btn);
    }
       /* j'ai crée au debut un btntous dynamiquement avec js
        btnTous.addEventListener("click", myFunctionp);
        function myFunctionp() {
          removeAllChildNodes(imgcontainer);
          get_projects('all');

     puis je l'ai recree en html pour faciliter le travail 
        } */
        let boutons = document.getElementsByTagName("button");
        for(const elem of boutons){
          elem.addEventListener("click", myFunction);
          function myFunction() {
           
            let b = document.getElementsByTagName("button");
            console.log(b);
            for(j=0; j < b.length; j++) b[j].classList.remove("clickactive");
  
            elem.classList.add("clickactive");
            removeAllChildNodes(imgcontainer);
            get_projects(elem.id);
          }
          
          
        }
       

  });

  getAllProjects();
  function getAllProjects(){
    get_projects('all');
  }

  