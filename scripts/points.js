
var p_name = document.getElementById("partner_id").innerText; //to find the right pair
p_name = p_name.split(" ")[1];

function markAsDone() {

  //realtime update
  db.collection('users').where('partner_name', '==', p_name).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
         db.collection('users').doc(doc.id).update({my_status: true})
    });
    
  })

  //not realtime update
  db.collection('users').where('partner_name', '==', p_name).get().then((snapshot) =>{
      snapshot.docs.forEach(doc => {
        upgradePoints(doc);
        //  setPointsInHtml(doc);
          // מקבלים מפה של השדות והתוכן שלהן
      });
  })

}

//one player points = 10 each
//two players points = 15 each
var oneP = 10;
var twoP = 20;


 //realtime update on html
db.collection('users').where('partner_name', '==', p_name).onSnapshot(snapshot =>{
    snapshot.docs.forEach(doc => {
       setPointsInHtml(doc);
      
    });
})


function setPointsInHtml(doc){

  string = `Your team has ${doc.data().game_points} points `
  document.getElementById("myHeader").innerHTML = string;


}

function upgradePoints(doc){
  var p = doc.data().game_points;
  if(doc.data().my_status && doc.data().partner_status)
  {
    p = p + twoP;
    
  }
  if(doc.data().my_status && !doc.data().partner_status)
  {
    p = p + oneP;
  }

  if(!doc.data().my_status && doc.data().partner_status)
  {
    p = p + oneP;
  }
  db.collection('users').doc(doc.id).update({game_points: p}); 
}






 



 


