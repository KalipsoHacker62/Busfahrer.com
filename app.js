

var Joueur = function(name, carteDuJoueur, numeroJoueur, text){
    this.name=name;
    this.carteDuJoueur=carteDuJoueur;
    this.numeroJoueur=numeroJoueur;
    this.text=text;

}



var tableauValeurCarte, cartesDonne, cartesPrend, cartesCentrales, tableauDeCarte, test, joueur, nomDuJoueur, nombreJoueur, joueurs, tour, round, nombreDeTour, cartesDuMilieu, tourTotal, playing, skinCarte, skin, nombreDeSkin, aff, tableauDeCarteTire;


init0();




function getTour(){
    return partieEnCours.tour;
}
function getRound(){
    return partieEnCours.round;
}
function getCard(){
    return partieEnCours.carte;
}
function getTourTotal(){
    return partieEnCours.tourTotal;
}
function getCartesCentrales(){
    return cartesCentrale;
}







document.querySelector('.btn-new').addEventListener('click', function(){
    
});





    document.querySelector('.btn-draw').addEventListener('click', function(){
        if(playing===true){

                partieEnCours.carte=tirageCarte();
                stockageCarte(getTour(), getRound(), getTourTotal());
                clearText();
            
                if(getTourTotal()===((14+nombreJoueur*4))+1){
                    init0();
                }
            }
           

            
    
        
    });




function cardSelector(){
    return (Math.floor((Math.random()*52+1)));
}



function tirageCarte(){
    var laCarte=tableauDeCarte[partieEnCours.tourTotal];
    var dice1DOM= document.getElementById('card');
    dice1DOM.style.display = 'block';
    dice1DOM.src ='img/'+skin+'/'+ laCarte + '.png';
    return laCarte;

}

function stockageCarte(tour, round, tourTotal){
    var x=round+1;
    var y=(`J${tour}-carte${x}`);
    var z=y.toString();
    var mainDOM=document.getElementById(z);
    var croupierDOM=document.getElementById('mCarte-'+tour);
    

    if (round<4){
        joueurs[tour].carteDuJoueur[round]=valeurDuneCarte(partieEnCours.carte);
        mainDOM.style.display='block';
        mainDOM.src= 'img/'+skin+'/'+partieEnCours.carte+'.png';

        
    }else if(round===4){
        var resetDOM=document.getElementById('mCarte-'+0);
            resetDOM.style.display='block';
            resetDOM.src='img/'+skin+'/'+partieEnCours.carte+'.png';
        for(i=1; i<=13;i++){
            resetDOM=document.getElementById('mCarte-'+i);
            resetDOM.style.display='block';
            resetDOM.src='img/'+skin+'/0.png';
        }
        round++;
    }else if(round>=4 && tour<=13){
        
        document.getElementById('comment').textContent='';
        document.getElementById('comment2').textContent='';
        croupierDOM.style.display='block';
        croupierDOM.src= 'img/'+skin+'/'+partieEnCours.carte+'.png';

        var rest = tour%2;
        if (rest===0){
            partieEnCours.cartesDonne[tour]=valeurDuneCarte(partieEnCours.carte);
        }else if (rest===1){
            partieEnCours.cartesPrend[tour]=valeurDuneCarte(partieEnCours.carte);
        }
        
        partieEnCours.cartesCentrale=[partieEnCours.cartesDonne, partieEnCours.cartesPrend];
        distribution(tour);
    }
    
    tour++;
    tourTotal++;
    if(tour===(nombreJoueur) && (round<4)){
        tour=0;
        round++;
    }
    partieEnCours.round=round;
    partieEnCours.tour=tour;
    partieEnCours.tourTotal=tourTotal;
    

}

function melange(){
    var tableauDeCarte=[];
    
    i=0;
    while (tableauDeCarte.length<52){
        tableauDeCarte[i]=cardSelector();

        for(j=0; j<tableauDeCarte.length; j++){

            if(tableauDeCarte[i]===tableauDeCarte[j-1]){
                tableauDeCarte.pop();
                i--;
            }
        }
        i++;
    }
    return tableauDeCarte;
}


function attributionDesValeurs(){
    tableauValeurCarte=[];
    var valeurCarte=0;
    tableauDeCarte=melange();

    for (i=0; i<tableauDeCarte.length; i++){
        carte=tableauDeCarte[i];
        tableauValeurCarte[i]=valeurDuneCarte(carte);
        }
        
    return tableauValeurCarte;
}

function distribution(tour){
    for(j=0; j<nombreJoueur; j++){
      
        for(i=0; i<4; i++){

            
            if(partieEnCours.cartesDonne[tour]===joueurs[j].carteDuJoueur[i] && tour<12){
                joueurs[j].text=(joueurs[j].name+ ', '+' tu '+' donnes '+ (tour+1)+' gorgees !');
                
    
            }else if(partieEnCours.cartesPrend[tour]===joueurs[j].carteDuJoueur[i] && tour<12){
                joueurs[j].text=(joueurs[j].name+ ', '+' tu '+' prends '+ (tour+1)+' gorgees  !');
                
    
    
            }else if (partieEnCours.cartesDonne[tour]===joueurs[j].carteDuJoueur[i] && tour>=12){
                joueurs[j].text=(joueurs[j].name+ ', '+' tu '+' donnes '+' un '+' cul-sec '+' !');
                
            }else if (partieEnCours.cartesPrend[tour]===joueurs[j].carteDuJoueur[i] && tour>=12){
                joueurs[j].text=(joueurs[j].name+ ', '+' tu '+' prends '+' un cul-sec '+' !');
                
            }
            document.getElementById('text-'+j).textContent=joueurs[j].text;
            
        }

    }
    
        
}


function valeurDuneCarte(carte){

    switch (true){
        case (carte===52 || carte ===13 || carte===26 || carte===39):
            valeurCarte=1;
            break;
        
        case (carte===1 || carte ===14 || carte===27 || carte===40):
            valeurCarte=2;
            break;

        case (carte===2 || carte ===15 || carte===28 || carte===41):
            valeurCarte=3;
            break;

        case (carte===3 || carte ===16 || carte===29 || carte===42):
            valeurCarte=4;
            break;

        case carte===4 || carte ===17 || carte===30 || carte===43:
            valeurCarte=5;
            break;

        case carte===5 || carte ===18 || carte===31 || carte===44:
            valeurCarte=6;
            break;

        case carte===6 || carte ===19 || carte===32 || carte===45:
            valeurCarte=7;
            break;

        case carte===7 || carte ===20 || carte===33 || carte===46:
            valeurCarte=8;
            break;

        case carte===8 || carte ===21 || carte===34 || carte===47:
            valeurCarte=9;
            break;

        case carte===9 || carte ===22 || carte===35 || carte===48:
            valeurCarte=10;
            break;

        case carte===10 || carte ===23 || carte===36 || carte===49:
            valeurCarte=11;
            break;

        case carte===11 || carte ===24 || carte===37 || carte===50:
            valeurCarte=12;
            break;
        
        case carte===12 || carte ===25 || carte===38 || carte===51:
            valeurCarte=13;
            break;

    }
    return valeurCarte;


}

function clearText(){
    for(j=0; j<nombreJoueur; j++){
        joueurs[j].text='';
    }
    

}


function choixSkin(skinCarte){

    switch (true){
        case skinCarte===1:
            skin="noir";
            break;
        case skinCarte===2:
            skin="rouge";
            break;
    }
    return skin;
}





























function init0(){
    Partie = function (tour, round, carte, tourTotal, cartesCentrale, cartesDonne, cartesPrend){
        this.tour=tour;
        this.round=round;
        this.carte=carte;
        this.tourTotal= tourTotal;
        this.cartesCentrale= cartesCentrale;
        this.cartesDonne=cartesDonne;
        this.cartesPrend=cartesPrend;
    }
    partieEnCours = new Partie (0, 0, 0, 0, [], [], []);
    playing=false;
    test=0;
    nombreDeSkin=2;
    document.getElementById('btn-new').textContent='New Game';
    document.getElementById('comment').textContent='Busfahrer';
    document.getElementById('comment2').textContent='Un jeu allemand';
    tableauDeCarte=[];
    tableauDeCarteTire=[];
    
    cartesCentrales=0;
    skin="noir";
    nomDuJoueur='';
    nombreJoueur='';
    joueurs=[];
    tour=0;
    tourTotal=0;
    round=0;
    cartesDuMilieu=[];
    joueur = {
        name: '',
        carteDuJoueur: [],
        numeroJoueur: 0
    };
    tableauValeurCarte=[];
    tableauValeurCarte=attributionDesValeurs();
    cartesDonne=[];
    cartesPrend=[];
    cartesCentrale=[cartesDonne, cartesPrend];
    for(i=0; i<8; i++){
        document.getElementById('name-'+i).textContent=' ';
        document.getElementById('text-'+i).textContent=' ';
        for(j=1; j<5; j++){
            var imgInit=document.getElementById('J'+i+'-carte'+(j));
            imgInit.src='';
            
        }
    }
    for(u=0; u<14; u++){
        imgInit=document.getElementById('mCarte-'+u);
        imgInit.src='';
    }
    imgInit=document.getElementById('card');
    imgInit.src='img/'+skin+'/0.png';


    
    
}



function init(){
    init0();
    playing=true;
    document.getElementById('btn-new').textContent='';
    document.getElementById('comment').textContent='';
    document.getElementById('comment2').textContent='';

    
    
}

//boutons

document.getElementById('btn-partie').addEventListener('click', function(){

    init();
    for(i=0;i<8;i++){
        if((document.getElementById('nombreJoueur-'+i).checked)){
            nombreJoueur=(document.getElementById('nombreJoueur-'+i).value);
            nombreJoueur++;
        }
    }
    nombreDeTour=nombreJoueur*4;

    for (i=0; i<nombreJoueur; i++){
        nomDuJoueur=document.getElementById('nomSelect-'+i).value;
        console.log(nomDuJoueur);
        document.getElementById('name-'+i).textContent=nomDuJoueur;
        for(j=0; j<4; j++){
            var img=document.getElementById('J'+i+'-carte'+(j+1));
            img.src='img/'+skin+'/0.png';
        }

        carteDuJoueur=[0, 0, 0, 0];
        var joueur = new Joueur(nomDuJoueur, carteDuJoueur, i, '');
        joueurs[i]=joueur;

    }





});


document.getElementById('btn-skin').addEventListener('click', function(){

    for(i=0; i<nombreDeSkin; i++){
 
        if((document.getElementById('skinSelected-'+i).selected)){
            skinCarte=(document.getElementById('nombreJoueur-'+i).value);
            skinCarte++;
        }
    }
  
    choixSkin(skinCarte);
    var tab=carteTirees()
    afficheurCartes(tab);
   
   

        

    });

    function afficheurCartes(tab){
        console.log(tab);
        var h=0;
        var piocheDOM= document.getElementById('card');
        piocheDOM.style.display='block';
        piocheDOM.src= 'img/'+skin+'/0.png';

        if(getTourTotal()<nombreJoueur*4){
            while(h<(nombreJoueur*4)){
                for(j=0;j<4; j++){
                    for(i=0; i<nombreJoueur; i++){
                        var aff=document.getElementById('J'+i+'-carte'+(j+1));
                        aff.src='img/'+skin+'/'+tab[h]+'.png';
                        h++;
                    }
                }
            }
        }else if (getTourTotal()>=nombreJoueur*4){
            for(j=0;j<4; j++){
                for(i=0; i<nombreJoueur; i++){
                    aff=document.getElementById('J'+i+'-carte'+(j+1));
                    aff.src='img/'+skin+'/'+tab[h]+'.png';
                    h++;
                }
            }
            
            for(u=0; u<14;u++){
                var iff=document.getElementById('mCarte-'+u);
                var dot = u%2;
                if(dot===0){
                    iff.src='img/'+skin+'/'+(tab[h])+'.png';
                }else if(dot===1){
                    iff.src='img/'+skin+'/'+(tab[h])+'.png';
                }
                h++;
            }

        }

        
        
                
                
         
                
      
            }
            
    



function carteTirees(){
    
    for(i=0; i<52; i++){
        tableauDeCarteTire[i]=0;
    }
    for(i=0; i<getTourTotal(); i++){
        tableauDeCarteTire[i]=tableauDeCarte[i];
    }
    return tableauDeCarteTire;
   

}

