var range_max,range_min;

function submit_function(){
    let number=parseInt(document.getElementById("input_number").value);
    document.getElementById("counter").innerHTML++;
    answer=parseInt(answer);
    if(answer>number){
        document.getElementById("ans").style.display="block";
        document.getElementById("ans").innerHTML="數字太小";
        if(range_min<number)
            range_min=number;
        document.getElementById("range").innerHTML=`${range_min}　　~　　${range_max}`;
    }
    else if(answer<number){
        document.getElementById("ans").style.display="block";
        document.getElementById("ans").innerHTML="數字太大";
        if(range_max>number)
            range_max=number;
        document.getElementById("range").innerHTML=`${range_min}　　~　　${range_max}`;
    }
    else{
        document.getElementById("ans").style.display="block";
        document.getElementById("ans").innerHTML="答對：)";
        document.getElementById("range").innerHTML=`正確答案是　${answer}`;
        document.getElementById("extension").style.display="block";
    }
    //document.getElementById("ans").innerHTML=number;
}

function bsa(){
    document.getElementById("introduction").style.display="block";
    document.getElementById("bsa").style.display="block";
    document.getElementById("content").style.display="block";
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
    if(max<min){
        [max,min]=[min,max];
    }
    min=parseInt(min),max=parseInt(max);
    document.getElementById("input_min").value=min;
    document.getElementById("input_max").value=max;
    if(min==max)
        answer=min;
    else{
        answer=Math.random()*(max-min)-min;
        while(answer>max || answer<min){
            answer=Math.random()*(max-min)-min;
        }
    }
    document.getElementById("try").style.display="block";
    //document.getElementById("number").style.opacity = 1;
    document.getElementById("input_number").style.display="block";
    document.getElementById("submit").style.display="block";
    document.getElementById("counter").innerHTML=0;
    document.getElementById("range").innerHTML=`${min}　　~　　${max}`;
    range_max=max,range_min=min;
    //document.getElementById("ans").innerHTML=min;
}

var answer;

document.getElementById("submit").onclick=function(){submit_function()};
document.getElementById("begin").onclick=function(){begin_game()};
document.getElementById("extension").onclick=function(){bsa()};