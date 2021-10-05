let items=document.querySelectorAll('.item'), cnt=1;
let winMsg=document.querySelector('h1');
let lostMsg=document.querySelector('.lost');
let but=document.querySelector('.pa');
let msg=document.querySelector('.msg');
let decline1=document.querySelector('.declineMsg');

let hashMap=new Map(), flag=0, hashMap1=new Map(), hashMap2=new Map(), cnt2=0;

items.forEach(item=>item.addEventListener('click', action));

const socket=io('https://tic-tac-toe-b.herokuapp.com/');

let url=window.location.href;
url=new URL(url);

socket.auth={
    yours:url.searchParams.get('yours'),
    opp:url.searchParams.get('opp')
};

socket.on('msg', (data)=>{
    cnt2++;
    hashMap2.set(parseInt(data), 1);
    if(!check(hashMap2, parseInt(data))){
        console.log(cnt2);
        if(cnt2!==9){
            hashMap.set(parseInt(data), 1), flag=0;
            if(cnt%2) document.querySelector(`[data-index="${data}"]`).innerHTML='<i class="fas fa-circle"></i>', cnt=0;
            else document.querySelector(`[data-index="${data}"]`).innerHTML='<i class="fas fa-times"></i>', cnt++;
        }
        else{
            if(cnt%2) document.querySelector(`[data-index="${data}"]`).innerHTML='<i class="fas fa-circle"></i>', cnt=0;
            else document.querySelector(`[data-index="${data}"]`).innerHTML='<i class="fas fa-times"></i>', cnt++;
            but.classList.toggle('none');
        }
    }
    else{
        if(cnt%2) document.querySelector(`[data-index="${data}"]`).innerHTML='<i class="fas fa-circle"></i>', cnt=0;
        else document.querySelector(`[data-index="${data}"]`).innerHTML='<i class="fas fa-times"></i>', cnt++;
        lostMsg.classList.toggle('none');
        but.classList.toggle('none');
    }
});

socket.on('again', (data)=>{
    msg.style.display='flex';
});

socket.on('accept', (data)=>{
    location.reload();
});

socket.on('decline', (data)=>{
    decline1.classList.toggle('none');
});

function check(hashMap1, index){
    if((hashMap1.has(index-1)&&hashMap1.has(index-2))||(hashMap1.has(index+1)&&hashMap1.has(index+2))||(hashMap1.has(index-1)&&hashMap1.has(index+1))) return true;
    else if((hashMap1.has(index-10)&&hashMap1.has(index-20))||(hashMap1.has(index+10)&&hashMap1.has(index+20))||(hashMap1.has(index-10)&&hashMap1.has(index+10))) return true;
    else if((hashMap1.has(index+11)&&hashMap1.has(index+22))||(hashMap1.has(index-11)&&hashMap1.has(index+11))||(hashMap1.has(index-11)&&hashMap1.has(index-22))) return true;
    else if((hashMap1.has(index+9)&&hashMap1.has(index+18))||(hashMap1.has(index-9)&&hashMap1.has(index+9))||(hashMap1.has(index-9)&&hashMap1.has(index-18))) return true;
    else return false;
}

function action(){
    let val=parseInt(this.dataset.index);
    if(!hashMap.has(val)&&!flag){
        cnt2++;
        hashMap.set(val, 1), hashMap1.set(val, 1), flag=1;
        if(!check(hashMap1, val)){ 
            if(cnt2!==9){
                socket.emit('msg', val);
                if(cnt%2) this.innerHTML='<i class="fas fa-circle"></i>', cnt=0;
                else this.innerHTML='<i class="fas fa-times"></i>', cnt++;
            }
            else{
                socket.emit('msg', val);
                if(cnt%2) this.innerHTML='<i class="fas fa-circle"></i>', cnt=0;
                else this.innerHTML='<i class="fas fa-times"></i>', cnt++;
                but.classList.toggle('none');
            }
        }
        else{
            socket.emit('msg', val);
            if(cnt%2) this.innerHTML='<i class="fas fa-circle"></i>', cnt=0;
            else this.innerHTML='<i class="fas fa-times"></i>', cnt++;
            winMsg.classList.toggle('none');
            but.classList.toggle('none')
        }
    }
}

function playAgain(){
    socket.emit('again', 'playAgain');
}

function accept(){
    socket.emit('accept', 'fmgfg');
    location.reload();
}

function decline(){
    socket.emit('decline', 'fgfgfg');
}

function decline(){
    socket.emit('decline', '1234');
}
