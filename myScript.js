// console.log($);
$(function(){
    let r,g;
    let changecolor;
    let playing = false;
    let tryleft;
    let speed;
    let score;
    let downfruit;
    let fruitlist = ["apple","pineapple","banana","guava","cherries","orange","mango"];
    $('#bdivbtn').mousemove(function(e){
        r = Math.ceil(1+Math.random()*255);
        g = Math.ceil(1+Math.random()*255);
        clearTimeout(changecolor);
        changecolor= setTimeout(function(){
            $('#bdivbtn').css('background-color','rgb('+r+','+g+','+120+')');
        },500)
        
    })

    $('#startBtn').click(function(){
        //check user are playing or not
        $('#gameover').hide();
        $('#tscorediv').hide();
        if(playing==true){
            
            if(tryleft==0){
            location.reload();
            }else{
                stopgame();
                setTimeout(()=>{
                    if(window.confirm("Are you sure exit the game...")){
                        location.reload();
                        }

                },2000)
            }
        }else{
            score=0;
            playing=true;
            $('#heartLeft').show();
            $('#scorediv').show();
            $('#fh2').hide();
            $('#startBtn').html("Reset Game");
            tryleft=3;
            addhearts();
            //add furits
            addfruits();            
            runfruit()
        }
    })


    //fruits over
    $('#fruit').mouseover(()=>{
        score++;
        $('#fruit').hide('explode',500);
        $('#score').html(score);
        clearInterval(downfruit);
       setTimeout(()=>{
           addfruits();
           runfruit();

       },600)
    })
    //for mobile touch
    $('#fruit').touchstart(()=>{
        score++;
        $('#fruit').hide('explode',500);
        $('#score').html(score);
        clearInterval(downfruit);
       setTimeout(()=>{
           addfruits();
           runfruit();

       },600)
    })

    //create custome function
    function addhearts(){
        $('#heartLeft').empty();
        if(tryleft==0){
            $('#heartLeft').append("&#128078;");
        }else{
                
                for(let i=1;i<=tryleft;i++){
                    $('#heartLeft').append("&#128151;");
                }
         }
    }

    function addfruits(){
        let r = Math.round(Math.random()*6);
        let lrv = Math.ceil(10+Math.random()*90);
        $('#fruit').show();
        $('#fruit').attr('src','./image/'+ fruitlist[r]+'.png');
        if(lrv<35){
            $('#fruit').css({'left':'220px','top':'-250px'})
        }else{
            $('#fruit').css({'left':'calc('+lrv+'% - 220px)','top':'-250px'})
        }
       
    }
    function stopgame(){
        clearInterval(downfruit);
        $('#tscore').html(score);
        $('#scorediv').hide();
        $('#gameover').show();
        $('#tscorediv').show();
    }
    function runfruit(){
        //fruits run
        downfruit=setInterval(()=>{
            let newtop = Math.ceil(Math.random()*6);
            speed = Math.ceil(2+Math.random()*3);
            $('#fruit').css('top',newtop+$('#fruit').position().top);
            if($('#fruit').position().top>$('#fruitsdiv').height()){
                tryleft--;
                addhearts();
                if(tryleft>0){
                    addfruits();

                }else{
                    //console.log("gameover");
                    stopgame();
                    playing=true;
                    //$('#startBtn').html("Start Game");
                }
            }    

        },speed);
    }
});
