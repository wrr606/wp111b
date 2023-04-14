function submit_function(){
    let number=parseInt(document.getElementById("input_number").value);
    document.getElementById("counter").innerHTML++;
    answer=parseInt(answer);
    if(answer>number){
        document.getElementById("ans").innerHTML="數字太小";
    }
    else if(answer<number){
        document.getElementById("ans").innerHTML="數字太大";
    }
    else{
        document.getElementById("ans").innerHTML="答對：)";
        bsa();
    }
    //document.getElementById("ans").innerHTML=number;
}

function bsa(){
    document.getElementById("bsa").style.display="block";
}

function begin_game(){
    let min=document.getElementById("input_min").value;
    let max=document.getElementById("input_max").value;
    if(min==""){
        min=0;
    }
    if(max==""){
        max=100;
    }
    answer=Math.random()*(max-min)-min;
    while(answer>max || answer<min){
        answer=Math.random()*(max-min)-min;
    }
    document.getElementById("try").style.display="block";
    //document.getElementById("number").style.opacity = 1;
    document.getElementById("input_number").style.display="block";
    document.getElementById("submit").style.display="block";
    document.getElementById("counter").innerHTML=0;
    document.getElementById("ans").innerHTML="";
    //document.getElementById("ans").innerHTML=min;
}

var answer;

document.getElementById("submit").onclick=function(){submit_function()};
document.getElementById("begin").onclick=function(){begin_game()};
